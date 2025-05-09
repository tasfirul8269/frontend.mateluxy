import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'animate.css';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import OfficeInfo from './OfficeInfo';
import { MapPin, Navigation, Phone, Mail, ExternalLink, Building, Calendar, ArrowRight, Clock, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";


const Contact = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Social media links
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/mateluxy", color: "#E1306C" },
    { icon: Facebook, href: "https://facebook.com/mateluxy", color: "#1877F2" },
    { icon: Linkedin, href: "https://linkedin.com/company/mateluxy", color: "#0A66C2" },
    { icon: Twitter, href: "https://twitter.com/mateluxy", color: "#1DA1F2" }
  ];

  // Contact methods
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+971 58 559 0085",
      action: "tel:+971585590085",
      actionText: "Call now"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@mateluxy.com",
      action: "mailto:info@mateluxy.com",
      actionText: "Send email"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon-Fri: 9AM-6PM",
      subContent: "Sat: 10AM-4PM | Sun: Closed"
    }
  ];

  return (
    <div className="bg-white">
      <ContactHero />
      
      {/* Main Contact Section - New Design */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 font-['Montserrat']">Get in Touch</h2>
          <div className="w-20 h-1 bg-[#FF2626] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We're here to help with all your real estate needs. Reach out to us through any of these channels or visit our office.
          </p>
        </motion.div>
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-2 bg-[#FF2626]"></div>
              <div className="p-8">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <method.icon className="h-6 w-6 text-[#FF2626]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 font-['Montserrat']">{method.title}</h3>
                <p className="text-gray-700 text-center mb-1">{method.content}</p>
                {method.subContent && (
                  <p className="text-gray-500 text-sm text-center mb-6">{method.subContent}</p>
                )}
                {method.action && (
                  <motion.a
                    href={method.action}
                    className="flex items-center justify-center gap-2 text-[#FF2626] font-medium mt-6 hover:text-[#FF4040] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>{method.actionText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Map and Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden h-full"
          >
            <div className="h-2 bg-[#FF2626]"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-50 rounded-full">
                  <MapPin className="h-5 w-5 text-[#FF2626]" />
                </div>
                <h3 className="text-xl font-semibold font-['Montserrat']">Our Location</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 mb-2 font-medium">Mateluxy Real Estate</p>
                <p className="text-gray-600">Bay Square - Building 13, Office #601<br />Business Bay, Dubai, UAE</p>
              </div>
              
              <div className="w-full h-[300px] rounded-lg overflow-hidden mb-4 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785100219167!2d55.2835!3d25.1857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097970e887!2sBay%20Square%20Building%2013!5e0!3m2!1sen!2sae!4v1651234567890!5m2!1sen!2sae" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mateluxy Office Location"
                  className="absolute inset-0"
                ></iframe>
              </div>
              
              <div className="flex gap-3">
                <motion.a 
                  href="https://maps.google.com/?q=Bay+Square+Building+13+Business+Bay+Dubai+UAE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-[#FF2626] text-white py-3 rounded-lg font-medium hover:bg-[#FF4040] transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Get Directions
                </motion.a>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 mb-4 text-center">Follow us on social media</p>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                      whileHover={{ y: -3 }}
                      style={{ color: social.color }}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden h-full"
          >
            <div className="h-2 bg-[#FF2626]"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-50 rounded-full">
                  <Mail className="h-5 w-5 text-[#FF2626]" />
                </div>
                <h3 className="text-xl font-semibold font-['Montserrat']">Send a Message</h3>
              </div>
              
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;















