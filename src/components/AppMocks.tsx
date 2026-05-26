import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Briefcase, 
  Lock, 
  Loader2, 
  Sparkles, 
  FileDown, 
  ChevronRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { GULF_COUNTRIES, POPULAR_SERVICES } from '../data';

/* --------------------------------------------------
   A. FREE CONSULTATION BOOKING MODAL
   -------------------------------------------------- */
interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export function ConsultationModal({ isOpen, onClose, preselectedServiceId }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [countryId, setCountryId] = useState('saudi-arabia');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'medical-appointment');
  const [date, setDate] = useState('2026-05-26');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:30 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [generatedTicketNo, setGeneratedTicketNo] = useState('');

  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill out Name and WhatsApp Phone number.');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate API pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      setGeneratedTicketNo('ZEE-' + Math.floor(100000 + Math.random() * 900000));
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.92, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-lg w-full relative"
          >
        
        {/* Header bar */}
        <div className="bg-[#0b1b3d] text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div>
            <h3 className="font-display font-extrabold text-lg flex items-center gap-1.5 text-white">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>Book Visa Consultation</span>
            </h3>
            <p className="text-[11px] text-slate-300">Speak directly with a certified Gulf counselor.</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Display state */}
        {!isBooked ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name input */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">YOUR NAME *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Muhammad Ali"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-amber-400 focus:bg-white text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Phone WhatsApp number */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">WHATSAPP MOBILE *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-amber-400 focus:bg-white text-xs font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">EMAIL ADDRESS (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ali@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-amber-400 focus:bg-white text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Destination selector */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">TARGET REGION</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-amber-400 focus:bg-white text-xs text-slate-800 font-bold"
                  >
                    {GULF_COUNTRIES.map(c => (
                      <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service requested */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">SERVICE REQUIRED</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-amber-400 focus:bg-white text-xs text-slate-800 font-bold"
                  >
                    {POPULAR_SERVICES.map(s => (
                      <option key={s.id} value={s.id}>🛠️ {s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date selection */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">PREFERRED DATE *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-amber-400 focus:bg-white text-xs font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Shift preference select */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400 uppercase font-mono block">TIME SLOT</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 outline-none focus:border-amber-400 focus:bg-white text-xs text-slate-800 font-bold"
                >
                  <option value="10:00 AM - 11:30 AM">🌅 10:00 AM - 11:30 AM (morning)</option>
                  <option value="12:00 PM - 01:30 PM">☀️ 12:00 PM - 01:30 PM (lunch)</option>
                  <option value="03:00 PM - 04:30 PM">🌇 03:00 PM - 04:30 PM (afternoon)</option>
                  <option value="05:00 PM - 06:30 PM">🌃 05:00 PM - 06:30 PM (evening)</option>
                </select>
              </div>

            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-400/20 text-amber-950 rounded-xl text-[10.5px] leading-relaxed">
              ⚠️ <strong>Notice:</strong> Pre-departure slots provide general analysis. Your WhatsApp number must be active so our desk officer can call you to audit your degree spelling.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0b1b3d] hover:bg-amber-500 hover:text-blue-950 text-white font-extrabold text-xs py-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating credentials ...</span>
                </>
              ) : (
                <span>Lock Free Appointment Slot</span>
              )}
            </button>
          </form>
        ) : (
          /* SUCCESS SCREEN: Simulated official voucher receipt */
          <div className="p-6 space-y-6 text-center animate-fadeIn font-sans">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 m-auto flex items-center justify-center border-2 border-emerald-500 shadow-md">
              <Check className="w-8 h-8 font-black" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-black text-slate-800">Appointment Provisioned!</h4>
              <p className="text-xs text-slate-500">Your profile has been locked inside ZeeVisa cloud directory slots.</p>
            </div>

            {/* Simulated Printed Ticket voucher wrapper style */}
            <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl text-left text-xs divide-y divide-slate-200/80 font-mono space-y-2.5 relative">
              <div className="absolute top-0 right-0 p-2 text-[8px] bg-amber-500 text-blue-950 font-sans font-bold uppercase rounded-bl border-b border-l border-slate-200">
                LOCKED
              </div>
              
              <div className="pb-2.5">
                <span className="text-[9px] text-slate-400 font-bold block">TICKET ID</span>
                <span className="font-extrabold text-blue-950">{generatedTicketNo}</span>
              </div>

              <div className="py-2.5 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">CLIENT</span>
                  <span className="font-bold text-slate-700 truncate block">{name}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">WHATSAPP</span>
                  <span className="font-bold text-slate-700 truncate block">{phone}</span>
                </div>
              </div>

              <div className="py-2.5 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">DESTINATION</span>
                  <span className="font-bold text-slate-700 uppercase">{countryId.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">SERVICE CLASS</span>
                  <span className="font-bold text-slate-700">{serviceId.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="py-2.5 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">DATE CALENDAR</span>
                  <span className="font-bold text-slate-700">{date}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">TIME SESSION</span>
                  <span className="font-bold text-slate-700 text-[10px]">{timeSlot}</span>
                </div>
              </div>

              <div className="pt-2.5 text-center text-[9px] text-slate-400">
                🔒 Verified authentic advice. Bring your passport to the session.
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('Consultation checklist invoice (PDF) has been triggered download.');
                }}
                className="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-amber-500" />
                <span>Download Admission Receipt (PDF)</span>
              </button>

              <button
                onClick={() => {
                  setIsBooked(false);
                  setName('');
                  setPhone('');
                  onClose();
                }}
                className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer pt-1"
              >
                Done / Close Voucher
              </button>
            </div>

          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------
   B. SIMPLE REGISTER / SIGN-IN MODAL MOCK
   -------------------------------------------------- */
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.92, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-sm w-full relative"
          >
        
        {/* Header bar */}
        <div className="bg-[#0b1b3d] text-white p-5 flex justify-between items-center">
          <div>
            <h3 className="font-display font-black text-base text-white">
              {isLogin ? 'Sign-In to ZeeVisa Directory' : 'Create Expat Register'}
            </h3>
            <p className="text-[10.5px] text-indigo-200">Safely log in to save Qiwa/Dubai documents checklists.</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            
            {/* Full Name (Registration only) */}
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Expatriate Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Waseem Gondal"
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl py-2.5 pl-9 pr-3 outline-none text-xs text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Registered Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="expat@zeevisa.com"
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl py-2.5 pl-9 pr-3 outline-none text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Password Code</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl py-2.5 pl-9 pr-3 outline-none text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Action buttons */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0b1b3d] hover:bg-amber-500 hover:text-blue-950 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{isLogin ? 'Log In Securely' : 'Complete Registration'}</span>}
            </button>

            {/* Toggle logic link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10.5px] text-blue-600 font-bold hover:underline"
              >
                {isLogin ? "Need a free exporter register? Create here" : "Already holding a portal key? Log In"}
              </button>
            </div>

          </form>
        ) : (
          /* SUCCESS STATE PANEL */
          <div className="p-6 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 mx-auto rounded-full flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Welcome back to ZeeVisa!</h4>
            <p className="text-slate-500 text-xs">Simulated credentials validated successfully. Custom checklists unlocked.</p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="w-full py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs rounded-xl transition"
            >
              Dismiss Dialog
            </button>
          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------
   C. DOWNLOAD PROGRESS LOADING BAR MODAL
   -------------------------------------------------- */
interface DownloadProgressModalProps {
  isOpen: boolean;
  bookletTitle: string;
  onClose: () => void;
}

export function DownloadProgressModal({ isOpen, bookletTitle, onClose }: DownloadProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setIsCompleted(false);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsCompleted(true);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15 + 10);
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.92, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 max-w-xs w-full text-center relative font-sans"
          >
        
        <div className="pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">PDF Compiler</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
        </div>

        {!isCompleted ? (
          <div className="space-y-5 py-4">
            {/* Visual Circular spin gauge or status percentage */}
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center justify-center mx-auto text-sm font-black animate-pulse">
              {progress > 100 ? 100 : progress}%
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 text-xs truncate max-w-[240px]">
                Compiling {bookletTitle}
              </h4>
              <p className="text-[10.5px] text-slate-400">Assembling latest May 2026 checklist directives...</p>
            </div>

            {/* Horizontal progression bar */}
            <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          /* DOWNLOAD SUCCESS MESSAGE STATE */
          <div className="space-y-5 py-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full border-2 border-emerald-500 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 text-xs sm:text-[13px] tracking-tight">
                {bookletTitle} Saved!
              </h4>
              <p className="text-[10.5px] text-emerald-700 font-bold">
                ✔ 100% Secure document compilation complete
              </p>
            </div>

            <p className="text-[10.5px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-150">
              The PDF has been generated successfully and saved to your device. Review the spelling checklists before attending centers.
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#0b1b3d] hover:bg-amber-500 hover:text-blue-950 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Close Utility
            </button>
          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
