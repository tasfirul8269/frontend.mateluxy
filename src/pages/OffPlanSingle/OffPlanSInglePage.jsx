import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Tabs from '../../components/OffPlanSingle/Navigation/Tabs';
import ProjectDetailsCard from '../../components/OffPlanSingle/ProjectDetails/ProjectDetailsCard';
import ContactForm from '../../components/OffPlanSingle/Forms/ContactForm';
import HeroBanner from '../../components/OffPlanSingle/Hero/HeroBanner';
import AboutSection from '../../components/OffPlanSingle/Sections/AboutSection';
import GallerySection from '../../components/OffPlanSingle/Sections/GallerySection';
import PricesSection from '../../components/OffPlanSingle/Sections/PricesSection';
import LocationSection from '../../components/OffPlanSingle/Sections/LocationSection';

const OffPlanSinglePage = () => {
  const propertyData = useLoaderData();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState(null);
  
  useEffect(() => {
    if (propertyData) {
      setProperty(propertyData);
      setIsLoading(false);
    }
  }, [propertyData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-8">
          <HeroBanner property={property} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <div id="about">
                <AboutSection property={property} />
              </div>
              
              <div id="gallery">
                <GallerySection property={property} />
              </div>
              
              <div id="location">
                <LocationSection property={property} />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 lg:col-span-1">
              <aside className="sticky top-8">
                <Tabs />
                <ProjectDetailsCard property={property} />
                <ContactForm property={property} />
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OffPlanSinglePage;