# Go-live setup — nirlaxsonindustries.com

Everything here is a one-time job. Nothing in the code needs editing.

---

## 1. Upload

`npm run build`, then upload **the contents of `dist/`** into `public_html/`.

**Include `.htaccess`.** It is a hidden file and most FTP clients skip it by
default — in FileZilla, Server → Force showing hidden files. Without it, every
missing URL goes back to returning HTTP 200, `/about` stops working, and the
SEO work is undone.

---

## 2. The email config file

Create **`nirlaxson-private/config.php`**, one level ABOVE `public_html`
(cPanel → File Manager → up one level from public_html → New Folder):

```php
<?php return [
  // Primary inbox. Verified working: this domain's mail server accepted
  // info@ and rejected a fake address, so it is a real mailbox, and Gmail
  // delivery passes because SPF and DKIM are already correct on this host.
  'mail_to' => 'nirlaxson@gmail.com',
  'mail_cc' => 'info@nirlaxsonindustries.com',

  // Envelope sender. Must be @nirlaxsonindustries.com or DKIM will not sign.
  'mail_from' => 'website@nirlaxsonindustries.com',

  // Not needed. Only used if the server's own mail ever fails.
  'resend_key' => '',
];
```

Then create the sending mailbox in **cPanel → Email Accounts → Create**:
`website@nirlaxsonindustries.com`. It only sends; nobody needs to read it.

### Why no email service is needed

Checked against your live DNS and mail server on 22 Sep 2026:

| Check | Result |
|---|---|
| `info@nirlaxsonindustries.com` exists | **Yes** — SMTP returned `250 Accepted`, and a fake address returned `550 No Such User`, so the server is not accept-all |
| SPF authorises the web server to send | **Yes** — `+a` matches the A record `135.181.219.236` |
| DKIM signing key published | **Yes** — valid RSA key at `default._domainkey` (cPanel set this up) |
| Sending IP on a spam blocklist | **No** — clean on Spamhaus, SpamCop, Barracuda, SORBS |

SPF and DKIM are the two things Gmail actually checks. Both already pass, so
the host's own Exim delivers straight to Gmail.

---

---

## 3. DMARC (one DNS record)

cPanel → **Zone Editor** → Manage → Add Record:

| Field | Value |
|---|---|
| Name | `_dmarc` |
| Type | `TXT` |
| TTL | `14400` |
| Record | `v=DMARC1; p=none; rua=mailto:info@nirlaxsonindustries.com; fo=1` |

`p=none` only monitors; it cannot cause mail to be rejected. Mail already
delivers without this. It improves long-term inbox placement.

---

## 4. Verify it actually works

```bash
curl -sI https://nirlaxsonindustries.com/this-page-does-not-exist | head -1   # 404
curl -sI https://nirlaxsonindustries.com/about/ | grep -i location            # -> /about
curl -s  https://nirlaxsonindustries.com/products/bead-mill | grep -c "<h1"   # > 0
```

Then submit one message, one quote and one feedback through `/contact` and
confirm:
1. Each arrives at **nirlaxson@gmail.com** (check spam the first time).
2. `info@nirlaxsonindustries.com` has a copy.
3. A row appears in `nirlaxson-private/leads.csv`.

If the email does not arrive but the CSV row does, the lead is safe and it is
purely a mail problem: check that `website@nirlaxsonindustries.com` exists.

The form only shows "sent successfully" when the server confirms it, so if a
visitor sees success, the lead was stored.

---

## 5. Search Console

search.google.com/search-console → add the property → submit
`https://nirlaxsonindustries.com/sitemap.xml`.
