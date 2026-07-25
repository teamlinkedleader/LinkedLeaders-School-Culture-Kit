import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { PACK_SIZE } from '@/data/packs';
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                scrolled ? 'bg-blue-600' : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-bold text-lg tracking-tight ${
                  scrolled ? 'text-slate-800' : 'text-white'
                }`}
              >
                LinkedLeaders
              </span>
              <span
                className={`text-xs font-medium ${scrolled ? 'text-blue-600' : 'text-blue-100'}`}
              >
                School Culture Toolkit
              </span>
            </div>
          </div>

          {access.tier === 'full' ? (
            <span
              className={`text-sm font-semibold px-4 py-2 rounded-full ${
                scrolled ? 'text-blue-700 bg-blue-50' : 'text-white bg-white/20 backdrop-blur-sm'
              }`}
            >
              Full access
            </span>
          ) : (
            <button
              onClick={onClaimClick}
              className="text-sm font-semibold px-5 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {access.tier === 'pack' ? 'Unlock Everything' : `Get ${PACK_SIZE} Free`}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
