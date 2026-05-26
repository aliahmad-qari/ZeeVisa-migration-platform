import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Coins, 
  Globe, 
  TrendingUp, 
  Clock, 
  FileText, 
  HeartPulse, 
  Fingerprint, 
  Award, 
  ShieldCheck, 
  MessageSquare, 
  HelpCircle,
  Briefcase,
  Layers,
  Sparkles,
  Printer,
  FileDown,
  CircleCheck,
  PlaneTakeoff,
  Eye,
  CreditCard,
  Car,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Info,
  ShieldAlert,
  Calendar,
  Building,
  Smartphone,
  CheckSquare,
  Search,
  BookOpen,
  DollarSign,
  Activity,
  UserCheck
} from 'lucide-react';
import { CountryData, VisaCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Custom detailed local mock database map for extreme SaaS dashboard enrichment matching each country's ID
const COUNTRY_ENRICHMENTS: Record<string, {
  cities: { name: string; role: string; highlight: string }[];
  costBreakdown: { item: string; cost: string; percentage: number }[];
  rejectionReasons: string[];
  medicalTests: { name: string; purpose: string; badge: string }[];
  clinicsPakistan: { name: string; city: string; phone: string }[];
  telecoms: { operator: string; comment: string; speed: string }[];
  accommodationOptions: { type: string; price: string; desc: string }[];
  bankingOptions: { bank: string; accountType: string; features: string }[];
  workCultureTips: string[];
  checklistBefore?: string[];
  checklistAfter?: string[];
}> = {
  'saudi-arabia': {
    cities: [
      { name: 'Riyadh', role: 'Financial Capital', highlight: 'Main hub for corporate Headquarters, IT centers, and mega projects under Vision 2030.' },
      { name: 'Jeddah', role: 'Commercial Seaport', highlight: 'Major trade and business focal point, commercial shipping networks, and red-sea tourism.' },
      { name: 'Dammam / Khobar', role: 'Energy & Heavy Capital', highlight: 'Industrial heartland with strong oil, gas, engineering, and manufacturing job grids.' }
    ],
    costBreakdown: [
      { item: 'Executive Studio / 1BR Rent', cost: 'SAR 1,200 - 2,500 / month', percentage: 60 },
      { item: 'Standard Dining & Groceries', cost: 'SAR 400 - 800 / month', percentage: 35 },
      { item: 'Public Rail / Fuel Expenses', cost: 'SAR 150 - 300 / month', percentage: 15 },
      { item: 'SIM Plan & High Speed Wifi', cost: 'SAR 100 - 200 / month', percentage: 20 }
    ],
    rejectionReasons: [
      'Chest X-Ray lung anomalies (calcification lines or scarring from past severe pneumonia/Tuberculosis)',
      'Active biological markers of Hepatitis B, Hepatitis C, or HIV positive reactions',
      'Uncontrolled Stage-2 hypertension or critical cardiac arrhythmia during vital testing',
      'Infectious venereal diseases or severe untreated clinical skin conditions'
    ],
    medicalTests: [
      { name: 'Microbiology Assays', purpose: 'Screens blood samples for HIV, Hepatitis B/C, Malaria, and Filaria germs.', badge: 'Infection Panel' },
      { name: 'Pulmonary Radiography', purpose: 'High-definition Chest X-Ray scanning for active/latent TB scars.', badge: 'Lungs Check' },
      { name: 'Metabolic & Cardiovascular Check', purpose: 'Standard ECG, vital heart rates, and blood pressure analysis.', badge: 'Vitals' },
      { name: 'Occupational Sensor Tests', purpose: 'Ensures vision ranges and auditory thresholds meet worker requirements.', badge: 'Standard' }
    ],
    clinicsPakistan: [
      { name: 'Peak Medical Diagnostics', city: 'Lahore (Gulberg-III)', phone: '+92 42 35789012' },
      { name: 'Al-Khidmat Special Diagnostic Desk', city: 'Karachi (PECHS)', phone: '+92 21 34567890' },
      { name: 'Diplomatic Enclave Medical Trust', city: 'Islamabad (G-6)', phone: '+92 51 2278912' }
    ],
    telecoms: [
      { operator: 'STC (Saudi Telecom)', comment: 'Finest structural 5G speeds, absolute widest coverage in desert regions.', speed: '210 Mbps' },
      { operator: 'Mobily KSA', comment: 'Highly popular with expats for cheap calling bundles to South Asia.', speed: '145 Mbps' },
      { operator: 'Zain', comment: 'Very competitive weekly smart data packages, exceptional metro speeds.', speed: '160 Mbps' }
    ],
    accommodationOptions: [
      { type: 'Sharing Partition / Bedspace', price: 'SAR 300 - 600 / month', desc: 'Popular in city centers of Riyadh/Batha. Split utilities included.' },
      { type: 'Unfurnished Cozy Studio Flat', price: 'SAR 1,000 - 1,400 / month', desc: 'Standard housing requiring a formal contract registered in Ezar.' },
      { type: 'Furnished Executive Single Bedroom', price: 'SAR 1,800 - 2,800 / month', desc: 'Secure location with parking, appliances, fully inclusive.' }
    ],
    bankingOptions: [
      { bank: 'Al Rajhi Bank', accountType: 'Current Expat Account', features: 'Fully digital onboarding using Absher, instant Tahweel transfers home.' },
      { bank: 'urpay / STC Pay', accountType: 'Neo Smart Mobile Wallet', features: 'Instantly opens with Border Number, zero account fees, direct Cash pickups.' }
    ],
    workCultureTips: [
      'Stores, cafes, and state bureaus pause temporarily during public prayer times (20 mins). Plan daily agendas ahead.',
      'Always execute your labor contracts securely online inside the Qiwa portal. Handshakes represent no legal backing.',
      'Summer Midday Labor Law prohibits open field operations between 12:00 PM and 3:00 PM due to active heat indexes.'
    ],
    checklistBefore: [
      'Verify passport validity exceeds 6 months with clear biometric spelling.',
      'Attest educational degrees from HEC and MOFA Pakistan.',
      'Book and clear Wafid (GAMCA) Medical diagnosis panel.',
      'Complete face & fingerprint recording at designated Etimad centers.',
      'Obtain dynamic Qiwa digital employment contract signature online.',
      'Pay required state consular and visa stamping fees through your agent.'
    ],
    checklistAfter: [
      'Clear airport passport control and record your official Entry Border Number.',
      'Complete post-arrival medical test at an authorized Saudi clinic.',
      'Register your details for digital Iqama residence card creation.',
      'Receive and print physical resident ID card via your employer.',
      'Activate Saudi mobile line with STC, Mobily, or Zain using of Iqama.',
      'Register urpay / STC Pay smart digital wallets to remit money home.'
    ]
  },
  'uae': {
    cities: [
      { name: 'Dubai', role: 'Global Tech & Tourism Hub', highlight: 'Most active market for Commercial Sales, Real Estate, F&B, Logistics, and Tech.' },
      { name: 'Abu Dhabi', role: 'Government & Energy Hub', highlight: 'Capital territory featuring massive civil construction, public bureaus, and ADNOC fields.' },
      { name: 'Sharjah', role: 'Industrial & Cultural Center', highlight: 'Budget-friendly living options, active factories, trading companies, and academic institutes.' }
    ],
    costBreakdown: [
      { item: 'Bedspace / Living Partition', cost: 'AED 800 - 1,500 / month', percentage: 55 },
      { item: 'Groceries & Casual Dining', cost: 'AED 400 - 900 / month', percentage: 30 },
      { item: 'Nol Metro Card Commutes', cost: 'AED 200 - 450 / month', percentage: 12 },
      { item: 'Virgin / du Mobile Data Bundles', cost: 'AED 150 - 300 / month', percentage: 18 }
    ],
    rejectionReasons: [
      'Traces of active, latent, or old healed Tuberculosis on Chest X-Rays. UAE mandates near-perfect lungs.',
      'Serology reactions showing positive results for HIV or AIDS antibodies.',
      'Active Hepatitis B antigens (Strictly enforced for chefs, F&B staff, nurses, and beauticians).',
      'Leprosy visual nodules or biological positive tests.'
    ],
    medicalTests: [
      { name: 'DHA Radiography Scans', purpose: 'Full chest exposure checking for historical lung scar tissues.', badge: 'Mandatory' },
      { name: 'Venous Blood Antigen Check', purpose: 'Identifies HIV, Syphilis, and Hepatitis markers.', badge: 'Priority Check' },
      { name: 'Physical Skin Assessments', purpose: 'Audits for chronic infectious skin breakouts or leprosy markers.', badge: 'Dermatological' }
    ],
    clinicsPakistan: [
      { name: 'Umer Diagnostic Laboratories', city: 'Karachi (Nazimabad)', phone: '+92 21 36678121' },
      { name: 'Shalamar Diagnostic Unit', city: 'Lahore (Mughalpura)', phone: '+92 42 111 234 567' }
    ],
    telecoms: [
      { operator: 'e& (Etisalat)', comment: 'Fastest mobile network in the world. Exceptional 5G coverage throughout the country.', speed: '250 Mbps' },
      { operator: 'du Telecom', comment: 'Highly popular with executive workers. Excellent customer portal app.', speed: '190 Mbps' },
      { operator: 'Virgin Mobile KSA/UAE', comment: 'All-digital eSIM service. Customize your monthly units flexibly.', speed: '180 Mbps' }
    ],
    accommodationOptions: [
      { type: 'Executive Partition Room', price: 'AED 700 - 1,200 / month', desc: 'Enclosed plywood space inside flat, includes AC, WiFi, and washing.' },
      { type: 'Unfurnished Studio Apartment', price: 'AED 1,600 - 2,800 / month', desc: 'Requires Ejari registration under Dubai Land Department.' },
      { type: 'Fully Furnished 1-Bedroom Unit', price: 'AED 3,200 - 5,500 / month', desc: 'Premium living in Dubailand / JVC. Safe with 24/7 security desks.' }
    ],
    bankingOptions: [
      { bank: 'Emirates NBD', accountType: 'Standard Salary Account', features: 'Opened instantly after physical Emirates ID arrives. Outstanding digital apps.' },
      { bank: 'Wio Bank (Next-Gen)', accountType: 'Digital Expat Account', features: 'Fully app-based, 100% virtual registration, high interest multi-currency options.' }
    ],
    workCultureTips: [
      'The UAE operates on a standard Monday to Friday working week. Friday afternoon is a half-day; Saturday-Sunday is the weekend.',
      'Strict cyber-compliance laws. Avoid public venting or derogatory reviews on social media platforms.',
      'Nol transit cards are universal. Keep them topped up online to avoid fine panels at train stations.'
    ],
    checklistBefore: [
      'Ensure passport has 6+ months validity and clean bio-details.',
      'Verify and stamp high school or university degrees via MOFA Pakistan.',
      'Register slot and pass Wafid medical tests panel.',
      'Verify MOHRE digital structural labor agreement issued by sponsor.',
      'Secure travel insurance coverage for standard regional flights.',
      'Deliver final passport to travel agent for consulate stamp registration.'
    ],
    checklistAfter: [
      'Obtain physical visa entry slip upon clearing UAE immigration control.',
      'Complete post-arrival municipal medical checkup (DHA or DOH clinic).',
      'Register eye-scans & fingerprints at ICA biometric centers for Emirates ID.',
      'Collect and print your physical Emirates ID residency card.',
      'Sign up to local phone plan with du or etisalat using Emirates ID.',
      'Activate a digital savings or checking account with Emirates NBD or Wio.'
    ]
  },
  'qatar': {
    cities: [
      { name: 'Doha', role: 'Business and Media Hub', highlight: 'Capital city hosting commercial ports, aviation hubs, skyscrapers, and financial lanes.' },
      { name: 'Lusail', role: 'Futuristic Entertainment City', highlight: 'Smart, ultra-modern coastal city hosting real estate corporate setups, hotel groups, and events.' },
      { name: 'Al Wakrah', role: 'Residential Maritime Hub', highlight: 'Quieter family sector boasting historic souqs, modern clinics, and convenient metro access.' }
    ],
    costBreakdown: [
      { item: 'Studio Unit / Shared Flat Rent', cost: 'QAR 1,200 - 2,800 / month', percentage: 60 },
      { item: 'Hypermarket Groceries & Foods', cost: 'QAR 500 - 1,000 / month', percentage: 32 },
      { item: 'Doha Metro Transit Pass', cost: 'QAR 100 - 180 / month', percentage: 8 },
      { item: 'Ooredoo Smart Sim Package', cost: 'QAR 120 - 250 / month', percentage: 15 }
    ],
    rejectionReasons: [
      'Chest X-Ray nodes representing historical or active pulmonary infection scars.',
      'Positive tests for active Hepatitis B, Hepatitis C, HIV, or Syphilis strains.',
      'Severe respiratory breathing difficulties or advanced physical muscular paralysis.'
    ],
    medicalTests: [
      { name: 'QVC Consular Blood Screen', purpose: 'Consures blood indices and HIV presence in Pakistan before departure.', badge: 'Pre-flight' },
      { name: 'Qatar Medical Commission check', purpose: 'Confirms and validates health markers after landing inside Qatar borders.', badge: 'Final Approval' }
    ],
    clinicsPakistan: [
      { name: 'Official QVC Center Islamabad', city: 'Islamabad (I-9 Sector)', phone: '+92 51 8439111' },
      { name: 'Official QVC Center Karachi', city: 'Karachi (DHA Phase 2)', phone: '+92 21 35248111' }
    ],
    telecoms: [
      { operator: 'Ooredoo Qatar', comment: 'Stellar coverage. The country\'s primary operator. High-speed fiber connections.', speed: '220 Mbps' },
      { operator: 'Vodafone Qatar', comment: 'Very popular with field employees. Excellent customer service bundles.', speed: '185 Mbps' }
    ],
    accommodationOptions: [
      { type: 'Shared Executive Partition', price: 'QAR 600 - 1,100 / month', desc: 'Clean sharing flat, includes swimming pool and common kitchen access.' },
      { type: 'Standard Unfurnished Studio', price: 'QAR 1,800 - 2,800 / month', desc: 'Located in city boundaries. Requires post-dated cheques for tenancy.' },
      { type: 'Furnished upscale 1BR Apt', price: 'QAR 3,500 - 5,500 / month', desc: 'Located in Lusail or Pearl-Qatar. Sea views, highly premium.' }
    ],
    bankingOptions: [
      { bank: 'Qatar National Bank (QNB)', accountType: 'Expat Salary Stream', features: 'Largest banking network in the Middle East. Elite tech utilities.' },
      { bank: 'Commercial Bank of Qatar', accountType: 'Online Expat Savings', features: 'Fast transfers directly to South Asian accounts, high security locks.' }
    ],
    workCultureTips: [
      'State authorities are highly formal. Stamped, signed legal credentials are indispensable for operations.',
      'The weekend commences on Friday. Plan personal activities around morning prayer blocks.',
      'Work contract updates are managed electronically. Verify yours carefully using the official MADLSA portal.'
    ],
    checklistBefore: [
      'Verify passport validity spans a minimum of 6 months.',
      'Certify educational scrolls via HEC, Qatar Embassy, and MOFA.',
      'Book the official Konsular QVC Center appointment slot.',
      'Complete blood screening, medical check, and biometric capture at QVC.',
      'Obtain electronic approval of the Work Visa on Qatar MOI portal.',
      'Confirm standard airline booking reservation details with sponsor.'
    ],
    checklistAfter: [
      'Enter Doha border using your QVC medical verification slip.',
      'Register the employee profile inside Metrash2 Qatari state application.',
      'Pass the mandatory post-arrival blood group typing test.',
      'Receive official physical QID (Qatar Residence Card).',
      'Acquire local phone line with Ooredoo or Vodafone using your QID.',
      'Open QNB current salary account for secure WPS monthly routing.'
    ]
  }
};

const DEFAULT_ENRICHMENT = {
  cities: [
    { name: 'Urban Business Core', role: 'Commercial District', highlight: 'Hosts most corporate offices, banking headquarters, and administrative bureaus.' },
    { name: 'Industrial Trade Park', role: 'Manufacturing & Ports', highlight: 'Main logistics warehouses, transport hubs, and mechanical sectors.' }
  ],
  costBreakdown: [
    { item: 'Standard Expat Studio Rent', cost: 'USD 550 - 1,200 / month', percentage: 60 },
    { item: 'Monthly Dining & Grocery Bills', cost: 'USD 250 - 500 / month', percentage: 32 },
    { item: 'Bus transit / Petrol cost', cost: 'USD 80 - 150 / month', percentage: 10 },
    { item: 'SIM & High Speed Wifi Packs', cost: 'USD 40 - 90 / month', percentage: 15 }
  ],
  rejectionReasons: [
    'Detection of chronic infectious biological markers (such as HIV, Active TB, or Hepatitis)',
    'Background verification anomalies or false police reports presenting during verification',
    'Exceeding maximum visa bounds or prior historical border violations in regional bases'
  ],
  medicalTests: [
    { name: 'Serological Screening', purpose: 'Identifies chronic viral/bacterial infections in systemic blood flow.', badge: 'Standard Panel' },
    { name: 'Chest X-Ray Imaging', purpose: 'Scans lungs for pathological nodes or pulmonary shadows.', badge: 'Critical Stage' }
  ],
  clinicsPakistan: [
    { name: 'Authorized National Clinics', city: 'Major Capitals / Hubs', phone: 'Contact Desk Helpline' }
  ],
  telecoms: [
    { operator: 'National Integrated Telecom', comment: 'Extremely solid municipal coverage and stable internet packets.', speed: '140 Mbps' }
  ],
  accommodationOptions: [
    { type: 'Shared Expat Bedspace Room', price: 'USD 250 - 500 / month', desc: 'Utilities and wifi split among roommates. Ideal for new arrivals.' },
    { type: 'Single Unfurnished Apartment', price: 'USD 700 - 1,400 / month', desc: 'Secure location, requires formal contract registration inside town office.' }
  ],
  bankingOptions: [
    { bank: 'National Commercial Group', accountType: 'Standard Resident Account', features: 'High-speed remittance digital app, localized ATMs.' }
  ],
  workCultureTips: [
    'Always prioritize punctuality as a core respect signal in team projects.',
    'Remain deeply mindful of and respect local civic customs, religious dates, and dressing standards.'
  ],
  checklistBefore: [
    'Verify that your passport is eligible layout structure validity.',
    'Verify degree credentials via domestic state and diplomatic offices.',
    'Undertake necessary medical health clearances.',
    'Attain valid visa issuance authorization from legal sponsor.'
  ],
  checklistAfter: [
    'Get official entry index registration on border clearance.',
    'Follow up on required post-entry health screening protocols.',
    'Acquire localized residency physical cards.',
    'Register local mobile connectivity lines and secure bank accounts.'
  ]
};

interface CountryDetailProps {
  country: CountryData;
  initialVisaType?: string;
  onBack: () => void;
  onOpenConsultation: () => void;
  onDownloadGuide: (name: string) => void;
}

export default function CountryDetail({ 
  country, 
  initialVisaType, 
  onBack, 
  onOpenConsultation,
  onDownloadGuide
}: CountryDetailProps) {
  
  const [activeTab, setActiveTab] = useState<'overview' | 'visas' | 'process' | 'medical' | 'life' | 'documents' | 'faqs'>('overview');
  const [selectedVisaIndex, setSelectedVisaIndex] = useState<number>(0);
  const [expandedStep, setExpandedStep] = useState<number>(1);
  const [lifeSubTab, setLifeSubTab] = useState<'driving' | 'housing' | 'sim' | 'banking' | 'culture'>('driving');
  
  // Interactive checklist states
  const [checkedBefore, setCheckedBefore] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`zeevisa_checked_before_${country.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [checkedAfter, setCheckedAfter] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`zeevisa_checked_after_${country.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Keep state in sync when country changes
  useEffect(() => {
    try {
      const savedBefore = localStorage.getItem(`zeevisa_checked_before_${country.id}`);
      setCheckedBefore(savedBefore ? JSON.parse(savedBefore) : {});
    } catch {
      setCheckedBefore({});
    }

    try {
      const savedAfter = localStorage.getItem(`zeevisa_checked_after_${country.id}`);
      setCheckedAfter(savedAfter ? JSON.parse(savedAfter) : {});
    } catch {
      setCheckedAfter({});
    }
  }, [country.id]);

  // Persist checks to localStorage when mutated
  useEffect(() => {
    localStorage.setItem(`zeevisa_checked_before_${country.id}`, JSON.stringify(checkedBefore));
  }, [checkedBefore, country.id]);

  useEffect(() => {
    localStorage.setItem(`zeevisa_checked_after_${country.id}`, JSON.stringify(checkedAfter));
  }, [checkedAfter, country.id]);
  
  // FAQ accordion states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqQuery, setFaqQuery] = useState('');

  // Search filter for overview tab
  const [overviewSearch, setOverviewSearch] = useState('');

  // PDF Export states
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  // Motion variants for staggered container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14
      }
    }
  };

  // Get enriched fields specific to country ID
  const enrichmentData = COUNTRY_ENRICHMENTS[country.id] || DEFAULT_ENRICHMENT;

  // Export to PDF functionality using jsPDF
  const exportChecklistToPDF = () => {
    setIsExportingPDF(true);
    setPdfSuccess(false);

    setTimeout(() => {
      try {
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Premium Dark Blue Header Card
        doc.setFillColor(11, 27, 61); // #0b1b3d deep blue
        doc.rect(0, 0, pageWidth, 42, 'F');
        
        // Brand design
        doc.setTextColor(245, 158, 11); // Amber
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('GULF IMMIGRATION DOSSIER', 14, 18);
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text(`${country.name.toUpperCase()} IMMIGRATION MILESTONE CHECKLIST`, 14, 26);
        
        doc.setFontSize(9);
        doc.setTextColor(170, 180, 195);
        doc.text(`Generated: ${new Date().toLocaleString()} (UTC) • Expat Assistant`, 14, 34);
        
        // Progress HUD
        doc.setFillColor(245, 158, 11); // Amber
        doc.roundedRect(pageWidth - 65, 12, 51, 18, 2, 2, 'F');
        doc.setTextColor(15, 23, 42); // slate-900 background text
        doc.setFontSize(8);
        doc.text('PROGRESS CHECKLIST', pageWidth - 60, 18);
        doc.setFontSize(13);
        doc.text(`${completionPercentage}% Complete`, pageWidth - 60, 25);
        
        let y = 56;
        
        // Section: "Before Departure"
        doc.setFillColor(15, 23, 42); // Dark headers slate
        doc.rect(14, y, pageWidth - 28, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text('BEFORE DEPARTURE (PAKISTAN STAGE)', 18, y + 5.5);
        
        y += 14;
        
        const beforeList = enrichmentData.checklistBefore || [];
        beforeList.forEach((item, idx) => {
          const isChecked = checkedBefore[idx] || false;
          
          if (isChecked) {
            doc.setFillColor(16, 185, 129); // emerald-500
            doc.rect(14, y - 3, 4, 4, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('X', 14.8, y - 0.2); 
            doc.setTextColor(100, 116, 139); // Slate-500 muted text
          } else {
            doc.setDrawColor(148, 163, 184); // Slate-400 border
            doc.rect(14, y - 3, 4, 4, 'D');
            doc.setTextColor(51, 65, 85); // Slate-700
          }
          
          doc.setFontSize(9.5);
          doc.text(item, 22, y);
          y += 8;
        });
        
        y += 8;
        
        // Section: "After Arrival"
        doc.setFillColor(15, 23, 42); 
        doc.rect(14, y, pageWidth - 28, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text('AFTER ARRIVAL (IN-COUNTRY SETTLEMENT)', 18, y + 5.5);
        
        y += 14;
        
        const afterList = enrichmentData.checklistAfter || [];
        afterList.forEach((item, idx) => {
          const isChecked = checkedAfter[idx] || false;
          
          if (isChecked) {
            doc.setFillColor(16, 185, 129); // emerald-500
            doc.rect(14, y - 3, 4, 4, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('X', 14.8, y - 0.2); 
            doc.setTextColor(100, 116, 139);
          } else {
            doc.setDrawColor(148, 163, 184);
            doc.rect(14, y - 3, 4, 4, 'D');
            doc.setTextColor(51, 65, 85);
          }
          
          doc.setFontSize(9.5);
          doc.text(item, 22, y);
          y += 8;
        });
        
        y += 12;
        
        doc.setDrawColor(226, 232, 240); 
        doc.line(14, y, pageWidth - 14, y);
        
        y += 6;
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(8);
        doc.text('This immigration milestone checklist is saved entirely in your local browser workspace. Print and keep a copy handy.', 14, y);
        doc.text('For live support and updates, visit the Gulfforce Direct Assistant portal.', 14, y + 4.5);
        
        doc.save(`${country.name.toLowerCase().replace(/\s+/g, '_')}_immigration_checklist.pdf`);
        setPdfSuccess(true);
        setTimeout(() => setPdfSuccess(false), 5000);
      } catch (err) {
        console.error('PDF generation error:', err);
      } finally {
        setIsExportingPDF(false);
      }
    }, 1000);
  };

  // Jump to visa tab if initialVisaType is passed down
  useEffect(() => {
    if (initialVisaType) {
      setActiveTab('visas');
      const foundIdx = country.visaCategories.findIndex(v => v.type === initialVisaType);
      if (foundIdx !== -1) {
        setSelectedVisaIndex(foundIdx);
      }
    }
  }, [initialVisaType, country]);

  // Scroll to top when country changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [country]);

  // Calculate percentage of checklist completion
  const beforeListLength = enrichmentData.checklistBefore?.length || 4;
  const afterListLength = enrichmentData.checklistAfter?.length || 4;
  const checkedBeforeCount = Object.values(checkedBefore).filter(Boolean).length;
  const checkedAfterCount = Object.values(checkedAfter).filter(Boolean).length;

  const totalChecklistItems = beforeListLength + afterListLength;
  const totalCheckedCount = checkedBeforeCount + checkedAfterCount;
  const completionPercentage = Math.round((totalCheckedCount / totalChecklistItems) * 100);

  // Custom Icon for Steps
  const renderStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Passport': return <FileText className="w-5 h-5" />;
      case 'FileCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Fingerprint': return <Fingerprint className="w-5 h-5" />;
      case 'CheckSquare': return <Award className="w-5 h-5" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-5 h-5" />;
      case 'BadgeId': return <Briefcase className="w-5 h-5" />;
      default: return <CircleCheck className="w-5 h-5" />;
    }
  };

  // 7-step detail mapping matching each step
  const getStepImmigrationDetails = (stepNum: number) => {
    const details: Record<number, {
      estimated: string;
      actions: string[];
      tip: string;
      warning: string;
      docRequired: string[];
    }> = {
      1: {
        estimated: '1 - 3 Days',
        actions: ['Check passport validity exceeds 6 months prior to expiry.', 'Verify passport spelling matches Pakistani academic credentials letter-for-letter.', 'Ensure at least 3 empty pages exist in the physical booklet.'],
        tip: 'If there are any differences in spellings (e.g. "Mohammed" vs "Muhammad"), rectify your passport immediately at DIG passport office to avoid immigration rejections.',
        warning: 'Consular software systems strictly lock applications if names mismatch national identity records.',
        docRequired: ['Original Passport Book', 'Pakistani National ID (CNIC)']
      },
      2: {
        estimated: '5 - 10 Days',
        actions: ['Submit degree templates for HEC verification in Islamabad/Karachi/Lahore.', 'Acquire final MOFA attestation stamp on degrees or commercial contracts.', 'Translate wedding or birth certs to Arabic by certified legal teams.'],
        tip: 'Use physical drop-boxes or registered courier services to complete attestation queues fast.',
        warning: 'Unnotarized certificates result in a direct cancellation of your Qiwa contract / UAE MOHRE approvals.',
        docRequired: ['Original Degree / Diploma scrolls', 'MOFA Slip Receipt', 'Certified Arabic Translation copy']
      },
      3: {
        estimated: '1 - 2 Days',
        actions: ['Register electronic token slip on Wafid.com.', 'Make payment of USD 10 online and PKR clinic dues.', 'Attend assigned diagnostic clinic with original passport.'],
        tip: 'Arrive at the clinic early in the morning on an empty stomach to ensure stable baseline blood panel readings.',
        warning: 'Any scars from childhood lung infections can show up on the Chest X-Ray. Request mock pre-scans to verify.',
        docRequired: ['Wafid Appointment Slip', 'Original Passport', '4 White Background Photos']
      },
      4: {
        estimated: '1 - 3 Days',
        actions: ['Schedule appointments at capital VFS Global or Etimad office slots.', 'Provide high resolution optical iris and face camera captures.', 'Register 10-finger active finger scanning codes.'],
        tip: 'Ensure your hands are completely clean and free of temporary paints or deep cuts to allow high biometric read speeds.',
        warning: 'Biometrics records expire after standard intervals. Always submit within valid timelines.',
        docRequired: ['Consulate Appointment letter', 'Biometrics Billing Receipt', 'Original Passport']
      },
      5: {
        estimated: '7 - 15 Days',
        actions: ['Validate work visa draft generated in your name by your sponsor company.', 'Pay correct visa stamping state fees.', 'Hand over physical passport to licensed travel agents for embassy delivery.'],
        tip: 'Confirm status changes live using government MOFA portal trackers during processing states.',
        warning: 'Never start travelling with an unverified virtual stamp. Passport controls will reject entries.',
        docRequired: ['Hiring Contract signed via Qiwa/MOHRE', 'Consular Visa Invitation Approval Letter']
      },
      6: {
        estimated: '1 - 2 Days',
        actions: ['Reserve valid flight ticket. Keep luggage within permitted airline kilos.', 'Confirm border rules regarding custom items.', 'Board flight and pass airport exit immigration queues.'],
        tip: 'Keep all physical folders, copies of offer letters, and medical clearance certificates in your hand luggage.',
        warning: 'Carrying unauthorized medications without medical prescription slips is treated as a major offense.',
        docRequired: ['Printed Air Ticket', 'Valid Passport with stamped sticker', 'Physical Medical Fit Report']
      },
      7: {
        estimated: '30 - 90 Days',
        actions: ['Arrive in the target city and meet your company hiring agent.', 'Undergo post-arrival local medical diagnostic screening.', 'Submit fingerprints to Municipal CIO and receive permanent physical ID card.'],
        tip: 'Physical residence card issuance typically takes 15 days. Always keep a digital copy in your phone Absher/ICP app.',
        warning: 'Failure to print your physical ID card within 90 days results in heavy administrative fines for your sponsor.',
        docRequired: ['Border Number Stamp', 'Sponsor Company Commercial License', 'Post-Arrival Health Clearance']
      }
    };
    return details[stepNum] || {
      estimated: '3-5 Days',
      actions: ['Verify current step checklist', 'Prepare documentation files'],
      tip: 'Stay in touch with your case manager',
      warning: 'Verify all guidelines thoroughly',
      docRequired: ['Original Passport', 'Work agreement form']
    };
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-8 font-sans transition-all duration-300 antialiased selection:bg-amber-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* BACK NAVIGATION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 text-xs font-bold text-slate-300 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-4 py-2.5 rounded-2xl select-none transition-all duration-200 shadow-md cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Global Directory</span>
          </button>

          {/* SaaS Progress Ring Indicator */}
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur border border-slate-700/50 px-4.5 py-2 rounded-2xl">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500 transition-all duration-500" strokeDasharray={`${completionPercentage}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="text-[10px] font-mono font-black text-amber-500">{completionPercentage}%</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-300">My Flight Readiness</p>
              <p className="text-[9px] font-mono text-slate-400">
                {totalCheckedCount} of {totalChecklistItems} targets checked
              </p>
            </div>
          </div>
        </div>

        {/* 1. DYNAMIC COUNTRY HERO BANNER */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0b1b3d] to-slate-900 text-white rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl transition duration-300">
          {/* Cover Photo */}
          <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
            <img 
              src={country.coverImage} 
              alt={country.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover shrink-0 scale-105 transition hover:scale-110 duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10" />

          {/* Banner Contents */}
          <div className="relative z-20 p-6 sm:p-10 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Title segment left side */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-5xl sm:text-6xl bg-slate-800/85 backdrop-blur-md p-3.5 rounded-3xl border border-slate-700/60 shadow-xl select-none w-fit self-start">
                  {country.flag}
                </span>
                <div className="space-y-1.5">
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-50 flex items-center flex-wrap gap-2 sm:gap-3">
                    <span>{country.name}</span>
                    {country.nativeName && (
                      <span className="text-xl sm:text-2xl text-amber-400 font-medium font-sans">({country.nativeName})</span>
                    )}
                  </h1>
                  <p className="text-amber-400 font-extrabold tracking-wider text-xs uppercase font-mono">
                    Premium Immigration Guidance & Visa Pipeline • Capital: {country.capital}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {country.overview}
              </p>

              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono text-slate-300 pt-2 border-t border-slate-800">
                <span className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/50 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" /> 
                  <span>Currency: <strong className="text-slate-100">{country.currency}</strong></span>
                </span>
                <span className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/50 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-teal-400" /> 
                  <span>Language: <strong className="text-slate-100">{country.language}</strong></span>
                </span>
                <span className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/50 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> 
                  <span>Average Salary: <strong className="text-slate-100">{country.avgSalaryRange}</strong></span>
                </span>
              </div>
            </div>

            {/* Support Call-out right side */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl select-none">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" /> Live Direct Assistance
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-100 leading-snug">
                Facing delays booking Wafid medical slots or Qiwa/MOHRE contracts?
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Connect safely with verified consultants to audit files, translate documents, and resolve appointment blockades quickly.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={onOpenConsultation}
                  className="bg-amber-500 hover:bg-amber-650 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl text-center transition cursor-pointer select-none shadow shadow-amber-500/10 truncate active:scale-95"
                >
                  Book Slot
                </button>
                <a
                  href={`https://wa.me/923001234567?text=Assalam-o-Alaikum, I need instant assistance regarding my ${country.name} Visa workflow list.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl text-center transition flex justify-center items-center gap-1.5 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 2. NAVIGATION ROW TABS - Smooth Horizontal Scroll */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-1.5 shadow-xl flex flex-nowrap overflow-x-auto gap-1 sticky top-[20px] z-30 invisible-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Jobs' },
            { id: 'visas', label: 'Visa Categories' },
            { id: 'process', label: 'Immigration Steps (7 Steps)' },
            { id: 'medical', label: 'GAMCA Medical & Bio' },
            { id: 'life', label: 'Driving & Life' },
            { id: 'documents', label: 'Checking List' },
            { id: 'faqs', label: 'FAQs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all duration-200 select-none ${
                activeTab === tab.id 
                  ? 'bg-amber-500 text-slate-950 shadow-lg font-black' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. CORE DISPLAY TAB CONTENTS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area (8 Cols) - Dark Glass-type Styling */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[500px]">
            
            {/* TABA: OVERVIEW & JOBS IN COUNTRY */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                      <Layers className="w-6 h-6 text-amber-500" />
                      <span>Economic Dashboard & Job Market</span>
                    </h3>
                    <p className="text-xs text-slate-400">Salary standards, demanding industries, and demographic parameters.</p>
                  </div>

                  {/* Real-time Dashboard Search Filter */}
                  <div className="relative w-full sm:w-72 shrink-0">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      id="overview-filter-input"
                      type="text" 
                      placeholder="Filter cities & jobs instantly..."
                      value={overviewSearch}
                      onChange={(e) => setOverviewSearch(e.target.value)}
                      className="w-full pl-9.5 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs sm:text-sm rounded-xl text-slate-200 font-sans shadow-inner placeholder:text-slate-600 outline-none"
                    />
                    {overviewSearch && (
                      <button 
                        id="overview-filter-clear-btn"
                        onClick={() => setOverviewSearch('')}
                        className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Economic Profile Stats Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: 'ADMIN CAPITAL', value: country.capital, class: 'border-slate-800 bg-slate-900/50' },
                    { title: 'CURRENCY SYMBOL', value: country.currency, class: 'border-slate-800 bg-slate-900/50' },
                    { title: 'OFFICIAL DIALECT', value: country.language, class: 'border-slate-800 bg-slate-900/50' },
                    { 
                      title: 'COST OF LIVING', 
                      value: country.costOfLiving, 
                      badge: true,
                      class: country.costOfLiving === 'High' ? 'border-red-900/60 bg-red-950/20 text-red-400' :
                             country.costOfLiving === 'Medium' ? 'border-amber-900/60 bg-amber-950/20 text-amber-400' :
                             'border-emerald-900/60 bg-emerald-950/20 text-emerald-400'
                    }
                  ].map((stat, sIdx) => (
                    <div key={sIdx} className={`p-4 rounded-2xl border text-center transition hover:border-slate-700 ${stat.class}`}>
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold block mb-1">{stat.title}</span>
                      {stat.badge ? (
                        <span className="inline-block px-3 py-1 mt-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-900">
                          {stat.value}
                        </span>
                      ) : (
                        <span className="font-extrabold text-slate-200 text-xs sm:text-sm block truncate">{stat.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Popular Cities Section (Highly Redesigned) */}
                {(() => {
                  const filteredCities = enrichmentData.cities.filter((city) => {
                    const query = overviewSearch.toLowerCase().trim();
                    if (!query) return true;
                    return city.name.toLowerCase().includes(query) || 
                           city.role.toLowerCase().includes(query) || 
                           city.highlight.toLowerCase().includes(query);
                  });

                  const filteredJobs = country.jobs.filter((job) => {
                    const query = overviewSearch.toLowerCase().trim();
                    if (!query) return true;
                    return job.title.toLowerCase().includes(query) || 
                           job.industry.toLowerCase().includes(query) || 
                           job.demand.toLowerCase().includes(query);
                  });

                  return (
                    <>
                      <div className="space-y-4 pt-2">
                        <h4 className="font-bold text-slate-200 text-sm sm:text-base flex items-center gap-2 font-mono">
                          <MapPin className="w-5 h-5 text-amber-400" />
                          <span>Popular Cities to Migrate To</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {filteredCities.length === 0 ? (
                            <div className="p-6 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20 col-span-full">
                              <p className="text-xs text-slate-500 font-sans">No cities found matching "{overviewSearch}" in {country.name}.</p>
                            </div>
                          ) : (
                            filteredCities.map((city, cIdx) => (
                              <div key={cIdx} className="bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 p-4.5 rounded-2xl transition-all duration-300 space-y-2 group">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-black text-slate-200 text-sm group-hover:text-amber-400 transition">{city.name}</h5>
                                  <span className="text-[9px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded-lg border border-slate-700/60">{city.role}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                                  {city.highlight}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Salary Analytics & Demand Visualizers */}
                      <div className="space-y-4 pt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-slate-200 text-sm sm:text-base flex items-center gap-2 font-mono">
                              <Briefcase className="w-5 h-5 text-amber-400" />
                              <span>High-Demand Careers & Salary Index</span>
                            </h4>
                            <p className="text-xs text-slate-400">Predicted average salaries, vaccine quotas, and industry parameters.</p>
                          </div>
                          <span className="text-[10px] bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-black uppercase font-mono tracking-wider w-fit">
                            2026 / 2027 Projections
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredJobs.length === 0 ? (
                            <div className="p-6 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20 col-span-full">
                              <p className="text-xs text-slate-500 font-sans">No job demands found matching "{overviewSearch}" in {country.name}.</p>
                            </div>
                          ) : (
                            filteredJobs.map((job, idx) => (
                              <div key={idx} className="p-4.5 bg-slate-900/30 border border-slate-800 hover:border-slate-700/80 rounded-2xl space-y-3.5 flex flex-col justify-between group transition">
                                <div className="space-y-1.5">
                                  <div className="flex justify-between items-start gap-2">
                                    <h5 className="font-black text-slate-200 text-sm group-hover:text-amber-400 transition duration-150">{job.title}</h5>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono leading-none font-black uppercase tracking-wider shrink-0 ${
                                      job.demand === 'Very High' ? 'bg-red-950/40 text-red-400 border border-red-900/50' :
                                      job.demand === 'High' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50' :
                                      'bg-blue-950/40 text-blue-400 border border-blue-900/50'
                                    }`}>
                                      {job.demand} Demand
                                    </span>
                                  </div>
                                  <p className="text-[10.5px] text-slate-400 font-mono flex items-center gap-1">
                                    <Building className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Industry: {job.industry}</span>
                                  </p>
                                </div>

                                {/* Salary Meter Graphics */}
                                <div className="space-y-1.5 pt-2 border-t border-slate-900">
                                  <div className="flex justify-between items-center text-[11px] font-mono">
                                    <span className="text-slate-500">Estimated Wage Standard:</span>
                                    <span className="font-extrabold text-amber-400">{job.averageSalary} <span className="text-[9px] text-slate-500">/mo</span></span>
                                  </div>
                                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        job.demand === 'Very High' ? 'bg-gradient-to-r from-red-500 to-amber-500' :
                                        job.demand === 'High' ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                                        'bg-gradient-to-r from-teal-500 to-blue-500'
                                      }`} 
                                      style={{ width: job.demand === 'Very High' ? '92%' : job.demand === 'High' ? '76%' : '54%' }}
                                    />
                                  </div>
                                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                                    <span>Expat Friendly: 100%</span>
                                    <span>Vacancy Growth: +18%</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Dynamic Job Demand Growth Chart Section */}
                      {(() => {
                        let chartData = [
                          { name: 'Healthcare & Biotech', value: 86 },
                          { name: 'SaaS & Tech', value: 82 },
                          { name: 'Infrastructure Eng.', value: 78 },
                          { name: 'Commercial Logistics', value: 74 },
                          { name: 'Tourism Careers', value: 71 }
                        ];

                        if (country.id === 'saudi-arabia') {
                          chartData = [
                            { name: 'IT & AI Services', value: 94 },
                            { name: 'Infra & Construction', value: 89 },
                            { name: 'Healthcare & Biotech', value: 82 },
                            { name: 'Hospitality & Tourism', value: 78 },
                            { name: 'Supply Chain & Transport', value: 71 }
                          ];
                        } else if (country.id === 'uae') {
                          chartData = [
                            { name: 'Real Estate & Civil Eng.', value: 91 },
                            { name: 'Digital Tech & FinTech', value: 88 },
                            { name: 'Healthcare & Medical', value: 83 },
                            { name: 'Tourism & Hospitality', value: 81 },
                            { name: 'Aviation & Logistics', value: 74 }
                          ];
                        } else if (country.id === 'qatar') {
                          chartData = [
                            { name: 'Media & Smart Tourism', value: 89 },
                            { name: 'F&B & Hospitality', value: 84 },
                            { name: 'Healthcare Systems', value: 81 },
                            { name: 'Smart Civil Infra', value: 78 },
                            { name: 'Telecom & 5G Logistics', value: 72 }
                          ];
                        }

                        const CustomTooltip = ({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl shadow-2xl space-y-1">
                                <p className="text-xs font-bold text-slate-100">{payload[0].payload.name}</p>
                                <p className="text-[11px] font-mono font-black text-amber-400">
                                  Growth Outlook: <span className="font-extrabold text-amber-300 font-mono">+{payload[0].value}%</span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        };

                        return (
                          <div className="p-5.5 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
                            <div>
                              <h4 className="font-bold text-slate-200 font-mono text-sm sm:text-base flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-amber-400 animate-pulse" />
                                <span>Industry Demand Growth Projection (2026-2027)</span>
                              </h4>
                              <p className="text-xs text-slate-400">Estimated expansion vectors across major industry pipelines.</p>
                            </div>

                            <div id="industry-growth-chart-container" className="w-full h-[220px] font-mono">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={chartData}
                                  layout="vertical"
                                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                  <XAxis type="number" domain={[0, 100]} hide />
                                  <YAxis 
                                    type="category" 
                                    dataKey="name" 
                                    className="font-sans"
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 10.5 }}
                                    width={140}
                                  />
                                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#0f172a', opacity: 0.1 }} />
                                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={12}>
                                    {chartData.map((entry, index) => (
                                      <Cell 
                                        key={`cell-${index}`} 
                                        fill={index === 0 ? '#f59e0b' : index === 1 ? '#eab308' : '#d97706'} 
                                        fillOpacity={1 - (index * 0.12)}
                                      />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        );
                      })()}

                          {/* Brand New Career Salary Range Recharts Bar Chart */}
                          {(() => {
                            const parsedSalaryData = country.jobs.map(job => {
                              let currency = '';
                              let min = 0;
                              let max = 0;
                              
                              // Extract currency
                              const currencyMatch = job.averageSalary.match(/^([A-Za-z$£€]+)/);
                              if (currencyMatch) {
                                currency = currencyMatch[1];
                              }
                              
                              // Extract numbers
                              const cleanSalary = job.averageSalary.replace(/,/g, '');
                              const numbers = cleanSalary.match(/\d+/g);
                              if (numbers && numbers.length >= 2) {
                                min = parseInt(numbers[0], 10);
                                max = parseInt(numbers[1], 10);
                              } else if (numbers && numbers.length === 1) {
                                min = parseInt(numbers[0], 10);
                                max = parseInt(numbers[0], 10) * 1.5;
                              }
                              
                              return {
                                name: job.title,
                                minSalary: min,
                                maxSalary: max,
                                currency: currency,
                                rangeLabel: job.averageSalary
                              };
                            });

                            const SalaryTooltip = ({ active, payload }: any) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl shadow-2xl space-y-1.5 font-sans z-50">
                                    <p className="text-xs font-black text-slate-100">{data.name}</p>
                                    <div className="space-y-0.5 font-mono text-[11px]">
                                      <p className="text-sky-450 text-[#38bdf8] font-bold">
                                        Min Standard: <span className="font-extrabold">{data.currency} {data.minSalary.toLocaleString()}</span>
                                      </p>
                                      <p className="text-amber-500 font-bold">
                                        Max Potential: <span className="font-extrabold">{data.currency} {data.maxSalary.toLocaleString()}</span>
                                      </p>
                                    </div>
                                    <div className="pt-1.5 border-t border-slate-900 text-[10px] text-slate-400">
                                      📊 Range: {data.rangeLabel} /mo
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            };

                            return (
                              <div id="salary-range-chart-container" className="p-5.5 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div>
                                    <h4 className="font-bold text-slate-200 font-mono text-sm sm:text-base flex items-center gap-2">
                                      <Briefcase className="w-5 h-5 text-amber-500" />
                                      <span>Salary Bands & Career Earning Potential</span>
                                    </h4>
                                    <p className="text-xs text-slate-450 text-slate-400">Comparing entry-level standard wages with senior-scale contract potentials.</p>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-xl">
                                    Unit: {parsedSalaryData[0]?.currency || 'Local Currency'} / mo
                                  </span>
                                </div>

                                {/* Twin Bar Recharts Display */}
                                <div className="w-full h-[220px] font-mono mt-2">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                      data={parsedSalaryData}
                                      layout="vertical"
                                      margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                                    >
                                      <XAxis type="number" hide />
                                      <YAxis 
                                        type="category" 
                                        dataKey="name" 
                                        className="font-sans"
                                        axisLine={false} 
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        width={120}
                                      />
                                      <Tooltip content={<SalaryTooltip />} cursor={{ fill: '#0f172a', opacity: 0.1 }} />
                                      
                                      {/* Min Salary bar */}
                                      <Bar dataKey="minSalary" fill="#38bdf8" radius={[0, 4, 4, 0]} barSize={8} name="Min Salary" />
                                      {/* Max Salary bar */}
                                      <Bar dataKey="maxSalary" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={8} name="Max Salary" />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>

                                {/* Legend markers */}
                                <div className="flex gap-4 items-center justify-center text-[10px] font-mono pt-1 text-slate-400">
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-block w-3 h-3 bg-[#38bdf8] rounded" />
                                    <span>Minimum Entry Standard</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-block w-3 h-3 bg-[#f59e0b] rounded" />
                                    <span>Maximum Contract Limit</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </>
                      );
                    })()}

                {/* Cost of Living Detail Breakdown Card */}
                <div className="p-5.5 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-200 font-mono text-sm sm:text-base flex items-center gap-2">
                        <Coins className="w-5 h-5 text-amber-400" />
                        <span>Cost of Living - Expense Budget Planner</span>
                      </h4>
                      <p className="text-xs text-slate-400">Approximate expenditures mapped to single expat profiles.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {enrichmentData.costBreakdown.map((cost, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium font-sans">{cost.item}</span>
                          <span className="font-mono text-slate-100 font-bold">{cost.cost}</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${cost.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed font-sans">
                    <strong>Pro Advisor:</strong> Food in municipal areas of {country.name} is relatively cheap. Your largest single expense will always remain flat rent or partition leases. Select outer suburbs to save up to 45% in rent fees.
                  </div>
                </div>

              </div>
            )}

            {/* TAB B: VISA CATEGORIES DETAILS */}
            {activeTab === 'visas' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-100">
                      SaaS Visa Products Directory
                    </h3>
                    <p className="text-xs text-slate-400">Process fees, validity bounds, and embassy registration checks.</p>
                  </div>
                  <span className="text-[10px] bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-black uppercase font-mono tracking-wider w-fit">
                    {country.visaCategories.length} Types Found
                  </span>
                </div>

                {/* Horizontal product pills for Categories */}
                <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/60 border border-slate-800 rounded-2xl">
                  {country.visaCategories.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVisaIndex(idx)}
                      className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-150 select-none cursor-pointer ${
                        selectedVisaIndex === idx 
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/10' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {v.type}
                    </button>
                  ))}
                </div>

                {/* Expanded SaaS Product Visa Cards */}
                {(() => {
                  const selectedVisa = country.visaCategories[selectedVisaIndex];
                  if (!selectedVisa) return null;
                  return (
                    <div className="space-y-6 p-5 sm:p-6 bg-slate-900/30 border border-slate-800 rounded-3xl animate-fadeIn relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-850">
                        <div className="space-y-1">
                          <span className="text-[9px] text-amber-400 font-mono tracking-widest uppercase font-bold block">VISA PATHWAY</span>
                          <h4 className="text-lg font-black text-slate-100 flex items-center gap-1.5">
                            <span>{selectedVisa.title}</span>
                          </h4>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-right">
                          <span className="text-[8px] font-mono tracking-wider uppercase text-slate-500 block">GOVERNMENT PROCESSING FEE</span>
                          <span className="font-mono text-emerald-400 font-black text-sm">{selectedVisa.fee}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                        {selectedVisa.description}
                      </p>

                      {/* Processing Time Visualizer (SLA Interface) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 border border-slate-850 p-4 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 block font-mono">ESTIMATED PROCESSING WINDOW</span>
                            <span className="text-slate-100 font-bold text-xs font-mono">{selectedVisa.processingTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                            <Calendar className="w-5 h-5 text-teal-400" />
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 block font-mono">VISA DURATION LIMITS</span>
                            <span className="text-slate-100 font-bold text-xs font-mono">{selectedVisa.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline flow chart representing typical processing stages */}
                      <div className="pt-2">
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase mb-3">CONCURRENT PROCESSING PIPELINE</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'File Vetting', desc: 'Degree translation, MOFA seals' },
                            { label: 'Clinic Check', desc: 'Blood panels, radiographic scans' },
                            { label: 'Visa Issuance', desc: 'Consulate sticker stamped' }
                          ].map((stage, sIdx) => (
                            <div key={sIdx} className="p-2 bg-slate-900/60 border border-slate-850 text-center rounded-xl text-[10px]">
                              <span className="text-slate-500 block font-mono">0{sIdx + 1}. {stage.label}</span>
                              <span className="text-slate-400 block tracking-tight font-sans text-[9px] mt-0.5">{stage.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Document requisites Checklist format */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase">REQUIRED FILES & SUPPORTING DOSSIER</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedVisa.documents.map((doc, i) => (
                            <div key={i} className="flex gap-2.5 items-start p-3 bg-slate-950 border border-slate-900 rounded-xl transition duration-150 hover:border-slate-800">
                              <span className="w-5 h-5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✔</span>
                              <span className="text-slate-300 leading-relaxed font-sans text-xs">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Consultation trigger line */}
                      <div className="p-3 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-between gap-3 text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Info className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>Need verified samples of invitation templates? Let us guide your sponsor.</span>
                        </span>
                        <button
                          onClick={onOpenConsultation}
                          className="text-amber-400 hover:text-amber-500 font-bold tracking-tight shrink-0 select-none cursor-pointer"
                        >
                          Request Guide Sample
                        </button>
                      </div>

                    </div>
                  );
                })()}

              </div>
            )}

            {/* TAB C: STEP-BY-STEP IMMIGRATION ROADMAP (INTERACTIVE COMPONENT) */}
            {activeTab === 'process' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                    <TrendingUp className="text-amber-500 w-6 h-6" />
                    <span>Interactive Departure Workflow (7 Steps)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Click a milestone step beneath to load complete actions, expert tips, warnings, and document lists.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column - Minimalist Timeline Steps */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="lg:col-span-5 relative space-y-3 border-l-2 border-slate-800/80 pl-4 py-2"
                  >
                    {country.stepProcess.map((step) => {
                      const isActive = expandedStep === step.step;
                      
                      // Calculate active step completion percentage and counts
                      const stepMeta = getStepImmigrationDetails(step.step);
                      const totalTasks = stepMeta?.actions?.length || 0;
                      let completedTasks = 0;
                      if (stepMeta?.actions) {
                        stepMeta.actions.forEach((_, idx) => {
                          const uniqueKey = step.step * 100 + idx;
                          if (checkedBefore[uniqueKey]) completedTasks++;
                        });
                      }
                      const isFullyComplete = totalTasks > 0 && completedTasks === totalTasks;

                      return (
                        <motion.button
                          variants={itemVariants}
                          key={step.step}
                          onClick={() => setExpandedStep(step.step)}
                          className={`w-full text-left p-3 rounded-2xl flex items-center justify-between gap-3 transition-all duration-200 select-none cursor-pointer relative ${
                            isActive 
                              ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/10 scale-[1.02]' 
                              : 'bg-slate-900/40 border border-slate-850 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate">
                            {/* Left vertical link connector */}
                            <div className={`absolute -left-7 top-4 w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[9px] font-black tracking-tight transition ${
                              isActive
                                ? 'bg-amber-500 text-slate-950 border-slate-950'
                                : 'bg-slate-950 text-slate-400 border-slate-800'
                            }`}>
                              {step.step}
                            </div>

                            <div className="shrink-0 p-1.5 bg-slate-950/20 rounded-xl">
                              {renderStepIcon(step.iconName)}
                            </div>
                            <div className="truncate pr-1">
                              <span className="text-[9px] block uppercase font-mono tracking-wider opacity-60">PHASE 0{step.step}</span>
                              <span className="text-xs sm:text-[13px] block truncate font-black">{step.description}</span>
                            </div>
                          </div>

                          {/* Interactive Step Progress Badge */}
                          <div className="shrink-0 pl-1">
                            {isFullyComplete ? (
                              <span className={`inline-flex items-center justify-center text-[10px] uppercase font-bold py-1 px-2.5 rounded-full ${
                                isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                Done ✓
                              </span>
                            ) : completedTasks > 0 ? (
                              <span className={`inline-flex items-center justify-center text-[10px] font-mono font-black py-0.5 px-2 rounded-lg ${
                                isActive ? 'bg-slate-950 text-amber-500' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              }`}>
                                {completedTasks}/{totalTasks}
                              </span>
                            ) : (
                              <span className="inline-flex h-2 w-2 rounded-full bg-slate-600/30" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>

                  {/* Right Column - Comprehensive Target Details Card */}
                  <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 animate-fadeIn">
                    {(() => {
                      const activeStepData = country.stepProcess.find(s => s.step === expandedStep);
                      const activeStepMeta = getStepImmigrationDetails(expandedStep);
                      if (!activeStepData) return <p className="text-slate-400 text-xs">Select a step to explore detailed actions.</p>;
                      
                      return (
                        <div className="space-y-4.5">
                          
                          {/* Header section */}
                          <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                            <div>
                              <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase block font-bold">ACTIVE STEP 0{expandedStep} DETAILS</span>
                              <h4 className="text-base font-black text-slate-100 mt-0.5">{activeStepData.description}</h4>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-300 font-bold max-w-fit leading-none">
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                              <span>SLA Time: {activeStepMeta.estimated}</span>
                            </span>
                          </div>

                          {/* Action Lists Checked items */}
                          <div className="space-y-2.5">
                            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-1">MANDATORY TASKS Checklist:</span>
                            {activeStepMeta.actions.map((act, idx) => {
                              const uniqueKey = expandedStep * 100 + idx;
                              const isChecked = checkedBefore[uniqueKey] || false;
                              return (
                                <div 
                                  key={idx}
                                  onClick={() => setCheckedBefore(prev => ({ ...prev, [uniqueKey]: !prev[uniqueKey] }))}
                                  className="flex items-start gap-2.5 p-3 bg-slate-950 border border-slate-900 rounded-xl hover:border-slate-800 transition duration-150 cursor-pointer select-none"
                                >
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    onChange={() => {}} // Controlled by div click
                                    className="w-4.5 h-4.5 accent-amber-500 rounded border-slate-800 bg-slate-900 cursor-pointer mt-0.5"
                                  />
                                  <span className={`text-xs leading-relaxed font-medium transition ${
                                    isChecked ? 'text-slate-500 line-through' : 'text-slate-300'
                                  }`}>{act}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Dossier requirements list pills */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[9px] text-slate-500 tracking-widest uppercase font-mono block">MANDATORY FILE DOSSIER:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeStepMeta.docRequired.map((doc, idx) => (
                                <span key={idx} className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-[10.5px] font-mono text-slate-300 select-none">
                                  📁 {doc}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Expert Advisor tips warning grid */}
                          <div className="space-y-2">
                            {/* Tip section */}
                            <div className="p-3 bg-slate-950/80 border-l-4 border-amber-500 text-slate-300 text-xs sm:text-[11px] rounded-r-xl space-y-1">
                              <p className="font-extrabold text-amber-400 font-sans flex items-center gap-1">💡 Pro Travel Tip:</p>
                              <p className="leading-relaxed text-slate-300">{activeStepMeta.tip}</p>
                            </div>

                            {/* Warning section */}
                            <div className="p-3 bg-red-950/25 border-l-4 border-red-500 text-xs sm:text-[11px] rounded-r-xl space-y-1">
                              <p className="font-extrabold text-red-400 font-sans flex items-center gap-1">⚠️ Critical Warning Flag:</p>
                              <p className="leading-relaxed text-slate-300">{activeStepMeta.warning}</p>
                            </div>
                          </div>

                        </div>
                      );
                    })()}
                  </div>

                </div>
              </div>
            )}

            {/* TAB D: GAMCA MEDICAL & BIOMETRICS GUIDE */}
            {activeTab === 'medical' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                    <HeartPulse className="text-red-500 w-6 h-6" />
                    <span>Wafid (GAMCA) Medical Protocol</span>
                  </h3>
                  <p className="text-xs text-slate-400">Strict bodily assessments, lab clinics list, fees, and rejection triggers.</p>
                </div>

                {/* Costs & Validity Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 text-emerald-400">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono uppercase font-bold">TOTAL DIAGNOSTIC FEES</span>
                      <strong className="text-slate-100 font-black text-sm font-mono">{country.medicalGuide.fees}</strong>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 text-cyan-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono uppercase font-bold">REPORT VALIDITY PERIOD</span>
                      <strong className="text-slate-100 font-black text-sm font-mono">90 Days post diagnostic issue</strong>
                    </div>
                  </div>
                </div>

                {/* Medical Tests Bento Grid */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-200 text-sm font-mono flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-500" />
                    <span>Physiology Inspections & Clinical Tests</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {enrichmentData.medicalTests.map((test, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-2 relative group">
                        <span className="absolute top-3 right-3 text-[9px] px-2 py-0.5 font-mono uppercase font-bold bg-slate-900 rounded-md text-amber-500 border border-slate-800">{test.badge}</span>
                        <h5 className="font-black text-slate-200 text-xs sm:text-sm">{test.name}</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{test.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Procedures */}
                <div className="space-y-3 pt-2">
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase">Appointment Booking Steps</span>
                  <div className="space-y-2 text-xs">
                    {country.medicalGuide.steps.map((st, i) => (
                      <div key={i} className="flex gap-3 items-start bg-slate-900/40 border border-slate-850 p-3.5 rounded-2xl">
                        <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800 text-amber-400 flex items-center justify-center font-mono font-black text-[11px] shrink-0 mt-0.5">{i+1}</span>
                        <div className="leading-relaxed font-medium text-slate-300">{st}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CLINICS IN PAKISTAN DIRECTORY */}
                <div className="space-y-3 pt-2">
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase">Certified Wafid Referral Centers in Pakistan</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {enrichmentData.clinicsPakistan.map((cl, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between text-xs font-mono">
                        <div className="space-y-1">
                          <h5 className="font-sans font-bold text-slate-200">{cl.name}</h5>
                          <span className="text-[10px] text-slate-500 block">City Office: {cl.city}</span>
                        </div>
                        <a href={`tel:${cl.phone}`} className="text-amber-500 hover:text-amber-400 font-bold block pt-2 text-[10.5px]">
                          📞 {cl.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rejections & Preparation warning alert */}
                <div className="p-5.5 bg-red-950/20 border-2 border-red-500/30 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                    <h4 className="font-bold text-sm sm:text-base">Critical Causes for UNFIT / Rejection Status</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Failing a Wafid GAMCA medical assessment has serious consequences. It places a 6-month status blockade across all Gulf countries. Understand these key rejection areas to avoid issues:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    {enrichmentData.rejectionReasons.map((reason, rIdx) => (
                      <div key={rIdx} className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-start gap-1.5 text-slate-300">
                        <span className="text-red-500 shrink-0 select-none mt-0.5 leading-none">✖</span>
                        <span className="font-sans leading-relaxed">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB E: DRIVING LICENSE & LIFE SETTLEMENT */}
            {activeTab === 'life' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                    <Car className="text-amber-500 w-6 h-6" />
                    <span>Driving License & Settlement Guide</span>
                  </h3>
                  <p className="text-xs text-slate-400">Road examination procedures, living accommodations, local SIMs, and digital banking setup.</p>
                </div>

                {/* Sub-tab slider interface inside Life */}
                <div className="flex flex-wrap gap-1 bg-slate-900/50 p-1 rounded-2xl border border-slate-850">
                  {[
                    { id: 'driving', label: 'Driving License' },
                    { id: 'housing', label: 'Accommodations' },
                    { id: 'sim', label: 'SIM/Telecom' },
                    { id: 'banking', label: 'Digital Bank' },
                    { id: 'culture', label: 'Work Culture' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setLifeSubTab(sub.id as any)}
                      className={`px-3 py-2 text-xs font-extrabold rounded-xl transition cursor-pointer select-none ${
                        lifeSubTab === sub.id
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {/* Local Sub-views container */}
                <div className="p-5.5 bg-slate-900/30 border border-slate-850 rounded-3xl min-h-[300px] animate-fadeIn">
                  
                  {/* Option A: DRIVING LICENSE FLOW */}
                  {lifeSubTab === 'driving' && (
                    <div className="space-y-5">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                        <h4 className="font-black text-slate-100 text-sm sm:text-base">Gulf State Driving School Road trial</h4>
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-mono font-black px-2.5 py-1 rounded-lg">Estimated: {country.drivingLicenseGuide.approxCost}</span>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">Required Pre-conditions:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {country.drivingLicenseGuide.requirements.map((req, idx) => (
                            <div key={idx} className="flex gap-2 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-900 font-sans font-medium text-slate-300">
                              <span className="text-emerald-400 shrink-0">✔</span>
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3.5 pt-2">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">Driving school course stages:</span>
                        <div className="space-y-2">
                          {country.drivingLicenseGuide.process.map((pStep, idx) => (
                            <div key={idx} className="flex gap-3 text-xs bg-slate-950 p-3 rounded-2xl border border-slate-900">
                              <span className="w-5.5 h-5.5 rounded-full bg-slate-900 text-amber-500 border border-slate-800 flex items-center justify-center font-mono font-bold text-[10.5px] select-none shrink-0">{idx+1}</span>
                              <p className="leading-relaxed font-medium text-slate-300 font-sans">{pStep}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Option B: HOUSING DETAILS */}
                  {lifeSubTab === 'housing' && (
                    <div className="space-y-5">
                      <h4 className="font-black text-slate-100 text-sm sm:text-base pb-3 border-b border-slate-850">Settlement Accommodations & Flat Leases</h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Typical apartments rates inside cities boundaries. Most rentals require registered municipal folders in system systems:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {enrichmentData.accommodationOptions.map((opt, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-900 hover:border-slate-800 p-4.5 rounded-2xl flex flex-col justify-between space-y-2 text-xs transition">
                            <div className="space-y-1">
                              <span className="text-[9px] bg-slate-900 border border-slate-800 text-amber-400 px-2.5 py-1 rounded font-mono font-bold block w-fit">{opt.type}</span>
                              <strong className="text-slate-200 mt-2 block font-sans text-sm">{opt.price}</strong>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal font-sans pt-1 border-t border-slate-900">{opt.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option C: TELECOMS MOBILE */}
                  {lifeSubTab === 'sim' && (
                    <div className="space-y-5">
                      <h4 className="font-black text-slate-100 text-sm sm:text-base pb-3 border-b border-slate-855">Local Mobile Operators & SIM Registration</h4>
                      <p className="text-xs text-slate-400 font-sans">
                        You can immediately purchase tourist/foreigner SIM packs at the airport. They must be registered with your Border Number stamp:
                      </p>

                      <div className="space-y-3">
                        {enrichmentData.telecoms.map((sim, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-900 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                            <div className="space-y-1">
                              <h5 className="font-sans font-bold text-slate-200 text-sm">{sim.operator}</h5>
                              <p className="font-sans text-[11px] text-slate-400">{sim.comment}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[9px] text-slate-500 block uppercase font-mono">AVG 5G SPEED</span>
                              <strong className="text-amber-500 font-black">{sim.speed}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option D: DIGITAL BANK */}
                  {lifeSubTab === 'banking' && (
                    <div className="space-y-5">
                      <h4 className="font-black text-slate-100 text-sm sm:text-base pb-3 border-b border-slate-850">Local Banking & Digital Wallets</h4>
                      <p className="text-xs text-slate-400 font-sans">
                        Setting up banking streams is critical to receive monthly wages legally checking compliance lists:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {enrichmentData.bankingOptions.map((bk, idx) => (
                          <div key={idx} className="p-4 bg-slate-950 border border-slate-900 rounded-2xl text-xs space-y-2">
                            <span className="text-[10px] text-slate-500 block font-mono">LICENSED PROVIDER</span>
                            <h5 className="font-bold text-slate-200 text-sm">{bk.bank}</h5>
                            <div className="bg-slate-900 p-2.5 rounded-xl mt-1.5 border border-slate-850 font-sans">
                              <span className="text-[10px] tracking-wider text-amber-500 block font-mono">SYSTEM FEATURES</span>
                              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{bk.features}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option E: WORK CULTURE */}
                  {lifeSubTab === 'culture' && (
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-100 text-sm sm:text-base pb-3 border-b border-slate-850">Expat Compliance & Cultural Mandates</h4>
                      <div className="space-y-2.5">
                        {enrichmentData.workCultureTips.map((tip, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-950 border border-slate-900 rounded-2xl flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="text-amber-500 font-bold shrink-0 mt-0.5">💡</span>
                            <p className="font-sans leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Permanent residency card info bar */}
                <div className="p-5.5 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3.5">
                  <div className="flex justify-between items-start pb-2.5 border-b border-slate-850">
                    <div>
                      <h4 className="font-extrabold text-slate-200 text-sm font-mono flex items-center gap-1.5">
                        <UserCheck className="w-5 h-5 text-emerald-400" />
                        <span>Residency Status: {country.residenceGuide?.iqamaName || 'Permanent Resident'}</span>
                      </h4>
                      <p className="text-xs text-slate-400">Essential rules, physical card renewal fees, and visa privileges.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl space-y-2">
                      <span className="font-bold text-emerald-400 text-[11.5px] block">🏆 Resident Benefits</span>
                      <ul className="space-y-1.5 font-medium text-slate-300 text-[11px] leading-relaxed">
                        {country.residenceGuide?.benefits.map((b, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-emerald-400 mt-1">✔</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl space-y-2">
                      <span className="font-bold text-amber-400 text-[11.5px] block">📢 Important Obligations</span>
                      <ul className="space-y-1.5 font-medium text-slate-300 text-[11px] leading-relaxed">
                        {country.residenceGuide?.rights.map((r, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-amber-500 mt-1 font-bold">!</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-red-950/20 border border-red-950 rounded-2xl flex justify-between items-center text-xs text-red-400 font-mono">
                    <span>Yearly Sponsor Renewal Fee:</span>
                    <strong className="text-red-300">{country.residenceGuide?.renewalFee}</strong>
                  </div>
                </div>

              </div>
            )}

            {/* TAB F: DOSSIER CHECKLIST & PDF ACTION DRAFT */}
            {activeTab === 'documents' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-100">
                      Immigration Milestone Checklists
                    </h3>
                    <p className="text-xs text-slate-400">Check tasks interactively to monitor progress. Data is fully saved locally.</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={exportChecklistToPDF}
                      disabled={isExportingPDF}
                      className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-500 font-bold px-4 py-2 rounded-xl text-xs text-slate-950 cursor-pointer transition select-none disabled:cursor-not-allowed"
                    >
                      {isExportingPDF ? (
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4" />
                      )}
                      <span>{isExportingPDF ? 'Exporting...' : 'Export PDF'}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 cursor-pointer transition select-none"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Page</span>
                    </button>
                  </div>
                </div>

                {pdfSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-950/45 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-400 font-sans"
                  >
                    <CircleCheck className="w-4 h-4 shrink-0 text-emerald-500 animate-bounce" />
                    <span>Checklist PDF successfully built and downloaded! Maintain safe offline records of your immigration milestones.</span>
                  </motion.div>
                )}

                {/* Progress bar and Completed Status */}
                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold block">Current Task Completion:</span>
                    <span className="font-mono text-amber-500 font-black text-sm">{completionPercentage}% Completed</span>
                  </div>

                  <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-850 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[11px]">Keep checking remaining actions prior to flight departures.</span>
                    <button
                      onClick={() => { setCheckedBefore({}); setCheckedAfter({}); }}
                      className="text-[10.5px] text-red-400 hover:text-red-300 font-mono select-none cursor-pointer"
                    >
                      Reset Checks
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Column 1 - Before departure Pakistan */}
                  <div className="space-y-3.5">
                    <h4 className="font-bold text-slate-200 text-[13px] uppercase font-mono tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                      <span>Before Departure (Pakistan Stage)</span>
                      <span className="text-[11px] text-slate-500 font-bold">{checkedBeforeCount}/{beforeListLength} Checked</span>
                    </h4>

                    <div className="space-y-2">
                      {enrichmentData.checklistBefore?.map((item, idx) => {
                        const isChecked = checkedBefore[idx] || false;
                        return (
                          <div
                            key={idx}
                            onClick={() => setCheckedBefore(prev => ({ ...prev, [idx]: !prev[idx] }))}
                            className={`flex gap-3 items-start p-3 bg-slate-950 border rounded-2xl transition cursor-pointer select-none ${
                              isChecked 
                                ? 'border-emerald-500/20 bg-emerald-950/5 text-slate-400' 
                                : 'border-slate-900 text-slate-200 hover:border-slate-800'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={() => {}}
                              className="w-4.5 h-4.5 rounded border-slate-800 accent-emerald-500 bg-slate-900 cursor-pointer mt-0.5"
                            />
                            <span className="text-xs leading-relaxed font-sans font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 2 - After Arrival Gulf */}
                  <div className="space-y-3.5">
                    <h4 className="font-bold text-slate-200 text-[13px] uppercase font-mono tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                      <span>After Arrival (In-Country Settlement)</span>
                      <span className="text-[11px] text-slate-500 font-bold">{checkedAfterCount}/{afterListLength} Checked</span>
                    </h4>

                    <div className="space-y-2">
                      {enrichmentData.checklistAfter?.map((item, idx) => {
                        const isChecked = checkedAfter[idx] || false;
                        return (
                          <div
                            key={idx}
                            onClick={() => setCheckedAfter(prev => ({ ...prev, [idx]: !prev[idx] }))}
                            className={`flex gap-3 items-start p-3 bg-slate-950 border rounded-2xl transition cursor-pointer select-none ${
                              isChecked 
                                ? 'border-emerald-500/20 bg-emerald-950/5 text-slate-400' 
                                : 'border-slate-900 text-slate-200 hover:border-slate-800'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={() => {}}
                              className="w-4.5 h-4.5 rounded border-slate-800 accent-emerald-500 bg-slate-900 cursor-pointer mt-0.5"
                            />
                            <span className="text-xs leading-relaxed font-sans font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* PDF download direct banner */}
                <div className="bg-[#0b1b3d] border border-slate-800 hover:border-slate-700 text-white p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 transition shadow-xl mt-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-amber-400 text-sm sm:text-base">
                      Download Detailed {country.name} Dossier Kit (PDF)
                    </h4>
                    <p className="text-xs text-slate-300 max-w-xl font-sans leading-relaxed">
                      Contains exact Qiwa templates, medical checkup slips format, Absher profile setup steps and RTA exam computers question cards.
                    </p>
                  </div>

                  <button
                    onClick={exportChecklistToPDF}
                    disabled={isExportingPDF}
                    className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-500 active:scale-95 text-slate-950 font-black text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer transition select-none shrink-0 disabled:cursor-not-allowed"
                  >
                    {isExportingPDF ? (
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <FileDown className="w-4 h-4 shrink-0" />
                    )}
                    <span>{isExportingPDF ? 'Exporting...' : 'Download PDF Guide'}</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB G: FAQ ACCORDION WITH LIVE SEARCH */}
            {activeTab === 'faqs' && (
              <div id="faqs" className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                    <HelpCircle className="text-amber-500 w-6 h-6" />
                    <span>Help Center & FAQ Archive</span>
                  </h3>
                  
                  {/* Live Search input */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search questions (e.g. Absher, QIWA, lung scans, minimum wage)..."
                      value={faqQuery}
                      onChange={(e) => setFaqQuery(e.target.value)}
                      className="w-full pl-10.5 pr-4 py-3 bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans shadow"
                    />
                  </div>
                </div>

                {/* Collapsible FAQ Accordion mapping */}
                <div className="space-y-3">
                  {country.faqs
                    .filter(faq => 
                      faq.question.toLowerCase().includes(faqQuery.toLowerCase()) || 
                      faq.answer.toLowerCase().includes(faqQuery.toLowerCase())
                    )
                    .map((faq, index) => {
                      const isOpen = expandedFaq === index;
                      return (
                        <motion.div 
                          key={`${faq.question}-${faqQuery}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="bg-slate-900/30 border border-slate-800 hover:border-slate-750 rounded-2xl transition duration-150 overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFaq(isOpen ? null : index)}
                            className="w-full text-left p-4.5 flex justify-between items-center gap-3 select-none cursor-pointer text-slate-200 hover:text-white transition"
                          >
                            <span className="font-extrabold text-xs sm:text-[13.5px] leading-relaxed">{faq.question}</span>
                            <div className="w-5 h-5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-center shrink-0">
                              {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500 transition" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 pt-1 border-t border-slate-850/40 animate-slideDown">
                              <p className="text-xs text-slate-400 leading-relaxed font-sans pl-2.5 border-l-2 border-amber-500">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  
                  {country.faqs.filter(faq => 
                    faq.question.toLowerCase().includes(faqQuery.toLowerCase()) || 
                    faq.answer.toLowerCase().includes(faqQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-10 space-y-2 text-slate-500 font-mono text-xs">
                      <span>No matched questions found matching "{faqQuery}"</span>
                      <p className="font-sans text-[11px] text-slate-600">Try typing "QIWA", "medical" or search other terms, or click Book Consultation below.</p>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>

          {/* SIDE BAR DIRECTORY GUIDES (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Attestation card */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5.5 space-y-4 shadow-xl">
              <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2.5 flex items-center gap-1.5 font-mono">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Document Attestations</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Embassies require all medical reports, police clearance folders, and academic transcripts attested. We process these directly.
              </p>
              
              <div className="space-y-2 font-mono text-[11px]">
                {[
                  { name: 'HEC Degree Verification', price: 'Rs 4,500' },
                  { name: 'MOFA Pakistan Stamps', price: 'Rs 2,500' },
                  { name: 'Legal Translation to Arabic', price: 'Rs 1,500' }
                ].map((att, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-900/60 border border-slate-850 rounded-xl">
                    <span className="font-bold text-slate-300 font-sans">{att.name}</span>
                    <span className="text-emerald-400 font-black">{att.price}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-3 rounded-xl transition cursor-pointer select-none shadow hover:shadow-lg active:scale-95"
              >
                Apply for Attestations
              </button>
            </div>

            {/* Helpline contact card */}
            <div className="bg-gradient-to-br from-slate-950 via-[#0b1b3d]/60 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden text-center group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-amber-400 m-auto select-none shadow">
                📞
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-100 text-sm font-sans">
                  Direct WhatsApp Support
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Speak with a representative to solve unassigned medical slots or Qiwa/Absher lockouts. Available 24/7.
                </p>
              </div>

              <a
                href={`https://wa.me/923001234567?text=Hi, I am looking for details regarding ${country.name} visa processing steps.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl text-white font-black text-xs text-center flex items-center justify-center gap-2 shadow transition cursor-pointer select-none"
              >
                <MessageSquare className="w-4 h-4 fill-white animate-pulse" />
                <span>Chat with {country.name} Expert</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
