import { Mail, Globe } from 'lucide-react';

/**
 * Brand-guide footer.
 *
 * Carries the two things the new-asset checklist requires and the previous
 * footer lacked: a signature line, and the contact block in its fixed format
 * ("Let's Connect · www.LinkedLeaders.com · mike@linkedleaders.com").
 *
 * The old footer also listed hello@linkedleaders.com, which is not the brand
 * contact address.
 */
export function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-brand-navy py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            {/* The wordmark is navy and must never be recoloured, so on a navy
                footer it sits on its own white plate rather than being inverted. */}
            <span className="inline-flex items-center rounded-lg bg-white px-4 py-2">
              <img
                src="/linkedleaders-logo.png"
                alt="LinkedLeaders. Source Wisdom."
                className="h-10 w-auto"
              />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
              School Culture Toolkit
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <button onClick={() => go('principles')} className="text-slate-300 hover:text-white transition-colors">
              Principles
            </button>
            <button onClick={() => go('activities')} className="text-slate-300 hover:text-white transition-colors">
              Activities
            </button>
            <button onClick={() => go('self-assessment')} className="text-slate-300 hover:text-white transition-colors">
              Self-Reflection
            </button>
            <button onClick={() => go('coaching')} className="text-slate-300 hover:text-white transition-colors">
              Mentors
            </button>
          </nav>
        </div>

        {/* Signature line, used verbatim per the brand guide. */}
        <p className="mt-12 text-center text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto">
          Because school leadership is too hard to do alone.
        </p>

        {/* Contact block, always in this format. */}
        <div className="mt-8 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="font-semibold uppercase tracking-widest text-xs text-blue-300">
            Let&apos;s Connect
          </span>
          <a
            href="https://www.linkedleaders.com"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            www.LinkedLeaders.com
          </a>
          <a
            href="mailto:mike@linkedleaders.com"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            mike@linkedleaders.com
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          A LinkedLeaders resource by 5xLeadership, LLC.
        </p>
      </div>
    </footer>
  );
}
