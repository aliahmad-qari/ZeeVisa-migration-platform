import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

interface FAQAndAccordionProps {
  onOpenConsultation: () => void;
}

export default function FAQAndAccordion({ onOpenConsultation }: FAQAndAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 bg-white" id="faqs">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* HEADER BLOCK */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 text-xs px-3 py-1 rounded-full font-bold mb-3 border border-blue-100">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>EXPERT LEGAL FRAMEWORK CLEARANCE FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1b3d] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-2">
            Get instant solutions regarding border controls, document attestation fees, and medical center slots.
          </p>
        </div>

        {/* ACCORDION CONTAINER */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`bg-slate-50 border rounded-2xl transition-all duration-300 ${
                  isOpen ? 'border-amber-400 bg-white shadow-lg' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                {/* Header button click */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-4.5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-slate-800 text-xs sm:text-[13.5px] leading-snug">
                    {faq.question}
                  </span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-[#0b1b3d] text-white' : 'bg-slate-200 text-slate-600'
                  } transition`}>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Body paragraph content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-[11px] sm:text-xs leading-relaxed border-t border-slate-100 animate-slideDown">
                    <p className="p-3 bg-blue-50/50 rounded-xl border-l-4 border-blue-600 text-slate-700">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM WHATSAPP CALL OUT */}
        <div className="mt-10 p-5 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl text-center relative overflow-hidden border border-amber-400/40 shadow-xl">
          <div className="absolute inset-0 bg-radial from-transparent to-black/15 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h4 className="text-sm sm:text-base font-bold font-display text-amber-400">
              Have a Specific Doubt on medical status or Degree Embassy checks?
            </h4>
            <p className="text-slate-300 text-[11px] sm:text-xs">
              Every profile is distinct. Avoid visa cancellation risks with a 5-minute pre-departure consulting review with our experts.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="bg-amber-500 hover:bg-amber-600 text-blue-950 px-5 py-2.5 rounded-xl font-bold text-xs transition-transform hover:scale-105 cursor-pointer"
              >
                Request Free Call Support
              </button>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2.5 rounded-xl font-bold text-xs text-white transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Ask on WhatsApp Desktop</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
