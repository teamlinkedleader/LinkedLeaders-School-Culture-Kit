import { Search, Clock, Users, Award, ArrowRight } from 'lucide-react';

export function ScavengerHunt() {
  const fallItems = ['Scarecrow', 'Red truck', '"Happy Fall Y\u2019all"', 'Pumpkin'];
  const winterItems = ['Snowman', 'Treetop star', 'Gingerbread house', 'Jingle bells'];

  const rules = [
    { icon: Clock, text: 'Teams have 15 minutes to find items on a themed list hidden in classrooms.' },
    { icon: Search, text: 'Take only 3 items from any one classroom, so teams keep moving and exploring.' },
    { icon: Users, text: 'One teammate photographs each item; another records which classroom. Stay together.' },
    { icon: Award, text: 'Award a small prize for the winning team, and celebrate everyone who played.' },
  ];

  return (
    <section id="scavenger-hunt" className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-100 text-sm font-semibold mb-4">
            Featured Activity
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Staff Scavenger Hunt
          </h2>
          <p className="mt-4 text-lg text-blue-100/80 leading-relaxed">
            A simple, high-energy way to build staff connection and get people into
            each other\u2019s classrooms. Run a fall version in October and a winter version
            in December. It costs nothing and consistently earns big morale returns.
          </p>
        </div>

        {/* Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {rules.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-400/20 mb-4">
                  <Icon className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-sm text-blue-50/90 leading-relaxed">{r.text}</p>
              </div>
            );
          })}
        </div>

        {/* Two versions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fall version */}
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-xl p-8 border border-blue-400/30">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">\uD83C\uDF42</span>
              <h3 className="text-xl font-bold text-white">Fall Scavenger Hunt</h3>
            </div>
            <p className="text-blue-100/80 text-sm mb-5">
              Run this in October as a team-building highlight. Seasonal classroom d\u00e9cor
              becomes your hunt list.
            </p>
            <div className="space-y-2.5">
              {fallItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  <span className="text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Winter version */}
          <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-indigo-400/30">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">\u2744\uFE0F</span>
              <h3 className="text-xl font-bold text-white">Christmas / Winter Scavenger Hunt</h3>
            </div>
            <p className="text-indigo-100/80 text-sm mb-5">
              Run this in December to bring joy during a high-stress month. Same format,
              winter-themed items.
            </p>
            <div className="space-y-2.5">
              {winterItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-indigo-300 flex-shrink-0" />
                  <span className="text-indigo-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-blue-200/60 text-sm mt-8">
          Two ready-to-use versions are included in your resource folder \u2014 drop them in as-is.
        </p>
      </div>
    </section>
  );
}
