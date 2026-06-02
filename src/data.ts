// Integrated with premium dashboard enrichment structures in CountryDetail
import { CountryData, PopularService, VideoTutorial, UpdateNews, Testimonial, FAQItem } from './types';

export const GULF_COUNTRIES: CountryData[] = [
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    nativeName: 'السعودية',
    flag: '🇸🇦',
    coverImage: '/images/saudi.avif',
    capital: 'Riyadh',
    currency: 'Saudi Riyal (SAR)',
    language: 'Arabic / English',
    avgSalaryRange: 'SAR 3,500 - 15,000 / Month',
    costOfLiving: 'Medium',
    overview: 'Saudi Arabia is the largest country in the Gulf region, offering massive opportunities under its Vision 2030 program. Major sectors for employment include Construction, Engineering, Healthcare, IT, and Hospitality. The country is transitioning to a digitized system, streamlining Iqama, driving license procurement, and medical screening.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Work Visa (Employment)',
        duration: '1 Year (Renewable)',
        processingTime: '15 - 30 Days',
        fee: 'SAR 2,000',
        description: 'Requires an official sponsor (Kafeel) or a company registered under Qiwa portal. Entitles you to receive a Muqeem / Iqama ID card upon arrival.',
        documents: [
          'Original Passport (Valid for at least 6 months)',
          'Sponsorship Invitation Letter via MOFA',
          'Attested Academic Degrees / Technical Certifications',
          'GAMCA Medical Fit Certificate',
          'Biometrics confirmation slip',
          'Police Clearance Certificate (PCC) attested by Saudi Embassy'
        ],
        popularJobs: [
          { title: 'Civil Engineer', salary: 'SAR 6,000 - 12,000' },
          { title: 'Heavy Driver', salary: 'SAR 2,200 - 3,500' },
          { title: 'Staff Nurse', salary: 'SAR 4,500 - 7,000' },
          { title: 'Electrician / Plumber', salary: 'SAR 1,800 - 2,800' }
        ]
      },
      {
        type: 'Family Visa',
        title: 'Family Visit & Residence Visa',
        duration: '90 Days to 1 Year',
        processingTime: '5 - 10 Days',
        fee: 'SAR 300 - 500',
        description: 'For dependents of expatriates. Can be issued as a Multi-Entry Family Visit or a permanent Family Residence Visa (Istiqlam) under professional professions.',
        documents: [
          'Sponsor\'s valid Iqama copy',
          'Relationship proof (Marriage certificate, birth certificates attested by MOFA)',
          'Sponsor\'s Salary Certificate and Bank Statement',
          'Health insurance coverage within Saudi Arabia'
        ]
      },
      {
        type: 'Visit Visa',
        title: 'Personal Visit / Tourist eVisa',
        duration: '90 Days (Multi-Entry)',
        processingTime: '24 Hours',
        fee: 'SAR 440 (Includes Health Insurance)',
        description: 'Available as electronic visa (eVisa) or instant visa for Schengen/US/UK holders. Allows exploring cities, doing Umrah, and visiting friends.',
        documents: [
          'Passport copy with 6 months validity',
          'Return ticket reservation',
          'Confirmed hotel booking or address of host'
        ]
      },
      {
        type: 'Business Visa',
        title: 'Business Investor / Commercial Visa',
        duration: '30 to 180 Days',
        processingTime: '3 - 7 Days',
        fee: 'SAR 1,200',
        description: 'For business owners, representatives, or executives visiting Saudi companies or attending trade exhibits.',
        documents: [
          'Invitation letter from Saudi Chamber of Commerce and Industry',
          'Company introducing letter stating purpose of visit',
          'Business registration of Saudi entity'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Passport Valid', description: 'At least 6 months remaining validity.', detail: 'Confirm passport spelling matches certificates.', iconName: 'Passport' },
      { step: 2, title: 'Document Attestation', description: 'Degree & MOFA attestation.', detail: 'Degree verification via HEC / Culture Office.', iconName: 'FileCheck' },
      { step: 3, title: 'GAMCA Medical', description: 'Register & pass health tests.', detail: 'Book pre-departure medical slot at an approved center.', iconName: 'HeartPulse' },
      { step: 4, title: 'Biometrics', description: 'Fingerprints booking at center.', detail: 'Schedule via Etimad Saudi Visa Center.', iconName: 'Fingerprint' },
      { step: 5, title: 'Visa Stamping', description: 'MOFA application submission.', detail: 'Passport submitted to Embassy via agent.', iconName: 'CheckSquare' },
      { step: 6, title: 'Travel & Entry', description: 'Fly & get border stamp.', detail: 'Arrive in Gulf, check border number written on passport.', iconName: 'PlaneTakeoff' },
      { step: 7, title: 'Residence/Iqama', description: 'Get Muqeem Residency Card.', detail: 'Employer issues physical ID within 90 days after medical.', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Digital Passport Size Photos (White background)',
      'GAMCA Certificate indicating Medical Fit',
      'Attested Degree in Urdu/English + Arabic Translation',
      'Original Visa SLA / Employment Contract signed via Qiwa'
    ],
    medicalGuide: {
      title: 'GAMCA (Wafid) Medical Process for Saudi Arabia',
      approvedCenters: 'GAMCA Approved Medical Centers (Wafid registry)',
      fees: 'USD 10 (Online Booking Fee) + approx Rs 22,000 (at clinic)',
      steps: [
        'Visit the Wafid.com website to book your slip online matching your passport details.',
        'Deposit fee and receive the randomized assigned medical clinic slip.',
        'Visit clinic with Passport copy, original passport, slip and white-background photographs.',
        'Tests performed: Chest X-Ray, Blood samples (HIV, Hepatitis B/C, Sexually Transmitted Infections), Eyesight, Blood Pressure, and general fitness check.',
        'Receive standard status: FIT or UNFIT on Wafid portal in 24-48 hours.'
      ],
      tips: [
        'Ensure you have no recent scarred tissue on lungs (which shows up in X-ray).',
        'Drink plenty of water. Control high blood pressure with temporary advice if needed.',
        'Avoid sugary milk or heavy fat meals 12 hours prior to the test.'
      ]
    },
    biometricsGuide: {
      title: 'Etimad Fingerprint & Biometrics Process',
      centerLocation: 'Etimad Centers - Major cities (Karachi, Lahore, Islamabad, Peshawar, Quetta)',
      fees: 'Approx Rs 14,500 includes normal fee, passport return courier, SMS alerts, and fast premium service options.',
      steps: [
        'Create account in VFS TasHeel/Etimad portal.',
        'Select visa category (Work, Residence, Visit) and insert the MOFA Visa Number generated by sponsor.',
        'Book available slot representing preferred date.',
        'Present physical documents, receipt of visa draft, passport, and allow camera scan & 10-fingerprint digital reader scan.'
      ]
    },
    jobs: [
      { title: 'Safety Engineer', industry: 'Construction / Safety', demand: 'Very High', averageSalary: 'SAR 5,500 - 9,000' },
      { title: 'Warehouse Supervisor', industry: 'Logistics', demand: 'High', averageSalary: 'SAR 3,200 - 5,000' },
      { title: 'Restaurant Commis / Chef', industry: 'Hospitality / Food', demand: 'Very High', averageSalary: 'SAR 2,200 - 4,000' },
      { title: 'AC Technician', industry: 'Maintenance / HVAC', demand: 'High', averageSalary: 'SAR 2,500 - 3,800' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid physical Iqama (Residence Card)',
        'Original Passport copy',
        'Blood Group Report (from certified Saudi clinic)',
        '4 Passport size photos'
      ],
      process: [
        'Register in Absher portal and complete digital booking at Saudi Dallah Driving School.',
        'Complete the medical eye test and blood test registration.',
        'Pay standard license fee (SAR 400 for 10 years, SAR 200 for 5 years) via online bank transfer.',
        'Attend mandatory training (if beginner, 30 hours; if prior valid national license, immediate trial exam).',
        'Complete the computer multiple-choice exam (available in English, Urdu, Hindi, Arabic) and the road steering test.'
      ],
      approxCost: 'SAR 600 - 2,500 depending on training hours'
    },
    residenceGuide: {
      iqamaName: 'Iqama (Muqeem Passport Identity Card)',
      renewalFee: 'SAR 650 (Human Resources) + SAR 500 (Passport Dept) + Insurance cost',
      benefits: [
        'Legal right to reside, open bank accounts, and rent accommodation.',
        'Eligibility to sponsor immediate immediate family visit visas.',
        'Ability to purchase cars, bikes, and register personal lines.'
      ],
      rights: [
        'Must carry the ID Card at all times otherwise fine of SAR 1,000.',
        'Renewal is the sole responsibility of your sponsor; check expiration in Absher.'
      ]
    },
    faqs: [
      { question: 'Can I do Umrah on a Free Saudi Business Visit Visa?', answer: 'Yes! Business visaholders can perform Umrah in Makkah freely except during the designated Hajj period restrictors.' },
      { question: 'What is Qiwa and how does it relate to employment?', answer: 'Qiwa is the official labor contract framework in Saudi Arabia. Your work contract must be accepted digitally in Qiwa to proceed to typing your visa application.' },
      { question: 'How can I check my Iqama status online?', answer: 'You can check it via Absher portal or Moj (Ministry of Justice) site with your Muqeem Border Number.' }
    ]
  },
  {
    id: 'uae',
    name: 'UAE (United Arab Emirates)',
    nativeName: 'الإمارات',
    flag: '🇦🇪',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    capital: 'Abu Dhabi',
    currency: 'UAE Dirham (AED)',
    language: 'Arabic / English',
    avgSalaryRange: 'AED 3,000 - 18,000 / Month',
    costOfLiving: 'High',
    overview: 'The United Arab Emirates (encompassing Dubai, Abu Dhabi, Sharjah, Ajman, and more) is a global financial and trade epicentre. It is widely known for Golden Visas, corporate expansion, dynamic real estate engineering, and robust digital systems.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Employment / Residency Visa',
        duration: '2 Years (Renewable)',
        processingTime: '7 - 14 Days',
        fee: 'AED 1,500',
        description: 'Arranged by employer after MOHRE quota approval. Requires digital signature on offer contract and subsequent medical fitness examination within UAE limits.',
        documents: [
          'Passport copy with 6 months validation',
          'Attested degree certificate (by Ministry of Foreign Affairs, UAE)',
          'High resolution background photographs',
          'Offer contract draft from MOHRE'
        ],
        popularJobs: [
          { title: 'Project Manager', salary: 'AED 12,000 - 25,000' },
          { title: 'Real Estate Agent', salary: 'Commission + AED 4,000' },
          { title: 'Digital Marketer', salary: 'AED 5,000 - 9,000' },
          { title: 'HVAC Supervisor', salary: 'AED 3,800 - 6,000' }
        ]
      },
      {
        type: 'Visit Visa',
        title: 'Dubai Tourist / Visit Visa (30 or 60 days)',
        duration: '30 / 60 Days',
        processingTime: '48 Hours',
        fee: 'AED 350 - 650',
        description: 'Single or Multiple entry option for families, tourists and job hunters to legally scout the emirates.',
        documents: [
          'Clear scanned passport page (first & last)',
          'Sponsor / Applicant guarantee deposit if applicable',
          'Travel itinerary and flight tickets'
        ]
      },
      {
        type: 'Business Visa',
        title: 'Golden Visa / Green Investor Visa',
        duration: '5 - 10 Years',
        processingTime: '5 Days',
        fee: 'AED 2,800',
        description: 'Long-term residency options for property owners, tech professionals, high achievers, and business developers wanting self-sponsorship.',
        documents: [
          'Proof of investment / monthly salary draft exceeding AED 30,000',
          'Professional license / Specialization degree'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Contract Signature', description: 'Offer contract with MOHRE approval.', detail: 'Digitally certify contract in Gulf systems.', iconName: 'FileCheck' },
      { step: 2, title: 'Entry Permit', description: 'Employer applies for initial entry slip.', detail: 'Download Entry Permit PDF prior to flights.', iconName: 'DocumentText' },
      { step: 3, title: 'Travel to UAE', description: 'Land at Dubai / Abu Dhabi.', detail: 'Activate entry permit status at border control lanes.', iconName: 'PlaneTakeoff' },
      { step: 4, title: 'Medical Screening', description: 'Blood and chest X-ray tests.', detail: 'Complete at DHA / MOHAP centers inside UAE borders.', iconName: 'HeartPulse' },
      { step: 5, title: 'Biometrics', description: 'ICP Emirates ID center booking.', detail: 'Scan fingerprints for the digital identity card program.', iconName: 'Fingerprint' },
      { step: 6, title: 'Residence Stamping', description: 'Virtual residency sticker issue.', detail: 'Confirm on ICP mobile app dashboard.', iconName: 'BadgeCheck' },
      { step: 7, title: 'Emirates ID Delivery', description: 'Receive physical Emirates ID.', detail: 'Dispatched through Emirates Post inside 5-7 days.', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Original Passport & Entry Permit PDF',
      'Attested Degree by UAE Embassy in Home Country',
      'Passport size photos matching smart guidelines',
      'Approved UAE Health Insurance Card'
    ],
    medicalGuide: {
      title: 'UAE In-Country Medical Assessment',
      approvedCenters: 'DHA Centers in Dubai / MOHAP Preventive Clinics',
      fees: 'AED 250 (Regular) to AED 750 (VIP 2-hour processing)',
      steps: [
        'Fill digital medical form on ICP or DHA app.',
        'Proceed to clinic with original passport and entry permit.',
        'Blood test for HIV, Syphilis, and Hepatitis B.',
        'Chest X-Ray for active tuberculosis traces.',
        'Results shared digitally to your registered email & ICP portal.'
      ],
      tips: [
        'Unfit results on active infectious TB require quarantine review or exit.',
        'Choose VIP health packages if you are in a rush to stamp visas within 48 hours.'
      ]
    },
    biometricsGuide: {
      title: 'ICP Emirates ID Biometrics Registry',
      centerLocation: 'ICP Customer Happiness Centers across major sectors.',
      fees: 'Included in visa registry fees (AED 170 to 370 approx range).',
      steps: [
        'Complete online ICP visa application.',
        'Obtain appointment receipt paper with barcodes.',
        'Capture digital photo signature and submit 10-finger screen scans.',
        'Physical card reaches mail box after digital clearance.'
      ]
    },
    jobs: [
      { title: 'Civil Site Engineer', industry: 'Construction', demand: 'High', averageSalary: 'AED 4,500 - 8,000' },
      { title: 'F&B Wait Staff', industry: 'Hotels / Dining', demand: 'Very High', averageSalary: 'AED 2,000 - 3,500' },
      { title: 'Graphic Designer', industry: 'Creative Services', demand: 'Medium', averageSalary: 'AED 4,000 - 7,000' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid Emirates ID',
        'Eye exam checkup certificate',
        'NOC Certificate from sponsor (if required by job category)',
        'Copy of Home Driving license (if claiming discount)'
      ],
      process: [
        'Open electronic file at Dubai RTA or Abu Dhabi Police.',
        'Complete eye test at certified shops (like Barakat, Al Jaber).',
        'Book theory modules (either e-learning or live classes).',
        'Pass RTA computerized theory test inside testing room.',
        'Take yard assessment and road test under examiner observer.'
      ],
      approxCost: 'AED 4,000 - 6,500'
    },
    residenceGuide: {
      iqamaName: 'Emirates Residency / Emirates ID Card',
      renewalFee: 'Depending on employer sponsor - approx AED 1,200',
      benefits: [
        'Open dynamic multi-currency bank accounts, buy and lease vehicles.',
        'Acquire global travel visas easily via Dubai hubs.',
        'Discounted entries to state attractions, events, and parks.'
      ],
      rights: [
        'Must not stay outside UAE of more than 180 continuous days unless Golden Visa holder.'
      ]
    },
    faqs: [
      { question: 'What is the minimum wage for skilled employees in UAE?', answer: 'For degree holders with certified skills, MOHRE enforces professional limits depending on sector agreements.' },
      { question: 'Can I change employers during the trial period?', answer: 'Yes, but strict MOHRE clauses require submitting formal notice periods without accumulating structural bans.' }
    ]
  },
  {
    id: 'qatar',
    name: 'Qatar',
    nativeName: 'قطر',
    flag: '🇶🇦',
    coverImage: '/images/qatar.avif',
    capital: 'Doha',
    currency: 'Qatari Riyal (QAR)',
    language: 'Arabic / English',
    avgSalaryRange: 'QAR 3,000 - 16,000 / Month',
    costOfLiving: 'High',
    overview: 'Qatar has emerged as one of the wealthiest countries globally. Following major infrastructual milestones, its Qatari Riyal is robust and stable. Sector emphasis points securely to Natural Gas, Engineering, Ports, Aviation, Tourism and Global Logistics.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Work Residency Permit (QID)',
        duration: '1 - 3 Years',
        processingTime: '10 - 20 Days',
        fee: 'QAR 500 (Processing)',
        description: 'Requires a valid Work Contract registered under MADLSA. Issued under Qatar Visa Center (QVC) process in home country prior to landing in Doha limits.',
        documents: [
          'Passport showing 6 months validity',
          'Academic certificates attested by MOFA and Qatari Embassy',
          'Approved electronic QVC Medical and Bio confirmation slip',
          'PCC (Police Clearance)'
        ],
        popularJobs: [
          { title: 'Project Estimator', salary: 'QAR 7,000 - 13,000' },
          { title: 'Aviation Steward', salary: 'QAR 6,500 - 11,000' },
          { title: 'Security Supervisor', salary: 'QAR 2,500 - 4,000' },
          { title: 'Mechanical Technician', salary: 'QAR 3,000 - 5,500' }
        ]
      },
      {
        type: 'Visit Visa',
        title: 'Qatar on Arrival / Hayya Portal Visa',
        duration: '30 Days',
        processingTime: 'Instant / 48 Hours',
        fee: 'Free / QAR 100',
        description: 'Available through Hayya platform for tourists. Multi-entry options with hotel health insurance options.',
        documents: [
          'Valid passport',
          'Confirmed return ticket',
          'Hayya card approval or hotel booking via Discover Qatar'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Contract Signed', description: 'Labor contract uploaded online.', detail: 'Verify parameters match promised wage scales.', iconName: 'FileCheck' },
      { step: 2, title: 'QVC Registration', description: 'Schedule medical in home city.', detail: 'Locate nearby QVC Center (e.g. Islamabad, Lahore, Karachi).', iconName: 'Calendar' },
      { step: 3, title: 'QVC Test Pass', description: 'Complete medical & biometric scans.', detail: 'Includes background medical tests and physical scanning.', iconName: 'HeartPulse' },
      { step: 4, title: 'Visa Print', description: 'Download authorized entry visa.', detail: 'Print electronic paper from Ministry of Interior (MOI).', iconName: 'Printer' },
      { step: 5, title: 'Travel & Entry', description: 'Board flight and pass immigration.', detail: 'Check-in on arriving lanes at Hamad International Airport.', iconName: 'PlaneTakeoff' },
      { step: 6, title: 'Qatar Medical', description: 'In-country confirmation check.', detail: 'Brief medical check at Medical Commission building, Doha.', iconName: 'PlusCircle' },
      { step: 7, title: 'QID Generation', description: 'Receive QID Smartcard.', detail: 'Permits renting, contracting, and opening card utilities.', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Original Passport with 8 empty pages',
      'HEC verified degree matching job block title',
      'Recent smart photos (blue background is sometimes Qatar specific)',
      'Police clearance background certificate verified by MOFA'
    ],
    medicalGuide: {
      title: 'Qatar QVC Dual Medical System Guidance',
      approvedCenters: 'Qatar Visa Centers (QVC) in home country + Medical Commission in Qatar',
      fees: 'USD 137 paid by employer on MOH portal during appointment.',
      steps: [
        'Employer schedules appointment at official QVC centers.',
        'Applicant attends QVC with printout, original passport.',
        'Blood collection (HIV, Hepatitis testing check) & Chest X-ray.',
        'Fingers scanner registration on same spot.',
        'Results locked in MOI cloud system within 3 working days.'
      ],
      tips: [
        'Do not have heavy cold or fever symptoms during scheduled checkup days.',
        'Avoid taking caffeine / energy boosts prior to checking blood pressures.'
      ]
    },
    biometricsGuide: {
      title: 'Qatar Visa Center digital biometrics registration',
      centerLocation: 'QVC Islamabad, Karachi or assigned regional hubs.',
      fees: 'Zero fee for individual physical scans (paid by employer).',
      steps: [
        'Occurs automatically during your designated QVC medical inspection visit.'
      ]
    },
    jobs: [
      { title: 'Airport Security Agent', industry: 'Aviation', demand: 'Very High', averageSalary: 'QAR 2,200 - 3,500' },
      { title: 'Procurement Specialist', industry: 'Corporate', demand: 'High', averageSalary: 'QAR 6,000 - 10,000' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid Qatar ID (QID)',
        'Eye exam check slip',
        'Home driving license matching eligibility checklists'
      ],
      process: [
        'Receive NOC authorization through employer online systems.',
        'Sign up at a certified Qatar driving school (e.g., Karwa, Al Khebra).',
        'Enroll in short 15-day course or 40-day scale depending on tests.',
        'Acquire RTA passing codes on final computer and vehicle control checks.'
      ],
      approxCost: 'QAR 2,500 - 4,200'
    },
    residenceGuide: {
      iqamaName: 'Qatar Residency Identity Card (QID)',
      renewalFee: 'QAR 1,000 / Year',
      benefits: [
        'Full residency, local bank services, free medical emergencies inside State hospitals.',
        'Access discounted premium services.'
      ],
      rights: [
        'Must secure permission when changing sponsors under exit-permit guidelines.'
      ]
    },
    faqs: [
      { question: 'What is QVC and why is it mandatory?', answer: 'QVC stands for Qatar Visa Centers. They process medical checkups and biometrics in your home country before departure to avoid unfit labor landing in Qatar.' }
    ]
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
    nativeName: 'الكويت',
    flag: '🇰🇼',
    coverImage: 'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=1200&q=80',
    capital: 'Kuwait City',
    currency: 'Kuwaiti Dinar (KWD)',
    language: 'Arabic / English',
    avgSalaryRange: 'KWD 300 - 1,500 / Month',
    costOfLiving: 'High',
    overview: 'Kuwait boasts the world\'s highest-valued currency (KWD). It enjoys dynamic reserves, high banking structures, and is highly active in Petroleum, Desalination, Retailing, Healthcare, and Trade Distribution networks.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Work Visa (Article 18)',
        duration: '1 to 3 Years',
        processingTime: '20 - 45 Days',
        fee: 'KWD 100',
        description: 'Requires an official Work Permit issued by Public Authority for Manpower. Strict age and technical categorization apply.',
        documents: [
          'Passport showing more than 1 year validity',
          'Work Permit issued by Kuwait Government portal',
          'Medical clearance slip attested by Embassy',
          'Police Clearance (PCC) with Embassy stamping'
        ],
        popularJobs: [
          { title: 'Project Estimator', salary: 'KWD 600 - 1,200' },
          { title: 'Technician HVAC', salary: 'KWD 250 - 450' },
          { title: 'Heavy Fleet Driver', salary: 'KWD 350 - 550' }
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Work Permit Slip', description: 'Sponsor issues official Public Authority permit.', detail: 'Must list correct designation matching degrees.', iconName: 'Award' },
      { step: 2, title: 'Medical (Wafid)', description: 'Register pre-flight check.', detail: 'Book online Wafid appointment and get cleared.', iconName: 'HeartPulse' },
      { step: 3, title: 'Embassy Attestation', description: 'Degree & papers verification.', detail: 'Certificates processed via registered agencies.', iconName: 'FileCheck' },
      { step: 4, title: 'Visa Stamping', description: 'Embassy stamps physical passport sticker.', detail: 'Requires presenting verified PCC and original permit.', iconName: 'CheckSquare' },
      { step: 5, title: 'Travel & Fly', description: 'Land in Kuwait City limits.', detail: 'Fingerprints checked at airport immigration desk.', iconName: 'PlaneTakeoff' },
      { step: 6, title: 'Civil ID Stamp', description: 'Physical card typing sequence.', detail: 'Acquire Civil ID with Kuwait digital chip.', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Original Passport & Kuwait Work Permit Paper',
      'PCC from home state matching 3 months issue window',
      'HEC Verified Attested degree from home capital',
      'High resolution photographs'
    ],
    medicalGuide: {
      title: 'Kuwait Embassy Medical Examination Checks',
      approvedCenters: 'Wafid / GAMCA Approved clinics inside domestic centers.',
      fees: 'USD 10 (Online Booking) + appx Rs 24,000 (at assigned clinic).',
      steps: [
        'Complete scheduling on Wafid portal.',
        'Submit blood, sputum, chest X-Ray, HIV panels, and Tuberculosis physical screens.',
        'Wait for FIT registry update on medical portal databases.'
      ],
      tips: [
        'Kuwait has an extremely strict lungs scan protocol; ensure health is excellent.',
        'Carry two physical sets of passport copies & 4 passport size photos.'
      ]
    },
    biometricsGuide: {
      title: 'Kuwait Airport Fingerprint Registry Scanner',
      centerLocation: 'Arriving Terminal immigration or local ministry centers.',
      fees: 'Zero charge.',
      steps: [
        'Upon arriving terminal, proceed to fingerprint check desks before main passport scanners.'
      ]
    },
    jobs: [
      { title: 'Heavy Trailer Driver', industry: 'Logistics', demand: 'Very High', averageSalary: 'KWD 300 - 500' },
      { title: 'Petrochemical Inspector', industry: 'Oil & Gas', demand: 'High', averageSalary: 'KWD 800 - 1,400' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid Kuwait Civil ID',
        'Official Work Designation matching allowed categories (MOH, Engineers, Managers)',
        'Salary certificate showing minimum KWD 600 limits'
      ],
      process: [
        'Obtain permission from traffic licensing authority.',
        'Undergo eyes and physical fit checkups.',
        'Pass computerized test & manual driving loop at licensing center.'
      ],
      approxCost: 'KWD 150 - 400'
    },
    residenceGuide: {
      iqamaName: 'Kuwait Civil ID (Bataqa-Al-Madaniya)',
      renewalFee: 'KWD 20 / Year with valid insurance',
      benefits: [
        'Access government clinics for nominal rates, open private accounts, rent flats.'
      ],
      rights: [
        'Changing sponsors requires official release forms (Tanazul) and biometric confirmation.'
      ]
    },
    faqs: [
      { question: 'What are the rules regarding driving licenses for expats in Kuwait?', answer: 'Kuwait enforces strict occupational & salary thresholds. Expatriates must have professional careers and salary criteria to qualify.' }
    ]
  },
  {
    id: 'bahrain',
    name: 'Bahrain',
    nativeName: 'البحرين',
    flag: '🇧🇭',
    coverImage: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80',
    capital: 'Manama',
    currency: 'Bahraini Dinar (BHD)',
    language: 'Arabic / English',
    avgSalaryRange: 'BHD 250 - 1,200 / Month',
    costOfLiving: 'Medium',
    overview: 'Bahrain provides an extremely welcoming environment, featuring a high concentration of banking structures, tourism networks, manufacturing projects, and direct links to Saudi Arabia via the King Fahd Causeway.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Work Visa (LMRA Permit)',
        duration: '1 or 2 Years',
        processingTime: '10 - 20 Days',
        fee: 'BHD 172',
        description: 'Issued by Labour Market Regulatory Authority (LMRA) upon request of a local commercial establishment.',
        documents: [
          'Passport showing 6 months validity',
          'LMRA Visa registration slip printout',
          'Pre-departure GAMCA medical clearance fit check',
          'PCC attested by MOFA'
        ],
        popularJobs: [
          { title: 'Electrical Quality Inspector', salary: 'BHD 400 - 750' },
          { title: 'Logistics Planner', salary: 'BHD 350 - 600' },
          { title: 'Customer Support Representative', salary: 'BHD 200 - 350' }
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'LMRA Approval', description: 'Employer applies on LMRA portal for authorization.', detail: 'Takes 7 working days to issue electronic approval code.', iconName: 'Award' },
      { step: 2, title: 'GAMCA Medical', description: 'Register pre-departure health tests.', detail: 'Get fit report checked on Wafid website portal.', iconName: 'HeartPulse' },
      { step: 3, title: 'Travel Paper Print', description: 'Obtain landing authorization card.', detail: 'Check validity of landing printout online.', iconName: 'Printer' },
      { step: 4, title: 'Entry biometrics', description: 'Fly to Manama airport.', detail: 'Digital fingerprints and eye scan completed on arrival desks.', iconName: 'Fingerprint' },
      { step: 5, title: 'CPR Status Creation', description: 'Apply for residential register.', detail: 'Register your state code at CIO office to receive smart card.', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Original Passport with valid copies',
      'Wafid Certified medical slip showing FIT status',
      'PCC background report from home country police branch',
      'Sponsor letter issued via LMRA'
    ],
    medicalGuide: {
      title: 'LMRA Mandatory Medical Screening Protocols',
      approvedCenters: 'GAMCA Wafid clinics pre-departure and local state clinics post-departure.',
      fees: 'approx Rs 20,000 pre-departure fee checks.',
      steps: [
        'Secure pre-flight report on Wafid center networks.',
        'Re-undergo physical assessment at local clinic in Manama after arrival.'
      ],
      tips: [
        'Ensure you do not stay awake all night before the physical test as it hikes blood pressure metrics.'
      ]
    },
    biometricsGuide: {
      title: 'CIO Bahrain Identity CPR Fingerprinting',
      centerLocation: 'CIO Building, Manama or airport arrival desks.',
      fees: 'Zero fee.',
      steps: [
        'Complete scans during airport arrival terminal queue.'
      ]
    },
    jobs: [
      { title: 'Call Center Operator', industry: 'Customer Relations', demand: 'High', averageSalary: 'BHD 200 - 350' },
      { title: 'Store Supervisor', industry: 'Retail', demand: 'Medium', averageSalary: 'BHD 250 - 400' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid CPR Card',
        'Eye check report from Manama clinic',
        'Valid home driving country booklet'
      ],
      process: [
        'Register digital file in Traffic Directorate.',
        'Attend driving lessons and take on-road exams with traffic marshal.'
      ],
      approxCost: 'BHD 100 - 250'
    },
    residenceGuide: {
      iqamaName: 'CPR (Identity Population Card of Bahrain)',
      renewalFee: 'BHD 20 / Year',
      benefits: [
        'Open low fee local bank accounts, apply to rent properties, transition to regional causeway passes.'
      ],
      rights: [
        'LMRA status permits safe job movements upon completing designated legal framework guides.'
      ]
    },
    faqs: [
      { question: 'What is CPR in Bahrain?', answer: 'CPR stands for Central Population Registry. It is your national ID card and valid residential document within Bahrain.' }
    ]
  },
  {
    id: 'oman',
    name: 'Oman',
    nativeName: 'عمان',
    flag: '🇴🇲',
    coverImage: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1200&q=80',
    capital: 'Muscat',
    currency: 'Omani Rial (OMR)',
    language: 'Arabic / English',
    avgSalaryRange: 'OMR 250 - 1,100 / Month',
    costOfLiving: 'Medium',
    overview: 'The Sultanate of Oman is renowned for scenic, peaceful habitats, cultural integrity, and a systematic Omanization program. Major operational sectors include Shipping Ports, Oil & Gas development, Fisheries, Construction, and Services.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Work Visa / Patron Sponsor Residency',
        duration: '2 Years',
        processingTime: '15 - 30 Days',
        fee: 'OMR 201 (Employer Fee)',
        description: 'Issued by Royal Oman Police (ROP) after obtaining labor clearance quota from Ministry of Manpower.',
        documents: [
          'Passport showing 6 months validity',
          'Labor Clearance (Ma\'zoonia) issued to Sponsor',
          'Wafid medical FIT certificate',
          'Certificates verified by Oman Embassy'
        ],
        popularJobs: [
          { title: 'Land Surveyor', salary: 'OMR 300 - 550' },
          { title: 'Sales Executive', salary: 'OMR 250 - 450' },
          { title: 'Mechanical Supervisor', salary: 'OMR 400 - 700' }
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Labor Quota', description: 'Sponsor secures Ma\'zoonia clearance papers.', detail: 'Confirms structural permit allotment.', iconName: 'Award' },
      { step: 2, title: 'GAMCA test', description: 'Schedule medical in home base.', detail: 'Acquire verified fitting certificate.', iconName: 'HeartPulse' },
      { step: 3, title: 'Embassy Seal', description: 'Attest certificates at capital embassy.', detail: 'Takes 4-7 days depending on verification lines.', iconName: 'FileCheck' },
      { step: 4, title: 'Travel To Muscat', description: 'Fly to Hamad / Muscat international.', detail: 'Arrive in Oman, pass boundary desks.', iconName: 'PlaneTakeoff' },
      { step: 5, title: 'Patron Card Issue', description: 'Obtain residency card at ROP office.', detail: 'Collect physical smart ID within 15 days.', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Passport physical booklet with empty visa pages',
      'Verified academic diplomas attested by home MOFA and Oman Embassy',
      'PCC certified slip matching recent months issue',
      'Work contract papers'
    ],
    medicalGuide: {
      title: 'Oman Ministry Approved Medical Inspections',
      approvedCenters: 'GAMCA approved clinic groups inside domestic regions.',
      fees: 'approx Rs 18,000 pre-flight checks.',
      steps: [
        'Secure checking slip via Wafid portal.',
        'Complete blood sample screening and chest X-ray scanning checks.',
        'Status updated to FIT online for embassy print.'
      ],
      tips: [
         'Maintain active clean diet, avoid using fatty products 2 days prior.'
      ]
    },
    biometricsGuide: {
      title: 'Oman ROP Fingerprint Registry',
      centerLocation: 'Royal Oman Police Civil Status complexes.',
      fees: 'Zero fee.',
      steps: [
        'Occurs during physical card processing inside local district office.'
      ]
    },
    jobs: [
      { title: 'Storekeeper', industry: 'Warehousing / Logistics', demand: 'High', averageSalary: 'OMR 200 - 350' },
      { title: 'Site Supervisor Mechanical', industry: 'Engineering', demand: 'High', averageSalary: 'OMR 450 - 750' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Oman Civil Smart Card (Residency ID)',
        'Certified Eye analysis certificate',
        'Valid Home state booklet'
      ],
      process: [
        'Open electronic card file in Royal Oman Police traffic department.',
        'Undergo road training and secure passing grades during slope/road checks.'
      ],
      approxCost: 'OMR 80 - 180'
    },
    residenceGuide: {
      iqamaName: 'Oman Residence Card (Bataqa-Al-Iqama)',
      renewalFee: 'OMR 100 on renewal (usually processed by employer sponsor)',
      benefits: [
        'Full residency rights, bank account creations, dynamic local lines register.'
      ],
      rights: [
        'Safe job migration is only allowed upon receiving legal clearance (NOC) papers.'
      ]
    },
    faqs: [
      { question: 'What is Omanization?', answer: 'It is a state policy requiring organizations to recruit Omani nationals in target quotas. Check if your job title has active Omanization restrictions.' }
    ]
  },
  {
    id: 'america',
    name: 'America (USA)',
    nativeName: 'أمريكا',
    flag: '🇺🇸',
    coverImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    capital: 'Washington, D.C.',
    currency: 'US Dollar (USD)',
    language: 'English',
    avgSalaryRange: 'USD 3,500 - 9,500 / Month',
    costOfLiving: 'High',
    overview: 'The United States of America is a global leader in innovation. For professionals from the Gulf and South Asia, America offers pathways through specialized work visas (H-1B, L-1), Student Visas (F-1), and EB-5 Investor Visas.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'H-1B Specialized Work Visa',
        duration: '3 Years (Extendable to 6)',
        processingTime: '3 - 6 Months',
        fee: 'USD 460 (Base Filing)',
        description: 'Requires a sponsoring US employer who files a petition with USCIS. Operates on an annual lottery cap system.',
        documents: [
          'Valid Passport matching spelling criteria',
          'USCIS I-129 Petition Approval Notice',
          'Certified H-HEC education degree evaluations',
          'DS-160 confirmation printout sheet',
          'Sponsor letter'
        ]
      },
      {
        type: 'Visit Visa',
        title: 'B1/B2 Tourist & Business Visa',
        duration: '5 - 10 Years (Multi-Entry)',
        processingTime: '1 - 3 Months',
        fee: 'USD 185',
        description: 'Allows travel, visiting family, or attending business conventions. Requires a physical interview at the US Embassy.',
        documents: [
          'DS-160 online application printed barcode',
          'MRV bank fee receipt token',
          'Evidence of financial funds & strong home country ties'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Form File', description: 'Employer submits USCIS I-129 / LCA.', detail: 'Takes up to 3 months for basic approval.', iconName: 'FileCheck' },
      { step: 2, title: 'DS-160 Submission', description: 'Complete online application state.', detail: 'Save unique alphanumeric barcode carefully.', iconName: 'DocumentText' },
      { step: 3, title: 'Embassy Fee Pay', description: 'Deposit MRV visa fee check.', detail: 'Pay online or at designated local bank branches.', iconName: 'CreditCard' },
      { step: 4, title: 'Interview Book', description: 'Schedule appointment slots.', detail: 'Secure CGI federal scheduling portal calendar.', iconName: 'Calendar' },
      { step: 5, title: 'Physical Meet', description: 'Attend interview at Embassy.', detail: 'Speak directly with Visa Officer, carry all files.', iconName: 'Users' },
      { step: 6, title: 'Visa Stamping', description: 'Passport returned via courier.', detail: 'Sticker stamped containing valid entry windows.', iconName: 'CheckSquare' },
      { step: 7, title: 'Travel & Entry', description: 'Landed processing via CBP officers.', detail: 'I-94 digital arrival card issued upon crossing borders.', iconName: 'PlaneTakeoff' }
    ],
    requiredGeneralDocuments: [
      'Printed DS-160 scheduling confirmation document',
      'Passport booklet with 1 year valid window',
      'Official bank statement showing stable liquid funds',
      'Certified Degree transcripts in English format'
    ],
    medicalGuide: {
      title: 'USA Panel Physician Examination',
      approvedCenters: 'Embassy approved Panel clinics (e.g. IOM clinics).',
      fees: 'approx Rs 25,000 includes mandatory vaccines.',
      steps: [
        'Only required for Residence (Green Card) / Immigrant Visa categories.',
        'Complete standard full physical body assessment, T-spot tuberculosis check, and receive missing immunization vaccine booster drops.'
      ],
      tips: [
        'Book at least 15 days before the scheduled interview date.'
      ]
    },
    biometricsGuide: {
      title: 'VAC Biometric capture sequences',
      centerLocation: 'Visa Application Centers (VAC) in capital cities.',
      fees: 'Included in visa fees.',
      steps: [
        'Occurs 1-2 days prior to actual consular physical interview.'
      ]
    },
    jobs: [
      { title: 'Software Engineer', industry: 'Technology', demand: 'Very High', averageSalary: 'USD 6,500 - 11,000' },
      { title: 'Registered Nurse (NCLEX)', industry: 'Healthcare', demand: 'Very High', averageSalary: 'USD 5,000 - 8,000' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid US Visa / I-94 copy',
        'Social Security Number (SSN) / eligibility exclusion card',
        'State proof of physical address (Utility bill / Rent list)'
      ],
      process: [
        'Visit state DMV (Department of Motor Vehicles).',
        'Study state driving manual and pass computerized rules quizzes.',
        'Reserve and pass physical driving assessment test to receive state card.'
      ],
      approxCost: 'USD 30 - 100 depending on state limits'
    },
    residenceGuide: {
      iqamaName: 'Permanent Resident Card (Green Card) / SSN',
      renewalFee: 'USD 540 every 10 years',
      benefits: [
        'Full constitutional civil rights, live and work freely without sponsorship, apply for US citizenship after 5 years.'
      ],
      rights: [
        'Must file annual federal & state tax returns based on physical stays.'
      ]
    },
    faqs: [
      { question: 'What is DS-160 and how long is it valid?', answer: 'DS-160 is the digital visa form for US non-immigrant applications. It must be updated 2 days before booking slots.' }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    nativeName: 'كندا',
    flag: '🇨🇦',
    coverImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80',
    capital: 'Ottawa',
    currency: 'Canadian Dollar (CAD)',
    language: 'English / French',
    avgSalaryRange: 'CAD 3,000 - 8,000 / Month',
    costOfLiving: 'Medium',
    overview: 'Canada is immensely popular for Express Entry PR, Provincial Nominee Programs (PNP), and student pathways. It represents a highly supportive layout for families, featuring state healthcare support, high schooling, and diverse community options.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'LMIA Approved Work Permit',
        duration: '1 to 2 Years (Renewable)',
        processingTime: '2 - 4 Months',
        fee: 'CAD 155',
        description: 'Requires a valid LMIA (Labour Market Impact Assessment) certificate issued to the employer by ESDC Canada, accompanied by a job offer letter.',
        documents: [
          'Passport showing more than 6 months validity',
          'LMIA verified approval letter reference number',
          'Detailed job description and employer signed contract',
          'IELTS test result scorecard proving proficiency'
        ]
      },
      {
        type: 'Visit Visa',
        title: 'Visitor Visa (Temporary Resident)',
        duration: 'Up to 10 Years (Multi-Entry)',
        processingTime: '20 - 45 Days',
        fee: 'CAD 100',
        description: 'For tourism or visiting family. Permits up to 6 months stay per seasonal visit.',
        documents: [
          'Passport booklet scanned copies',
          'Financial assets validation and bank balance records',
          'Digital invitation letter (if visiting relatives)'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'LMIA Certificate', description: 'Employer secures positive LMIA result.', detail: 'Proves no Canadian citizen can fill the assigned vacancy.', iconName: 'Award' },
      { step: 2, title: 'IRCC Portal File', description: 'Submit digital application in IRCC.', detail: 'Upload scanned papers, pay state processing fee.', iconName: 'DocumentText' },
      { step: 3, title: 'Biometrics Letter', description: 'Obtain BIL appointment slip.', detail: 'BIL (Biometrics Instruction Letter) is generated in 48 hours.', iconName: 'Printer' },
      { step: 4, title: 'VFS Global Booking', description: 'Provide scans at VFS.', detail: 'Book slot at closest geographic VFS Global center.', iconName: 'Fingerprint' },
      { step: 5, title: 'Medical Clear', description: 'Assessed by approved panel.', detail: 'Receive eMedical sheets from clinic provider.', iconName: 'HeartPulse' },
      { step: 6, title: 'PPR Submission', description: 'Passport Request notice issued.', detail: 'Hand in physical passport booklet to VFS for stamping.', iconName: 'CheckSquare' },
      { step: 7, title: 'Landing Permit', description: 'Pass border, receive permit.', detail: 'CBSA officer issues official physical paper permit.', iconName: 'PlaneTakeoff' }
    ],
    requiredGeneralDocuments: [
      'Original Passport booklet',
      'IELTS General training score card with average Band 5 or higher',
      'ECA Evaluation report verifying academic certificates',
      'Comprehensive Police Certificate (PCC)'
    ],
    medicalGuide: {
      title: 'Canada eMedical Screening Guide',
      approvedCenters: 'IRCC Designated Panel Physicians.',
      fees: 'approx Rs 22,000 (standard fee scales).',
      steps: [
        'Secure appointment stating IRCC Application reference.',
        'Receive clinical tests (Chest X-Ray, Blood, Urine checks).',
        'Details uploaded directly via eMedical system portal.'
      ],
      tips: [
        'Keep medical receipt papers safe for submission references.'
      ]
    },
    biometricsGuide: {
      title: 'VFS Canada Biometrics Scans',
      centerLocation: 'VFS Global geographic divisions.',
      fees: 'CAD 85 biometrics collection fee.',
      steps: [
        'Secure scheduling slot once BIL letter registers in online profile.'
      ]
    },
    jobs: [
      { title: 'Long Haul Truck Driver', industry: 'Transport', demand: 'Very High', averageSalary: 'CAD 3,800 - 5,500' },
      { title: 'Graphic / Web Designer', industry: 'IT & ITES', demand: 'High', averageSalary: 'CAD 4,200 - 6,800' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid Canadian physical residency status',
        'Home country physical license booklet',
        'NOC Certificate showing accident free insurance logs (or driving records)'
      ],
      process: [
        'Visit state licensing center (e.g. DriveTest in Ontario).',
        'Pass computerized test and standard G2 or G road exam trial layers.'
      ],
      approxCost: 'CAD 100 - 350'
    },
    residenceGuide: {
      iqamaName: 'Permanent Resident (PR) Card / COPR Documents',
      renewalFee: 'CAD 50 every 5 years',
      benefits: [
        'Free state medical hospitalization insurance, access low fee domestic university learning, live anywhere.'
      ],
      rights: [
        'Must physically reside within Canada limits for at least 730 days within any 5-year cycle.'
      ]
    },
    faqs: [
      { question: 'What is LMIA in Canada?', answer: 'LMIA is a state permission document for employers showing they need to recruit a foreign worker.' }
    ]
  },
  {
    id: 'schengen',
    name: 'Schengen Area (Europe)',
    nativeName: 'شينغن',
    flag: '🇪🇺',
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    capital: 'Brussels / Major Hubs',
    currency: 'Euro (EUR)',
    language: 'Diverse European',
    avgSalaryRange: 'EUR 2,500 - 6,000 / Month',
    costOfLiving: 'Medium',
    overview: 'The Schengen zone comprises 29 European countries with zero border boundaries. Acquiring a visa from one state allows visiting all other states freely. Major hubs include Germany, France, Italy, Spain, Poland, and Austria.',
    visaCategories: [
      {
        type: 'Visit Visa',
        title: 'Schengen C-Type Tourist Visa',
        duration: '90 Days within 180 days',
        processingTime: '15 - 30 Days',
        fee: 'EUR 90',
        description: 'Enables recreational travel across all Schengen member territories. Requires meticulous itinerary planning, lodging proofs, and local fly-back guarantees.',
        documents: [
          'Passport showing minimum 2 empty pages and 3 months validity remaining past date of departure',
          'Schengen accredited Travel Medical Insurance covering EUR 30,000',
          '3-month Bank statements showing healthy self-sustained finances',
          'Confirmed flight round trips & hotel bookings matching dates'
        ]
      },
      {
        type: 'Work Visa',
        title: 'National D-Type Work / EU Blue Card',
        duration: '1 to 2 Years (Renewable)',
        processingTime: '1 - 3 Months',
        fee: 'EUR 75 - 110',
        description: 'For skilled workers securing valid labor contracts in countries like Germany (Opportunity Card), Poland, or Spain.',
        documents: [
          'Approved local employment offer papers and employer commercial registry',
          'Verification of academic degree equivalent to European systems',
          'Clean criminal record print'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Choose Country', description: 'Determine primary entry destination.', detail: 'Must be the country where you spend the most days.', iconName: 'Compass' },
      { step: 2, title: 'Prepare Dossier', description: 'Collect bank, flight & insurance.', detail: 'Ensure zero mismatches in date bookings.', iconName: 'FileCheck' },
      { step: 3, title: 'Secure Appointment', description: 'Schedule slots at VFS Global.', detail: 'VFS / BLS bookings can have long waiting lists; block early.', iconName: 'Calendar' },
      { step: 4, title: 'Submit Documents', description: 'Visit center and hand over folders.', detail: 'Undergo digital fingerprinting scanning.', iconName: 'DocumentText' },
      { step: 5, title: 'Processing', description: 'Embassy reviews travel ties.', detail: 'Takes 15-20 business days on average scales.', iconName: 'Clock' },
      { step: 6, title: 'Passport Return', description: 'Stamps sticker on physical passport.', detail: 'Stamps represent valid travel dates.', iconName: 'BadgeCheck' },
      { step: 7, title: 'Explore Europe', description: 'Enter via primary state ports.', detail: 'Keep hotel proof & returning flight ticket within hand luggage.', iconName: 'PlaneTakeoff' }
    ],
    requiredGeneralDocuments: [
      'Schengen Flight Reservation Document (Dummer Ticket)',
      'Accredited Travel Insurance covering EUR 30,000 limits',
      'Salary slips and Chamber of Commerce registrations if self-employed',
      'Meticulous day-by-day travel plan itinerary'
    ],
    medicalGuide: {
      title: 'Schengen Approved Health Insurance Standard',
      approvedCenters: 'Any recognized local medical insurance provider certified for Schengen visa applications.',
      fees: 'approx Rs 4,500 to 12,000 (depends on selected days coverage).',
      steps: [
        'Secure travel plan limits.',
        'Purchase policy showing minimal EUR 30,000 coverage matching medical evacuation and hospital limits.'
      ],
      tips: [
        'Policy must be valid spanning the full duration of stay in all Schengen ports.'
      ]
    },
    biometricsGuide: {
      title: 'VIS (Visa Information System) Biometrics',
      centerLocation: 'VFS Global, BLS, or TLS Contact offices.',
      fees: 'Included in visa processing fees.',
      steps: [
        'Fingerprints captured digitally on appointment day. Valid for 59 months for future entries without scan.'
      ]
    },
    jobs: [
      { title: 'Warehouse Associate (Poland / Croatia)', industry: 'Logistics', demand: 'Very High', averageSalary: 'EUR 1,200 - 1,800' },
      { title: 'Mechanical Welder', industry: 'Industrial', demand: 'High', averageSalary: 'EUR 1,500 - 2,500' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Schengen physical residency card / country registration (Anmeldung)',
        'Certified local translation of home driving booklet',
        'Passing local driving theory and road exams'
      ],
      process: [
        'Some countries permit conversion of home driving license booklet within first 6 months of residency.',
        'Thereafter, required to take lessons and pass rigorous European traffic exams.'
      ],
      approxCost: 'EUR 1,500 - 2,800 depending on country regulations'
    },
    residenceGuide: {
      iqamaName: 'Residence Permit (Aufenthaltstitel / TIE / Karte)',
      renewalFee: 'EUR 100 on renewal cycles',
      benefits: [
        'Full freedom to relocate across adjacent states, access subsidized clinics & travel benefits.'
      ],
      rights: [
        'Must comply with regional physical stay and local municipality rules.'
      ]
    },
    faqs: [
      { question: 'Can I travel to Switzerland on a French Schengen Tourist Visa?', answer: 'Yes! Switzerland is a Schengen member, so valid C-Type visas permit entry freely.' }
    ]
  },
  {
    id: 'balkan-countries',
    name: 'Balkan Countries',
    nativeName: 'البلقان',
    flag: '🇧🇦',
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    capital: 'Sarajevo / Belgrade / Zagreb',
    currency: 'Diverse (BAM, RSD, EUR)',
    language: 'Slavic Languages',
    avgSalaryRange: 'EUR 800 - 1,800 / Month',
    costOfLiving: 'Low',
    overview: 'Balkan countries (including Bosnia & Herzegovina, Serbia, Montenegro, Albania, North Macedonia, Croatia, and Romania) offer thriving work opportunism. They represent a rapid gateway to Europe with simpler requirements for work permits.',
    visaCategories: [
      {
        type: 'Work Visa',
        title: 'Balkan Skilled Worker Permit',
        duration: '1 Year (Renewable)',
        processingTime: '30 - 60 Days',
        fee: 'EUR 120',
        description: 'Issued by local National Employment Bureaus. In immense high demand for Construction, Infrastructure projects, Farming, and Hospitality sectors.',
        documents: [
          'Passport valid for at least 8 months',
          'Sponsor contract details filed with Employment bureau',
          'PCC attested by State MOFA',
          'High school certification verified transcripts'
        ]
      }
    ],
    stepProcess: [
      { step: 1, title: 'Job Offer', description: 'Employer secures National Employment Bureau permit.', detail: 'Confirms no local fit to fulfill job description.', iconName: 'Award' },
      { step: 2, title: 'Authentication', description: 'Attest certificates & local PCC.', detail: 'Hand check background prints at MOFA counters.', iconName: 'FileCheck' },
      { step: 3, title: 'Embassy Submission', description: 'Submit passport at regional embassy.', detail: 'May require physical travel to third-party capitals if no embassy is present in home country.', iconName: 'DocumentText' },
      { step: 4, title: 'Visa Approval', description: 'Receive physical passport visa entry sticker.', detail: 'Valid for entering target Balkan borders.', iconName: 'CheckSquare' },
      { step: 5, title: 'Travel & Entry', description: 'Fly to Balkan capital.', detail: 'Ensure border agent updates entry records correctly.', iconName: 'PlaneTakeoff' },
      { step: 6, title: 'Residency card', description: 'Register within 48 hours code.', detail: 'Secure temporary residency card (White Card / Boravak).', iconName: 'BadgeId' }
    ],
    requiredGeneralDocuments: [
      'Original Passport booklet',
      'PCC certified within last 90 days',
      'Work layout agreement from hiring entity',
      'Recent smart photos'
    ],
    medicalGuide: {
      title: 'Balkan Preventive Medical Checkups',
      approvedCenters: 'Local certified health hospitals in Balkan cities.',
      fees: 'approx EUR 50 inside target country.',
      steps: [
        'Complete basic health clearances (general infection, tuberculosis check) within local municipal centers.'
      ],
      tips: [
        'Ensure you have a general health insurance coverage booklet covering Balkan territories.'
      ]
    },
    biometricsGuide: {
      title: 'Local police biometric registries',
      centerLocation: 'Foreigner Office / Police divisions in target cities.',
      fees: 'Minimal token fees.',
      steps: [
        'Complete registration on arrival to secure structural Boravak residence permits.'
      ]
    },
    jobs: [
      { title: 'Mason / Concrete Worker', industry: 'Construction', demand: 'Very High', averageSalary: 'EUR 900 - 1,400' },
      { title: 'Restaurant Assistant Chef', industry: 'Hospitality', demand: 'High', averageSalary: 'EUR 800 - 1,200' }
    ],
    drivingLicenseGuide: {
      requirements: [
        'Valid Boravak card (Balkan residency)',
        'Certified local language translation of home license booklet'
      ],
      process: [
        'File converter forms at local traffic department or enroll in state training programs.'
      ],
      approxCost: 'EUR 400 - 900 depending on country regulations'
    },
    residenceGuide: {
      iqamaName: 'Boravak (Temporary Residence Permit Card)',
      renewalFee: 'EUR 50 / Year',
      benefits: [
        'Legal residence, open local cards, travel adjacent Balkan states easily.'
      ],
      rights: [
        'Must register change of habitat address with the local police station within 48 hours of shifting.'
      ]
    },
    faqs: [
      { question: 'Do Balkan countries belong to the Schengen zone?', answer: 'Croatia and Romania are part of Schengen, while Serbia, Bosnia, and Albania are non-Schengen states, each issuing independent entry permissions.' }
    ]
  }
];

export const POPULAR_SERVICES: PopularService[] = [
  {
    id: 'medical-appointment',
    name: 'Medical Appointment',
    urduName: 'میڈیکل اپائنٹمنٹ',
    icon: 'HeartPulse',
    description: 'Fast GAMCA / Wafid medical slip generation with assigned clinic details for Saudi Arab, Qatar, Kuwait & Oman.',
    estimatedDays: '1 Working Day',
    approxFee: 'Rs 3,500'
  },
  {
    id: 'visa-assistance',
    name: 'Visa Assistance',
    urduName: 'ویزا اسسٹنس',
    icon: 'BadgeCheck',
    description: 'Complete documentation auditing, visa file creation, and professional guidance for Embassy stampings.',
    estimatedDays: '2 - 5 Days',
    approxFee: 'Rs 10,000'
  },
  {
    id: 'pcc-services',
    name: 'PCC Services',
    urduName: 'پولیس کلیئرنس',
    icon: 'ShieldAlert',
    description: 'Expedited processing and MOFA attestation for Department Police Clearance Certificates (PCC).',
    estimatedDays: '3 - 7 Days',
    approxFee: 'Rs 4,500'
  },
  {
    id: 'biometrics-booking',
    name: 'Biometrics Booking',
    urduName: 'بایومیٹرکس بکنگ',
    icon: 'Fingerprint',
    description: 'Guaranteed Etimad VFS scheduling slots and appointment barcode reservation across all centers.',
    estimatedDays: '1 - 2 Days',
    approxFee: 'Rs 2,500'
  },
  {
    id: 'translation-services',
    name: 'Translation Services',
    urduName: 'کاغذات کا ترجمہ',
    icon: 'Languages',
    description: 'Certified legal translations of academic degrees, wedding contracts & birth certificates in Arabic & English.',
    estimatedDays: '1 - 2 Days',
    approxFee: 'Rs 1,500 / Page'
  },
  {
    id: 'cv-making',
    name: 'CV Making',
    urduName: 'سی وی میکنگ',
    icon: 'FileText',
    description: 'ATS-compliant resume engineering formatted according to strict Gulf / Dubai / Saudi recruitment systems.',
    estimatedDays: '2 Days',
    approxFee: 'Rs 2,000'
  },
  {
    id: 'job-assistance',
    name: 'Job Assistance',
    urduName: 'ملازمت میں مدد',
    icon: 'Briefcase',
    description: 'Connecting you with verified visa recruiters, recruitment agencies and guiding on Qiwa / Absher profiles.',
    estimatedDays: 'Ongoing',
    approxFee: 'Rs 5,000'
  },
  {
    id: 'ticket-booking',
    name: 'Ticket Booking',
    urduName: 'فلائٹ بکنگ',
    icon: 'Ticket',
    description: 'Affordable air travel booking, dynamic reserve flight tickets for visa files, and luggage add-ons.',
    estimatedDays: 'Instant',
    approxFee: 'Free Draft / Paid Tickets'
  }
];

export const LATEST_VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'v1',
    title: 'How to get GAMCA Medical Token Online?',
    urduTitle: 'میڈیکل ٹوکن کیسے لیں؟',
    duration: '6:45',
    views: '45K Views',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
    category: 'Medical'
  },
  {
    id: 'v2',
    title: 'What is GAMCA Medical Medical List?',
    urduTitle: 'میڈیکل لسٹ کیا ہوتی ہے؟',
    duration: '8:12',
    views: '32K Views',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80',
    category: 'Medical'
  },
  {
    id: 'v3',
    title: 'Full Etimad Saudi Biometrics Guide',
    urduTitle: 'بایومیٹرکس کا طریقہ کار',
    duration: '10:30',
    views: '68K Views',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
    category: 'Biometrics'
  }
];

export const LATEST_UPDATES: UpdateNews[] = [
  {
    id: 'n1',
    title: 'UAE New Visa Rules 2026',
    date: '20 May, 2026',
    category: 'Rules',
    status: 'New',
    summary: 'Dubai MOHRE simplifies transfer of work contracts. Expats can switch sponsors post-probation without exit restrictions.'
  },
  {
    id: 'n2',
    title: 'Saudi Work Visa Update',
    date: '15 May, 2026',
    category: 'Visa',
    status: 'Important',
    summary: 'Physical degree verification requirements updated inside Qiwa platform. Learn the new Chamber seal patterns.'
  },
  {
    id: 'n3',
    title: 'Qatar New Medical Process',
    date: '11 May, 2026',
    category: 'Medical',
    status: 'Updated',
    summary: 'QVC centers across South Asia integrate digital lung reports instantly. FIT certificate updates to MOI in 24 hours.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Muhammad Awais',
    location: 'Lahore, Pakistan',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=85',
    quote: 'ZeeVisa Global guided me through step-by-step Saudi Etimad process and medical slip allocations! I received precise guidance online and saved massive agent commissions.'
  },
  {
    id: 't2',
    name: 'Sajid Mehmood',
    location: 'Rawalpindi, Pakistan',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85',
    quote: 'Authentic 100% verified advice. Highly appreciate their professional support desk on WhatsApp which resolved my QVC Qatar contract details in minutes!'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How long does it take for GAMCA medical results to be updated online?',
    answer: 'Typically, clinics update status to Fit or Unfit on Wafid (or GAMCA) website within 24 to 48 hours after your bodily samples are processed.'
  },
  {
    question: 'What is Absher and Qiwa, and do I need both for Saudi Arabia?',
    answer: 'Absher is the Ministry of Interiors personal app where you see your driving license, residency, entry codes. Qiwa is the Ministry of Human Resources portal where your work employment contracts are signed and verified. Yes, both are crucial for expats!'
  },
  {
    question: 'Can I travel to Balkan countries on a Schengen Category-C tourist visa?',
    answer: 'Many Balkan countries (like Bosnia, Montenegro, Serbia) permit visitors holding valid double or multiple-entry Schengen C visaholders to enter and reside for up to 15 days without separate travel paper checks.'
  },
  {
    question: 'How do I download structural checklist forms for Qatar & Oman?',
    answer: 'You can download the PDF guides from our "Free Downloads" section on the homepage, containing exact checked checklists required prior to attending embassy appointments.'
  }
];

export const COUNTRY_OFFICIAL_SERVICES: Record<string, { name: string; url: string }[]> = {
  'uae': [
    { name: 'Trace Visa', url: 'https://smartservices.icp.gov.ae/echannels/web/client/default.html#/fileValidity' },
    { name: 'Track Visa Application', url: 'https://smartservices.icp.gov.ae/echannels/web/client/default.html#/applicationTracking' },
    { name: 'Driving Test & Licence', url: 'https://traffic.rta.ae/trfesrv/public_resources/my-ecertificates.do' },
    { name: 'Residence Medical Result', url: 'https://www.tamm.abudhabi/en/services/tamm-doh/visascreeningresult' },
    { name: 'Verify MOL Offer Letter', url: 'https://eservices.mohre.gov.ae/molforms/offerinquiry.aspx' },
    { name: 'Car Accident History', url: 'https://es.adpolice.gov.ae/TrafficServices/PublicServices/AccidentsInquiry.aspx?Culture=en&mode=update' },
    { name: 'Create Driving File', url: 'https://es.adpolice.gov.ae/TrafficServices/Registration/Register.aspx?Culture=en' },
    { name: 'ID & Traffic Fine Check', url: 'https://es.adpolice.gov.ae/TrafficServices/FinesPublic/Inquiry.aspx?Culture=en' },
    { name: 'Apply Entry Permit', url: 'https://www.gdrfad.gov.ae/en/services?id=72f0054f-668b-11e8-78de-0cc47ada4ec1' },
    { name: 'Residency Services', url: 'https://www.gdrfad.gov.ae/en/services?id=72f00551-668b-11e8-78de-0cc47ada4ec1' },
    { name: 'Criminal Record Certificate', url: 'https://www.dubaipolice.gov.ae/' },
    { name: 'Check SIM Registered on Emirates ID', url: 'https://login.moi.gov.ae/v1/accounts/register' },
    { name: 'Check Vehicle Accident Record', url: 'https://evg.ae/_layouts/EVG/trafficaccidents.aspx?language=en' },
    { name: 'Company Status Verification', url: 'https://www.mohre.gov.ae/en/services/enquiry-services.aspx' }
  ],
  'bahrain': [
    { name: 'Visa Trace', url: 'https://lmra.bh/portal/en/express_services' },
    { name: 'Manpower Agencies List', url: 'https://lmra.bh/portal/en/page/show/318' },
    { name: 'Apply eVisa', url: 'https://evisa.gov.bh/' },
    { name: 'Bangladesh Nationality Verification', url: 'https://lmra.bh/portal/en/bengali_authenticate' },
    { name: 'Apply Work Permit', url: 'https://lmra.bh/portal/en/page/show/106' },
    { name: 'Renew Work Permit', url: 'https://lmra.bh/portal/en/page/show/120' },
    { name: 'Final Work Permit Cancellation', url: 'https://lmra.bh/portal/en/page/show/121' },
    { name: 'Family Permit', url: 'https://lmra.bh/portal/en/page/show/189' },
    { name: 'Transfer Kafala', url: 'https://lmra.bh/portal/en/page/show/194' }
  ],
  'pakistan': [
    { name: 'Verify Recruiting Agency', url: 'https://beoe.gov.pk/list-of-oeps?show=active' },
    { name: 'Check Permission No.', url: 'https://beoe.gov.pk/foreign-jobs' },
    { name: 'Online Foreign Jobs Apply', url: 'https://jobs.oec.gov.pk/' },
    { name: 'List of OEP Agencies', url: 'https://beoe.gov.pk/list-of-oeps?show=active' },
    { name: 'Blacklist Trade Centre', url: 'https://beoe.gov.pk/bottc' },
    { name: 'Blacklist Companies', url: 'https://beoe.gov.pk/bofe' },
    { name: 'Daily Newspaper Jobs', url: 'https://www.facebook.com/gulfjobs300/' },
    { name: 'Verify Driving Licence - Punjab', url: 'https://dlims.punjab.gov.pk/verify/' },
    { name: 'Verify Driving Licence - Azad Kashmir', url: 'http://www.dlajk.pk/' },
    { name: 'Verify Driving Licence - KPK', url: 'http://www.transport.kpdata.gov.pk/' },
    { name: 'Verify Driving Licence - Sindh', url: 'https://dls.gos.pk/online-verification.html' },
    { name: 'Verify Driving Licence - Quetta', url: 'http://qtp.gob.pk/main/license-verification/' },
    { name: 'Verify Driving Licence - Balochistan', url: 'http://www.dlims-balochistan.org/' },
    { name: 'COVID / Polio Card Verification', url: 'https://nims.nadra.gov.pk/nims/' },
    { name: 'Pakistan Post Courier Tracking', url: 'https://ep.gov.pk/' },
    { name: 'TCS Express Tracking', url: 'https://uae.tcsexpress.com/tracking' },
    { name: 'M&P Courier Tracking', url: 'https://mulphilog.com/' },
    { name: 'Leopard Courier Tracking', url: 'http://new.leopardscod.com/' },
    { name: 'DHL Courier Tracking', url: 'https://www.dhl.com/us-en/home/tracking.html' },
    { name: 'NEBOSH Certificate Verification', url: 'https://www.nebosh.org.uk/policies-and-procedures/verifications/' }
  ],
  'qatar': [
    { name: 'Verify QVC', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/visaservices/enquiryandprintingQVC' },
    { name: 'QVC Portal', url: 'https://www.qatarvisacenter.com/' },
    { name: 'QID Tracking', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/qpostservices/qpostinquiries' },
    { name: 'Change Employer', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/others/changeemployerapplication' },
    { name: 'Leave Notification Query', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/exitservices/exitpermitenquiry' },
    { name: 'Leave Notification Form', url: 'https://portal.moi.gov.qa/wps/PA_moi_doc_services/eService/forms/exitPermit/PermitFormE.jsp' },
    { name: 'Visa Extension Service', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/visaservices/visitvisaextension' },
    { name: 'Vehicle Violations', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/trafficservices/trafficviolations' },
    { name: 'Print Return Permit', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/exitservices/returnpermitprint' },
    { name: 'Documents Query', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/moidcv/moidcvinquiry' },
    { name: 'Other MOI Services', url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/others' }
  ],
  'saudi-arabia': [
    { name: 'E-Number By Passport', url: 'https://visa.mofa.gov.sa/VisaPerson/GetApplicantData' },
    { name: 'Get Etimad Appointment', url: 'https://gerrys.pk/gerrys/opsys/auth/l' },
    { name: 'Verify E Number', url: 'https://visa.mofa.gov.sa/Home/Index' },
    { name: 'Verify Visa', url: 'https://visa.mofa.gov.sa/Enjaz/GetVisaInformation/Person' },
    { name: 'Muqeem Arrival Registration', url: 'https://arrival.muqeem.sa/#/vaccine-registration/home' },
    { name: 'Trace Border Number', url: 'https://www.absher.sa/wps/portal/individuals/Home/myservices/einquiries/passports/qbn/!ut/p/z1/pZBBDoIwEEWPNNNSgS0FhApahIjSjWGhBqOoidF4eytxoYlWo7O7' },
    { name: 'Trace Iqama Number', url: 'https://www.mol.gov.sa/IndividualUser/BasicInfo.aspx' },
    { name: 'Check Insurance', url: 'https://eservices.chi.gov.sa/Pages/ClientSystem/CheckInsurance.aspx?lang=en' },
    { name: 'Kafala Status Check', url: 'https://www.mol.gov.sa/Services/Inquiry/LaborOfficeServicesInquiry.aspx' },
    { name: 'Trace Driving Licence', url: 'https://www.absher.sa/wps/portal/individuals/Home/myservices/einquiries/traffic/pqdlinfo/!ut/p/z0/04_Sj9CPykssy0xPLMnMz0vMAfIjo8zizYx8nA09LIy8_Z3dLQ0Cjbw93Hy8fAwNLM30g1Pz9AuyHRUBGd-5-A!!' },
    { name: 'Upload Vaccine For Tawaqalna', url: 'https://eservices.moh.gov.sa/CoronaVaccineRegistration' },
    { name: 'Check Medical For Iqama', url: 'https://www.moh.gov.sa/en/eServices/Pages/EfadaService.aspx' },
    { name: 'Visa Validity Check', url: 'https://muqeem.sa/#/visa-validity/check' },
    { name: 'Check Haroof Inside', url: 'https://mol.gov.sa/Services/Inquiry/NonSaudiEmpInquiry.aspx' },
    { name: 'SIM on Your Iqama', url: 'https://portalservices.citc.gov.sa/E-Services/MyNumbers/MyNumbersInquiry.aspx' },
    { name: 'Check Traffic Violations', url: 'https://www.absher.sa/wps/portal/individuals/Home/myservices/einquiries/traffic/qtvfvisitor/!ut/p/z1/04_iUlDg4tKPAFJABjKBwtGPykssy0xPLMnMz0vM0Y_Qj4wyizcz8nE29LAw8jYI9DI3CDQKDQoI9HU1MvA30PfSj8KvIDg1T78gO1ARAP0t12o!!' },
    { name: 'Get Boarding Pass - Saudia', url: 'https://digital.saudia.com/checkin/identification?WDS_GOOGLE_TAG_MANAGER=TRUE&WDS_ENABLE_HIGH_CONTRAST_MODE=FALSE&ELM_VERIFY_DOM=TRUE&ELM_VERIFY_INT=FALSE&ELM_BLOCK_USER=FALSE&lang=GB' },
    { name: 'Check Umra Visa', url: 'https://visa.mofa.gov.sa/Home/IssuedVisa' },
    { name: 'Visit Visa Insurance Check', url: 'https://eservices.chi.gov.sa/Pages/ClientSystem/CheckVisitorsInsurance.aspx' },
    { name: 'Extend Visit Visa', url: 'https://websale.alrajhitakaful.com/en/Pages/VisitorVisa.aspx' },
    { name: 'Extend Visit Visa Insurance', url: 'https://www.der3.com/home/VisitVisa/Maintanance.aspx' },
    { name: 'Tourism E-Visa', url: 'https://visa.visitsaudi.com/?gclid=CjwKCAiA7t3yBRADEiwA4GFlI8brTywaxQHE64HLJ4mOXesPm3UETGRv9ypa7AG0Emo9dxT70oddWBoCqGMQAvD_BwE' },
    { name: 'Iqama Professional Test', url: 'https://svp.qiwa.sa/en/test_taker/search' },
    { name: 'Tanazal Talab Accept', url: 'https://auth.qiwa.sa/en/sign-in' }
  ]
};
