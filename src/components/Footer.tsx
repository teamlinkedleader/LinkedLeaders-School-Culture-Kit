import { GraduationCap, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-white">LinkedLeaders</span>
              <span className="text-xs text-blue-400">School Culture Toolkit</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <button
              onClick={() => document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Principles
            </button>
            <button
              onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Activities
            </button>
            <button
              onClick={() => document.getElementById('scavenger-hunt')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Featured
            </button>
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Mail className="w-4 h-4" />
            <span>hello@linkedleaders.com</span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            \u00A9 2026 LinkedLeaders. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            Built with <Heart className="w-4 h-4 text-rose-500" /> for school leaders
          </p>
        </div>
      </div>
    </footer>
  );
}
