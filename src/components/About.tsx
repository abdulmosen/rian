import { Award, Shield, Target, Quote, CheckCircle2 } from 'lucide-react';
import { FIRM_INFO } from '../data';

export default function About() {
  const statCards = [
    { label: "تقييم العملاء", value: "5.0 / 5.0", desc: "على محرك بحث جوجل" },
    { label: "نسبة النجاح والتسوية", value: "+95%", desc: "في القضايا والنزاعات الودية" },
    { label: "التراخيص المهنية", value: "معتمد", desc: "من وزارة العدل السعودية" },
    { label: "الخبرة القانونية", value: "سنوات ممتدة", desc: "في مختلف الأنظمة واللوائح" },
  ];

  return (
    <div className="bg-dark-blue py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">نبذة عن الشركة</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl leading-tight">
            ريادة قانونية مستندة على النزاهة والخبرة
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-gold rounded" />
        </div>

        {/* Detailed Description */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Text block */}
          <div className="space-y-6 lg:col-span-7 text-right">
            <h3 className="font-display text-2xl font-bold text-white">
              شركة ريان قربان وشركاؤه للمحاماة والاستشارات القانونية
            </h3>
            
            <p className="font-sans text-base leading-relaxed text-slate-300">
              {FIRM_INFO.aboutDetailed}
            </p>
            
            <p className="font-sans text-base leading-relaxed text-slate-300">
              إننا نؤمن بأن المحاماة ليست مجرد مهنة للترافع، بل هي رسالة سامية لحماية الحقوق وبناء ركائز الأمن والاستقرار التعاقدي لقطاع الأعمال والأفراد. لذلك، نحرص في جميع أعمالنا على بذل العناية القصوى وتقديم الخدمة بمهنية تامة تلبي وتتجاوز تطلوات عملائنا.
            </p>

            {/* Quote block */}
            <div className="relative rounded-xl border-r-4 border-gold bg-gold/5 p-6 mt-8">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-gold/10 transform -scale-x-100" />
              <p className="font-sans text-sm italic font-medium text-slate-200 leading-relaxed">
                "تتمثل رسالتنا في تمكين قطاع الأعمال وحماية الأفراد عبر تقديم استشارات نظامية استباقية وحلول شرعية متكاملة تحمي مصالحهم وتضمن نموهم بأمان."
              </p>
              <span className="mt-3 block font-display text-xs font-bold text-gold">الأستاذ ريان قربان — المحامي والمستشار القانوني</span>
            </div>
          </div>

          {/* Visual card or illustration with stats */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-gold/5">
              {/* Corner accent decorations */}
              <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-gold/30" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-gold/30" />
              
              <h4 className="font-display text-lg font-bold text-white mb-6">أرقام ومؤشرات الثقة</h4>
              
              <div className="grid grid-cols-2 gap-6">
                {statCards.map((stat, index) => (
                  <div key={index} className="text-right p-4 rounded-xl bg-dark-blue/50 border border-white/5">
                    <p className="font-sans text-xs text-slate-400">{stat.label}</p>
                    <p className="font-display text-xl font-extrabold text-gold mt-1">{stat.value}</p>
                    <p className="font-sans text-[10px] text-slate-500 mt-0.5">{stat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/5 pt-6">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-gold shrink-0" />
                  <div>
                    <h5 className="font-display text-sm font-bold text-white">عضوية الهيئة السعودية للمحامين</h5>
                    <p className="font-sans text-xs text-slate-400 mt-0.5">مسجلون ومرخصون لممارسة المهنة بصفة رسمية وموثوقة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Vision & Values section */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Vision Card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-md">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded bg-gold/10 text-gold mb-6 border border-gold/20">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">رؤيتنا الاستراتيجية</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-slate-300">
                {FIRM_INFO.vision} نحن نسعى للريادة القانونية عبر تبسيط المفاهيم المعقدة وتقديم الدعم الكامل بكفاءة تلبي تطلعات رؤية المملكة ٢٠٣٠ في تيسير قطاع الاستثمار والتجارة.
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-md">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded bg-gold/10 text-gold mb-6 border border-gold/20">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">رسالتنا المهنية</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-slate-300">
                تقديم خدمات وحلول قانونية شاملة ومتكاملة تجمع بين الأصالة الشرعية والدقة القانونية الحديثة، لحفظ مصالح عملائنا والارتقاء بوعيهم الوقائي لتفادي كافة العقبات أو الأخطاء النظامية الممكنة.
              </p>
            </div>

          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="font-display text-xl font-bold text-white">القيم التي نوجه بها أعمالنا</h3>
            <p className="font-sans text-xs text-slate-400 mt-1">المبادئ الثابتة التي تحكم علاقتنا بالعملاء وتسيّر ملفاتنا القضائية</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FIRM_INFO.values.map((value, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gold/10 text-gold mb-4 border border-gold/20">
                  <Shield className="h-5 w-5" />
                </div>
                <h4 className="font-display text-base font-bold text-white">{value.title}</h4>
                <p className="mt-2 font-sans text-xs leading-relaxed text-slate-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
