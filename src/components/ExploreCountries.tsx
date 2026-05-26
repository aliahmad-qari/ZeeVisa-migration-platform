import { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  CircleDollarSign, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  Globe,
  Compass
} from 'lucide-react';
import { GULF_COUNTRIES } from '../data';
import { CountryData } from '../types';

interface ExploreCountriesProps {
  onSelectCountry: (id: string) => void;
  onOpenConsultation: () => void;
}

export default function ExploreCountries({ onSelectCountry, onOpenConsultation }: ExploreCountriesProps) {
  const [activeTab, setActiveTab] = useState<'gulf' | 'global'>('gulf');

  const gulfCountriesList = GULF_COUNTRIES.filter(c => 
    ['saudi-arabia', 'uae', 'qatar', 'kuwait', 'bahrain', 'oman'].includes(c.id)
  );

  const globalCountriesList = GULF_COUNTRIES.filter(c => 
    ['america', 'canada', 'schengen', 'balkan-countries'].includes(c.id)
  );

  const currentList = activeTab === 'gulf' ? gulfCountriesList : globalCountriesList;

  return (
    <section className="py-12 bg-pattern-gulf" id="countries">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold mb-2">
              <Compass className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span>VISA PORTALS DIRECTORY</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1b3d] tracking-tight">
              Explore Visa & Migration Pathways
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
              Compare salary structures, required pre-departures, medical test processes, and legal rights spanning various regions.
            </p>
          </div>

          {/* Dynamic Switch Toggles between Gulf and Global destinations */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto shadow-sm">
            <button
              onClick={() => setActiveTab('gulf')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === 'gulf' ? 'bg-[#0b1b3d] text-white shadow-md' : 'text-slate-600 hover:text-[#0b1b3d]'}`}
            >
              🌴 Gulf Council (GCC)
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === 'global' ? 'bg-[#0b1b3d] text-white shadow-md' : 'text-slate-600 hover:text-[#0b1b3d]'}`}
            >
              🌐 Global & European
            </button>
          </div>
        </div>

        {/* CORE GRID: CARDS PANEL & NEED HELP SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 9 COLS: DYNAMIC COUNTRY LIST */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentList.map((country) => (
              <div 
                key={country.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden"
              >
                
                {/* Thumb Visual containing Cover Image and overlay badge */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={country.coverImage} 
                    alt={country.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle black overlay to allow text clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/10" />
                  
                  {/* Flag & Title on top of Thumbnail */}
                  <div className="absolute bottom-3.5 left-4 flex items-center gap-2">
                    <span className="text-2xl drop-shadow-md bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-white/20 select-none">
                      {country.flag}
                    </span>
                    <div>
                      <h3 className="text-white text-lg font-black tracking-tight drop-shadow">
                        {country.name}
                      </h3>
                      <p className="text-[10px] text-amber-300 font-bold tracking-widest uppercase">
                        {country.capital} • {country.nativeName || 'Visa Hub'}
                      </p>
                    </div>
                  </div>

                  {/* Salary Indicator top right tag */}
                  <div className="absolute top-3 right-3 bg-blue-900/95 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-700/50 flex items-center gap-1 shadow">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    <span>Avg {country.avgSalaryRange.split(' ')[0]} Priority</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    {/* Brief description */}
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {country.overview}
                    </p>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] font-sans">
                      <div>
                        <span className="text-slate-400 block font-semibold">CURRENCY</span>
                        <span className="font-bold text-slate-700 truncate block">{country.currency}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">LANGUAGE</span>
                        <span className="font-bold text-slate-700 truncate block">{country.language}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60 mt-1 flex justify-between items-center text-[10.5px]">
                        <span className="text-slate-500">Living Costs Rank:</span>
                        <span className={`px-2 py-0.5 rounded font-black ${
                          country.costOfLiving === 'High' ? 'bg-red-50 text-red-700' :
                          country.costOfLiving === 'Medium' ? 'bg-amber-50 text-amber-700' :
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          {country.costOfLiving}
                        </span>
                      </div>
                    </div>

                    {/* Key Popular Visas List */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included Categories & Job Options:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {country.visaCategories.map((v, i) => (
                          <span 
                            key={i} 
                            className="bg-blue-50 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100"
                          >
                            {v.type}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onSelectCountry(country.id)}
                      className="w-full bg-[#0b1b3d] hover:bg-amber-500 group-hover:bg-[#1d4ed8] text-white hover:text-white py-2.5 px-4 rounded-xl font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group-hover:shadow-md"
                    >
                      <span>Explore {country.name} Guides</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* RIGHT 3 COLS: "NEED HELP?" FLOATING STICKY BANNER */}
          <div className="lg:col-span-3">
            <div className="bg-[#0b1c3e] text-white p-5 rounded-2xl border-2 border-amber-500 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-lg pointer-events-none" />
              
              <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 mb-4">
                <HelpCircle className="w-5 h-5 animate-pulse" />
              </div>

              <h3 className="text-lg font-bold font-display leading-tight mb-2 text-white">
                Need Personal Immigration Assistance?
              </h3>
              
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Our certified visa experts, translation officers, and pre-departure medical consultants are online to assist your files.
              </p>

              <div className="space-y-3 bg-white/5 p-3 rounded-xl border border-white/10 text-xs mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold font-mono text-[10.5px]">5 Experts Online Now</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Ask us anything on GAMCA medical reports, PCC stamp approvals or Etimad slots.
                </p>
              </div>

              {/* Direct Consulting triggers and WhatsApp CTAs */}
              <div className="space-y-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 font-bold text-xs text-blue-950 rounded-lg text-center transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Chat with Expert</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-xs text-white rounded-lg text-center transition flex items-center justify-center gap-1.5 shadow"
                >
                  <span>WhatsApp Line</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
