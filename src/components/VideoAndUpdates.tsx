import { useState } from 'react';
import { 
  Play, 
  Calendar, 
  FileDown, 
  ChevronRight, 
  Star, 
  User, 
  FileText,
  Video,
  Clock,
  ArrowRight,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LATEST_VIDEO_TUTORIALS, LATEST_UPDATES, TESTIMONIALS } from '../data';
import { VideoTutorial, UpdateNews, Testimonial } from '../types';

interface VideoAndUpdatesProps {
  onDownloadGuide: (title: string) => void;
  onOpenConsultation: () => void;
}

export default function VideoAndUpdates({ onDownloadGuide, onOpenConsultation }: VideoAndUpdatesProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [newsFilter, setNewsFilter] = useState<'All' | 'Rules' | 'Visa' | 'Medical'>('All');

  const filteredNews = newsFilter === 'All' 
    ? LATEST_UPDATES 
    : LATEST_UPDATES.filter(n => n.category === newsFilter);

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100" id="videos">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ROW 1: LATEST VIDEO TUTORIALS */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 pb-3 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 text-xs px-2.5 py-0.5 rounded-full font-bold mb-1">
                <Video className="w-3 h-3 text-rose-600" />
                <span>VIDEO ACADEMY</span>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0b1b3d] tracking-tight">
                Latest video Tutorials in Urdu
              </h3>
              <p className="text-xs text-slate-500">
                Visual steps to secure tokens, medical slips & pass biometric appointments without agent mistakes.
              </p>
            </div>
            
            <button 
              onClick={onOpenConsultation}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
            >
              <span>Explore YouTube Channel</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LATEST_VIDEO_TUTORIALS.map((video) => (
              <div 
                key={video.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-md p-3 group overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail containing play button wrapper overlay */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center cursor-pointer">
                  {activeVideoId === video.id ? (
                    /* Embedded high resolution static simulation or dynamic notice */
                    <div className="absolute inset-0 bg-[#06142e] flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white mb-2 animate-pulse">
                        <Play className="w-5 h-5 fill-white" />
                      </div>
                      <span className="text-white text-xs font-mono font-bold">LIVESTREAM SIMULATED</span>
                      <p className="text-[10px] text-slate-400 mt-1">Our video content begins streaming on YouTube. Check our main channel.</p>
                      <button 
                        onClick={() => setActiveVideoId(null)} 
                        className="text-[9px] text-[#fbbf24] mt-2 underline"
                      >
                        Reset Thumbnail
                      </button>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500 opacity-80"
                      />
                      {/* Black layout */}
                      <div className="absolute inset-0 bg-slate-950/25" />
                      {/* Central Play Trigger Indicator Button matching ZeeVisa style */}
                      <button 
                        onClick={() => setActiveVideoId(video.id)}
                        className="absolute w-12 h-12 rounded-full bg-amber-500 text-blue-950 flex items-center justify-center hover:bg-white hover:text-blue-900 hover:scale-110 shadow-lg border-2 border-white transition-all duration-200 cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </>
                  )}

                  {/* Duration Badge Bottom Right */}
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-slate-300" />
                    <span>{video.duration} Mins</span>
                  </div>

                  {/* Category Indicator Top Left */}
                  <div className="absolute top-2.5 left-2.5 bg-blue-900/90 text-amber-300 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {video.category} Guide
                  </div>
                </div>

                {/* Video Info Blocks */}
                <div className="mt-4 px-1.5 pb-1 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block">
                    {video.views} • 100% Free Advice
                  </span>
                  
                  {/* Bilingual representation */}
                  <h4 className="text-slate-800 font-bold text-xs sm:text-[13px] tracking-tight leading-tight group-hover:text-blue-700 transition">
                    {video.title}
                  </h4>
                  
                  {/* Urdu sub title in Urdu font */}
                  <p className="text-emerald-700 text-sm font-bold font-sans">
                    {video.urduTitle}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: NEWS UPDATES, TESTIMONIALS, DOWNLOADS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-2" id="news">
          
          {/* A. LATEST IMMIGRATION NEWS (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-800">
                  Latest Immigration Updates
                </h3>
                <p className="text-xs text-slate-500">Live feed on rules and visa process changes.</p>
              </div>
              <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-100 animate-pulse">
                Live May 2026
              </span>
            </div>

            {/* News items list */}
            <div className="space-y-4">
              {filteredNews.map((news) => (
                <div 
                  key={news.id}
                  className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {news.date}
                    </span>
                    
                    {/* Status lights representing urgent updates */}
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                      news.status === 'New' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      news.status === 'Important' ? 'bg-red-50 text-red-700 border border-red-100 animate-pulse' :
                      'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      ● {news.status}
                    </span>
                  </div>

                  <h4 className="text-[13px] font-bold text-slate-800">{news.title}</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{news.summary}</p>
                  
                  <button 
                    onClick={onOpenConsultation}
                    className="text-[10.5px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 pt-1.5 cursor-pointer"
                  >
                    <span>Read Complete Regulation Notice</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* B. TESTIMONIALS: WHAT PEOPLE SAY (Col 4) */}
          <div className="lg:col-span-4 space-y-4" id="testimonials">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold font-display text-slate-800">
                What People Say
              </h3>
              <p className="text-xs text-slate-500">Feedback from our authentic clients.</p>
            </div>

            {/* Testimonial slider / core stack box */}
            <div className="space-y-4">
              {TESTIMONIALS.map((test) => (
                <div 
                  key={test.id}
                  className="bg-[#0b1b3d] text-[#e2e8f0] rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4 relative"
                >
                  {/* Quote decoration icon */}
                  <div className="absolute top-4 right-4 text-amber-500/20">
                    <Quote className="w-10 h-10" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{test.quote}"
                  </p>

                  <div className="flex items-center gap-3 border-t border-slate-800 pt-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 border border-amber-500/55 flex-shrink-0">
                      <img 
                        src={test.avatarUrl} 
                        alt={test.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white tracking-wide">{test.name}</h5>
                      <p className="text-[10px] text-amber-400 font-mono">{test.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. FREE DOWNLOADS PANEL (Col 3) - Matching mock */}
          <div className="lg:col-span-3 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold font-display text-slate-800">
                Free Downloads
              </h3>
              <p className="text-xs text-slate-500">Official checklists & templates.</p>
            </div>

            {/* Interactive Download box */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4.5 shadow-lg space-y-3.5">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-900 border border-amber-400/30 text-[11px] font-sans flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Save passport and visa fee checks with these official PDFs. All free!</span>
              </div>

              <div className="space-y-2">
                {[
                  { title: 'Document Checklist (PDF)', desc: 'Pre-flight papers', icon: 'CheckCircle2' },
                  { title: 'Medical Test Guide (PDF)', desc: 'GAMCA clearance tricks', icon: 'CheckCircle2' },
                  { title: 'Gulf Interview Tips (PDF)', desc: 'Sponsorship qna list', icon: 'CheckCircle2' }
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => onDownloadGuide(doc.title)}
                    className="w-full justify-between items-center bg-slate-50 hover:bg-amber-50 hover:border-amber-400 rounded-xl p-3.5 border border-slate-100 flex gap-3 transition cursor-pointer text-left group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-blue-950 transition">
                        <FileText className="w-4 h-4 text-current" />
                      </div>
                      <div className="truncate">
                        <h5 className="font-extrabold text-xs text-slate-800 group-hover:text-amber-950 transition tracking-tight">
                          {doc.title.split(' ')[0]} {doc.title.split(' ')[1]}
                        </h5>
                        <p className="text-[10.5px] text-slate-400 font-medium">{doc.desc}</p>
                      </div>
                    </div>
                    
                    <FileDown className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-y-0.5 transition" />
                  </button>
                ))}
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full text-center text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest pt-2.5 block border-t border-slate-100 cursor-pointer"
              >
                Request Custom PDF Guides
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
