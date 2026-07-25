import { useEffect, useMemo, useState } from 'react';
import { ClipboardCheck, Printer, RotateCcw, TrendingUp, Info } from 'lucide-react';
import {
  statements,
  ratingScale,
  reflectionPrompts,
  phaseGuidance,
  phaseOrder,
  phaseCounts,
  bands,
  type FrameworkPhase,
} from '@/data/selfAssessment';

const STORAGE_KEY = 'll-building-capacity-v1';

interface Saved {
  ratings: Record<number, number>;
  reflections: Record<number, string>;
}

function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Saved;
  } catch {
    // Corrupt or unavailable storage is not worth failing the page over.
  }
  return { ratings: {}, reflections: {} };
}

export function SelfAssessment() {
  const initial = useMemo(load, []);
  const [ratings, setRatings] = useState<Record<number, number>>(initial.ratings);
  const [reflections, setReflections] = useState<Record<number, string>>(initial.reflections);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ratings, reflections }));
    } catch {
      // Ignore quota or private-mode failures.
    }
  }, [ratings, reflections]);

  const answered = Object.keys(ratings).length;
  const complete = answered === statements.length;
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);

  const phaseAverages = useMemo(() => {
    const out = {} as Record<FrameworkPhase, number | null>;
    for (const phase of phaseOrder) {
      const scores = statements
        .filter((s) => s.phase === phase)
        .map((s) => ratings[s.id])
        .filter((v): v is number => typeof v === 'number');
      out[phase] = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    }
    return out;
  }, [ratings]);

  const lowestPhase = useMemo(() => {
    if (!complete) return null;
    return phaseOrder.reduce((low, p) =>
      (phaseAverages[p] ?? 5) < (phaseAverages[low] ?? 5) ? p : low,
    );
  }, [complete, phaseAverages]);

  const band = bands.find((b) => total >= b.min && total <= b.max);

  const reset = () => {
    setRatings({});
    setReflections({});
  };

  return (
    <section id="self-assessment" className="py-20 md:py-28 bg-slate-50 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            The Collaborative Impact Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            Building Capacity
            <span className="text-blue-600"> Self-Reflection Tool</span>
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Sustainable improvement happens when we build the knowledge, skills, and confidence of
            those around us. Effective leaders create the conditions for others to learn, contribute
            ideas, and take meaningful action together.
          </p>
          <p className="mt-3 text-slate-500 leading-relaxed">
            Reflect honestly on your current practice. Your goal is not perfection, but progress.
          </p>
        </div>

        {/* Rating scale key */}
        <div className="mb-10 rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            Rating Scale
          </h3>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ratingScale.map((r) => (
              <div key={r.value} className="flex gap-3">
                <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold">
                  {r.value}
                </span>
                <div>
                  <dt className="text-sm font-semibold text-slate-800">{r.label}</dt>
                  <dd className="text-xs text-slate-500 leading-snug">{r.descriptor}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between gap-4 mb-4 print:hidden">
          <p className="text-sm font-medium text-slate-500">
            {answered} of {statements.length} answered
          </p>
          <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(answered / statements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Statements */}
        <ol className="space-y-3 mb-10">
          {statements.map((s) => {
            const value = ratings[s.id];
            return (
              <li
                key={s.id}
                className={`rounded-xl border p-4 sm:p-5 transition-colors ${
                  value ? 'bg-white border-blue-200' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex gap-3 mb-3">
                  <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-sm font-bold">
                    {s.id}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{s.text}</p>
                    <span className="inline-block mt-1.5 text-xs font-semibold text-blue-600">
                      {s.phase}
                    </span>
                  </div>
                </div>
                <div
                  className="flex gap-2 sm:gap-3 pl-10"
                  role="radiogroup"
                  aria-label={`Rating for statement ${s.id}`}
                >
                  {ratingScale.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      role="radio"
                      aria-checked={value === r.value}
                      aria-label={`${r.value}, ${r.label}`}
                      title={r.label}
                      onClick={() => setRatings((prev) => ({ ...prev, [s.id]: r.value }))}
                      className={`flex-1 sm:flex-none sm:w-12 h-11 rounded-lg border-2 text-sm font-bold transition-all ${
                        value === r.value
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {r.value}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Results */}
        {complete && band && lowestPhase && (
          <div className="mb-10 rounded-2xl bg-white border-2 border-blue-200 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-blue-100" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">
                  Your result
                </span>
              </div>
              <p className="text-4xl font-bold text-white">
                {total}
                <span className="text-xl text-blue-200"> / 50</span>
              </p>
              <p className="text-lg font-semibold text-white mt-1">{band.label}</p>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed">{band.note}</p>

              {/* Phase breakdown */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  By framework phase
                </h4>
                <div className="space-y-2.5">
                  {phaseOrder.map((p) => {
                    const avg = phaseAverages[p] ?? 0;
                    const isLowest = p === lowestPhase;
                    return (
                      <div key={p} className="flex items-center gap-3">
                        <span
                          className={`w-24 shrink-0 text-sm font-semibold ${
                            isLowest ? 'text-blue-700' : 'text-slate-600'
                          }`}
                        >
                          {p}
                        </span>
                        <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLowest ? 'bg-blue-600' : 'bg-slate-300'}`}
                            style={{ width: `${(avg / 5) * 100}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-sm font-bold text-slate-700 text-right">
                          {avg.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {phaseCounts.Commit < 2 && (
                  <p className="mt-3 flex gap-2 text-xs text-slate-400 leading-relaxed">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Commit rests on a single statement in this tool, so read that score with more
                      caution than the others.
                    </span>
                  </p>
                )}
              </div>

              {/* Where to work next */}
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  Your lowest phase is {lowestPhase}: {phaseGuidance[lowestPhase].question}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {phaseGuidance[lowestPhase].meaning}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">Start with these protocols:</span>{' '}
                  {phaseGuidance[lowestPhase].protocols.join(', ')}. They are in the Bonus section
                  above.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reflection */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <ClipboardCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">Reflection</h3>
          </div>
          <div className="space-y-5">
            {reflectionPrompts.map((prompt, i) => (
              <div key={i}>
                <label
                  htmlFor={`reflection-${i}`}
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  {prompt}
                </label>
                <textarea
                  id={`reflection-${i}`}
                  rows={3}
                  value={reflections[i] ?? ''}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, [i]: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm italic text-slate-400">
            Growth is a journey. Small actions, taken consistently, create lasting impact.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-slate-400">
            Saved in this browser only. Nothing is sent anywhere.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Start over
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Printer className="w-4 h-4" />
              Print or save as PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
