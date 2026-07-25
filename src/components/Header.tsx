import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

interface HeaderProps {
  onSubscribeClick: () => void;
  isSubscribed: boolean;
}

export function Header({ onSubscribeClick, isSubscribed }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${scrolled ? 'bg-blue-600' : 'bg-white/20 backdrop-blur-sm'}`}>
              <GraduationCap className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                LinkedLeaders
              </span>
              <span className={`text-xs font-medium ${scrolled ? 'text-blue-600' : 'text-blue-100'}`}>
                School Culture Toolkit
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('principles')}
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/90 hover:text-white'}`}
            >
              Guiding Principles
            </button>
            <button
              onClick={() => scrollTo('activities')}
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/90 hover:text-white'}`}
            >
              52 Activities
            </button>
            <button
              onClick={() => scrollTo('self-assessment')}
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/90 hover:text-white'}`}
            >
              Self-Reflection
            </button>
            <button
              onClick={() => scrollTo('scavenger-hunt')}
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/90 hover:text-white'}`}
            >
              Featured Activity
            </button>
          </nav>

          <div className="hidden md:block">
            {isSubscribed ? (
              <span className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full ${scrolled ? 'text-blue-700 bg-blue-50' : 'text-white bg-white/20 backdrop-blur-sm'}`}>
                Subscribed
              </span>
            ) : (
              <button
                onClick={onSubscribeClick}
                className="text-sm font-semibold px-5 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get the Weekly Email
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-3 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg -mx-4 px-4">
            <button onClick={() => scrollTo('principles')} className="block w-full text-left py-2 text-slate-600 font-medium">Guiding Principles</button>
            <button onClick={() => scrollTo('activities')} className="block w-full text-left py-2 text-slate-600 font-medium">52 Activities</button>
            <button onClick={() => scrollTo('self-assessment')} className="block w-full text-left py-2 text-slate-600 font-medium">Self-Reflection</button>
            <button onClick={() => scrollTo('scavenger-hunt')} className="block w-full text-left py-2 text-slate-600 font-medium">Featured Activity</button>
            {!isSubscribed && (
              <button
                onClick={() => { onSubscribeClick(); setMobileOpen(false); }}
                className="block w-full text-center py-2.5 rounded-full bg-blue-600 text-white font-semibold"
              >
                Get the Weekly Email
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
