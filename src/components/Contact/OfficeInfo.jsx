import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, Building, Calendar, Clock, Instagram, Facebook, Linkedin, Twitter, Globe } from "lucide-react";

export const OfficeInfo = () => {
  // Social media links
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/mateluxy", color: "#E1306C", name: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/mateluxy", color: "#1877F2", name: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/mateluxy", color: "#1DA1F2", name: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/mateluxy", color: "#0A66C2", name: "LinkedIn" }
  ];

  // Contact cards
  const contactCards = [
    {
      icon: Building,
      title: "Visit Our Office",
      content: [
        "Bay Square - Building 13, Office #601",
        "Business Bay, Dubai, UAE"
      ],
      action: "https://maps.google.com/?q=Bay+Square+Building+13+Business+Bay+Dubai+UAE",
      actionText: "Get Directions",
      actionIcon: MapPin
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    },
    {
      icon: Phone,
      title: "Contact Us",
      content: [
        { text: "+971 58 559 0085", link: "tel:+971585590085", linkIcon: Phone },
        { text: "info@mateluxy.com", link: "mailto:info@mateluxy.com", linkIcon: Mail },
        { text: "www.mateluxy.com", link: "https://www.mateluxy.com", linkIcon: Globe }
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {contactCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-2 bg-[#FF2626]"></div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-5 mx-auto">
                <card.icon className="h-6 w-6 text-[#FF2626]" />
              </div>
              
              <h3 className="text-lg font-semibold text-center mb-4 font-['Montserrat']">{card.title}</h3>
              
              <div className="space-y-2">
                {card.content.map((item, i) => (
                  typeof item === 'string' ? (
                    <p key={i} className="text-gray-600 text-center text-sm">{item}</p>
                  ) : (
                    <div key={i} className="flex justify-center">
                      <a 
                        href={item.link} 
                        className="text-gray-600 hover:text-[#FF2626] transition-colors text-sm flex items-center gap-2 justify-center"
                      >
                        <item.linkIcon className="h-3 w-3" />
                        {item.text}
                      </a>
                    </div>
                  )
                ))}
              </div>
              
              {card.action && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <motion.a
                    href={card.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-[#FF2626] font-medium hover:text-[#FF4040] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>{card.actionText}</span>
                    <card.actionIcon className="h-4 w-4" />
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Media Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm mb-10"
      >
        <h3 className="text-lg font-semibold text-center mb-5 font-['Montserrat']">Connect With Us</h3>
        
        <div className="flex justify-center gap-5">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
              whileHover={{ y: -5 }}
              style={{ color: social.color }}
            >
              <div className="p-3 bg-white rounded-full shadow-sm hover:shadow transition-shadow">
                <social.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="h-2 bg-[#FF2626]"></div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-50 rounded-full">
              <MapPin className="h-5 w-5 text-[#FF2626]" />
            </div>
            <h3 className="text-lg font-semibold font-['Montserrat']">Our Location</h3>
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
        </div>
      </motion.div>
    </div>
  );
};

export default OfficeInfo;