/**
 * Submit lead form data to the backend API.
 * Reads endpoint from VITE_LEAD_API_URL env var.
 */

const API_URL = import.meta.env.VITE_LEAD_API_URL || '';

/**
 * @typedef {Object} LeadData
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} parentsArea
 * @property {string} [message]
 */

/**
 * POSTs lead data as JSON. Returns { ok: true } on success.
 * Throws on network / HTTP errors.
 */
export async function submitLead(lead) {
  if (!API_URL) {
    // No endpoint configured — simulate success for development
    await new Promise((r) => setTimeout(r, 1200));
    return { ok: true };
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }

  return { ok: true };
}
