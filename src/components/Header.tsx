import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Mail, 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  MessageSquare, 
  User, 
  Globe, 
  Check, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  Briefcase,
  Video,
  Newspaper,
  Info,
  Contact,
  Search,
  Filter,
  DollarSign,
  MapPin,
  Clock,
  CircleCheck,
  Send,
  Building,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Layers,
  Award,
  ShieldCheck,
  FileText,
  Bookmark,
  ChevronRight,
  ThumbsUp,
  SlidersHorizontal,
  HelpCircle,
  Play,
  PlayCircle,
  HeartPulse
} from 'lucide-react';
import { GULF_COUNTRIES } from '../data';
import LogoImage from '../assets/images/logo.png';

interface HeaderProps {
  currentCountryId: string | null;
  onSelectCountry: (id: string | null) => void;
  onSelectVisaCategory: (countryId: string, visaType: 'Work Visa' | 'Family Visa' | 'Visit Visa' | 'Business Visa') => void;
  onOpenConsultation: () => void;
  onOpenAuth: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

// ----------------------------------------------------
// MOCK DATA SETS FOR THE DEDICATED FRONTEND PAGES
// ----------------------------------------------------

const JOBS_DATA = [
  {
    id: 'j1',
    title: 'Senior DevOps & Cloud Solutions Architect',
    company: 'Neo Riyadh Tech Corp',
    country: 'Saudi Arabia',
    countryId: 'saudi-arabia',
    flag: '🇸🇦',
    industry: 'IT',
    salaryRange: '$3500 - $5500',
    salaryMin: 3500,
    salaryMax: 5500,
    demand: 'Very High',
    visa: 'Full Visa Sponsorship + In-bound Ticket',
    experience: '5+ Years (AWS / Kubernetes)',
    type: 'Full-Time'
  },
  {
    id: 'j2',
    title: 'BIM Modeler & Structural Drafting Lead',
    company: 'Al-Masa Civil Engineering',
    country: 'UAE',
    countryId: 'uae',
    flag: '🇦🇪',
    industry: 'Engineering',
    salaryRange: '$2500 - $3800',
    salaryMin: 2500,
    salaryMax: 3800,
    demand: 'High',
    visa: 'Family Status Entry Permit Provided',
    experience: '3+ Years (Revit, Civil 3D)',
    type: 'Contract'
  },
  {
    id: 'j3',
    title: 'Civil Construction Project Supervisor',
    company: 'Doha Mega Structures S.A.O.G.',
    country: 'Qatar',
    countryId: 'qatar',
    flag: '🇶🇦',
    industry: 'Construction',
    salaryRange: '$1500 - $2200',
    salaryMin: 1500,
    salaryMax: 2200,
    demand: 'Very High',
    visa: '100% Sponsor + Covered Messing & Housing',
    experience: '4+ Years Field Supervision',
    type: 'Full-Time'
  },
  {
    id: 'j4',
    title: 'Registered General Nurse (ICU Admissions)',
    company: 'Riyadh Specialist Health Complex',
    country: 'Saudi Arabia',
    countryId: 'saudi-arabia',
    flag: '🇸🇦',
    industry: 'Healthcare',
    salaryRange: '$2200 - $3200',
    salaryMin: 2200,
    salaryMax: 3200,
    demand: 'Very High',
    visa: 'Priority Medical Visa + Yearly Paid Leaves',
    experience: '2+ Years + Clear Wafid Fit Standard',
    type: 'Full-Time'
  },
  {
    id: 'j5',
    title: 'Heavy Logistics Transport Truck Driver',
    company: 'Oman Integrated Logistics Co.',
    country: 'Oman',
    countryId: 'oman',
    flag: '🇴🇲',
    industry: 'Driving',
    salaryRange: '$800 - $1200',
    salaryMin: 800,
    salaryMax: 1200,
    demand: 'High',
    visa: 'Valid Heavy HTV License Exchange Sponsored',
    experience: '3+ Years Heavy Transport',
    type: 'Full-Time'
  },
  {
    id: 'j6',
    title: 'VIP Guest Relations & Hotel Front Desk',
    company: 'Jumeirah Luxury Resorts',
    country: 'UAE',
    countryId: 'uae',
    flag: '🇦🇪',
    industry: 'Hospitality',
    salaryRange: '$1200 - $1800',
    salaryMin: 1200,
    salaryMax: 1800,
    demand: 'High',
    visa: 'Sponsorship + Shared Premium Staff Quarters',
    experience: '1-2 Years Customer Relations',
    type: 'Full-Time'
  },
  {
    id: 'j7',
    title: 'Precision Structural Welder (SMAW/FCAW)',
    company: 'Gulf Shipyard Marine Services',
    country: 'Bahrain',
    countryId: 'bahrain',
    flag: '🇧🇭',
    industry: 'Construction',
    salaryRange: '$900 - $1400',
    salaryMin: 900,
    salaryMax: 1400,
    demand: 'High',
    visa: 'Company Sponsored Work Permit + Insurance',
    experience: '2+ Years Certified Weld Standard',
    type: 'Contract'
  },
  {
    id: 'j8',
    title: 'Senior Site Mechanical MEP Engineer',
    company: 'Al-Kharafi Systems Group',
    country: 'Kuwait',
    countryId: 'kuwait',
    flag: '🇰🇼',
    industry: 'Engineering',
    salaryRange: '$2800 - $4500',
    salaryMin: 2800,
    salaryMax: 4500,
    demand: 'Very High',
    visa: 'Sponsorship + Complete Transportation Allowance',
    experience: '5+ Years HVAC and MEP Systems',
    type: 'Full-Time'
  }
];

const NEWS_DATA = [
  {
    id: 'n1',
    category: 'Saudi Rules',
    title: 'Saudi Arabia Launches Instant Digital Iqama via Qiwa Portal',
    date: 'May 20, 2026',
    summary: 'The Ministry of Human Resources introduces a centralized cloud feature allowing employers to authorize digital residency documents in under 24 hours. Pakistan degree attested files are automatically matched.',
    readTime: '4 Min Read',
    highlight: true
  },
  {
    id: 'n2',
    category: 'UAE MOHRE',
    title: 'MOHRE UAE Standardized Digital Labor Contract Guidelines Enforced',
    date: 'May 14, 2026',
    summary: 'Dubai updates labor contract parameters. Visas will now require online sign-off from both the employee and employer matching the UAE Pass credential profiles. Check your biometric records prior.',
    readTime: '3 Min Read',
    highlight: false
  },
  {
    id: 'n3',
    category: 'Visa Pathways',
    title: 'Qatari Embassy Streamlines Metrash2 Work Visa Verification Steps',
    date: 'May 08, 2026',
    summary: 'Doha announces a streamlined verification pipeline for skilled expats. Degree folders certified by HEC and MOFA Pakistan are now validated instantly through API integration, clipping down embassy queues.',
    readTime: '5 Min Read',
    highlight: false
  },
  {
    id: 'n4',
    category: 'Travel Safety',
    title: 'Wafid / GAMCA Standardizes Lung Scan Examination Tolerances',
    date: 'April 28, 2026',
    summary: 'Medical centers in Pakistan implement new high-resolution scanning machinery. Old scars from cold infections are subject to specialized review parameters. Medical appointment pre-booking recommended.',
    readTime: '6 Min Read',
    highlight: false
  },
  {
    id: 'n5',
    category: 'Salary Updates',
    title: 'Kuwait Reopens Standard Family Visa Visas with Balanced Salary Cap',
    date: 'April 15, 2026',
    summary: 'In a progressive move, Kuwait MOHA lowers the minimum salary threshold for sponsoring family dependants. Expatriates can now apply with simplified bank statements and standard medical checks.',
    readTime: '4 Min Read',
    highlight: false
  },
  {
    id: 'n6',
    category: 'Consular News',
    title: 'Oman Introduces Multi-Entry Economic Expansion Visas for Investors',
    date: 'March 29, 2026',
    summary: 'Muscat rolls out a 5-year multi-entry residency visa for tech and engineering professionals. Sponsorship requirement is relaxed for individuals demonstrating accredited professional grade licenses.',
    readTime: '3 Min Read',
    highlight: false
  }
];

const DIRECTORY_COUNTRIES = [
  { id: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', summary: 'The economic powerhouse of the Middle East, undergoing historic modernization under Vision 2030.', pathways: 'Work Visa (Qiwa/Wafid), Family Residence, Commercial Investor', salaries: '$1,200 - $5,500/mo' },
  { id: 'uae', name: 'UAE / Dubai', flag: '🇦🇪', summary: 'The global tourism and technological hub, offering robust expat facilities and low tax rates.', pathways: 'Employment Visa (MOHRE), Golden Partner, Virtual Work Visa', salaries: '$1,500 - $7,000/mo' },
  { id: 'qatar', name: 'Qatar', flag: '🇶🇦', summary: 'An ultra-modern state boasting world-class infrastructure and premier healthcare pathways.', pathways: 'Work Sponsorship, Metrash2 Family Visa, Skilled Talents', salaries: '$1,400 - $6,000/mo' },
  { id: 'kuwait', name: 'Kuwait', flag: '🇰🇼', summary: 'A country with strong currency reserves and high-paying professional career avenues.', pathways: 'Local Corporate Sponsor, Family Reunion Visa (New Rules)', salaries: '$1,500 - $4,800/mo' },
  { id: 'bahrain', name: 'Bahrain', flag: '🇧🇭', summary: 'The liberal financial gateway with smooth, developer-friendly residency guidelines.', pathways: 'Self-Sponsorship Residency, Skilled Corporate Work Permit', salaries: '$1,100 - $3,500/mo' },
  { id: 'oman', name: 'Oman', flag: '🇴🇲', summary: 'Peaceful landscapes offering sustainable industrial and engineering careers for Pakistani citizens.', pathways: 'Employer Work Visa, Multi-Year Residence', salaries: '$1,000 - $3,000/mo' },
  { id: 'america', name: 'America / USA', flag: '🇺🇸', summary: 'The land of innovation, providing high-skilled tech visas, visitor opportunities, and family sponsorship.', pathways: 'H1-B Tech Specialty, L1 Intracompany, F1 Study, B1/B2 Visitor', salaries: '$4,000 - $12,000/mo' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', summary: 'Renowned for its progressive immigration pathways and welcoming point-based systems.', pathways: 'Express Entry (FSW/CEC), PNP Nominations, LMIA Work Visa', salaries: '$3,500 - $9,500/mo' },
  { id: 'schengen', name: 'Schengen Area', flag: '🇪🇺', summary: 'Unified European borders allowing free travel and residence across 29 participating nations.', pathways: 'National Work Permit, Blue Card EU, Schengen Tourist C-Type', salaries: '$2,500 - $6,500/mo' },
  { id: 'balkan-countries', name: 'Balkan Countries', flag: '🇧🇦', summary: 'Rising construction and logistics routes in Eastern Europe with high visa stamping speeds.', pathways: 'Schengen-adjacent Work Visas (Bosnia, Croatia, Romania)', salaries: '$900 - $2,200/mo' }
];

const VIDEOS_DATA = [
  {
    id: 'v1',
    title: 'Complete Wafid & GAMCA Portal Appointment Booking Walkthrough (2026)',
    duration: '12:45 Min',
    category: 'Medical',
    description: 'Learn how to generate your medical slip without agency charges and select approved centers in Lahore, Karachi, or Rawalpindi.',
    views: '45.2K Views'
  },
  {
    id: 'v2',
    title: 'Biometric Tenpoint Fingerprint Scanning at Etimad Center Step-by-Step',
    duration: '08:14 Min',
    category: 'Biometrics',
    description: 'What files to bring, dressing rules for physical photography, and biometric receipts needed for final embassy submission.',
    views: '32.8K Views'
  },
  {
    id: 'v3',
    title: 'How to Attest Pakistan Degrees from MOFA and HEC (Fast-track System)',
    duration: '15:30 Min',
    category: 'Documentation',
    description: 'Avoid rejection risks. This tutorial guides you through the QR-coded online attestation portal step-by-step.',
    views: '58.1K Views'
  },
  {
    id: 'v4',
    title: 'Signing Your Online Qiwa Employment Contract for Saudi Arabia Work Visas',
    duration: '09:20 Min',
    category: 'Residence',
    description: 'Analyze salary details, job roles, and notice period parameters inside the Qiwa portal before signing digitally.',
    views: '29.3K Views'
  },
  {
    id: 'v5',
    title: 'Doha Airport Arrival Guidelines & Active Metrash2 Validation Tutorial',
    duration: '06:55 Min',
    category: 'Travel',
    description: 'Essential landing cards, medical coverage plans, and immigration counters verification steps for QID seekers.',
    views: '18.9K Views'
  },
  {
    id: 'v6',
    title: 'Acquiring State Protector Stamp on Passports in Pakistan (Bureau of Emigration)',
    duration: '11:10 Min',
    category: 'Documentation',
    description: 'Complete documentation stack required including insurance slip, bank challans, and the local protector office sequence.',
    views: '24.5K Views'
  }
];

export default function Header({
  currentCountryId,
  onSelectCountry,
  onSelectVisaCategory,
  onOpenConsultation,
  onOpenAuth,
  activeSection,
  setActiveSection
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isCountriesDropdownOpen, setIsCountriesDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);

  // ----------------------------------------------------
  // REAL TIME FRONTEND ROUTER STATE
  // ----------------------------------------------------
  const [customActivePage, setCustomActivePage] = useState('home');

  // Interactive Newsletter Alerts state
  const [newsEmail, setNewsEmail] = useState('');
  const [newsWhatsappAlert, setNewsWhatsappAlert] = useState(false);
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  // About Page Process Stepper index
  const [activeProcessStep, setActiveProcessStep] = useState(1);

  // Video Page category filter
  const [activeVideoCat, setActiveVideoCat] = useState('All');

  // Visa Guides Search and filter states
  const [visaSearchQuery, setVisaSearchQuery] = useState('');
  const [visaRouteFilter, setVisaRouteFilter] = useState('All');

  // Sync state on URL pathname and popstate triggers (for routing /jobs, /news, /about, /visa-guides, /videos)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (['jobs', 'news', 'about', 'visa-guides', 'videos'].includes(path)) {
        setCustomActivePage(path);
        onSelectCountry(null); // Return from dynamic country detail
      } else {
        setCustomActivePage('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [onSelectCountry]);

  // Handle SPA relative page triggers
  const navigateTo = (page: string) => {
    setIsMobileMenuOpen(false);
    if (page === 'services') {
      setCustomActivePage('home');
      onSelectCountry(null);
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setCustomActivePage(page);
    onSelectCountry(null);
    window.history.pushState(null, '', `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dropdownCountries = [
    { id: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦' },
    { id: 'uae', name: 'UAE', flag: '🇦🇪' },
    { id: 'qatar', name: 'Qatar', flag: '🇶🇦' },
    { id: 'kuwait', name: 'Kuwait', flag: '🇰🇼' },
    { id: 'bahrain', name: 'Bahrain', flag: '🇧🇭' },
    { id: 'oman', name: 'Oman', flag: '🇴🇲' },
    { id: 'america', name: 'America / USA', flag: '🇺🇸' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦' },
    { id: 'schengen', name: 'Schengen Area', flag: '🇪🇺' },
    { id: 'balkan-countries', name: 'Balkan Countries', flag: '🇧🇦' }
  ];

  const handleCountryClick = (id: string) => {
    onSelectCountry(id);
    setCustomActivePage('home');
    setIsCountriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisaCategoryClick = (countryId: string, type: 'Work Visa' | 'Family Visa' | 'Visit Visa' | 'Business Visa') => {
    onSelectVisaCategory(countryId, type);
    setCustomActivePage('home');
    setIsCountriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.history.pushState(null, '', '/');
  };

  const handleVisaGuideExplore = (countryId: string) => {
    if (['saudi-arabia', 'uae', 'qatar'].includes(countryId)) {
      handleCountryClick(countryId);
    } else {
      onOpenConsultation();
    }
  };

  // ----------------------------------------------------
  // JOBS PAGE REACTIVE COMPUTED FILTER
  // ----------------------------------------------------
  const [jobsSearch, setJobsSearch] = useState('');
  const [jobsCountry, setJobsCountry] = useState('All');
  const [jobsIndustry, setJobsIndustry] = useState('All');
  const [jobsSalary, setJobsSalary] = useState('All');
  const [jobsType, setJobsType] = useState('All');

  const filteredJobsList = JOBS_DATA.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(jobsSearch.toLowerCase()) || 
                          j.company.toLowerCase().includes(jobsSearch.toLowerCase()) ||
                          j.industry.toLowerCase().includes(jobsSearch.toLowerCase());
    const matchesCountry = jobsCountry === 'All' || j.countryId === jobsCountry;
    const matchesIndustry = jobsIndustry === 'All' || j.industry === jobsIndustry;
    const matchesType = jobsType === 'All' || j.type === jobsType;

    let matchesSalary = true;
    if (jobsSalary !== 'All') {
      if (jobsSalary === 'Under $1000') {
        matchesSalary = j.salaryMin < 1000;
      } else if (jobsSalary === '$1000 - $2000') {
        matchesSalary = j.salaryMin >= 1000 && j.salaryMin <= 2000;
      } else if (jobsSalary === '$2000 - $4000') {
        matchesSalary = j.salaryMin >= 2000 && j.salaryMin <= 4000;
      } else if (jobsSalary === '$4000+') {
        matchesSalary = j.salaryMax > 4000;
      }
    }
    return matchesSearch && matchesCountry && matchesIndustry && matchesType && matchesSalary;
  });

  const clearJobsFilters = () => {
    setJobsSearch('');
    setJobsCountry('All');
    setJobsIndustry('All');
    setJobsSalary('All');
    setJobsType('All');
  };

  const isCustomPage = ['jobs', 'news', 'about', 'visa-guides', 'videos'].includes(customActivePage);

  // Close menus on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsCountriesDropdownOpen(false);
      setIsServicesDropdownOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ----------------------------------------------------
  // SUB-PAGES RENDERING DECLARATIONS
  // ----------------------------------------------------

  // 1. JOBS PAGE
  const renderJobsPage = () => (
    <div className="w-full bg-[#08132b] text-slate-100 font-sans space-y-16 py-12 px-4 select-none">
      {/* A. HERO SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs px-3.5 py-1 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>ACTIVE VISA SPONSORSHIP SCHEMES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Premium Global Avenues & <span className="text-amber-500">Overseas Placements</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Bypass intermediaries. Access real jobs across Saudi Arabia, UAE, Qatar, and more with integrated visa stamping assistance, HEC attested clearances, and guaranteed Wafid appointments.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 transform active:scale-95 transition"
            >
              <span>Submit Active CV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 transform active:scale-95 transition"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Specialize App via WA</span>
            </a>
          </div>
        </div>

        {/* ILLUSTRATION/STATS PANEL */}
        <div className="lg:col-span-5 relative bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl backdrop-blur-md">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            <span>Placement Market Snapshot</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
              <span className="block text-xl font-bold font-mono text-amber-400">14 Days</span>
              <span className="text-[11px] text-slate-400">Average Stamping Speed</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
              <span className="block text-xl font-bold font-mono text-blue-400">12,450+</span>
              <span className="text-[11px] text-slate-400">Pakistan Expats Sourced</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
              <span className="block text-xl font-bold font-mono text-emerald-400">320+</span>
              <span className="text-[11px] text-slate-400">Verified Gold Employers</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
              <span className="block text-xl font-bold font-mono text-amber-500">98.8%</span>
              <span className="text-[11px] text-slate-400">Legal Stamping Success</span>
            </div>
          </div>
        </div>
      </div>

      {/* B. FILTER SECTION */}
      <div className="max-w-7xl mx-auto bg-slate-900/25 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2 text-white">
            <Filter className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Interactive Overseas Filters</span>
          </h3>
          <button 
            onClick={clearJobsFilters}
            className="text-[11px] font-mono text-slate-400 hover:text-amber-500 transition cursor-pointer"
          >
            Clear Selected Filter Specs
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword search input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Filter roles or companies..."
              value={jobsSearch}
              onChange={e => setJobsSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-sans text-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
            />
          </div>

          {/* Country filter select */}
          <div>
            <select 
              value={jobsCountry}
              onChange={e => setJobsCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-sans text-slate-300 focus:outline-none focus:border-amber-500 transition"
            >
              <option value="All">All Destination States</option>
              <option value="saudi-arabia">Saudi Arabia 🇸🇦</option>
              <option value="uae">UAE / Dubai 🇦🇪</option>
              <option value="qatar">Qatar 🇶🇦</option>
              <option value="kuwait">Kuwait 🇰🇼</option>
              <option value="bahrain">Bahrain 🇧🇭</option>
              <option value="oman">Oman 🇴🇲</option>
            </select>
          </div>

          {/* Industry select filter */}
          <div>
            <select 
              value={jobsIndustry}
              onChange={e => setJobsIndustry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-sans text-slate-300 focus:outline-none focus:border-amber-500 transition"
            >
              <option value="All">All Industry Segments</option>
              <option value="Construction">Construction</option>
              <option value="IT">IT & Software</option>
              <option value="Hospitality">Hospitality & Tourism</option>
              <option value="Healthcare">Healthcare & Nursing</option>
              <option value="Driving">Driving & Logistics</option>
              <option value="Engineering">MEP Engineering</option>
            </select>
          </div>

          {/* Salary limits select */}
          <div>
            <select 
              value={jobsSalary}
              onChange={e => setJobsSalary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-sans text-slate-300 focus:outline-none focus:border-amber-500 transition"
            >
              <option value="All">All Salary Standards</option>
              <option value="Under $1000">Under $1000 / mo</option>
              <option value="$1000 - $2000">$1000 - $2000 / mo</option>
              <option value="$2000 - $4000">$2000 - $4000 / mo</option>
              <option value="$4000+">$4000+ / mo</option>
            </select>
          </div>

          {/* Contract type filter select */}
          <div>
            <select 
              value={jobsType}
              onChange={e => setJobsType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-sans text-slate-300 focus:outline-none focus:border-amber-500 transition"
            >
              <option value="All">All Engagement Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract-based</option>
            </select>
          </div>
        </div>
      </div>

      {/* C. JOB CARDS GRID */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-slate-900/10 px-4 py-2 border-l-2 border-amber-500 font-mono text-xs text-slate-400">
          <span>REAL-TIME DETECTED MATCHES: {filteredJobsList.length} CAREERS SPECIALTIES</span>
          <span>CURRENCY: USD ($) Equivalent Projections</span>
        </div>

        {filteredJobsList.length === 0 ? (
          <div className="p-16 border border-dashed border-slate-800 rounded-3xl text-center space-y-3 bg-slate-950/20">
            <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-400">No active overseas programs match your selected category filters.</p>
            <button onClick={clearJobsFilters} className="text-xs bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-lg">Reset Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobsList.map(j => (
              <div 
                key={j.id} 
                className="bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 p-5 rounded-3xl flex flex-col justify-between space-y-4 hover:translate-y-[-4px] transition-all duration-300 shadow-lg group relative"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] bg-slate-850 px-2.5 py-0.5 rounded-md border border-slate-750 font-mono text-slate-400">{j.company}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider shrink-0 ${
                      j.demand === 'Very High' ? 'bg-red-950/40 text-red-500 border border-red-900/45' : 'bg-amber-955/40 text-amber-500 border border-amber-900/45'
                    }`}>
                      {j.demand} Demand
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-100 group-hover:text-amber-500 transition line-clamp-2">
                    {j.title}
                  </h3>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-[11.5px] font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{j.flag}</span>
                      <span>Target: <span className="text-white font-semibold">{j.country}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                      <span>Estimated Wage: <span className="text-white font-bold">{j.salaryRange}</span> <span className="text-[9px] text-slate-500">/mo</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Experience: <span className="text-slate-200">{j.experience}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{j.visa}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={onOpenConsultation}
                    className="w-full bg-slate-950 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 border border-slate-800 group-hover:border-transparent py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300"
                  >
                    <span>Initiate Sponsor Application</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* D. POPULAR INDUSTRIES SECTION */}
      <div className="max-w-7xl mx-auto space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-3xl font-black text-white font-heading">Popular High-Demand Sectors</h2>
          <p className="text-xs sm:text-sm text-slate-400">Pakistan emigrant employment statistics demonstrate rapid growth pools here</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { name: 'Construction', icon: Building, jobsCount: '45 Open Roles', salary: '$900-$2,200', desc: 'Civil, Welding, Masonry' },
            { name: 'IT / Tech', icon: CodeIcon, jobsCount: '21 Open Roles', salary: '$2,500-$5,500', desc: 'DevOps, Software, Network' },
            { name: 'Hospitality', icon: Briefcase, jobsCount: '19 Open Roles', salary: '$1,000-$2,000', desc: 'VIP Concierge, Hostess' },
            { name: 'Healthcare', icon: HeartPulse, jobsCount: '14 Open Roles', salary: '$2,200-$4,500', desc: 'ICU Nurses, Radiotechnicians' },
            { name: 'Driving', icon: TruckDriverIcon, jobsCount: '32 Open Roles', salary: '$800-$1,400', desc: 'Heavy Duty Trucks, Transit' },
            { name: 'Engineering', icon: SlidersHorizontal, jobsCount: '18 Open Roles', salary: '$2,000-$4,000', desc: 'Structural BIM, Mechanical' },
          ].map((ind, iIdx) => (
            <button 
              key={iIdx}
              onClick={() => {
                const map: { [key: string]: string } = {
                  'Construction': 'Construction',
                  'IT / Tech': 'IT',
                  'Hospitality': 'Hospitality',
                  'Healthcare': 'Healthcare',
                  'Driving': 'Driving',
                  'Engineering': 'Engineering'
                };
                setJobsIndustry(map[ind.name] || 'All');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="p-4.5 bg-slate-900/25 border border-slate-800/80 hover:border-amber-500/40 text-left rounded-2xl flex flex-col justify-between space-y-2 transition-all group cursor-pointer"
            >
              <div className="p-2 bg-slate-950 rounded-xl w-fit group-hover:bg-amber-500/10 border border-slate-800 group-hover:border-amber-500/20 transition">
                <ind.icon className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <span className="block font-bold text-xs sm:text-sm text-slate-200 group-hover:text-amber-500 transition">{ind.name}</span>
                <span className="block text-[9px] text-slate-400 font-mono mt-0.5">{ind.desc}</span>
              </div>
              <div className="pt-2 border-t border-slate-850 w-full flex items-center justify-between text-[9px] text-slate-500 font-mono">
                <span>{ind.jobsCount}</span>
                <span>{ind.salary}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* E. WHATSAPP CTA SECTION */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-emerald-950/20 border border-emerald-500/20 p-6 sm:p-10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 animate-pulse">
          <MessageSquare className="w-64 h-64 text-emerald-500" />
        </div>
        <div className="space-y-2 relative z-10 text-center sm:text-left">
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
            Pakistan Attestation & Medical Assistance
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">Need Customized Advice Applying to Gulf Roles?</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Get instant assistance for visa quotas, Wafid GAMCA medical verification files, degrees stamps from MOFA and embassy listings. Standard replies within 10 minutes.
          </p>
        </div>

        <a 
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm px-6 py-4 rounded-2xl flex items-center gap-2 transform hover:scale-105 active:scale-95 transition shadow-lg shrink-0"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span>Chat on WhatsApp For Job Placement Help</span>
        </a>
      </div>
    </div>
  );

  // 2. NEWS PAGE
  const renderNewsPage = () => (
    <div className="w-full bg-[#08132b] text-slate-100 font-sans space-y-16 py-12 px-4 select-none">
      {/* A. HERO SECTION */}
      <div className="max-w-5xl mx-auto text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs px-3.5 py-1 rounded-full font-bold">
          <Newspaper className="w-3.5 h-3.5 animate-pulse" />
          <span>REAL-TIME CONSULAR FEED 2026/2027</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          Critical Gulf <span className="text-amber-500">Immigration Updates</span>  & News
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Bypassing broker rumors. Read certified directives from the Ministries of Interior and Human Resources across Gulf countries.
        </p>
      </div>

      {/* B. FEATURED NEWS CARD */}
      <div className="max-w-5xl mx-auto">
        {NEWS_DATA.filter(n => n.highlight).map(f => (
          <div 
            key={f.id}
            className="bg-gradient-to-b from-slate-900/65 to-slate-900/35 border border-amber-500/30 p-6 sm:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-2xl relative group hover:border-amber-500/50 transition duration-300"
          >
            <div className="absolute -top-3.5 left-6 bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-widest px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
              <span>Breaking Consular Update</span>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="text-amber-500 font-black tracking-wider uppercase">{f.category}</span>
                <span>•</span>
                <span>{f.date}</span>
                <span>•</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[9.5px]">{f.readTime}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-500 transition duration-200 font-heading">
                {f.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {f.summary}
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button 
                  onClick={() => alert(`Full article: "${f.title}" is officially authorized by Pakistan Embassy. Complete process files are being updated.`)}
                  className="text-xs text-amber-500 font-black flex items-center gap-1 group-hover:underline cursor-pointer"
                >
                  <span>Read Full Article Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3 font-mono text-[11px] text-slate-400">
              <span className="block font-bold text-slate-200 border-b border-slate-800 pb-1.5 uppercase tracking-wider text-[10px]">Consular Validation</span>
              <div className="flex justify-between">
                <span>Issuer State:</span>
                <span className="font-semibold text-white">Saudi Arabia MOHRE</span>
              </div>
              <div className="flex justify-between">
                <span>Verification portal:</span>
                <span className="font-semibold text-blue-400 text-right">Qiwa Portal Integrated</span>
              </div>
              <div className="flex justify-between">
                <span>Expat Clearance Status:</span>
                <span className="font-semibold text-emerald-400">Online & Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* C. NEWS GRID */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h3 className="text-lg font-bold font-mono text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-2">
          <Layers className="w-5 h-5 text-amber-500" />
          <span>Recent Embassy & Stamping Announcements</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS_DATA.filter(n => !n.highlight).map(n => (
            <div 
              key={n.id} 
              className="bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 p-5 rounded-3xl flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-500 font-black uppercase tracking-wider">{n.category}</span>
                  <span className="text-slate-500">{n.date}</span>
                </div>
                <h4 className="font-black text-slate-100 group-hover:text-amber-500 transition line-clamp-2">
                  {n.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-4">
                  {n.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">{n.readTime}</span>
                <button 
                  onClick={() => alert(`Full guidelines for: "${n.title}" are under active MOFA validation. Contact support for stamp updates.`)}
                  className="text-xs text-amber-500 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Quick Read</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* D. NEWSLETTER SUBSCRIBE SECTION */}
      <div className="max-w-4xl mx-auto bg-slate-900/40 border border-slate-800 p-6 sm:p-10 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">Subscribe to Critical Travel Alerts</h2>
            <p className="text-xs text-slate-450 leading-relaxed">
              We compile medical scan rules, sudden embassy holiday closings, and passport protector clearance details direct into short bullet guidelines.
            </p>
          </div>

          <div className="md:col-span-5 space-y-3 shrink-0">
            {newsSubscribed ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-400 font-sans text-xs flex items-center gap-2">
                <CircleCheck className="w-4 h-4 shrink-0 text-emerald-400 animate-bounce" />
                <span>Subscribed! Stamping schedules queued.</span>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); if (newsEmail) setNewsSubscribed(true); }}
                className="space-y-2.5"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address..."
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs py-2.5 pl-9 pr-4 rounded-xl text-slate-150 outline-none"
                  />
                </div>
                
                <label className="flex items-center gap-2 select-none cursor-pointer text-left">
                  <input 
                    type="checkbox" 
                    checked={newsWhatsappAlert}
                    onChange={e => setNewsWhatsappAlert(e.target.checked)}
                    className="rounded text-amber-500 accent-amber-500 bg-slate-950 border-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-450 leading-none">Send breaking alerts to my WhatsApp number option</span>
                </label>

                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                  <span>Activate Alerts</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // 3. ABOUT US PAGE
  const renderAboutPage = () => (
    <div className="w-full bg-[#08132b] text-slate-100 font-sans space-y-16 py-12 px-4 select-none">
      {/* A. HERO SECTION */}
      <div className="max-w-5xl mx-auto text-center space-y-5 pt-4">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs px-3.5 py-1 rounded-full font-sans font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>LICENSED GOVT. OF PAKISTAN ASSOCIATE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          Ensuring Transparent, <span className="text-amber-500">Sticker-Perfect</span> Immigration Avenues
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ZeeVisa Global is the premier digital consultant clearing hurdles for Pakistani professionals and workers heading overseas. Our signature technology eliminates black-market brokers.
        </p>
      </div>

      {/* B. WHO WE ARE SECTION */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/15 border border-slate-800 p-6 sm:p-10 rounded-3xl">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl sm:text-3xl font-black text-slate-100 font-heading">Our Foundational Integrity</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Overseas immigration has been plagued with unverified timelines, hidden service charges, and spurious files that crash during biometric screening at Etimad or embassy queues.
          </p>
          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
            At ZeeVisa Global, we build robust digital integrations. We connect applicants with verified Wafid medical schedules, pre-vetted Qiwa electronic labor contracts, and HEC/MOFA degree attestation tracking sheets to guarantee stress-free border crossings.
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div>
              <span className="block text-xl font-bold font-mono text-amber-500">98.8%</span>
              <span className="text-[10px] text-slate-400">Embassy Stamping Rate</span>
            </div>
            <div>
              <span className="block text-xl font-bold font-mono text-blue-400">22 Countries</span>
              <span className="text-[10px] text-slate-400">Active Access Links</span>
            </div>
            <div>
              <span className="block text-xl font-bold font-mono text-emerald-400">Zero</span>
              <span className="text-[10px] text-slate-400">Hidden Agent Charges</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative space-y-4">
          <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-3">
            <h4 className="font-bold text-xs font-mono text-slate-200">Our Pledge & Credentials</h4>
            <ul className="space-y-2 text-[11px] text-slate-400 font-sans">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Licensed Bureau of Emigration Sourced</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>MOFA Degree Clear Guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Secure Escrow Payments Protection</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Wafid/GAMCA Medical Pre-vetting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* C. OUR PROCESS TIMELINE */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-3xl font-black text-white font-heading">Our Verified 5-Step Process</h2>
          <p className="text-xs text-slate-400 font-mono">Real-time status tracking from documentation stages to airport departure stamps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            { step: 1, title: 'Consultation', tag: 'Step 01', desc: 'Pre-check visa passport, qualification alignments, and Gulf medical eligibility indexes.' },
            { step: 2, title: 'Documentation', tag: 'Step 02', desc: 'Secure MOFA degree legal stamps, localized translation papers, and Police Character certificates.' },
            { step: 3, title: 'Medical Clear', tag: 'Step 03', desc: 'Instant priority Wafid appointments booking with screening checklist verification.' },
            { step: 4, title: 'Visa Stamping', tag: 'Step 04', desc: 'VFS/Etimad biometrics uploading, agent protection stamping, and final passport entry.' },
            { step: 5, title: 'Travel Clearance', tag: 'Step 05', desc: 'State protector stamp endorsement safely acquired before flight booking.' },
          ].map((s) => (
            <button 
              key={s.step}
              onClick={() => setActiveProcessStep(s.step)}
              className={`p-5 rounded-2xl text-left border cursor-pointer transition-all duration-300 relative ${
                activeProcessStep === s.step 
                  ? 'bg-slate-900 border-amber-500 hover:border-amber-500' 
                  : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  activeProcessStep === s.step ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.tag}
                </span>
                {activeProcessStep === s.step && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
              </div>
              <h4 className="font-extrabold text-sm text-slate-100 mb-2">{s.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* D. WHY CHOOSE US SECTION (BENTO GRID) */}
      <div className="max-w-5xl mx-auto space-y-6 pt-2">
        <h3 className="text-lg font-bold font-mono text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-2">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <span>Core Trust Indicators</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/20 rounded-3xl space-y-2">
            <h4 className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider">01 / Legally Registered</h4>
            <h3 className="text-sm sm:text-base font-black text-slate-100">Ministry of Emigration Verified</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              All processing channels adhere strictly to corporate protection regulations in Pakistan. No black-market visas.
            </p>
          </div>

          <div className="p-5 bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/20 rounded-3xl space-y-2">
            <h4 className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">02 / Clear Escrow</h4>
            <h3 className="text-sm sm:text-base font-black text-slate-100">Protected Payments</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Your consultation credentials and medical slip fees are secure in transit under our protected client refund assurance.
            </p>
          </div>

          <div className="p-5 bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/20 rounded-3xl space-y-2">
            <h4 className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">03 / Biometric Security</h4>
            <h3 className="text-sm sm:text-base font-black text-slate-100">HEC / MOFA Attestations</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              We coordinate with HEC portals directly to clear and verify your transcripts before booking expensive VFS biometric slots.
            </p>
          </div>
        </div>
      </div>

      {/* E. TESTIMONIALS SECTION */}
      <div className="max-w-5xl mx-auto space-y-6 pt-2">
        <h3 className="text-lg font-bold font-mono text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-2">
          <Globe className="w-5 h-5 text-amber-500" />
          <span>Pakistan Expats Stories</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          <div className="p-5.5 bg-slate-900/35 border border-slate-800 rounded-3xl relative">
            <span className="text-4xl text-amber-500/20 absolute top-3 right-4 font-serif">“</span>
            <div className="space-y-3.5 relative z-10">
              <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
                “Applying with local agents was a nightmare, they kept charging extra for Wafid medical checks. ZeeVisa Global verified my degree attestation on day one, and guided my Qiwa contract online. I was in Riyadh in 12 days.”
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-500 text-xs border border-amber-500/30">
                  MA
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Muhammad Abbas</span>
                  <span className="block text-[10px] text-slate-400 font-mono">Senior BIM Architect, Riyadh (KSA)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5.5 bg-slate-900/35 border border-slate-800 rounded-3xl relative">
            <span className="text-4xl text-amber-500/20 absolute top-3 right-4 font-serif">“</span>
            <div className="space-y-3.5 relative z-10">
              <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
                “Excellent VFS biometrics guidance. I had a small medical scan scar on my lungs. Their checklist pre-vetted my Wafid compliance instantly. Highly recommended for Dubai visas.”
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-500 text-xs border border-amber-500/30">
                  SH
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Sakeena Hussain</span>
                  <span className="block text-[10px] text-slate-400 font-mono">Operations Lead, Dubai Healthcare City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* F. TESTIMONIALS WHATSAPP CTA */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-transparent border border-amber-500/20 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 tect-center sm:text-left">
          <h3 className="font-extrabold text-sm sm:text-base text-white">Ready to consult with a registered overseas immigration specialist?</h3>
          <p className="text-xs text-slate-400">Our physical offices are open for face-to-face folder verification in Lahore and Rawalpindi.</p>
        </div>
        <button 
          onClick={onOpenConsultation}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition shrink-0"
        >
          <span>Initiate Assessment Profile</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </button>
      </div>
    </div>
  );

  // 4. VISA GUIDES DIRECTORY PAGE
  const renderVisaGuidesPage = () => {
    const filteredVisaCountries = DIRECTORY_COUNTRIES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(visaSearchQuery.toLowerCase()) || 
                            c.summary.toLowerCase().includes(visaSearchQuery.toLowerCase()) ||
                            c.pathways.toLowerCase().includes(visaSearchQuery.toLowerCase());
      
      const matchesRoute = visaRouteFilter === 'All' || 
                           (visaRouteFilter === 'GCC' && ['saudi-arabia', 'uae', 'qatar', 'kuwait', 'bahrain', 'oman'].includes(c.id)) ||
                           (visaRouteFilter === 'Western' && ['america', 'canada', 'schengen'].includes(c.id)) ||
                           (visaRouteFilter === 'Balkans' && c.id === 'balkan-countries');
      
      return matchesSearch && matchesRoute;
    });

    return (
      <div className="w-full bg-[#08132b] text-slate-100 font-sans space-y-16 py-12 px-4 select-none animate-fadeIn">
        {/* A. HERO SECTION */}
        <div className="max-w-5xl mx-auto space-y-5 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Immigration Directories & <span className="text-amber-500">Official Visa Guides</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Explore step-by-step pathways, salary indexes, documentation lists, and biometric guidelines across popular international destination states.
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-2xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 shadow-xl">
            <div className="md:col-span-7 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search visa codes, countries (e.g. Saudi, Canada)..."
                value={visaSearchQuery}
                onChange={e => setVisaSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500 focus:outline-none text-xs py-2.5 pl-10 pr-4 rounded-xl text-slate-200 outline-none"
              />
            </div>
            <div className="md:col-span-5">
              <select 
                value={visaRouteFilter}
                onChange={e => setVisaRouteFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition cursor-pointer h-full"
              >
                <option value="All">All Visa Regional Clusters</option>
                <option value="GCC">Arab Peninsula (GCC Countries)</option>
                <option value="Western">Western Core (USA/Canada/Schengen)</option>
                <option value="Balkans">Balkan Workers Channel</option>
              </select>
            </div>
          </div>
        </div>

        {/* B. COUNTRY CARDS DIRECTORY */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
            <h3 className="text-sm font-bold font-mono text-slate-300 flex items-center gap-1.5">
              <Globe className="w-5 h-5 text-amber-500" />
              <span>Participating National Embassies Directory</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Region Matches: {filteredVisaCountries.length}</span>
          </div>

          {filteredVisaCountries.length === 0 ? (
            <div className="p-16 border border-dashed border-slate-800 rounded-3xl text-center text-slate-500 bg-slate-950/10">
              <p className="text-xs font-mono">No visa directories are currently found matching "{visaSearchQuery}".</p>
              <button onClick={() => { setVisaSearchQuery(''); setVisaRouteFilter('All'); }} className="mt-3 text-[10px] bg-amber-500 text-slate-950 px-4 py-1.5 rounded-lg font-black">Refresh Grid</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {filteredVisaCountries.map(c => (
                <div 
                  key={c.id} 
                  className="bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 p-5 rounded-3xl flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{c.flag}</span>
                        <h4 className="font-extrabold text-white text-base sm:text-lg group-hover:text-amber-500 transition">{c.name}</h4>
                      </div>
                      <span className="text-[9px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded border border-slate-700/60">Official Guide Available</span>
                    </div>

                    <p className="text-xs text-slate-350 leading-relaxed font-sans">
                      {c.summary}
                    </p>

                    <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-2xl text-[11px] font-mono space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Active Migration Channels:</span>
                        <span className="text-slate-200 text-right max-w-xs">{c.pathways}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-900 pt-1.5 mt-1">
                        <span className="text-slate-500">Average Salary standard:</span>
                        <span className="text-amber-400 font-bold">{c.salaries}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => handleVisaGuideExplore(c.id)}
                      className="w-full bg-slate-950 group-hover:bg-amber-500 border border-slate-850 group-hover:border-transparent text-slate-300 group-hover:text-slate-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Interactive Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* C. STEP-BY-STEP GUIDANCE PREVIEW */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-900/10 border border-slate-800 p-6 sm:p-8 rounded-3xl">
          <div className="lg:col-span-7 space-y-4 text-left">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-100 flex items-center gap-2 font-mono uppercase tracking-wider text-amber-500">
              <Award className="w-4 h-4 animate-bounce" />
              <span>GCC Standardized Medical Guidance Previews</span>
            </h3>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight font-heading">Complete Biometrics Clearances</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Unverified lung scars or incorrect spellings on high school certificates are the most common rejection risks. Pre-checking your documentation saves expensive consular stamping fees.
            </p>
          </div>

          <div className="lg:col-span-5 p-5 bg-slate-950/70 border border-slate-850 rounded-2xl space-y-2.5 font-sans text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Double check certificate names to match your precise passport lines.</span>
            </div>
            <div className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Secure your police verification slip before requesting Etimad slots.</span>
            </div>
            <div className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Wafid GAMCA medical examinations remain valid exactly for 90 days.</span>
            </div>
          </div>
        </div>

        {/* D. FAQ PREVIEW */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-widest border-b border-slate-850 pb-2">Common Immigration Directories FAQs</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-5 bg-slate-900/20 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs sm:text-sm text-amber-500">Q: What is the Wafid GAMCA Medical screening requirement?</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed">
                It is a mandatory physical and radiological test required by Gulf states to diagnose fitness. Expats with old pneumonia chest-scars should submit historical files for specialist clearance review.
              </p>
            </div>
            <div className="p-5 bg-slate-900/20 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs sm:text-sm text-amber-500">Q: Can I sponsor my family in Kuwait under 2026 rules?</h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed">
                Yes! Kuwait has lowered the minimum required salary cap for skilled engineers and healthcare workers to sponsor dependants. Sponsoring requires clear MOFA Pakistan legalized marriage papers.
              </p>
            </div>
          </div>
        </div>

        {/* E. WHATSAPP CTA SECTION */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-950/30 to-slate-950/50 border border-emerald-500/25 p-6 sm:p-10 rounded-3xl text-center space-y-4">
          <h2 className="text-xl sm:text-3xl font-black text-white">Need Live Consular Support?</h2>
          <p className="text-xs text-slate-450 max-w-xl mx-auto">Our physical team supports metrical document attestation queues and GAMCA diagnostic portal pre-verification directly from Lahore, Rawalpindi, and Karachi.</p>
          <a 
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-6 py-3.5 rounded-2xl transform hover:scale-105 transition shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Consult Our Verification Officers</span>
          </a>
        </div>
      </div>
    );
  };

  // 5. VIDEO TUTORIALS PAGE
  const renderVideosPage = () => {
    const filteredVideos = VIDEOS_DATA.filter(v => {
      if (activeVideoCat === 'All') return true;
      return v.category === activeVideoCat;
    });

    return (
      <div className="w-full bg-[#08132b] text-slate-100 font-sans space-y-16 py-12 px-4 select-none">
        {/* A. HERO SECTION */}
        <div className="max-w-5xl mx-auto text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs px-3.5 py-1 rounded-full font-bold">
            <Video className="w-3.5 h-3.5 text-amber-500" />
            <span>SELF-SERVICE CONSULAR INSTRUCTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight text-center">
            How-To <span className="text-amber-500">Biometrics & Medical</span> Videos
          </h1>
          <p className="text-xs sm:text-sm text-slate-450 max-w-xl mx-auto leading-relaxed">
            Avoid paying third-party document brokers. Watch highly detailed, high-resolution step-by-step videos outlining safe passport protection stamping and biometric schedules online.
          </p>
        </div>

        {/* B. VIDEO CATEGORIES ACCORDION PILLS */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 border-b border-slate-850 pb-5">
          {['All', 'Medical', 'Biometrics', 'Documentation', 'Travel', 'Residence'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveVideoCat(cat)}
              className={`px-4.5 py-2.5 rounded-xl font-bold font-sans text-xs transition cursor-pointer border ${
                activeVideoCat === cat 
                  ? 'bg-amber-500 text-slate-950 border-amber-500' 
                  : 'bg-slate-900/40 text-slate-350 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? '📁 All Videoshops' : cat}
            </button>
          ))}
        </div>

        {/* C. FEATURED TUTORIAL VIDEO SECTION */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl">
            <div className="lg:col-span-7 aspect-video relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-850 flex items-center justify-center group cursor-pointer" onClick={() => alert('Starting step video walkthrough: Wafid & GAMCA Pakistan slot booking.')}>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-[#0a1835]/30 to-amber-500/10 z-0" />
              <Play className="w-12 h-12 text-amber-500 relative z-10 group-hover:scale-110 transition shrink-0 animate-pulse" />
              <span className="absolute bottom-3 right-3 bg-slate-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-800 text-slate-400">Preview Mode</span>
            </div>
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono font-bold px-3 py-1 rounded-full uppercase">Featured System Video</span>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight font-heading">
                Step-by-Step Qiwa Contract Online Authorization & Stamping Verification (2026/2027)
              </h3>
              <p className="text-xs text-slate-450 leading-relaxed font-sans">
                Never sign unverified digital profiles. This 12 minute expert tutorial explains notice periods and standard medical scan verification parameters within the Saudi MOHRE portal.
              </p>
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Duration: 12:45 Min</span>
                <span>Active Views: 124K expats</span>
              </div>
            </div>
          </div>
        </div>

        {/* D. VIDEO GRID */}
        <div className="max-w-5xl mx-auto space-y-4">
          <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-widest border-b border-slate-850 pb-2">Walkthrough Videos</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map(v => (
              <div 
                key={v.id}
                className="bg-slate-900/25 border border-slate-800 p-4.5 rounded-3xl flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition group cursor-pointer"
                onClick={() => alert(`Opening Video Tutorial: "${v.title}"`)}
              >
                <div className="space-y-3">
                  {/* Fake Cover Thumbnail art */}
                  <div className="aspect-video relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0b1b3d] to-[#0a1224] border border-slate-850 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-amber-500/5 transition duration-300" />
                    <Play className="w-8 h-8 text-amber-500/80 group-hover:text-amber-500 group-hover:scale-110 transition duration-300 z-10" />
                    <span className="absolute bottom-2 right-2 bg-slate-900 text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded">{v.duration}</span>
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-[8.5px] text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-slate-800 uppercase tracking-wide">{v.category}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-slate-200 line-clamp-2 leading-snug group-hover:text-amber-500 transition">
                      {v.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
                      {v.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>{v.views}</span>
                  <span className="text-amber-500 font-bold group-hover:underline flex items-center gap-1">
                    <span>Watch Tutorial</span>
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* E. WHATSAPP CTA */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-emerald-950/20 border border-emerald-500/25 p-6 sm:p-10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl sm:text-3xl font-black text-white">Confused about active GAMCA center procedures?</h2>
            <p className="text-xs text-slate-400 max-w-xl">Our raw video walkthrough sheets have helped over 32k Pakistani workers clear their medical examinations on first attempts. Text support specs now.</p>
          </div>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-6 py-4 rounded-xl flex items-center gap-2 transform hover:scale-105 active:scale-95 transition"
          >
            <MessageSquare className="w-4 h-4 fill-white animate-bounce" />
            <span>Chat live with Visa Officer</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <header className="w-full z-50 flex flex-col relative">
      {/* 1. TOP ANNOUNCEMENT INFO BAR */}
      <div className="bg-[#0b1b3d] text-[#e2e8f0] text-xs py-2 px-4 border-b border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 font-sans">
          
          {/* Support Credentials & Localization Slogan */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-[11px] sm:text-xs text-slate-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              support@zeevisa.com
            </span>
            <span className="h-3 w-px bg-slate-700 hidden xxs:block" />
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              +92 300 1234567
            </span>
            <span className="h-3 w-px bg-slate-700 hidden sm:block" />
            <span className="font-medium text-amber-400 font-heading hidden lg:block animate-pulse">
              {isUrdu ? "آپ کا سفر، ہماری رہنمائی" : "Your Journey, Our Guidance"}
            </span>
          </div>

          {/* Social icons & Language toggle */}
          <div className="flex items-center gap-4 text-slate-300 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2.5">
              <a href="#" className="hover:text-amber-400 transition-colors">FB</a>
              <a href="#" className="hover:text-amber-400 transition-colors">YT</a>
              <a href="#" className="hover:text-amber-400 transition-colors">TK</a>
              <a href="#" className="hover:text-amber-400 transition-colors">IG</a>
            </div>
            <span className="h-3 w-px bg-slate-700" />
            <button 
              onClick={() => setIsUrdu(!isUrdu)}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white font-medium px-2 py-0.5 rounded border border-slate-700 transition cursor-pointer"
            >
              <Globe className="w-3 h-3 text-amber-500" />
              <span>{isUrdu ? "English" : "اردو"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC MAIN STICKY NAVBAR */}
      <nav id="navbar" className="bg-white text-slate-800 shadow-md sticky top-0 z-50 transition-all duration-300 border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* BRAND LOGO DESIGN */}
          <div 
            onClick={() => { onSelectCountry(null); navigateTo('home'); }}
            className="flex items-center cursor-pointer select-none"
          >
            <img 
              src={LogoImage} 
              alt="ZeeVisa Global" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* DESKTOP DESCRIPTIVE NAVIGATION LINKS */}
          <div className="hidden xl:flex items-center gap-1 font-sans font-medium text-[13.5px] text-slate-700">
            
            <button 
              onClick={() => { onSelectCountry(null); navigateTo('home'); }} 
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition-all ${customActivePage === 'home' && !currentCountryId ? 'text-blue-700 font-semibold border-b-2 border-primary-600' : 'text-slate-700'}`}
            >
              Home
            </button>

            {/* COUNTRIES DROPDOWN */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCountriesDropdownOpen(true)}
                onClick={() => setIsCountriesDropdownOpen(!isCountriesDropdownOpen)}
                className="px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 flex items-center gap-1 hover:text-blue-700 transition-all duration-200 cursor-pointer"
              >
                <span>Countries</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isCountriesDropdownOpen && (
                <div 
                  onMouseLeave={() => setIsCountriesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-lg shadow-2xl border border-slate-100 py-2.5 z-[120] grid grid-cols-1 divide-y divide-slate-100 animate-fadeIn"
                >
                  <div className="p-2 text-[11px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50 mb-1 rounded-t-md px-4">
                    Select Your Destination
                  </div>
                  {dropdownCountries.map((c) => (
                    <div key={c.id} className="group/item relative">
                      <button
                        onClick={() => handleCountryClick(c.id)}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center justify-between text-slate-800 hover:text-blue-700 transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <span className="font-semibold">{c.name}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all text-blue-600" />
                      </button>
                      
                      {/* Nested Visa Type Shortcuts */}
                      <div className="absolute left-full top-0 ml-1 bg-white border border-slate-100 rounded-lg shadow-2xl p-2 hidden group-hover/item:block w-52 text-xs text-slate-600 font-medium z-55">
                        <div className="p-1 font-bold text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          Visa Pathways
                        </div>
                        <button onClick={() => handleVisaCategoryClick(c.id, 'Work Visa')} className="w-full text-left p-1.5 hover:bg-amber-50 hover:text-amber-950 rounded cursor-pointer">💼 Work Visa Guide</button>
                        <button onClick={() => handleVisaCategoryClick(c.id, 'Family Visa')} className="w-full text-left p-1.5 hover:bg-amber-50 hover:text-amber-950 rounded cursor-pointer">👨‍👩‍👦 Family Visa Guide</button>
                        <button onClick={() => handleVisaCategoryClick(c.id, 'Visit Visa')} className="w-full text-left p-1.5 hover:bg-amber-50 hover:text-amber-950 rounded cursor-pointer">🏖️ Visit Visa Guide</button>
                        <button onClick={() => handleCountryClick(c.id)} className="w-full text-left p-1.5 hover:bg-slate-50 font-semibold text-blue-600 flex items-center justify-between border-t border-slate-100 mt-1 cursor-pointer">
                          <span>All Info Pages</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* OTHER NAV LINK COMPANIONS */}
            <button 
              onClick={() => navigateTo('services')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition cursor-pointer ${customActivePage === 'services' ? 'text-blue-700 font-bold border-b border-blue-600' : 'text-slate-705'}`}
            >
              Services
            </button>

            <button 
              onClick={() => navigateTo('visa-guides')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition cursor-pointer ${customActivePage === 'visa-guides' ? 'text-blue-700 font-bold border-b border-blue-600' : 'text-slate-705'}`}
            >
              Visa Guides
            </button>

            <button 
              onClick={() => navigateTo('jobs')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition cursor-pointer ${customActivePage === 'jobs' ? 'text-blue-700 font-bold border-b border-blue-600' : 'text-slate-705'}`}
            >
              Jobs
            </button>

            <button 
              onClick={() => navigateTo('videos')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition cursor-pointer ${customActivePage === 'videos' ? 'text-blue-700 font-bold border-b border-blue-600' : 'text-slate-705'}`}
            >
              Video Tutorials
            </button>

            <button 
              onClick={() => navigateTo('news')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition cursor-pointer ${customActivePage === 'news' ? 'text-blue-700 font-bold border-b border-blue-600' : 'text-slate-750'}`}
            >
              News
            </button>

            <button 
              onClick={() => navigateTo('about')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition cursor-pointer ${customActivePage === 'about' ? 'text-blue-700 font-bold border-b border-blue-600' : 'text-slate-750'}`}
            >
              About Us
            </button>

            <button 
              onClick={onOpenConsultation}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 transition cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* ACTION BUTTON GROUP */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Login registration */}
            <button 
              onClick={onOpenAuth}
              className="px-3.5 py-2 border border-slate-200 rounded-lg hover:border-slate-300 text-slate-700 transition flex items-center gap-1.5 text-xs font-semibold hover:bg-slate-50 cursor-pointer animate-pulse"
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Login</span>
            </button>

            {/* High-Impact CTA Book Appointment Button */}
            <button 
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 py-2.5 px-4 rounded-lg font-bold text-xs transition-transform hover:scale-105 shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* WhatsApp Quick chat */}
            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-3.5 rounded-lg flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Support</span>
            </a>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 text-slate-800 hover:bg-slate-100 rounded-lg transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE SLIDE-DOWN DRAWER MENU */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 px-4 py-5 absolute top-full left-0 w-full shadow-2xl z-50 overflow-y-auto max-h-[85vh] animate-fadeIn">
            <div className="flex flex-col gap-4 font-sans text-slate-850">
              
              <button 
                onClick={() => { onSelectCountry(null); navigateTo('home'); }} 
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 text-slate-850 font-semibold cursor-pointer"
              >
                🏠 Home
              </button>

              {/* Mobile Countries List Accordion */}
              <div className="flex flex-col border-b border-slate-50 py-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2 px-1">
                  🌍 Explore Countries
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {dropdownCountries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCountryClick(c.id)}
                      className="text-left py-2 px-2.5 rounded hover:bg-slate-50 flex items-center gap-1.5 text-[13px] border border-slate-100 bg-white cursor-pointer"
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="font-semibold text-slate-700 truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigateTo('services')}
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 font-semibold text-slate-850 cursor-pointer"
              >
                🛠️ Services
              </button>

              <button 
                onClick={() => navigateTo('visa-guides')}
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 font-semibold text-slate-850 cursor-pointer"
              >
                📜 Visa Guides Directory
              </button>

              <button 
                onClick={() => navigateTo('jobs')}
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 font-semibold text-slate-850 cursor-pointer"
              >
                💼 Jobs Platform
              </button>

              <button 
                onClick={() => navigateTo('videos')}
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 font-semibold text-[#0b1b3d] cursor-pointer"
              >
                🎥 Video Tutorials Walkthroughs
              </button>

              <button 
                onClick={() => navigateTo('news')}
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 font-semibold text-slate-850 cursor-pointer"
              >
                📰 Latest News & Alerts
              </button>

              <button 
                onClick={() => navigateTo('about')}
                className="text-left py-2 border-b border-slate-50 hover:text-blue-700 font-semibold text-slate-850 cursor-pointer"
              >
                🏢 About Us & Testimonials
              </button>

              {/* Action columns for Mobile Drawer */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
                  className="w-full py-3 border border-slate-300 rounded-lg text-slate-705 font-bold text-center flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Login</span>
                </button>

                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenConsultation(); }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-blue-950 rounded-lg font-bold text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a 
                  href="https://wa.me/923001234567" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp Support</span>
                </a>
              </div>

            </div>
          </div>
        )}
        
        {/* Scroll progress indicator bar */}
        <motion.div 
          style={{ scaleX, transformOrigin: "0%" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 z-50 pointer-events-none"
        />
      </nav>

      {/* 3. CORE FRONTEND SUB-PAGES ACCORDING TO USER OBJECTIVES */}
      {isCustomPage && (
        <div className="bg-[#08132b] text-slate-100 font-sans pb-24 w-full animate-fadeIn min-h-[80vh] flex flex-col z-40 relative">
          <style dangerouslySetInnerHTML={{ __html: `
            main, footer {
              display: none !important;
            }
          `}} />
          
          {customActivePage === 'jobs' && renderJobsPage()}
          {customActivePage === 'news' && renderNewsPage()}
          {customActivePage === 'about' && renderAboutPage()}
          {customActivePage === 'visa-guides' && renderVisaGuidesPage()}
          {customActivePage === 'videos' && renderVideosPage()}
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------
// PRIVATE MINI SVGS & HELPER ICONS (Anti-broken-referrers)
// ----------------------------------------------------
function CodeIcon(props: any) {
  return (
    <svg 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className={props.className || "w-5 h-5"}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function TruckDriverIcon(props: any) {
  return (
    <svg 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className={props.className || "w-5 h-5"}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.262-4.185a1.875 1.875 0 00-1.848-1.751h-2.18m-4.5 9h-3.75m1.5-9V7.5A2.25 2.25 0 0110.5 5.25h3a2.25 2.25 0 012.25 2.25v2.25M6.75 21a.75.75 0 01-.75-.75h-.008a.75.75 0 00-.75.75h1.5z" />
    </svg>
  );
}
