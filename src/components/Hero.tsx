import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle,
  Video,
  Award,
  Users
} from 'lucide-react';
import { GULF_COUNTRIES } from '../data';
import GulfSkylineBg from '../assets/images/gulf_skyline_hero_bg_1779707563384.png';

interface HeroProps {
  onSearch: (countryId: string, category: string) => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onSearch, onOpenConsultation }: HeroProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchWord, setSearchWord] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Auto-match query keyword (e.g., "saudi", "dubai") to actual country ID
  const matchCountry = (query: string): string => {
    const q = query.toLowerCase().trim();
    if (q.includes('saudi') || q.includes('ksa') || q.includes('riyadh') || q.includes('arabia')) return 'saudi';
    if (q.includes('uae') || q.includes('dubai') || q.includes('emirates') || q.includes('abu dhabi')) return 'uae';
    if (q.includes('qatar') || q.includes('doha')) return 'qatar';
    if (q.includes('oman') || q.includes('muscat')) return 'oman';
    if (q.includes('kuwait')) return 'kuwait';
    if (q.includes('bahrain') || q.includes('manama')) return 'bahrain';
    return '';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedCountryId = matchCountry(searchWord);
    onSearch(matchedCountryId, selectedCategory);
  };

  return (
    <section 
      className="relative overflow-hidden text-white py-14 lg:py-20 px-4 font-sans border-b-4 border-[#EAA015]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(8, 19, 43, 0.98) 40%, rgba(8, 19, 43, 0.75) 70%, rgba(8, 19, 43, 0.92) 100%), url(${GulfSkylineBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      {/* Dynamic trajectory & flying airplane illustration */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg 
          className="w-[125%] h-full absolute -top-10 -left-12 opacity-85 hidden md:block" 
          viewBox="0 0 1000 400" 
          fill="none"
        >
          {/* Subtle curved dotted track */}
          <path 
            d="M 120,290 C 260,200 420,180 580,120 C 720,60 850,110 980,80" 
            stroke="rgba(234, 160, 21, 0.45)" 
            strokeWidth="2" 
            strokeDasharray="6,7" 
            className="animate-[dash_60s_linear_infinite]"
          />
          {/* Modern airplane vector moving along direction */}
          <g transform="translate(562, 126) rotate(-22) scale(0.9)">
            <path 
              d="M3.7,14h20.6l5.2,11.5c0.2,0.5,0.7,0.8,1.2,0.8h2.3c0.8,0,1.3-0.8,0.9-1.5l-3.8-10.8h9.1l2.2,4c0.2,0.3,0.5,0.5,0.9,0.5h1.9c0.7,0,1.1-0.7,0.8-1.3l-1.9-5.1c0,0,0,0,0,0l1.9-5.1C44,6.7,43.6,6,42.9,6h-1.9c-0.4,0-0.7,0.2-0.9,0.5l-2.2,4h-9.1L30.6-0.3c0.4-0.7-0.1-1.5-0.9-1.5h-2.3c-0.5,0-1,0.3-1.2,0.8L21,11H3.7c-1.3,0-2.2,1.2-1.9,2.5C2,13.8,2.8,14,3.7,14z" 
              fill="#ffffff" 
              stroke="#0a122c" 
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: GUIDANCE MESSAGE (8 Cols) */}
        <div className="lg:col-span-8 space-y-7 pt-2">
          
          {/* Main Headings exactly corresponding to mock instructions and image */}
          <div className="space-y-4">
            <h1 className="text-3.5xl sm:text-5xl md:text-5.5xl font-extrabold tracking-tight text-white leading-[1.08]">
              Your Complete <br />
              <span className="text-[#EAA015] font-black drop-shadow-md">Gulf Visa Guidance</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-serif tracking-wide text-amber-200 italic font-semibold text-2xl sm:text-3.5xl drop-shadow">
                From Start to Success
              </span>
              <span className="text-white/60 text-lg sm:text-2xl font-sans font-bold select-none h-6 flex items-center">
                —
              </span>
              <span className="text-amber-400 text-xl sm:text-3xl font-bold tracking-wide" style={{ fontFamily: 'system-ui, sans-serif' }}>
                آپ کا سفر، ہمارا ساتھ
              </span>
            </div>
          </div>

          <p className="text-slate-200/90 text-sm sm:text-[15px] max-w-2xl leading-relaxed font-normal">
            Step-by-step visa processes, GAMCA medical appointments booking, attested degrees, biometric procedures, popular jobs, salary listings, and local life guides inside Gulf countries – all in one place.
          </p>

          {/* MASTER SEARCH SYSTEM BAR */}
          <motion.form 
            onSubmit={handleSearchSubmit}
            animate={{
              maxWidth: isFocused ? "49.5rem" : "48rem", // 48rem represents max-w-3xl, expanding slightly to 49.5rem
              boxShadow: isFocused 
                ? "0 25px 60px -10px rgba(234, 160, 21, 0.35), 0 0 15px rgba(234, 160, 21, 0.2)" 
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: isFocused ? "rgba(234, 160, 21, 0.8)" : "rgba(226, 232, 240, 0.8)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col sm:flex-row items-center w-full bg-white rounded-xl overflow-hidden border p-1.5 gap-1.5"
          >
            {/* Input fields query search */}
            <div className="relative flex-1 w-full pl-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search Country, Visa Type or Service..."
                className="w-full bg-transparent text-slate-800 text-[13.5px] font-medium py-3 pl-10 pr-3 outline-none placeholder-slate-400"
              />
            </div>
            
            {/* Dropdown Select wrapper styled similarly to image with deep background */}
            <div className="w-full sm:w-auto min-w-[160px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-[#0a1835] hover:bg-[#0c214c] text-white text-[12.5px] font-bold py-3.5 px-5 outline-none transition cursor-pointer text-center sm:text-left rounded-lg appearance-none border border-white/5"
              >
                <option value="All Categories" className="text-white">All Categories</option>
                <option value="Work Visa" className="text-white">Work Visa</option>
                <option value="Family Visa" className="text-white">Family Visa</option>
                <option value="Visit Visa" className="text-white">Visit Visa</option>
                <option value="Business Visa" className="text-white">Business Visa</option>
              </select>
            </div>
            
            {/* Accent Gold Search Button */}
            <button 
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#EAA015] hover:bg-[#d68f12] text-slate-950 font-black text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25 active:scale-95 cursor-pointer flex-shrink-0"
            >
              <span>Search</span>
              <Search className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </motion.form>

          {/* HORIZONTAL TRUST BADGES STRIP (Under search, exactly matching image elements) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-200/90 pt-1">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#EAA015]" />
              <span className="font-semibold text-[11px] sm:text-xs">100% Accurate Information</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
              <Award className="w-4 h-4 text-[#EAA015]" />
              <span className="font-semibold text-[11px] sm:text-xs">Step-by-Step Guidance</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
              <Video className="w-4 h-4 text-[#EAA015]" />
              <span className="font-semibold text-[11px] sm:text-xs">Video Tutorials in Urdu</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
              <HelpCircle className="w-4 h-4 text-[#EAA015]" />
              <span className="font-semibold text-[11px] sm:text-xs">Expert Support 24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
              <Users className="w-4 h-4 text-[#EAA015]" />
              <span className="font-semibold text-[11px] sm:text-xs">Trusted by Thousands</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: WHY CHOOSE ZEEVISA WHITE CARD WITH GREEN WHATSAPP CTA */}
        <div className="lg:col-span-4 self-center pt-4 lg:pt-0 z-10">
          <div className="bg-white rounded-2xl p-6 shadow-2xl relative border border-slate-100/95 max-w-sm mx-auto">
            
            {/* Header section with decorative crown/accent tag */}
            <div className="text-center pb-4 mb-4 border-b border-slate-100 flex flex-col items-center justify-center">
              {/* Gold mini crown vector */}
              <svg className="w-5 h-5 text-[#EAA015] mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 22h20v-2H2v2zm1-3h18v-3l-3.5-2 1.5-6.5L12 11 5 7.5 6.5 14 3 16v3z"/>
              </svg>
              <h3 className="text-slate-900 font-extrabold text-[15.5px] sm:text-[17px] tracking-tight">
                Why Choose ZeeVisa?
              </h3>
            </div>

            {/* List items with gold circled indicators */}
            <ul className="space-y-3 text-slate-700">
              {[
                'Step-by-Step Process',
                '100% Authentic Information',
                'Appointment Assistance',
                'Jobs & Life in Gulf',
                'Expert Guidance',
                '24/7 WhatsApp Support'
              ].map((reasonText, idx) => (
                <li key={idx} className="flex gap-3 items-center">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EAA015]/10 border border-[#EAA015]/40 flex items-center justify-center text-[#EAA015] font-extrabold text-[10.5px]">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-[12.5px] text-slate-800 leading-tight">
                    {reasonText}
                  </span>
                </li>
              ))}
            </ul>

            {/* Vibrant Green WhatsApp Button block matching reference image */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#12b34c] hover:bg-[#10a144] rounded-xl font-black text-[13px] text-center text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transform hover:scale-[1.01] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                {/* Chat bubble icon inside green CTA */}
                <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10c0 1.9.5 3.4 1.4 4.9l-.9 3.4 3.5-.9zM16.5 13.5c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.8-.9-2.4-.3-.6-.6-.5-.9-.5H7.5c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.5 4 1.7 4.3c.2.2 2.9 4.5 7.1 6.3 1 .4 1.8.7 2.4.9 1 .3 2 .3 2.7.2.8-.1 2.5-1 2.8-2 .3-1 .3-1.9.2-2.1-.2-.2-.5-.3-.8-.4z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-center text-[9.5px] font-semibold text-slate-400 mt-2 tracking-wide font-mono">
                ⚡ Typical response time under 5 minutes
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Elegant fade to transparent gradient block at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}

