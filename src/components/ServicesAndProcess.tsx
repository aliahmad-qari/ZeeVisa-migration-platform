import { useState } from 'react';
import { 
  HeartPulse, 
  BadgeCheck, 
  ShieldAlert, 
  Fingerprint, 
  Languages, 
  FileText, 
  Briefcase, 
  Ticket,
  ChevronRight,
  Sparkles,
  Award,
  BookOpen,
  HelpCircle,
  Clock,
  Coins
} from 'lucide-react';
import { POPULAR_SERVICES } from '../data';

// Component icon loader map
const iconMap: { [key: string]: any } = {
  HeartPulse: HeartPulse,
  BadgeCheck: BadgeCheck,
  ShieldAlert: ShieldAlert,
  Fingerprint: Fingerprint,
  Languages: Languages,
  FileText: FileText,
  Briefcase: Briefcase,
  Ticket: Ticket
};

interface ServicesAndProcessProps {
  onServiceSelect: (serviceId: string) => void;
  onOpenConsultation: () => void;
}

export default function ServicesAndProcess({ onServiceSelect, onOpenConsultation }: ServicesAndProcessProps) {
  const [selectedRoadmapStep, setSelectedRoadmapStep] = useState<number>(3);

  const stepsList = [
    { step: 1, title: 'Passport', subtitle: 'Step 01', icon: 'FileText', desc: 'Secure high validity passport book', detail: 'Spelling validation against academic degree folders.' },
    { step: 2, title: 'Documents', subtitle: 'Step 02', icon: 'BadgeCheck', desc: 'MOFA and culture certifications', detail: 'HEC degree attestations, translation folders stamped.' },
    { step: 3, title: 'Medical', subtitle: 'Step 03', icon: 'HeartPulse', desc: 'Wafid GAMCA certified fitness screening', detail: 'Physical body check matching lungs and blood samples.' },
    { step: 4, title: 'Biometrics', subtitle: 'Step 04', icon: 'Fingerprint', desc: 'Etimad / VFS global screening', detail: 'Ten digital finger prints and electronic portrait scans.' },
    { step: 5, title: 'Visa', subtitle: 'Step 05', icon: 'Award', desc: 'Employer portal approval processing', detail: 'Visa is registered and printed via MOFA / MOI cloud platforms.' },
    { step: 6, title: 'Travel', subtitle: 'Step 06', icon: 'Ticket', desc: 'Flight, layout & border stamp', detail: 'Landing checklist issued prior to flying to Gulf airspace.' },
    { step: 7, title: 'Residence', subtitle: 'Step 07', icon: 'Briefcase', desc: 'Secure Iqama ID card upon arrival', detail: 'Valid for opening cards, physical renting & bank items.' },
  ];

  return (
    <section className="py-12 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* TOP DIVIDER HEADER */}
        <div id="process" className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full font-bold mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>EXPERT END-TO-END UTILITY SERVICES</span>
          </div>
          <h2 className="text-2xl md:text-3.5xl font-extrabold text-[#0b1b3d] tracking-tight">
            Our Popular Services & Roadmap
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Complete your pre-departure checklist instantly. Book medical assessments, verify state police clearance papers, and request translation services.
          </p>
        </div>

        {/* SERVICE BADGES DENSITY GRID & HORIZONTAL ROADMAP PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* POPULAR SERVICES GRID (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-display text-slate-800 flex items-center gap-2">
                <span>Popular Services</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-sans uppercase">Quick Apply</span>
              </h3>
              <button 
                onClick={onOpenConsultation}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All Services</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POPULAR_SERVICES.map((serv) => {
                const IconComp = iconMap[serv.icon] || HeartPulse;
                return (
                  <div 
                    key={serv.id}
                    onClick={() => onServiceSelect(serv.id)}
                    className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all duration-200 cursor-pointer group flex items-start gap-3.5 relative overflow-hidden"
                  >
                    {/* Golden Circle Icon badge */}
                    <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/35 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-blue-950 transition flex-shrink-0">
                      <IconComp className="w-5.5 h-5.5" />
                    </div>

                    {/* Content text */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-[13px] tracking-tight truncate max-w-[120px]">
                          {serv.name}
                        </h4>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-sans shrink-0 font-medium whitespace-nowrap">
                          {serv.urduName}
                        </span>
                      </div>
                      
                      <p className="text-slate-500 text-[10.5px] leading-relaxed line-clamp-2">
                        {serv.description}
                      </p>

                      {/* Period indicator */}
                      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3 text-emerald-500" /> {serv.estimatedDays}
                        </span>
                        <span className="flex items-center gap-0.5 font-bold text-slate-600">
                          <Coins className="w-3 h-3 text-amber-500" /> {serv.approxFee}
                        </span>
                      </div>
                    </div>

                    {/* Left dynamic gold highlight accent line */}
                    <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 group-hover:h-full transition-all duration-200" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROADMAP TIMELINE VISUAL (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-6">
            <div className="border-b border-slate-200/60 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-[#0b1b3d]">
                  Step-by-Step Roadmaps
                </h3>
                <p className="text-xs text-slate-500">
                  Comprehensive 7-step timeline from paper filing to Gulf residency codes.
                </p>
              </div>
              <span className="text-[10px] bg-[#0b1b3d] text-white font-mono px-2 py-1 rounded font-bold">
                7 Core Phases
              </span>
            </div>

            {/* Horizontal Timeline Chain - Visual Dots sequence */}
            <div className="relative py-4">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0" />
              
              {/* Dynamic Progress indicator */}
              <div 
                className="absolute top-1/2 left-4 h-1 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(selectedRoadmapStep - 1) * 16.6}%` }}
              />

              <div className="flex justify-between items-center relative z-10">
                {stepsList.map((st) => (
                  <button
                    key={st.step}
                    onClick={() => setSelectedRoadmapStep(st.step)}
                    className="flex flex-col items-center group/dot focus:outline-none cursor-pointer"
                  >
                    {/* Circle representing each milestone node */}
                    <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                      selectedRoadmapStep === st.step 
                        ? 'bg-[#0b1b3d] text-white border-amber-500 scale-110 shadow-lg' 
                        : selectedRoadmapStep > st.step 
                          ? 'bg-amber-500 text-blue-950 border-amber-600' 
                          : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}>
                      {st.step}
                    </div>
                    {/* Label below */}
                    <span className={`text-[9px] font-bold mt-1.5 transition-colors ${
                      selectedRoadmapStep === st.step ? 'text-blue-950 font-black' : 'text-slate-500'
                    }`}>
                      {st.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Node detail display card representing selected step */}
            {(() => {
              const currentStepObj = stepsList.find(s => s.step === selectedRoadmapStep);
              if (!currentStepObj) return null;
              return (
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-md space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase">
                      {currentStepObj.subtitle} • Recommended Route
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Phase Progress: {selectedRoadmapStep}/7
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[15px] font-black text-slate-800">
                      {currentStepObj.title} Checkup Sequence
                    </h4>
                    <p className="text-xs font-medium text-slate-600">
                      {currentStepObj.desc}
                    </p>
                  </div>

                  <p className="text-slate-500 text-[11px] leading-relaxed bg-slate-50 p-3 rounded-lg border-l-4 border-amber-400">
                    {currentStepObj.detail} Make sure your spelling matches with the national passport index databases before verifying details.
                  </p>

                  <div className="flex justify-end gap-2 pt-1.5">
                    <button
                      onClick={onOpenConsultation}
                      className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <span>Need Assistance with this stage?</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>

      </div>
    </section>
  );
}
