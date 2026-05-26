import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, Globe } from 'lucide-react';

interface FooterProps {
  onSelectCountry: (id: string | null) => void;
  setActiveSection: (sec: string) => void;
}

export default function Footer({ onSelectCountry, setActiveSection }: FooterProps) {
  
  const handleCountryFooterClick = (id: string) => {
    onSelectCountry(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sec: string) => {
    onSelectCountry(null);
    setActiveSection(sec);
    const element = document.getElementById(sec);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#07132c] text-[#cbd5e1] font-sans pt-12 border-t-8 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
        
        {/* COL 1: BRAND LOGO & MOTTO (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectCountry(null)}>
            {/* Visual Vector Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg flex items-center justify-center border border-amber-500/40 relative">
              <span className="text-amber-400 text-sm">🌍</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl text-white tracking-tight">
                ZEEVISA <span className="text-[10px] bg-amber-500 text-blue-950 px-1 py-0.2 rounded font-sans shrink-0 uppercase font-black">Global</span>
              </span>
              <span className="text-[8px] tracking-wider text-slate-400 uppercase">Your Journey, Our Guidance</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            ZeeVisa Global is Pakistan's premium independent immigration directory & visa assistance framework. We deliver authenticated pre-departure guidance, slot booking triggers, medical fitting advice, and career tools to assure seamless passage.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 text-slate-400 pt-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold pr-2 font-mono">FOLLOW US:</span>
            {['Facebook', 'YouTube', 'TikTok', 'Instagram'].map((s, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="text-xs text-slate-300 hover:text-amber-400 transition"
              >
                {s.substring(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* COL 2: QUICK DIRECTORY SEC (2.5 Cols) */}
        <div className="lg:col-span-2.5 space-y-3">
          <h4 className="font-display font-extrabold text-sm text-white tracking-wide border-b border-slate-800 pb-2">
            Quick Directories
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {[
              { id: 'saudi-arabia', label: 'Saudi Arabia 🇸🇦' },
              { id: 'uae', label: 'United Arab Emirates 🇦🇪' },
              { id: 'qatar', label: 'Qatar 🇶🇦' },
              { id: 'kuwait', label: 'Kuwait 🇰🇼' },
              { id: 'bahrain', label: 'Bahrain 🇧🇭' },
              { id: 'oman', label: 'Oman 🇴🇲' }
            ].map((c) => (
              <li key={c.id}>
                <button 
                  onClick={() => handleCountryFooterClick(c.id)}
                  className="hover:text-amber-400 hover:translate-x-0.5 transition cursor-pointer text-left"
                >
                  {c.label} Visa Guide
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3: UTILITY SERVICES MENU (2.5 Cols) */}
        <div className="lg:col-span-2.5 space-y-3">
          <h4 className="font-display font-extrabold text-sm text-white tracking-wide border-b border-slate-800 pb-2">
            Utility Services
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {[
              { label: 'GAMCA Medical Booking', sec: 'services' },
              { label: 'Etimad Biometrics Guidance', sec: 'services' },
              { label: 'Degree Attestation Check', sec: 'services' },
              { label: 'Certified Legal Translations', sec: 'services' },
              { label: 'ATS-Compliant CV Engineering', sec: 'services' },
              { label: 'Gulf Driving License Guide', sec: 'countries' }
            ].map((s, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleSectionClick(s.sec)}
                  className="hover:text-amber-400 hover:translate-x-0.5 transition cursor-pointer text-left"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4: OFFICE COORDINATES (3 Cols) */}
        <div className="lg:col-span-3 space-y-3.5 text-xs text-slate-400">
          <h4 className="font-display font-extrabold text-sm text-white tracking-wide border-b border-slate-800 pb-2">
            Office Coordinates
          </h4>
          
          <ul className="space-y-3">
            <li className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Office # 12, 3rd Floor, Business Center, Lahore, Pakistan</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>+92 340 4872390 / +92 300 5408167</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>gulfjobs300@gmail.com</span>
            </li>
          </ul>

          <div className="pt-3 border-t border-slate-800">
            <a 
              href="https://wa.me/923404872390" 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition text-center shadow"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>Chat live on WhatsAppDesk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Trust factors band */}
      <div className="bg-[#040c1c] border-t border-slate-900 py-3 text-slate-400 text-[11px] font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-1">🔒 Secure and Private Information Encoding</span>
          <span className="flex items-center gap-1">✔ 100% Certified Ministry Guidelines</span>
          <span className="flex items-center gap-1">🛡️ Anti-corruption Vetting Assurance</span>
          <span className="flex items-center gap-1">⏰ 24/7 Verified Customer Support Desk</span>
        </div>
      </div>

      {/* COPYRIGHT SUMMARY */}
      <div className="bg-slate-950 font-sans text-center py-5 text-slate-500 text-[10px] border-t border-slate-900 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            © 2026 ZeeVisa Global. All Rights Reserved. Not affiliated directly with sovereign Gulf governments or the Ministry of Overseas Pakistanis.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500 transition">Terms of Service</a>
            <a href="#" className="hover:text-amber-500 transition">Legal Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
