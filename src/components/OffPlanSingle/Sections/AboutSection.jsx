import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Utensils, 
  Music, 
  Dumbbell, 
  Wifi,
  Shield,
  Droplet,
  ParkingSquare,
  Smartphone,
  Leaf,
  ShoppingCart,
  BookOpen,
  Building,
  Heart,
  Plane,
  Bike,
  Bus,
  ChevronDown,
  ChevronUp,
  CheckCircle
} from 'lucide-react';

// Enhanced icon mapping with available icons
const featureIcons = {
  'Restaurant': <Utensils className="text-blue-500" size={24} />,
  'Clubhouse': <Home className="text-blue-500" size={24} />,
  'Gym': <Dumbbell className="text-blue-500" size={24} />,
  'Spa': <Droplet className="text-blue-500" size={24} />,
  'Entertainment': <Music className="text-blue-500" size={24} />,
  'Security': <Shield className="text-blue-500" size={24} />,
  'Parking': <ParkingSquare className="text-blue-500" size={24} />,
  'Smart Home': <Smartphone className="text-blue-500" size={24} />,
  'Wifi': <Wifi className="text-blue-500" size={24} />,
  'Swimming Pool': <Droplet className="text-blue-500" size={24} />,
  'Garden': <Leaf className="text-blue-500" size={24} />,
  'Shopping': <ShoppingCart className="text-blue-500" size={24} />,
  'School': <BookOpen className="text-blue-500" size={24} />,
  'Landmark': <Building className="text-blue-500" size={24} />,
  'Healthcare': <Heart className="text-blue-500" size={24} />,
  'Airport': <Plane className="text-blue-500" size={24} />,
  'Cycling': <Bike className="text-blue-500" size={24} />,
  'Public Transport': <Bus className="text-blue-500" size={24} />
};

// Feature descriptions
const featureDescriptions = {
  'Gym': 'Fully-equipped fitness center with state-of-the-art equipment',
  'Spa': 'Luxury spa facilities for ultimate relaxation',
  'Swimming Pool': 'Temperature-controlled swimming pools with lounging areas',
  'Restaurant': 'Fine dining restaurants with international cuisine',
  'Clubhouse': 'Exclusive clubhouse for residents with various facilities',
  'Entertainment': 'Entertainment facilities for all age groups',
  'Security': '24/7 security with CCTV surveillance and trained personnel',
  'Parking': 'Dedicated parking spaces for residents and visitors',
  'Smart Home': 'Smart home automation for modern living',
  'Wifi': 'High-speed internet connectivity throughout the premises',
  'Garden': 'Landscaped gardens and green spaces for relaxation',
  'Shopping': 'Retail outlets and shopping facilities within the complex',
  'School': 'Proximity to reputed educational institutions',
  'Landmark': 'Close to major landmarks and attractions',
  'Healthcare': 'Medical facilities and healthcare services nearby',
  'Airport': 'Easy access to international airport',
  'Cycling': 'Cycling tracks and facilities for fitness enthusiasts',
  'Public Transport': 'Well-connected to public transportation network'
};

const AboutSection = ({ property }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-sm overflow-hidden p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BookOpen className="text-blue-500" size={24} />
        About This Project
      </h2>
      
      {/* Description */}
      {property?.propertyDescription && (
        <div className="relative mb-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className={`text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-4' : ''} text-lg`}>
              {property.propertyDescription}
            </p>
            
            {property.propertyDescription && property.propertyDescription.length > 300 && (
              <motion.button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center gap-1 text-blue-600 font-medium mt-4 hover:text-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {showFullDescription ? (
                  <>
                    <ChevronUp size={18} />
                    <span>Read Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} />
                    <span>Read More</span>
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
          
          {!showFullDescription && property.propertyDescription.length > 300 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
      )}
      
      {/* Image */}
      {property?.propertyFeaturedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl mb-8"
        >
          <img
            src={property.propertyFeaturedImage}
            alt="Property overview"
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      )}
      
      {/* Features */}
      {property?.features?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Key Features & Amenities</h3>
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {property.features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-start gap-3 group"
              >
                <div className="bg-blue-50 p-2 rounded-lg text-blue-500 group-hover:bg-blue-100 transition-colors">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{feature}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
      
      {/* Project Highlights */}
      {property?.highlights?.length > 0 && (
        <div className="mt-10 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Project Highlights</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {property.highlights.map((highlight, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-1">
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-gray-700">{highlight}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default AboutSection;