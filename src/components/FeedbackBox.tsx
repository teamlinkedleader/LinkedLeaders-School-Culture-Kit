import { useState } from 'react';
import { MessageSquareHeart, Send, Check, AlertCircle } from 'lucide-react';
import type { AccessState } from '@/lib/access';

/**
 * The feedback, suggestions and gratitude box.
 *
 * Posts to Netlify Forms rather than to MailerLite or Supabase. Deliberate:
 * feedback is not a subscription, so it does not belong in the subscriber list,
 * and it does not justify a new table plus an RLS policy plus a migration Mike
 * has to run by hand. Netlify already hosts the site, captures the submissions
 * and can email them on, with no key to leak and nothing to maintain.
 *
 * The static form in index.html is what Netlify's build step actually detects.
 * This component only posts to it. If that hidden form is ever removed the
 * submissions silently stop, which is why it carries a warning comment.
 */

const FORM_NAME = 'culture-kit-feedback';

const KINDS = [
  { value: 'Feedback', label: 'Feedback', hint: 'Something that did not work, or did' },
  { value: 'Suggestion', label: 'Suggestion', hint: 'An activity or idea we are missing' },
  { value: 'Gratitude', label: 'Gratitude', hint: 'Something that landed well' },
] as const;

interface FeedbackBoxProps {
  access: AccessState;
}

export function FeedbackBox({ access }: FeedbackBoxProps) {
  const [kind, setKind] = useState<string>('Feedback');
  const [message, setMessage] = useState('');
  const [name, setName] = useState(access.name ?? '');
  const [email, setEmail] = useState(access.email ?? '');
  const [botField, setBotField] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setState('sending');

    const body = new URLSearchParams({
      'form-name': FORM_NAME,
      'bot-field': botField,
      kind,
      message,
      name,
      email,
      // Which page state they were in when they wrote it, which is often the
      // difference between an actionable report and a puzzling one.
      access: access.tier,
    });

    // Netlify's form handler only exists on the deployed site. Posting to "/"
    // in dev hits Vite, which returns the app's HTML with a 200 and would look
    // exactly like success. Better to say so than to fake it.
    if (import.meta.env.DEV) {
      console.info(`[feedback] dev only, not submitted:`, Object.fromEntries(body));
      setState('sent');
      return;
    }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <section id="feedback" className="bg-brand-panel py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-4">
            <MessageSquareHeart className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Feedback, Suggestions and Gratitude
          </h2>
          <p className="mt-3 text-slate-500 leading-relaxed">
            Tell us what worked in your building, what fell flat, and what we should have included.
            This goes straight to us, and the activities get better because of it.
          </p>
        </div>

        {state === 'sent' ? (
          <div className="rounded-2xl border border-brand-border bg-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Check className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Thank you, that landed</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {name ? `${name}, we` : 'We'} read every one of these. If you left an email and it
              needs an answer, you will get one.
            </p>
            {import.meta.env.DEV && (
              <p className="mt-4 text-xs text-amber-700">
                Dev build: nothing was actually submitted. Netlify handles this on the deployed
                site only.
              </p>
            )}
          </div>
        ) : (
          <form
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="rounded-2xl border border-brand-border bg-white p-6 md:p-8"
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            {/* Honeypot. Hidden from people, irresistible to bots. */}
            <p className="hidden">
              <label>
                Do not fill this in
                <input
                  name="bot-field"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </p>

            <fieldset>
              <legend className="text-sm font-medium text-slate-600 mb-2">
                What is this?
              </legend>
              <div className="grid gap-2 sm:grid-cols-3 mb-6">
                {KINDS.map((k) => (
                  <label
                    key={k.value}
                    className={`cursor-pointer rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      kind === k.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-brand-border hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="kind"
                      value={k.value}
                      checked={kind === k.value}
                      onChange={() => setKind(k.value)}
                      className="sr-only"
                    />
                    <span className="block text-sm font-semibold text-slate-800">{k.label}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{k.hint}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-medium text-slate-600 mb-1.5" htmlFor="fb-message">
              Your message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="fb-message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="We ran The Chip Bowl for three weeks and it changed how our mornings feel..."
              className="w-full rounded-lg border border-brand-border px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5" htmlFor="fb-name">
                  Your name <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="fb-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-brand-border px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5" htmlFor="fb-email">
                  Email <span className="text-slate-400 font-normal">(only if you want a reply)</span>
                </label>
                <input
                  id="fb-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-brand-border px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {state === 'error' && (
              <div className="mt-4 flex gap-2 rounded-lg bg-rose-50 border border-rose-200 px-3.5 py-3">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-700 leading-relaxed">
                  That did not send. Rather than lose what you wrote, copy it into an email to{' '}
                  <a href="mailto:mike@linkedleaders.com" className="font-semibold underline">
                    mike@linkedleaders.com
                  </a>
                  .
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'sending' || !message.trim()}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {state === 'sending' ? 'Sending...' : 'Send it'}
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              No account needed. Name and email are optional.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
