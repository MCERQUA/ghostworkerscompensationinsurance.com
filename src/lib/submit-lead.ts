const LEADS_WEBHOOK =
  "https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=ghostworkerscompensationinsurance.com";

/**
 * Write a lead. Returns true only if a write succeeded: the leads webhook
 * answered 2xx, or (fallback) the Netlify Forms POST to "/__forms.html" answered 2xx.
 * The caller shows an error only when this returns false (both failed).
 */
export async function submitLead(
  formName: string,
  fields: Record<string, string>
): Promise<boolean> {
  try {
    const res = await fetch(LEADS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form_name: formName,
        source: "ghostworkerscompensationinsurance.com",
        ...fields,
      }),
    });
    // The webhook answers 200 with stored:false when it did not store the lead.
    if (res.ok) {
      const j = await res.json().catch(() => null);
      if (j && j.ok === true && j.stored !== false) return true;
    }
  } catch {
    // fall through to Netlify Forms
  }
  try {
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": formName, ...fields }).toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}
