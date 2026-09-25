<?php
/**
 * enquiry.php — the enquiry endpoint.
 *
 * WHY THIS FILE EXISTS
 * Before this, ContactForm.jsx did:  validate() -> setSubmitted(true)
 * No fetch. No email. No storage. Every enquiry submitted through the website
 * was shown a "thank you" and then discarded. This endpoint replaces that.
 *
 * ORDER MATTERS: the lead is written to disk BEFORE any email is attempted.
 * If the mail server is down or rejects the message, the lead is
 * still on disk and the customer still sees success. Losing a lead to an email
 * failure is the exact bug we are fixing; do not reorder these steps.
 *
 * SETUP: see SETUP.md. In short, create
 *   <one level ABOVE public_html>/nirlaxson-private/config.php
 * and mail goes out through the host's own mail server. Test with:
 *   curl -X POST https://nirlaxsonindustries.com/api/enquiry.php \
 *     -H 'Content-Type: application/json' \
 *     -d '{"firstName":"Test","lastName":"Lead","email":"you@example.com","message":"hello","inquiryType":"General Question","elapsed":9000}'
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($code, array $body) {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

/* ── Locate the private directory (outside the web root when possible) ── */
$candidates = [
    dirname(__DIR__, 2) . '/nirlaxson-private',   // public_html/../nirlaxson-private  (preferred)
    dirname(__DIR__) . '/.private',               // public_html/.private              (fallback)
];
$privateDir = null;
foreach ($candidates as $dir) {
    if (is_dir($dir) || @mkdir($dir, 0700, true)) { $privateDir = $dir; break; }
}
// If we fell back to a directory inside the web root, protect it here as well
// as in .htaccess. Leads must never be fetchable over HTTP.
if ($privateDir !== null && strpos($privateDir, dirname(__DIR__)) === 0 && !is_file("$privateDir/.htaccess")) {
    @file_put_contents("$privateDir/.htaccess",
        "Require all denied\n<IfModule !mod_authz_core.c>\nOrder allow,deny\nDeny from all\n</IfModule>\n");
}
if ($privateDir === null) {
    error_log('enquiry.php: no writable private directory');
    respond(500, ['ok' => false, 'error' => 'server_misconfigured']);
}

$config = is_file("$privateDir/config.php") ? (require "$privateDir/config.php") : [];

/* VERIFIED 2026-09-22 against the live DNS and mail server:
 *   - info@nirlaxsonindustries.com is a real mailbox (SMTP RCPT -> 250, and a
 *     fake address -> 550, so the server is not accept-all).
 *   - SPF authorises the sending IP 135.181.219.236 via "+a".
 *   - DKIM is already published at default._domainkey (cPanel auto-setup).
 *   - The IP is clean on Spamhaus, SpamCop, Barracuda and SORBS.
 * That is everything Gmail checks, so the host's own Exim can deliver to
 * nirlaxson@gmail.com directly. No third-party email service is required. */
$MAIL_TO   = $config['mail_to']   ?? 'nirlaxson@gmail.com';
$MAIL_CC   = $config['mail_cc']   ?? 'info@nirlaxsonindustries.com';
$MAIL_FROM = $config['mail_from'] ?? 'website@nirlaxsonindustries.com';
$RESEND    = $config['resend_key'] ?? '';          // optional upgrade, not needed

/* ── Rate limit: 5 submissions per IP per hour ── */
// REMOTE_ADDR only. Forwarding headers (CF-Connecting-IP, X-Forwarded-For) are
// set by the client unless a proxy is known to overwrite them, and trusting
// them would let a bot pick a fresh "IP" per request and skip the limit.
$ip   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rlF  = "$privateDir/ratelimit.json";
$now  = time();
$rl   = is_file($rlF) ? (json_decode((string)@file_get_contents($rlF), true) ?: []) : [];
foreach ($rl as $k => $stamps) {
    if (!is_array($stamps)) { unset($rl[$k]); continue; }
    $rl[$k] = array_values(array_filter($stamps, fn($t) => $t > $now - 3600));
    if (!$rl[$k]) unset($rl[$k]);
}
if (count($rl[$ip] ?? []) >= 5) {
    respond(429, ['ok' => false, 'error' => 'rate_limited',
                  'message' => 'Too many enquiries from this connection. Please call us instead.']);
}

/* ── Parse ── */
$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 60000) respond(413, ['ok' => false, 'error' => 'payload_too_large']);
$in = json_decode($raw, true);
if (!is_array($in)) respond(400, ['ok' => false, 'error' => 'bad_json']);

