/**
 * submitEnquiry.js — sends a form to /api/enquiry.php.
 *
 * Before this, every form did `setSubmitted(true)` and nothing else: each
 * enquiry from the website was shown a "thank you" and discarded. Nothing here
 * throws; the caller always gets { ok } plus a message to show on failure.
 */

const ENDPOINT = "/api/enquiry.php";

/** Fallback used only if the host turns out to have PHP disabled. Set the
 *  access key and flip USE_FALLBACK to true; no other change is needed. */
const FALLBACK_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "";
const USE_FALLBACK = false;

/** Call when the form first renders; the server rejects anything sent < 2.5s later. */
export function mountedAt() {
  return Date.now();
}

export async function submitEnquiry(payload, startedAt) {
  const body = {
    ...payload,
    elapsed: Date.now() - startedAt,
    page: typeof location !== "undefined" ? location.pathname + location.search : "",
  };

  const url = USE_FALLBACK ? FALLBACK_ENDPOINT : ENDPOINT;
  if (USE_FALLBACK) body.access_key = WEB3FORMS_KEY;

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, message: "Could not reach the server. Please check your connection, or call us on +91 9860480063." };
  }

  let data = {};
  try { data = await res.json(); } catch { /* not JSON, e.g. PHP not running */ }

  if (res.status === 422) {
    return { ok: false, fields: data.fields || {}, message: "Please check the highlighted fields." };
  }
  if (res.status === 429) {
    return { ok: false, message: data.message || "Too many enquiries from this connection. Please call us instead." };
  }
  // Success must be confirmed, never assumed. A host that serves the .php file
  // as plain text answers 200 with no JSON, and that must not read as a lead
  // received. Web3Forms (the fallback) confirms with `success` rather than `ok`.
  if (!res.ok || !(data.ok === true || data.success === true)) {
    return { ok: false, message: "Something went wrong on our side. Please call us on +91 9860480063 or WhatsApp us." };
  }
  return { ok: true };
}
