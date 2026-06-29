import { Star, ArrowLeftCircle, CheckCircle, Scale, Shield, Award, Users } from 'lucide-react';
import { SERVICES, REVIEWS, FIRM_INFO } from '../data';
import { LegalIcon } from './Services';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  setPreSelectedServiceType: (serviceType: string) => void;
}

export default function HomeView({ setCurrentPage, setPreSelectedServiceType }: HomeViewProps) {
  
  // Choose 3 services to feature on the homepage preview
  const featuredServices = SERVICES.slice(0, 3);

  const handleServiceClick = (serviceTitle: string) => {
    setPreSelectedServiceType(serviceTitle);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const keyCredentials = [
    { icon: <Shield className="h-5 w-5 text-gold" />, title: "تمثيل وحماية حصينة", desc: "ندافع عن مصالح عملائنا بوعي تام وحماية استباقية" },
    { icon: <Award className="h-5 w-5 text-gold" />, title: "مرخصون ومعتمدون", desc: "تراخيص نظامية سارية وصادرة عن وزارة العدل السعودية" },
    { icon: <Users className="h-5 w-5 text-gold" />, title: "مستشارون متخصصون", desc: "نخبة من المحامين والشرعيين ذوي الخبرة الواسعة" },
  ];

  return (
    <div className="space-y-24 pb-20 bg-dark-blue">
      
      {/* 1. Brief About Section */}
      <section className="bg-dark-blue py-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Visual block of keys */}
            <div className="order-2 lg:order-1 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {keyCredentials.map((cred, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-right">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-gold/10 border border-gold/20">
                    {cred.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">{cred.title}</h4>
                    <p className="font-sans text-xs text-slate-400 mt-1">{cred.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Brief introductory text */}
            <div className="order-1 lg:order-2 space-y-6 text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">تأصيل وثقة قانونية</span>
              <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl leading-tight">
                شريككم القانوني بالمدينة المنورة لحماية ونمو أعمالكم
              </h2>
              <div className="h-1 w-12 bg-gold rounded" />
              
              <p className="font-sans text-sm leading-relaxed text-slate-300">
                في شركة ريان قربان وشركاؤه للمحاماة، نوفر لعملائنا ركيزة قانونية متينة تعينهم على اتخاذ القرارات وحسم النزاعات بكفاءة وثقة عالية. نكرّس خبرتنا المتراكمة في صياغة العقود التجارية، وإيجاد الحلول القضائية الفعّالة، وتقديم الرأي النظامي السديد.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 font-sans text-sm font-bold text-gold hover:text-gold-hover group transition-colors"
                >
                  <span>اقرأ المزيد عن قيمنا ورؤيتنا</span>
                  <ArrowLeftCircle className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Specialties Preview */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">أبرز مجالاتنا</span>
          <h2 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">مجالات اختصاص نتميز بها</h2>
          <div className="mx-auto mt-4 h-1 w-12 bg-gold rounded" />
        </div>

        {/* Featured 3 services */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, idx) => (
            <div
              key={service.id}
              className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-gold/30 transition-all overflow-hidden"
            >
              {/* Large ambient index background */}
              <div className="absolute -right-4 -bottom-4 text-white/[0.02] group-hover:text-gold/[0.04] text-7xl font-serif select-none transition-colors">
                0{idx + 1}
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded bg-gold/10 border border-gold/20 text-gold">
                <LegalIcon name={service.iconName} className="h-5 w-5" />
              </div>
              
              <h3 className="mt-5 font-display text-base font-bold text-white">{service.title}</h3>
              <p className="mt-2 font-sans text-xs text-slate-400 leading-relaxed line-clamp-2">
                {service.description}
              </p>
              
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <button
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-sans text-[11px] font-bold text-slate-400 hover:text-gold transition-colors"
                >
                  تفاصيل الخدمة
                </button>
                <button
                  onClick={() => handleServiceClick(service.title)}
                  className="rounded-sm bg-gold/10 border border-gold/20 px-3 py-1.5 font-sans text-[11px] font-bold text-gold hover:bg-gold hover:text-dark-blue transition-all"
                >
                  احجز استشارة
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setCurrentPage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-sm border border-white/20 bg-mid-blue/50 px-6 py-3.5 font-sans text-xs font-bold text-white hover:bg-white/5 transition-colors"
          >
            عرض كافة الخدمات والتخصصات القانونية الستة
          </button>
        </div>
      </section>

      {/* 3. Client Google Reviews Section */}
      <section className="bg-mid-blue/40 text-white py-16 relative overflow-hidden border-t border-b border-white/5">
        <div className="absolute top-1/2 right-1/4 -z-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1 text-xs font-bold text-gold border border-gold/15">
              <Star className="h-3.5 w-3.5 fill-current text-gold" />
              <span>تقييمنا 5.0 نجوم على خرائط جوجل</span>
            </div>
            
            <h2 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">ماذا يقول عملاؤنا عنا؟</h2>
            <p className="font-sans text-xs text-slate-400 mt-2">نعتز بثقتكم ونلتزم ببذل أقصى العناية لتقديم أرقى الخدمات النظامية والشرعية</p>
            <div className="mx-auto mt-4 h-1 w-12 bg-gold rounded" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="rounded-xl border border-white/10 bg-dark-blue/80 p-6 text-right space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="font-sans text-xs leading-relaxed text-slate-300 italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                  <span className="font-display text-xs font-bold text-white">{rev.author}</span>
                  <span className="font-mono text-[10px] text-slate-500">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-sans text-xs text-slate-500">
              تقييمات موثقة ومستخرجة من حسابنا الرسمي على خرائط جوجل بالمدينة المنورة.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Strategic Brief Bottom Quote Call to Action */}
      <section className="mx-auto max-w-4xl px-4 md:px-6 text-center space-y-6">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
          هل تواجه تحدياً قانونياً أو ترغب بحماية أعمالك؟
        </h2>
        
        <p className="font-sans text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
          لا تتردد في طلب المشورة المهنية. يضمن مستشارونا لك تقييماً صريحاً ودقيقاً لموقفك النظامي، متبوعاً بحلول شرعية وقانونية فاعلة.
        </p>

        <div>
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gold text-dark-blue px-10 py-4 rounded-sm font-bold text-sm tracking-wide shadow-[0_10px_20px_-10px_rgba(197,160,89,0.3)] hover:bg-gold-hover transition-all"
          >
            احجز استشارتك الآن ومباشرة
          </button>
        </div>
      </section>

    </div>
  );
}
