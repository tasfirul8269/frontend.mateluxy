import React from 'react';
import Tabs from '../../components/OffPlanSingle/Navigation/Tabs';
import ProjectDetailsCard from '../../components/OffPlanSingle/ProjectDetails/ProjectDetailsCard';
import ContactForm from '../../components/OffPlanSingle/Forms/ContactForm';
import HeroBanner from '../../components/OffPlanSingle/Hero/HeroBanner';
import AboutSection from '../../components/OffPlanSingle/Sections/AboutSection';
import GallerySection from '../../components/OffPlanSingle/Sections/GallerySection';
import PricesSection from '../../components/OffPlanSingle/Sections/PricesSection';
import LocationSection from '../../components/OffPlanSingle/Sections/LocationSection';

const OffPlanSinglePage = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
  
    
    <main>
      <div className="container mx-auto px-4 py-8">
        <HeroBanner />
        <div className="w-full mb-8">
          
          {children}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div id="about">
              <AboutSection />
            </div>
            
            <div id="gallery">
              <GallerySection />
            </div>
            
          
            
            <div id="location">
              <LocationSection />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 lg:col-span-1">
            <aside className="sticky top-8">
              <Tabs />
              <ProjectDetailsCard />
              <ContactForm />
            </aside>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default OffPlanSinglePage;