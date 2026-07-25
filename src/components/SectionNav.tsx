import { useEffect, useState } from 'react';
import { Compass, LayoutGrid, Workflow, ClipboardCheck, CalendarCheck } from 'lucide-react';

/**
 * Sticky section navigation.
 *
 * This app embeds inside the main LinkedLeaders application, so it must not
 * present a second top-level navigation bar competing with the host's. These
 * are page controls rather than site navigation, which is why they live on the
 * page and stick below the header instead of inside it.
 *
 * The page is roughly 20,000 pixels tall. Without something persistent, anyone
 * halfway down has no way back to a section except scrolling.
 */
const sections = [
  { id: 'principles', icon: Compass, label: 'Guiding Principles' },
  { id: 'activities', icon: LayoutGrid, label: 'The Activities' },
  { id: 'framework', icon: Workflow, label: 'Collaborative Impact Framework' },
  { id: 'self-assessment', icon: ClipboardCheck, label: 'Self-Reflection' },
  { id: 'coaching', icon: CalendarCheck, label: 'Book a Mentor' },
];

export function SectionNav() {
  const [active, setActive] = useState<string>('principles');

  /**
   * Highlight whichever section the reader is actually in. Uses scroll position
   * against each section's top rather than IntersectionObserver, because these
   * sections are far taller than the viewport and would rarely be "intersecting"
   * in any useful sense.
   */
  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= marker) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      aria-label="Sections"
      className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll on narrow screens rather than wrapping, which would
            change the sticky bar's height as the page moves. */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-navy text-white'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-brand-navy'
                }`}
              >
                <s.icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
