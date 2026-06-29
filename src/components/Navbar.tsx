import { useState } from 'react';
import { Menu, X, Phone, Scale } from 'lucide-react';
import { FIRM_INFO } from '../data';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'الخدمات ومجالات الاختصاص' },
    { id: 'contact', label: 'اتصل بنا وحجز المواعيد' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-blue/90 text-white backdrop-blur-md">
      {/* Mini top bar with phone & working hours */}
      <div className="hidden border-b border-white/10 bg-dark-blue/95 px-4 py-2 text-xs text-slate-400 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              أوقات العمل: {FIRM_INFO.workingHours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${FIRM_INFO.phone}`} className="flex items-center gap-1 hover:text-gold transition-colors">
              <Phone className="h-3 w-3 text-gold" />
              <span>{FIRM_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-right focus:outline-none group"
        >
          <div className="flex h-11 w-11 items-center justify-center border border-gold rotate-45 bg-gradient-to-br from-mid-blue to-dark-blue text-gold shadow-lg shadow-gold/5 group-hover:border-gold-hover transition-all duration-300">
            <div className="rotate-[-45deg]">
              <Scale className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-tight text-white md:text-base">
              ريان قربان <span className="text-gold font-light">وشركاؤه</span>
            </h1>
            <p className="font-sans text-[9px] text-gold uppercase tracking-[0.1em] mt-0.5 font-medium">
              للمحاماة والاستشارات القانونية
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setCurrentPage(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`font-sans text-xs font-medium transition-all relative py-1 focus:outline-none ${
                    currentPage === item.id
                      ? 'text-gold font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-white/10"></div>

          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-sm bg-gold px-5 py-2.5 text-xs font-bold text-dark-blue shadow-md shadow-gold/10 transition-all hover:bg-gold-hover active:scale-95"
          >
            احجز استشارتك الآن
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-sm bg-gold px-3 py-1.5 text-xs font-bold text-dark-blue transition-colors hover:bg-gold-hover"
          >
            احجز استشارتك
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-mid-blue/50 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-dark-blue py-4 shadow-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-1 px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex w-full rounded-lg px-4 py-2.5 font-sans text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-gold/10 text-gold font-semibold border-r-4 border-gold'
                      : 'text-slate-300 hover:bg-mid-blue/30 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="mt-2 border-t border-white/10 pt-2 text-center text-[11px] text-slate-500">
              أوقات العمل: {FIRM_INFO.workingHours}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
