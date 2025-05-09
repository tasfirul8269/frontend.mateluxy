import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Phone, MapPin } from "lucide-react";

const ContactHero = () => {
  // Contact methods
  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Send a Message",
      description: "Fill out our contact form",
      color: "#FF2626",
      bgColor: "#FFF5F5"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+971 58 559 0085",
      color: "#0070F3",
      bgColor: "#F0F7FF"
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      description: "Business Bay, Dubai",
      color: "#0CAA41",
      bgColor: "#F0FFF4"
    }
  ];

  return (
    <div className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-50 rounded-full -ml-48 -mb-48 opacity-70"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4 px-4 py-1.5 bg-red-50 text-[#FF2626] rounded-full font-medium text-sm"
        >
          Contact Us
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111] mb-6 font-['Montserrat']"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let's Start a Conversation
        </motion.h1>
        
        <motion.div 
          className="w-24 h-1 bg-[#FF2626] mx-auto mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Whether you're looking to buy, sell, rent, or invest in Dubai's premium real estate market, our team of experts is ready to assist you every step of the way.
        </motion.p>
        
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              style={{ borderTop: `3px solid ${method.color}` }}
            >
              <div 
                className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: method.bgColor }}
              >
                <method.icon className="h-6 w-6" style={{ color: method.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-['Montserrat']">{method.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{method.description}</p>
              <motion.a 
                href="#"
                className="inline-flex items-center text-sm font-medium gap-1"
                style={{ color: method.color }}
                whileHover={{ x: 5 }}
              >
                Learn More <ArrowRight className="h-3 w-3" />
              </motion.a>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="text-center">
            <h4 className="text-4xl font-bold text-[#FF2626] mb-2">500+</h4>
            <p className="text-gray-500">Properties Sold</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-[#FF2626] mb-2">98%</h4>
            <p className="text-gray-500">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-[#FF2626] mb-2">15+</h4>
            <p className="text-gray-500">Years Experience</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactHero;