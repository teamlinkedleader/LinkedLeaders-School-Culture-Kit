import { Heart, Eye, Shield, MessageCircle, Sparkles, Calendar } from 'lucide-react';

const principles = [
  {
    icon: Heart,
    title: 'Culture Is Cumulative',
    text: 'Culture is not an event. It\u2019s the accumulation of hundreds of small, intentional moments across the year. Your job is to be the steward of it.',
  },
  {
    icon: Eye,
    title: 'Name, Model, Celebrate, Protect',
    text: 'Name the values, model them relentlessly, celebrate them publicly, and protect them fiercely. These four moves are your core leadership practice.',
  },
  {
    icon: MessageCircle,
    title: 'Anchor It in the \u201CBE\u201D Words',
    text: 'Give your culture a shared language. Post BE words, such as be kind, be honest, be grateful, be visible and be your best, where staff and students see them daily.',
  },
  {
    icon: Calendar,
    title: 'Keep the Cadence',
    text: 'A monthly rhythm for staff morale, student belonging, and family connection. Adapt the activities to your community, but keep the cadence, because culture withers when attention is only paid to it in a crisis.',
  },
  {
    icon: Sparkles,
    title: 'Small Moves, Big Returns',
    text: 'A handwritten note. A covered duty. A greeting at the door. The highest-ROI culture moves are simple, free, and consistent. Don\u2019t overcomplicate it.',
  },
  {
    icon: Shield,
    title: 'Protect What Matters',
    text: 'Protect staff from unnecessary work by killing a task instead of adding one. Protect time for the people in your building. Protect the values you\u2019ve named.',
  },
];

export function Principles() {
  return (
    <section id="principles" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Guiding Principles
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
            The Framework Behind
            <span className="text-blue-600"> Every Activity</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Every activity in this toolkit is rooted in six core principles.
            Together, they form a complete system for building school culture
            that lasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-xl p-7 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors mb-5">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
