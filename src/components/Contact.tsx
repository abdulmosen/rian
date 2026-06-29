import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';
import { FIRM_INFO, CONSULTATION_TYPES } from '../data';
import { Inquiry } from '../types';

interface ContactProps {
  preSelectedServiceType?: string;
  onSubmissionSuccess?: () => void;
}

export default function Contact({ preSelectedServiceType, onSubmissionSuccess }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: preSelectedServiceType || '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [error, setError] = useState('');

  // Update selected service type if preSelectedServiceType changes
  useEffect(() => {
    if (preSelectedServiceType) {
      setFormData(prev => ({ ...prev, type: preSelectedServiceType }));
    }
  }, [preSelectedServiceType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('يرجى إدخال الاسم الكريم.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('يرجى إدخال رقم الهاتف للتواصل.');
      return;
    }
    if (!formData.type) {
      setError('يرجى تحديد نوع الاستشارة المطلوبة.');
      return;
    }

    // Generate random code for consultation tracking
    const codeNum = Math.floor(10000 + Math.random() * 90000);
    const code = `RQP-${codeNum}`;
    setBookingCode(code);

    const newInquiry: Inquiry = {
      id: code,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: formData.type,
      message: formData.message,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'new'
    };

    try {
      // Retrieve existing inquiries
      const stored = localStorage.getItem('rqp_inquiries');
      const inquiries: Inquiry[] = stored ? JSON.parse(stored) : [];
      
      // Add new one
      inquiries.unshift(newInquiry);
      localStorage.setItem('rqp_inquiries', JSON.stringify(inquiries));

      setIsSubmitted(true);
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.');
    }
  };

  // Pre-fill whatsapp link
  const getWhatsappLink = () => {
    const text = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،\nشركة ريان قربان وشركاؤه للمحاماة،\nلقد قمت بإرسال طلب استشارة عبر الموقع برمز رقم (${bookingCode})، الاسم: ${formData.name}، نوع الاستشارة: ${formData.type}. أود تأكيد موعد الاستشارة واستكمال الإجراءات.`
    );
    return `https://wa.me/${FIRM_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div className="bg-dark-blue py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">تواصل معنا</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl leading-tight">
            احجز استشارتك القانونية الآن
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-slate-300 leading-relaxed">
            يسعدنا استقبال طلباتكم واستفساراتكم القانونية. يرجى تعبئة النموذج أدناه بدقة وسيقوم أحد مستشارينا بالتواصل معكم في أقرب وقت ممكن.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-gold rounded" />
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Right Column: Contact/Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-gold/5 md:p-8">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 text-right">
                  <h3 className="font-display text-lg font-bold text-white pb-3 border-b border-white/5">
                    نموذج طلب موعد واستشارة قانونية
                  </h3>

                  {error && (
                    <div className="flex items-center gap-2 rounded bg-rose-950/40 p-4 text-xs font-medium text-rose-300 border border-rose-500/20">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-sans text-xs font-bold text-slate-300">
                        الاسم الكريم <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="مثال: ريان الحربي"
                        className="w-full rounded border border-white/15 bg-dark-blue/60 px-4 py-3 font-sans text-sm text-white outline-none transition-all focus:border-gold focus:bg-dark-blue focus:ring-2 focus:ring-gold/10"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-sans text-xs font-bold text-slate-300">
                        رقم الهاتف للتواصل <span className="text-gold">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="مثال: 0553224020"
                        dir="ltr"
                        className="w-full rounded border border-white/15 bg-dark-blue/60 px-4 py-3 font-sans text-sm text-white outline-none text-right transition-all focus:border-gold focus:bg-dark-blue focus:ring-2 focus:ring-gold/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-sans text-xs font-bold text-slate-300">
                        البريد الإلكتروني <span className="text-slate-500">(اختياري)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        dir="ltr"
                        className="w-full rounded border border-white/15 bg-dark-blue/60 px-4 py-3 font-sans text-sm text-white outline-none text-right transition-all focus:border-gold focus:bg-dark-blue focus:ring-2 focus:ring-gold/10"
                      />
                    </div>

                    {/* Consultation Type */}
                    <div className="space-y-2">
                      <label htmlFor="type" className="block font-sans text-xs font-bold text-slate-300">
                        مجال الاستشارة <span className="text-gold">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full rounded border border-white/15 bg-[#101d35] px-4 py-3 font-sans text-sm text-white outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/10 appearance-none"
                        required
                      >
                        <option value="" disabled className="bg-dark-blue">-- يرجى اختيار نوع الاستشارة --</option>
                        {CONSULTATION_TYPES.map(type => (
                          <option key={type.value} value={type.label} className="bg-dark-blue">{type.label}</option>
                        ))}
                        <option value="قضايا أخرى" className="bg-dark-blue">موضوعات أو قضايا أخرى</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-sans text-xs font-bold text-slate-300">
                      تفاصيل إضافية / نبذة عن القضية <span className="text-slate-500">(اختياري)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="يرجى كتابة نبذة موجزة عن الموضوع القانوني المراد بحثه..."
                      className="w-full rounded border border-white/15 bg-dark-blue/60 px-4 py-3 font-sans text-sm text-white outline-none transition-all focus:border-gold focus:bg-dark-blue focus:ring-2 focus:ring-gold/10"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-gold py-4 font-sans text-sm font-bold text-dark-blue shadow-lg hover:bg-gold-hover transition-all active:scale-98"
                  >
                    <span>إرسال طلب الاستشارة وحفظه</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                /* Success Screen */
                <div className="py-8 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white">تم تسجيل طلبكم بنجاح</h3>
                    <p className="font-sans text-sm text-slate-300 max-w-md mx-auto">
                      شكراً لتواصلك مع شركة ريان قربان وشركاؤه. تم حفظ طلبك وإصدار رمز تتبع خاص باستشارتك.
                    </p>
                  </div>

                  {/* Booking tracking ticket */}
                  <div className="mx-auto max-w-sm rounded-xl border border-gold/30 bg-gold/5 p-6 text-right space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-gold text-dark-blue font-mono text-[10px] font-bold px-3 py-1 rounded-br-lg">تذكرة طلب</div>
                    <div>
                      <span className="font-sans text-[10px] text-slate-400">رمز الاستشارة:</span>
                      <p className="font-display text-lg font-black text-gold">{bookingCode}</p>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-slate-400">الاسم الكريم:</span>
                      <p className="font-sans text-sm font-bold text-white">{formData.name}</p>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-slate-400">نوع الاستشارة:</span>
                      <p className="font-sans text-xs text-slate-300 font-medium">{formData.type}</p>
                    </div>
                  </div>

                  {/* Actions for User */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={getWhatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-sm bg-emerald-600 px-6 py-3.5 font-sans text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/10"
                    >
                      <span>تأكيد الحجز فورياً عبر الواتساب</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          type: '',
                          message: ''
                        });
                      }}
                      className="rounded-sm border border-white/20 bg-transparent px-6 py-3.5 font-sans text-xs font-bold text-white hover:bg-white/5 transition-all"
                    >
                      حجز استشارة جديدة
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Left Column: Direct contact info & Interactive Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-md text-right space-y-5">
              <h3 className="font-display text-base font-bold text-white border-b border-white/5 pb-2">بيانات التواصل المباشر</h3>
              
              <div className="space-y-4">
                
                {/* Phone Call Button & Link */}
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gold/10 text-gold border border-gold/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-white">الاتصال المباشر والمستمر:</h4>
                    <p className="font-sans text-xs text-slate-400 mt-1">تواصل معنا هاتفياً للاستفسارات السريعة:</p>
                    <a href={`tel:${FIRM_INFO.phone}`} className="inline-flex items-center gap-2 font-display text-sm font-bold text-gold hover:text-gold-hover mt-1 hover:underline">
                      <span>{FIRM_INFO.phone}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gold/10 text-gold border border-gold/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-white">مقر الشركة الجغرافي:</h4>
                    <p className="font-sans text-xs text-slate-300 mt-1 font-medium">{FIRM_INFO.address}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="bg-white/5 border border-white/10 text-slate-300 rounded px-2 py-0.5 text-[10px] font-mono font-bold">Plus Code: {FIRM_INFO.plusCode}</span>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gold/10 text-gold border border-gold/20">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-white">أوقات العمل واستقبل العملاء:</h4>
                    <p className="font-sans text-xs text-slate-400 mt-1">نسعد باستقبالكم في المكتب الفعلي:</p>
                    <p className="font-sans text-xs text-slate-200 font-bold mt-1">يبدأ استقبال العملاء من الساعة 9:30 صباحاً</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Google Map Panel */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-md text-right space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="font-display text-xs font-bold text-white">الموقع على خرائط جوجل</h3>
                <a 
                  href={FIRM_INFO.googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-[10px] font-bold text-gold hover:underline"
                >
                  <span>فتح في تطبيق الخرائط</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              
              {/* Responsive Iframe Map */}
              <div className="relative overflow-hidden rounded-lg border border-white/5 h-56 bg-slate-900">
                <iframe
                  title="موقع شركة ريان قربان وشركاؤه للمحاماة"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.933221976092!2d39.5768826!3d24.4842525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15febb085532a893%3A0xe536d5be9b109e!2z2KfZhNmC2KjZhNiq2YrZhtiMINin2YTZhdiv2YrZhtmHINin2YTZhdmG2YjYsdmH!5e0!3m2!1sar!2ssa!4v1710000000000!5m2!1sar!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
