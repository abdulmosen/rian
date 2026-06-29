import { useState } from 'react';
import { Briefcase, Building2, Users, Home, Scale, FileCheck, HelpCircle, ChevronLeft, ArrowLeftRight, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

// Safe dynamic Lucide Icon resolver
export function LegalIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    case 'FileCheck':
      return <FileCheck className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
}

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function Services({ onSelectServiceForBooking }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="bg-dark-blue py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">مجالات الاختصاص</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl leading-tight">
            خدماتنا القانونية والاستشارية المتكاملة
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-slate-300 leading-relaxed">
            نقدم حزمة شاملة من الخدمات القانونية والشرعية المصممة خصيصاً لتلبية احتياجات قطاع الأعمال والشركات الناشئة بالإضافة لقضايا الأفراد ومشاريعهم الاستثمارية بالمدينة المنورة.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-gold rounded" />
        </div>

        {/* Grid of Service Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:bg-white/[0.05]"
            >
              {/* Highlight bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-gold/0 to-transparent group-hover:via-gold transition-all duration-300" />
              
              {/* Icon Container */}
              <div className="flex h-12 w-12 items-center justify-center rounded bg-dark-blue border border-gold/25 text-gold shadow-md transition-all group-hover:bg-gold group-hover:text-dark-blue">
                <LegalIcon name={service.iconName} className="h-6 w-6" />
              </div>

              {/* Title & Short Desc */}
              <h3 className="mt-6 font-display text-lg font-bold text-white group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="mt-3 font-sans text-xs leading-relaxed text-slate-400">
                {service.description}
              </p>

              {/* Specialties preview (first two items) */}
              <ul className="mt-6 space-y-2 border-t border-white/5 pt-4">
                {service.keySpecialties.slice(0, 2).map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                    <Check className="h-3 w-3 text-gold shrink-0 mt-0.5" />
                    <span className="truncate">{spec}</span>
                  </li>
                ))}
              </ul>

              {/* "Read more" interaction indicator */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>عرض تفاصيل الاختصاص</span>
                <ChevronLeft className="h-4 w-4 transform -translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Expansion Modal (Drawer-style details) */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-blue/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-mid-blue text-white shadow-2xl animate-in zoom-in-95 duration-250"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Colored top header block */}
              <div className="bg-[#0a1120] px-6 py-8 border-b border-white/10 relative">
                <div className="absolute top-4 left-4">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                    aria-label="إغلاق النافذة"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gold text-dark-blue shadow-md">
                    <LegalIcon name={selectedService.iconName} className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-gold">مجال اختصاص قانوني</span>
                    <h4 className="font-display text-xl font-bold mt-0.5">{selectedService.title}</h4>
                  </div>
                </div>
              </div>

              {/* Detailed information body */}
              <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-right">
                <div>
                  <h5 className="font-display text-sm font-bold text-white mb-2">عن هذا الاختصاص</h5>
                  <p className="font-sans text-sm leading-relaxed text-slate-300">
                    {selectedService.detailedDescription}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h5 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-gold" />
                    أبرز ركائز الخدمة والتمثيل فيه:
                  </h5>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selectedService.keySpecialties.map((specialty, index) => (
                      <li key={index} className="flex items-start gap-2.5 rounded bg-dark-blue/50 p-3 border border-white/5">
                        <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-slate-300 font-medium leading-relaxed">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal action bar */}
              <div className="border-t border-white/10 bg-[#0a1120] px-6 py-4 flex flex-col sm:flex-row-reverse justify-between gap-3">
                <button
                  onClick={() => {
                    onSelectServiceForBooking(selectedService.title);
                    setSelectedService(null);
                  }}
                  className="rounded-sm bg-gold px-6 py-2.5 font-sans text-xs font-bold text-dark-blue shadow-md hover:bg-gold-hover transition-colors"
                >
                  طلب خدمة أو حجز استشارة
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="rounded-sm border border-white/20 px-5 py-2.5 font-sans text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors"
                >
                  إغلاق التفاصيل
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
