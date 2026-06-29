import { Scale, Phone, MapPin, Clock, Lock, ArrowUpRight } from 'lucide-react';
import { FIRM_INFO } from '../data';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  currentPage: string;
}

export default function Footer({ setCurrentPage, currentPage }: FooterProps) {
  const quickLinks = [
    { id: 'home', label: 'الصفحة الرئيسية' },
    { id: 'about', label: 'نبذة عن الشركة (من نحن)' },
    { id: 'services', label: 'الخدمات ومجالات الاختصاص' },
    { id: 'contact', label: 'اتصل بنا وحجز موعد استشارة' },
  ];

  const handleLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      {/* Absolute gold top highlight border */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-slate-900">
          
          {/* Column 1: Firm Bio & Brand */}
          <div className="space-y-4 lg:col-span-5 text-right">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  {FIRM_INFO.name}
                </h4>
                <p className="font-sans text-[10px] text-amber-500/80">
                  للمحاماة والاستشارات القانونية
                </p>
              </div>
            </div>
            
            <p className="font-sans text-xs leading-relaxed text-slate-400 max-w-md">
              نحن نقدم الدعم والتمثيل القانوني المتكامل لعملائنا في المدينة المنورة ومختلف مناطق المملكة بأعلى معايير الأمانة، الدقة والمثابرة المهنية.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`tel:${FIRM_INFO.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/30 px-3.5 py-2 text-xs font-bold text-white transition-all"
              >
                <Phone className="h-3.5 w-3.5 text-amber-500" />
                <span>اتصل بنا</span>
              </a>
              
              <a
                href={`https://wa.me/${FIRM_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/30 px-3.5 py-2 text-xs font-bold text-white transition-all"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>راسلنا واتساب</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 lg:col-span-3 text-right">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`hover:text-amber-400 transition-colors focus:outline-none ${
                      currentPage === link.id ? 'text-amber-500 font-bold' : ''
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Working Hours */}
          <div className="space-y-4 lg:col-span-4 text-right">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">بيانات الاتصال والمقر</h4>
            
            <ul className="space-y-3 text-xs">
              <li className="flex gap-2 items-start justify-start">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{FIRM_INFO.address}</span>
              </li>
              <li className="flex gap-2 items-start justify-start">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>أوقات العمل: {FIRM_INFO.workingHours}</span>
              </li>
              <li className="flex gap-2 items-start justify-start">
                <Scale className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>الرمز البريدي / Plus Code: {FIRM_INFO.plusCode}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Private Portal Login Key */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <p className="font-sans text-slate-500 text-center md:text-right">
              &copy; {new Date().getFullYear()} {FIRM_INFO.name}. جميع الحقوق محفوظة ومحمية.
            </p>
          </div>

          {/* Discrete Portal Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('admin')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-sans font-medium transition-all focus:outline-none ${
                currentPage === 'admin'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                  : 'bg-slate-900/30 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
              }`}
            >
              <Lock className="h-3 w-3" />
              <span>بوابة الإدارة الإلكترونية</span>
              <ArrowUpRight className="h-2.5 w-2.5 opacity-50" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
