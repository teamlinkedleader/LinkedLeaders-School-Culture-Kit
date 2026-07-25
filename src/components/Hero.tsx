import { ArrowDown, Sparkles, Users, HeartHandshake, Home } from 'lucide-react';
import { totalActivities, culturePillars, monthsCovered, collectionSummary } from '@/data/stats';
import { PACK_SIZE } from '@/data/packs';
import type { AccessState } from '@/lib/access';

interface HeroProps {
  onClaimClick: () => void;
  access: AccessState;
}

export function Hero({ onClaimClick, access }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-400/15 blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span className="text-sm font-medium text-blue-100">A LinkedLeaders Resource</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Build the School
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              People Are Proud
            </span>
            <br />
            to Belong To
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
            {collectionSummary}. One actionable
            idea delivered to your inbox each week, for staff morale, student belonging,
            and family connection.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {access.tier !== 'visitor' ? (
              <button
                onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-blue-700 font-semibold text-base hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
                Browse the Activities
              </button>
            ) : (
              <button
                onClick={onClaimClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Get {PACK_SIZE} Activities Free
              </button>
            )}
            <button
              onClick={() => document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base hover:bg-white/20 transition-all"
            >
              Explore the Framework
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="text-2xl font-bold">{totalActivities}</span>
              </div>
              <p className="text-sm text-blue-200/80 mt-1">Activities</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white">
                <HeartHandshake className="w-5 h-5 text-blue-300" />
                <span className="text-2xl font-bold">{culturePillars}</span>
              </div>
              <p className="text-sm text-blue-200/80 mt-1">Culture pillars</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white">
                <Home className="w-5 h-5 text-blue-300" />
                <span className="text-2xl font-bold">{monthsCovered}</span>
              </div>
              <p className="text-sm text-blue-200/80 mt-1">Months covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
