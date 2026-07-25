import { useEffect, useState } from 'react';
import type { AccessState } from '@/lib/access';

interface HeaderProps {
  onClaimClick: () => void;
  access: AccessState;
}

/**
 * Deliberately minimal.
 *
 * This app is embedded inside the main LinkedLeaders web application, so a
 * second navigation bar here would compete with the host's. The section links
 * moved onto the page itself, see SectionNav. What remains is identity and one
 * call to action.
 */
export function Header({ onClaimClick, access }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Always a white surface. The 2026 wordmark is navy, and the brand guide
  // requires the variant to match its background, so a transparent header over
  // the navy hero would render the logo invisible.
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-lg' : 'border-b border-brand-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Official 2026 wordmark, transparent variant on a light surface. */}
            <img
              src="/linkedleaders-logo.png"
              alt="LinkedLeaders. Source Wisdom."
              className="h-11 md:h-12 w-auto"
            />
            <span className="hidden sm:block pl-3 ml-1 border-l border-brand-border text-xs font-semibold uppercase tracking-widest text-brand-purple">
              School Culture Toolkit
            </span>
          </div>

          {access.tier === 'full' ? (
            <span className="text-sm font-semibold px-4 py-2 rounded-full text-brand-navy bg-blue-50">
              Full access
            </span>
          ) : (
            <button
              onClick={onClaimClick}
              className="text-sm font-semibold px-5 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Unlock the Year
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
