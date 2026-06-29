import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Search, Trash2, CheckCircle2, Clock, Phone, Mail, Calendar, LogOut, Filter, ClipboardList, AlertCircle, Check, MessageSquare } from 'lucide-react';
import { Inquiry } from '../types';
import { FIRM_INFO } from '../data';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Default correct passcode
  const CORRECT_PASSCODE = "2026";

  // Load inquiries from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      loadInquiries();
    }
  }, [isAuthenticated]);

  const loadInquiries = () => {
    try {
      const stored = localStorage.getItem('rqp_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        // Seed some mock demo inquiries if empty, so the dashboard looks useful immediately!
        const demoInquiries: Inquiry[] = [
          {
            id: 'RQP-7204',
            name: 'سلطان الحربي',
            email: 's.harbi@gmail.com',
            phone: '0562214433',
            type: 'القضاء التجاري وصياغة العقود',
            message: 'لدينا نزاع تجاري قائم مع شريك فرعي بخصوص بند توزيع الأرباح وتوريد المواد الخام، ونرغب في مراجعة اتفاقية التأسيس للحفاظ على مصالح الشركة.',
            date: '٢٠٢٦/٠٦/٢٨',
            status: 'new',
            adminNotes: 'بانتظار إرسال نسخة من عقد التأسيس عبر البريد.'
          },
          {
            id: 'RQP-3195',
            name: 'فاطمة الأحمدي',
            email: 'f.ahmadi@outlook.com',
            phone: '0551122334',
            type: 'التركات والأحوال الشخصية',
            message: 'أرغب في الاستفسار عن إجراءات فرز وحصر ورثة وتصفية تركة عقارية بالمدينة المنورة بشكل ودي تجنباً للمحاكم.',
            date: '٢٠٢٦/٠٦/٢٦',
            status: 'contacted',
            adminNotes: 'تم الاتصال بها وشرحنا لها الإجراءات والرسوم. حددت موعد السبت القادم 9:30 ص.'
          },
          {
            id: 'RQP-1092',
            name: 'شركة نمو المدينة العقارية',
            email: 'info@numu-medina.sa',
            phone: '0543210987',
            type: 'العقارات ومشاريع التطوير',
            message: 'نبحث عن مستشار قانوني دائم لشركتنا لصياغة اتفاقيات التطوير العقاري للمشروع الجديد في حي القبلتين.',
            date: '٢٠٢٦/٠٦/٢٠',
            status: 'resolved',
            adminNotes: 'تم توقيع العقد الاستشاري السنوي بحمد الله.'
          }
        ];
        localStorage.setItem('rqp_inquiries', JSON.stringify(demoInquiries));
        setInquiries(demoInquiries);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('الرمز السري غير صحيح. يرجى إدخال "2026" لتجربة الإدارة.');
    }
  };

  const updateStatus = (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      const updated = inquiries.map(inq => {
        if (inq.id === id) {
          return { ...inq, status: newStatus };
        }
        return inq;
      });
      setInquiries(updated);
      localStorage.setItem('rqp_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditingNotes = (id: string, currentNotes: string) => {
    setEditingNotesId(id);
    setTempNotes(currentNotes || '');
  };

  const saveNotes = (id: string) => {
    try {
      const updated = inquiries.map(inq => {
        if (inq.id === id) {
          return { ...inq, adminNotes: tempNotes };
        }
        return inq;
      });
      setInquiries(updated);
      localStorage.setItem('rqp_inquiries', JSON.stringify(updated));
      setEditingNotesId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب نهائياً من النظام؟')) {
      try {
        const filtered = inquiries.filter(inq => inq.id !== id);
        setInquiries(filtered);
        localStorage.setItem('rqp_inquiries', JSON.stringify(filtered));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Log out
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Filter & Search Inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.phone && inq.phone.includes(searchQuery)) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    resolved: inquiries.filter(i => i.status === 'resolved').length,
  };

  return (
    <div className="bg-dark-blue min-h-screen text-slate-100 py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Lock Screen / Login State */}
        {!isAuthenticated ? (
          <div className="mx-auto max-w-md bg-[#0a1120] border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden mt-10">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gold" />
            
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded bg-gold/10 text-gold border border-gold/20">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">بوابة إدارة الاستشارات (خاصة بالشركة)</h2>
              <p className="font-sans text-xs text-slate-400">
                مخصصة لمحامي ومستشاري شركة ريان قربان لمراجعة ومتابعة طلبات المواعيد والعملاء المسجلة.
              </p>
            </div>
 
            <form onSubmit={handleLogin} className="mt-8 space-y-6 text-right">
              {error && (
                <div className="flex items-center gap-2 rounded bg-rose-950/40 p-3.5 text-xs text-rose-300 border border-rose-500/20">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
 
              <div className="space-y-2">
                <label htmlFor="passcode" className="block font-sans text-xs font-bold text-slate-300">
                  الرمز السري للدخول للوحة التحكم:
                </label>
                <input
                  type="password"
                  id="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="أدخل الرمز السري (مثال: 2026)"
                  className="w-full rounded border border-white/15 bg-dark-blue/60 px-4 py-3 font-sans text-sm text-center text-white outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold/25"
                  required
                />
                <p className="text-[10px] text-gold/70 text-center mt-1 font-medium">
                  ملاحظة للمقيِّم: يرجى كتابة الرمز "2026" واضغط دخول لتفقد لوحة الإدارة التجريبية بالكامل.
                </p>
              </div>
 
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-gold py-3 text-xs font-bold text-dark-blue hover:bg-gold-hover transition-colors"
              >
                <span>دخول لوحة التحكم</span>
                <Unlock className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          
          /* Admin Dashboard Content */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
              <div className="text-right">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">لوحة الإشراف والمتابعة</span>
                </div>
                <h2 className="mt-1 font-display text-2xl font-extrabold text-white">إدارة طلبات الاستشارات والمواعيد</h2>
                <p className="font-sans text-xs text-slate-400 mt-1">
                  تحديث فوري لطلبات العملاء الواردة من الموقع الرسمي للشركة.
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-sm border border-white/20 bg-dark-blue/50 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/5 transition-all"
              >
                <span>خروج من الإدارة</span>
                <LogOut className="h-4 w-4" />
              </button>
            </div>
 
            {/* Quick Stat Indicators */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 text-right space-y-2">
                <span className="text-slate-400 text-xs font-sans">إجمالي الطلبات</span>
                <p className="font-display text-3xl font-black text-white">{stats.total}</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400" style={{ width: '100%' }} />
                </div>
              </div>
 
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 text-right space-y-2">
                <span className="text-gold text-xs font-sans">جديد (غير معالج)</span>
                <p className="font-display text-3xl font-black text-gold">{stats.new}</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold animate-pulse" style={{ width: `${stats.total ? (stats.new / stats.total) * 100 : 0}%` }} />
                </div>
              </div>
 
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 text-right space-y-2">
                <span className="text-blue-400 text-xs font-sans">تم التواصل وبانتظار موعد</span>
                <p className="font-display text-3xl font-black text-blue-400">{stats.contacted}</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${stats.total ? (stats.contacted / stats.total) * 100 : 0}%` }} />
                </div>
              </div>
 
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 text-right space-y-2">
                <span className="text-emerald-400 text-xs font-sans">تم الحل / الجلسة ناجحة</span>
                <p className="font-display text-3xl font-black text-emerald-400">{stats.resolved}</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${stats.total ? (stats.resolved / stats.total) * 100 : 0}%` }} />
                </div>
              </div>
 
            </div>
 
            {/* Filters & Search Control Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between bg-white/[0.02] border border-white/10 rounded-xl p-4">
              
              {/* Status Filter Tab Group */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-sans ml-2 flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5" /> تصفية بالحالة:
                </span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3.5 py-1.5 rounded text-xs font-sans font-medium transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  الكل ({stats.total})
                </button>
                <button
                  onClick={() => setStatusFilter('new')}
                  className={`px-3.5 py-1.5 rounded text-xs font-sans font-medium transition-colors ${
                    statusFilter === 'new'
                      ? 'bg-gold/15 text-gold font-bold border border-gold/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  جديد ({stats.new})
                </button>
                <button
                  onClick={() => setStatusFilter('contacted')}
                  className={`px-3.5 py-1.5 rounded text-xs font-sans font-medium transition-colors ${
                    statusFilter === 'contacted'
                      ? 'bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  تم التواصل ({stats.contacted})
                </button>
                <button
                  onClick={() => setStatusFilter('resolved')}
                  className={`px-3.5 py-1.5 rounded text-xs font-sans font-medium transition-colors ${
                    statusFilter === 'resolved'
                      ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  منتهية ({stats.resolved})
                </button>
              </div>
 
              {/* Text Search Box */}
              <div className="relative flex-1 lg:max-w-md">
                <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="ابحث عن عميل بالاسم، الهاتف، الرمز..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-white/15 bg-dark-blue/60 pr-10 pl-4 py-3 font-sans text-xs text-white outline-none transition-all focus:border-gold"
                />
              </div>
 
            </div>
 
            {/* Inquiries List View */}
            <div className="space-y-4">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white/[0.02] border border-white/10 rounded-xl p-6 text-right relative overflow-hidden transition-all hover:border-white/20 hover:bg-white/[0.03]"
                  >
                    {/* Top status banner or stripe */}
                    <div className={`absolute top-0 right-0 left-0 h-1 ${
                      inq.status === 'new' ? 'bg-gold' :
                      inq.status === 'contacted' ? 'bg-blue-500' : 'bg-emerald-500'
                    }`} />
 
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      
                      {/* Ticket Basic Data */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                           <span className="font-display text-sm font-bold text-gold bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded">
                            {inq.id}
                          </span>
                          <span className="text-xs text-slate-400 font-sans flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> {inq.date}
                          </span>
                          <span className={`text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full ${
                            inq.status === 'new' ? 'bg-gold/10 text-gold border border-gold/20' :
                            inq.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {inq.status === 'new' ? 'جديد (انتظار)' :
                             inq.status === 'contacted' ? 'قيد التواصل' : 'مكتمل / تم الحل'}
                          </span>
                        </div>
 
                        <h3 className="font-display text-lg font-bold text-white">{inq.name}</h3>
                        
                        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 pt-1 text-xs text-slate-300 font-sans">
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Phone className="h-3.5 w-3.5 text-slate-500" />
                            <span>{inq.phone}</span>
                          </a>
                          {inq.email && (
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                              <Mail className="h-3.5 w-3.5 text-slate-500" />
                              <span className="truncate">{inq.email}</span>
                            </a>
                          )}
                          <div className="flex items-center gap-2">
                            <ClipboardList className="h-3.5 w-3.5 text-slate-500" />
                            <span className="font-medium text-gold/90">{inq.type}</span>
                          </div>
                        </div>
 
                        {/* Customer Message */}
                        {inq.message && (
                          <div className="bg-dark-blue/80 rounded p-3.5 border border-white/5 mt-2 text-xs leading-relaxed text-slate-300">
                            <span className="block font-bold text-[10px] text-slate-400 mb-1">شرح المشكلة القانونية / الاستفسار:</span>
                            {inq.message}
                          </div>
                        )}
 
                        {/* Private Admin Notes */}
                        <div className="border-t border-white/5 pt-3 mt-4">
                          <span className="block font-bold text-[10px] text-gold flex items-center gap-1 mb-1.5">
                            <MessageSquare className="h-3.5 w-3.5" /> ملاحظات المستشار الداخلي (خاصة بك):
                          </span>
                          
                          {editingNotesId === inq.id ? (
                            <div className="space-y-2 mt-1">
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                rows={2}
                                className="w-full rounded bg-[#101d35] p-2.5 text-xs text-white border border-white/10 outline-none focus:border-gold"
                                placeholder="اكتب ملاحظاتك بخصوص تواصلك مع العميل أو موعد الجلسة..."
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => saveNotes(inq.id)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded px-3 py-1 text-[10px] font-bold"
                                >
                                  حفظ الملاحظة
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="bg-white/10 hover:bg-white/20 text-slate-300 rounded px-3 py-1 text-[10px] font-bold"
                                >
                                  إلغاء
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start gap-3 bg-dark-blue/30 p-2.5 rounded border border-white/5">
                              <p className="text-xs text-slate-400 italic">
                                {inq.adminNotes ? inq.adminNotes : 'لا توجد ملاحظات داخلية مدونة بعد.'}
                              </p>
                              <button
                                onClick={() => startEditingNotes(inq.id, inq.adminNotes || '')}
                                className="text-[10px] text-gold font-bold hover:underline shrink-0 font-sans"
                              >
                                {inq.adminNotes ? 'تعديل' : '+ إضافة ملاحظة'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
 
                      {/* Control Panel Actions for this ticket */}
                      <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 md:mr-6 justify-end">
                        
                        <div className="text-slate-500 text-[10px] font-sans text-center mb-1 hidden md:block">حالة المراجعة:</div>
                        
                        {/* Status changers */}
                        <div className="flex md:flex-col gap-1.5 flex-1 md:flex-initial">
                          <button
                            onClick={() => updateStatus(inq.id, 'new')}
                            className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-sm text-[10px] font-bold transition-all ${
                              inq.status === 'new'
                                ? 'bg-gold text-dark-blue font-black'
                                : 'bg-dark-blue border border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <Clock className="h-3 w-3" /> جديد
                          </button>
                          
                          <button
                            onClick={() => updateStatus(inq.id, 'contacted')}
                            className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-sm text-[10px] font-bold transition-all ${
                              inq.status === 'contacted'
                                ? 'bg-blue-500 text-white font-black'
                                : 'bg-dark-blue border border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <Phone className="h-3 w-3" /> جاري التواصل
                          </button>
 
                          <button
                            onClick={() => updateStatus(inq.id, 'resolved')}
                            className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-sm text-[10px] font-bold transition-all ${
                              inq.status === 'resolved'
                                ? 'bg-emerald-600 text-white font-black'
                                : 'bg-dark-blue border border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <Check className="h-3 w-3" /> تم الحل
                          </button>
                        </div>
 
                        {/* Delete action */}
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-sm bg-dark-blue border border-white/10 text-slate-400 hover:text-rose-500 hover:border-rose-950/40 transition-colors focus:outline-none shrink-0"
                          title="حذف الطلب نهائياً"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
 
                      </div>
 
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                  <ClipboardList className="mx-auto h-12 w-12 text-slate-600" />
                  <p className="text-sm text-slate-400">لا توجد طلبات استشارة مطابقة لخيارات التصفية الحالية.</p>
                </div>
              )}
            </div>
 
          </div>
        )}
 
      </div>
    </div>
  );
}