$cut = function ($v, $max) {
    return function_exists('mb_substr') ? mb_substr((string)$v, 0, $max) : substr((string)$v, 0, $max);
};
$str = function ($k, $max = 2000) use ($in, $cut) { return trim($cut(isset($in[$k]) ? $in[$k] : '', $max)); };

/* ── Bot traps. Both return 200 so a bot learns nothing. ── */
if ($str('website') !== '' || $str('fax') !== '') {
    respond(200, ['ok' => true, 'emailed' => false]);          // honeypot filled
}
if ((int)($in['elapsed'] ?? 0) < 2500) {
    respond(200, ['ok' => true, 'emailed' => false]);          // submitted in under 2.5s
}

/* ── Validate (mirrors the client rules in ContactForm.jsx / FeedbackForm.jsx) ── */
$errors = [];
$firstName = $str('firstName', 80);
$lastName  = $str('lastName', 80);
$email     = $str('email', 160);
$message   = $str('message', 5000);
$kind      = $str('kind', 20) ?: 'enquiry';

if ($firstName === '') $errors['firstName'] = 'Required';
// The feedback form asks for a single name field.
if ($lastName === '' && $kind !== 'feedback') $errors['lastName'] = 'Required';
if ($email === '')     $errors['email']     = 'Required';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Enter a valid email';
if ($message === '')   $errors['message']   = 'Please describe your enquiry';
if ($errors) respond(422, ['ok' => false, 'error' => 'validation_failed', 'fields' => $errors]);

$lead = [
    'received_at'   => gmdate('c'),
    'kind'          => $kind,
    'first_name'    => $firstName,
    'last_name'     => $lastName,
    'email'         => $email,
    'phone'         => $str('phone', 40),
    'company'       => $str('company', 160),
    'inquiry_type'  => $str('inquiryType', 60),
    'products'      => is_array($in['selectedProducts'] ?? null) ? implode('; ', array_map('strval', $in['selectedProducts'])) : '',
    'capacity'      => $str('capacity', 120),
    'material'      => $str('material', 120),
    'industry'      => $str('industry', 120),
    'quantity'      => $str('quantity', 60),
    'delivery_date' => $str('deliveryDate', 40),
    'location'      => $str('location', 160),
    'budget_range'  => $str('budgetRange', 60),
    'rating'        => $str('rating', 10),
    'experience'    => $str('experienceType', 60),
    'recommend'     => $str('recommend', 30),
    'additional_requirements' => $str('additionalRequirements', 3000),
    'message'       => $message,
    'page'          => $str('page', 300),
    'ip'            => $ip,
    'user_agent'    => $cut(isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '', 300),
];

/* A cell starting with = + - @ is run as a formula when the CSV is opened in
 * Excel. Prefix those with ' so they stay text. Phone numbers ("+91 ...") are
 * left alone. */
$csvSafe = function ($v) {
    $v = (string)$v;
    if ($v === '' || strpos("=+-@\t\r", $v[0]) === false) return $v;
    if (preg_match('/^\+?[0-9 ()-]+$/', $v)) return $v;
    return "'" . $v;
};

/* ── STEP 1: persist. Never skip, never reorder. ── */
$saved = false;
$csv = "$privateDir/leads.csv";
// Decide on the header BEFORE opening: in append mode ftell() returns 0 until
// the first write, so checking it after fopen re-writes the header every time.
$needHeader = !is_file($csv) || filesize($csv) === 0;
if ($fh = @fopen($csv, 'a')) {
    if (flock($fh, LOCK_EX)) {
        clearstatcache(true, $csv);
        if ($needHeader && ftell($fh) === 0) fputcsv($fh, array_keys($lead));
        fputcsv($fh, array_map($csvSafe, array_values($lead)));
        fflush($fh);
        flock($fh, LOCK_UN);
        $saved = true;
    }
    fclose($fh);
}
if (!$saved) {
    // Last resort so the lead exists somewhere even if the CSV is unwritable.
    error_log('enquiry.php LEAD (csv write failed): ' . json_encode($lead));
}

$rl[$ip][] = $now;
@file_put_contents($rlF, json_encode($rl), LOCK_EX);

/* ── STEP 2: notify. Failure here must not fail the request. ── */

