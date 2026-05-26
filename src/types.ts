export interface VisaCategory {
  type: 'Work Visa' | 'Family Visa' | 'Visit Visa' | 'Business Visa' | 'Residence Guide';
  title: string;
  duration: string;
  processingTime: string;
  fee: string;
  description: string;
  documents: string[];
  popularJobs?: { title: string; salary: string }[];
}

export interface StepProcess {
  step: number;
  title: string;
  description: string;
  detail: string;
  iconName: string;
}

export interface JobListing {
  title: string;
  industry: string;
  demand: 'Very High' | 'High' | 'Medium';
  averageSalary: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  urduTitle: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
  category: string;
}

export interface UpdateNews {
  id: string;
  title: string;
  date: string;
  category: 'Rules' | 'Visa' | 'Medical' | 'Jobs';
  status: 'New' | 'Updated' | 'Important';
  summary: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatarUrl: string;
  quote: string;
}

export interface CountryData {
  id: string;
  name: string;
  nativeName?: string;
  flag: string;
  coverImage: string;
  capital: string;
  currency: string;
  language: string;
  avgSalaryRange: string;
  costOfLiving: 'Low' | 'Medium' | 'High';
  overview: string;
  visaCategories: VisaCategory[];
  stepProcess: StepProcess[];
  requiredGeneralDocuments: string[];
  medicalGuide: {
    title: string;
    approvedCenters: string;
    steps: string[];
    fees: string;
    tips: string[];
  };
  biometricsGuide: {
    title: string;
    centerLocation: string;
    steps: string[];
    fees: string;
  };
  jobs: JobListing[];
  drivingLicenseGuide: {
    requirements: string[];
    process: string[];
    approxCost: string;
  };
  residenceGuide: {
    iqamaName: string;
    renewalFee: string;
    benefits: string[];
    rights: string[];
  };
  faqs: FAQItem[];
}

export interface PopularService {
  id: string;
  name: string;
  urduName: string;
  icon: string;
  description: string;
  estimatedDays: string;
  approxFee: string;
}

export interface SearchQuery {
  countryId: string;
  visaType: string;
  searchTerm: string;
}
