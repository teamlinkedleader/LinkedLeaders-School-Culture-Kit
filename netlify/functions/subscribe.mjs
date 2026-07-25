/**
 * Culture Builder signup endpoint.
 *
 * MailerLite is the system of record for subscribers. This function exists
 * because the MailerLite API key grants full account access and therefore
 * cannot go anywhere near the browser bundle: everything in a Vite build is
 * served to every visitor. The key stays in Netlify's environment and only
 * this function ever sees it.
 *
 * Required Netlify environment variable (server-side, no VITE_ prefix, which
 * is what keeps it out of the client bundle):
 *   MAILERLITE_API_KEY
 *
 * Field mapping uses MailerLite fields that already exist in the account
 * rather than creating duplicates:
 *   Your Name          -> name (+ last_name when a surname is given)
 *   Your Position      -> title
 *   School or District -> company
 */

const GROUP_ID = '193994757121246567'; // "Culture Builder Opt-In"
const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/** Split a single name field without mangling multi-part surnames. */
function splitName(full) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { name: parts[0], last_name: '' };
  return { name: parts[0], last_name: parts.slice(1).join(' ') };
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    // Deliberately explicit in the log and vague to the visitor: a
    // misconfiguration is our problem, not something they can act on.
    console.error('MAILERLITE_API_KEY is not set; signup cannot be recorded.');
    return json(503, { error: 'not_configured' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const email = String(payload.email || '').trim().toLowerCase();
  const fullName = String(payload.name || '').trim();
  const position = String(payload.role || '').trim();
  const school = String(payload.school_name || '').trim();

  if (!email || !email.includes('@') || !fullName) {
    return json(400, { error: 'missing_fields' });
  }

  const { name, last_name } = splitName(fullName);

  try {
    // MailerLite's POST /subscribers upserts, so a returning visitor updates
    // rather than erroring. That is the behaviour we want: someone signing up
    // twice is normal, not a failure worth showing them.
    const res = await fetch(MAILERLITE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: { name, last_name, title: position, company: school },
        groups: [GROUP_ID],
        status: 'active',
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('MailerLite rejected the subscriber', res.status, detail);
      return json(502, { error: 'provider_error' });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('MailerLite request failed', err);
    return json(502, { error: 'provider_unreachable' });
  }
}