// Build the message body once; both transports use it.
$rowsText = '';
$rowsHtml = '';
foreach ($lead as $k => $v) {
    if ($v === '' || in_array($k, ['user_agent', 'ip'], true)) continue;
    $label = ucwords(str_replace('_', ' ', $k));
    $rowsText .= $label . ': ' . $v . "\n";
    $rowsHtml .= '<tr><td style="padding:6px 12px;color:#6b7280;font:14px sans-serif;vertical-align:top">'
              . htmlspecialchars($label, ENT_QUOTES) . '</td>'
              . '<td style="padding:6px 12px;font:600 14px sans-serif;color:#0d1b5e">'
              . nl2br(htmlspecialchars((string)$v, ENT_QUOTES)) . '</td></tr>';
}
/* Anything from the visitor that ends up in a mail header must be a single
 * line: a CR/LF in a name would let them add their own headers (e.g. Bcc) and
 * turn this form into a spam relay. Non-ASCII is MIME-encoded as RFC 2047
 * requires. */
$oneLine = function ($v) {
    return trim(preg_replace('/[\x00-\x1F\x7F]+/', ' ', (string)$v));
};
$encodeHeader = function ($v) {
    return (function_exists('mb_encode_mimeheader') && preg_match('/[^\x20-\x7E]/', $v))
        ? mb_encode_mimeheader($v, 'UTF-8', 'B', "\r\n")
        : $v;
};

$subject = $oneLine(sprintf('New %s: %s %s%s',
    $kind === 'feedback' ? 'website feedback' : ($lead['inquiry_type'] ?: 'website enquiry'),
    $firstName, $lastName,
    $lead['company'] ? ' (' . $lead['company'] . ')' : ''));
$replyName = str_replace(['"', '\\'], '', $oneLine($firstName . ' ' . $lastName));

$emailed = false;

/* Transport A (default): hand the message to the server's own Exim.
 * The mailbox and the website live on the same cPanel host, DKIM signing is
 * already configured there, and SPF covers the IP. Nothing to sign up for and
 * nothing that can expire. */
if (function_exists('mail')) {
    /* SMTP forbids lines over 998 characters (RFC 5321). The HTML table is one
     * unbroken line of 1,600+ characters, and it grows with the message, so
     * Exim's transport ("message has lines too long for transport") refused
     * longer enquiries after mail() had already returned true, and the bounce
     * went to the unread MAIL_FROM mailbox. Base64 with chunk_split keeps every
     * body line at 76 characters, whatever the visitor typed. */
    $boundary = 'nx-' . bin2hex(random_bytes(12));
    $headers = [
        'From: Nirlaxson Website <' . $MAIL_FROM . '>',
        'Reply-To: ' . $encodeHeader('"' . $replyName . '"') . ' <' . $email . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: nirlaxsonindustries.com',
    ];
    if ($MAIL_CC !== '') $headers[] = 'Cc: ' . $MAIL_CC;

    $html = '<h2 style="font:700 18px sans-serif;color:#0d1b5e">' . htmlspecialchars($subject, ENT_QUOTES) . '</h2>'
          . '<table style="border-collapse:collapse">' . $rowsHtml . '</table>';

    $body = "--$boundary\r\n"
          . "Content-Type: text/plain; charset=UTF-8\r\n"
          . "Content-Transfer-Encoding: base64\r\n\r\n"
          . chunk_split(base64_encode($subject . "\n\n" . $rowsText))
          . "--$boundary\r\n"
          . "Content-Type: text/html; charset=UTF-8\r\n"
          . "Content-Transfer-Encoding: base64\r\n\r\n"
          . chunk_split(base64_encode($html))
          . "--$boundary--\r\n";

    // -f sets the envelope sender so Exim signs and SPF-aligns correctly.
    $emailed = @mail($MAIL_TO, $encodeHeader($subject), $body, implode("\r\n", $headers), '-f' . $MAIL_FROM);
    if (!$emailed) error_log('enquiry.php: local mail() failed, trying Resend if configured');
}

/* Transport B (optional): Resend, used only if local mail failed AND a key is
 * configured. Not required for this host. */
if (!$emailed && $RESEND !== '' && function_exists('curl_init')) {
    $payload = [
        'from'     => "Nirlaxson Website <$MAIL_FROM>",
        'to'       => array_values(array_filter([$MAIL_TO, $MAIL_CC])),
        'reply_to' => $email,
        'subject'  => $subject,
        'html'     => '<h2 style="font:700 18px sans-serif;color:#0d1b5e">' . htmlspecialchars($subject, ENT_QUOTES) . '</h2>'
                    . '<table style="border-collapse:collapse">' . $rowsHtml . '</table>',
    ];

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $RESEND, 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);
    $res  = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $emailed = $code >= 200 && $code < 300;
    if (!$emailed) error_log("enquiry.php: resend returned $code: " . substr((string)$res, 0, 400));
}

/* The lead is saved either way, so the customer always sees success. */
respond(200, ['ok' => true, 'emailed' => $emailed, 'stored' => $saved]);
