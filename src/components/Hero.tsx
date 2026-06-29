import { Scale, CheckCircle2, ShieldCheck, Award, Star } from 'lucide-react';
import { FIRM_INFO } from '../data';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mid-blue to-dark-blue py-20 text-white lg:py-32 border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

      {/* Decorative Golden Line Frame */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero text information */}
          <div className="text-right lg:col-span-7">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-[11px] font-bold tracking-wider">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span>
              <span>خبرة قانونية عريقة بنزاهة واحترافية بالمدينة المنورة</span>
            </div>

            {/* Title */}
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl tracking-tight">
              شركة ريان قربان وشركاؤه <br/>
              <span className="text-gold font-medium">للمحاماة والاستشارات القانونية</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 font-sans text-base leading-relaxed text-slate-300 md:text-lg max-w-2xl">
              نلتزم بتقديم أدق الحلول القانونية التي تحمي مصالح عملائنا وتضمن استقرار أعمالهم في المدينة المنورة وجميع أنحاء المملكة، وفق أعلى المعايير المهنية العالمية.
            </p>

            {/* Features list */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <span>تقييمنا 5.0 نجوم على خرائط جوجل</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <span>مستشارون ومحامون مرخصون من وزارة العدل</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <span>صياغة عقود تجارية متكاملة وحصينة</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <span>التمثيل القضائي والشرعي المتميز</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gold text-dark-blue px-10 py-4 rounded-sm font-bold text-sm tracking-wide shadow-[0_10px_20px_-10px_rgba(197,160,89,0.3)] hover:bg-gold-hover transition-all active:scale-95"
              >
                احجز استشارتك الآن
              </button>
              
              <button
                onClick={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-white/20 px-10 py-4 rounded-sm font-bold text-sm hover:bg-white/5 transition-colors active:scale-95"
              >
                الملف التعريفي ومجالات الاختصاص
              </button>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative flex h-72 w-72 items-center justify-center border border-gold rotate-45 bg-gradient-to-br from-mid-blue to-dark-blue p-8 shadow-2xl shadow-gold/5 md:h-80 md:w-80 lg:h-96 lg:w-96">
              
              {/* Outer decorative accents inside rotate */}
              <div className="absolute inset-0 border border-white/5 m-3" />
              <div className="absolute inset-0 border border-gold/10 m-6" />
              
              {/* Golden corner designs */}
              <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-gold/40" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-gold/40" />
              
              {/* Scale Icon + Legal Emblem (rotated back so text is upright) */}
              <div className="relative z-10 flex flex-col items-center text-center rotate-[-45deg]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-dark-blue border border-gold/30 text-gold shadow-xl shadow-gold/10">
                  <Scale className="h-10 w-10 animate-pulse duration-3000" />
                </div>
                
                <h3 className="mt-6 font-display text-lg font-bold text-gold">العدالة والأمانة والتميز</h3>
                <p className="mt-2 font-sans text-xs text-slate-300 max-w-[200px] leading-relaxed">
                  نمثل مصالحكم بأقصى درجات المهنية والمسؤولية القانونية والشرعية
                </p>

                {/* Stars and Rating */}
                <div className="mt-5 rounded-lg bg-dark-blue/80 px-4 py-2 border border-white/10 flex items-center gap-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="font-sans text-xs font-bold text-white">5.0</span>
                  <span className="font-sans text-[10px] text-slate-400 border-r border-white/10 pr-2">خرائط جوجل</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
