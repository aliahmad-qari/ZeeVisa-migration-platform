import { useState, useEffect } from 'react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Hero from './components/Hero';
import ExploreCountries from './components/ExploreCountries';
import ServicesAndProcess from './components/ServicesAndProcess';
import VideoAndUpdates from './components/VideoAndUpdates';
import FAQAndAccordion from './components/FAQAndAccordion';
import CountryDetail from './components/CountryDetail';
import Footer from './components/Footer';
import { 
  ConsultationModal, 
  AuthModal, 
  DownloadProgressModal 
} from './components/AppMocks';
import { GULF_COUNTRIES } from './data';

export default function App() {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [selectedVisaType, setSelectedVisaType] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');
  
  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedServiceForConsultation, setSelectedServiceForConsultation] = useState('medical-appointment');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeDownloadTitle, setActiveDownloadTitle] = useState('');

  // Handle Search submit from Hero
  const handleSearch = (countryId: string, category: string) => {
    if (countryId) {
      setSelectedCountryId(countryId);
      if (category && category !== 'All Categories') {
        setSelectedVisaType(category);
      } else {
        setSelectedVisaType('');
      }
      setActiveSection('countries');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Smooth scroll to countries list
      const element = document.getElementById('countries');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Trigger when a user clicks on a particular shortcut visa option
  const handleSelectVisaCategory = (countryId: string, visaType: 'Work Visa' | 'Family Visa' | 'Visit Visa' | 'Business Visa') => {
    setSelectedCountryId(countryId);
    setSelectedVisaType(visaType);
    setActiveSection('countries');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceForConsultation(serviceId);
    setIsConsultationOpen(true);
  };

  const handleDownloadTrigger = (title: string) => {
    setActiveDownloadTitle(title);
    setIsDownloadOpen(true);
  };

  // Find active country structure
  const activeCountryData = GULF_COUNTRIES.find(c => c.id === selectedCountryId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <Header
        currentCountryId={selectedCountryId}
        onSelectCountry={(id) => {
          setSelectedCountryId(id);
          if (!id) setSelectedVisaType('');
        }}
        onSelectVisaCategory={handleSelectVisaCategory}
        onOpenConsultation={() => {
          setSelectedServiceForConsultation('medical-appointment');
          setIsConsultationOpen(true);
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Main content switchbox */}
      <main className="flex-grow">
        {selectedCountryId && activeCountryData ? (
          /* COUNTRY DETAILED GUIDE DASHBOARD SINGLE PAGE DESIGN (Dynamic) */
          <CountryDetail
            country={activeCountryData}
            initialVisaType={selectedVisaType}
            onBack={() => {
              setSelectedCountryId(null);
              setSelectedVisaType('');
              setActiveSection('home');
            }}
            onOpenConsultation={() => {
              setSelectedServiceForConsultation('visa-assistance');
              setIsConsultationOpen(true);
            }}
            onDownloadGuide={handleDownloadTrigger}
          />
        ) : (
          /* STANDARD DIRECTORIES HOME LAYOUT */
          <div className="space-y-0">
            {/* Hero Banner Grid */}
            <Hero 
              onSearch={handleSearch}
              onOpenConsultation={() => {
                setSelectedServiceForConsultation('visa-assistance');
                setIsConsultationOpen(true);
              }}
            />

            {/* Explore Horizontal Country Cards Grid and Helplines */}
            <ExploreCountries
              onSelectCountry={(id) => {
                setSelectedCountryId(id);
                setSelectedVisaType('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenConsultation={() => {
                setSelectedServiceForConsultation('visa-assistance');
                setIsConsultationOpen(true);
              }}
            />

            {/* Step-by-Step dots timeline sequence roadmap & Popular Circular Services */}
            <ServicesAndProcess
              onServiceSelect={handleServiceSelect}
              onOpenConsultation={() => {
                setSelectedServiceForConsultation('visa-assistance');
                setIsConsultationOpen(true);
              }}
            />

            {/* Latest Video Tutorials row with play buttons, updates feed & free downloads */}
            <VideoAndUpdates
              onDownloadGuide={handleDownloadTrigger}
              onOpenConsultation={() => {
                setSelectedServiceForConsultation('cv-making');
                setIsConsultationOpen(true);
              }}
            />

            {/* Custom Expand accordion question card list */}
            <FAQAndAccordion
              onOpenConsultation={() => {
                setSelectedServiceForConsultation('visa-assistance');
                setIsConsultationOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* 3. Footer Elements */}
      <Footer 
        onSelectCountry={(id) => {
          setSelectedCountryId(id);
          if (!id) setSelectedVisaType('');
        }}
        setActiveSection={setActiveSection}
      />

      {/* 4. Overlay Utility Modals */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedServiceId={selectedServiceForConsultation}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <DownloadProgressModal 
        isOpen={isDownloadOpen}
        bookletTitle={activeDownloadTitle}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Floating Interactive ZeeBot Assistant */}
      <Chatbot />

    </div>
  );
}
