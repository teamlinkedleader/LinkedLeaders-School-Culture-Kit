import { Compass, LayoutGrid, ClipboardCheck, Sparkles } from 'lucide-react';

/**
 * In-page section navigation.
 *
 * This app is embedded inside the main LinkedLeaders web application, so it
 * must not present a second navigation bar competing with the host's. What used
 * to live in the top nav lives here instead, as buttons on the page.
 */
const sections = [
  {
    id: 'principles',
    icon: Compass,
    label: 'Guiding Principles',
    blurb: 'The six ideas every activity is built on.',
  },
  {
    id: 'activities',
    icon: LayoutGrid,
    label: 'The Activities',
    blurb: 'A full school year, month by month.',
  },
  {
    id: 'self-assessment',
    icon: ClipboardCheck,
    label: 'Self-Reflection',
    blurb: 'Rate your practice and find your weakest phase.',
  },
  {
    id: 'coaching',
    icon: Sparkles,
    label: 'Book a Mentor',
    blurb: 'An hour with someone who has done the job.',
  },
];

export function SectionNav() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav aria-label="Sections" className="bg-white border-b border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="group text-left rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <s.icon className="w-4.5 h-4.5 text-blue-600" />
                </span>
                <span className="text-sm font-bold text-slate-800">{s.label}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{s.blurb}</p>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
