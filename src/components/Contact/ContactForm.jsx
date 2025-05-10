import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Send, User, Mail, Phone, MessageSquare, ArrowRight, Building, ChevronDown } from 'lucide-react';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch, trigger } = useForm({
    mode: 'onChange'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  
  // Watch contact method selections
  const watchPhone = watch("contactPhone", false);
  const watchWhatsApp = watch("contactWhatsApp", false);
  const watchEmail = watch("contactEmail", false);
  
  // Form steps
  const steps = [
    { 
      title: 'Personal Details', 
      description: 'Tell us about yourself',
      fields: ['name', 'email', 'phone']
    },
    { 
      title: 'Your Requirements', 
      description: 'What are you looking for?',
      fields: ['interest', 'message']
    },
    { 
      title: 'Contact Preferences', 
      description: 'How should we reach you?',
      fields: ['contactPhone', 'contactWhatsApp', 'contactEmail']
    }
  ];
  
  // Make sure all form fields are properly initialized
  useEffect(() => {
    // Register all fields to prevent "Cannot read properties of undefined" errors
    const allFields = steps.flatMap(step => step.fields);
    allFields.forEach(field => {
      if (!watch(field)) {
        // Only register if not already registered
        register(field);
      }
    });
  }, [register, watch]);

  // Handle next step
  const handleNext = async () => {
    // Validate current step fields
    const currentFields = steps[activeStep].fields;
    // Make sure all fields exist before triggering validation
    const fieldsToValidate = currentFields.filter(field => {
      // Check if the field is registered in the form
      return watch(field) !== undefined || errors[field] !== undefined;
    });
    
    const isValid = fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;
    
    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep(prev => prev + 1);
      }
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };
  
  const onSubmit = async (data) => {
    // If not on the last step, go to next step
    if (activeStep < steps.length - 1) {
      handleNext();
      return;
    }
    
    setIsSubmitting(true);
    console.log("Form data:", data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormSuccess(true);
    setActiveStep(0);
    reset();
    
    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  // Form fields
  const formFields = [
    {
      id: 'name',
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      icon: User,
      validation: {
        required: 'Full name is required',
        minLength: {
          value: 2,
          message: 'Name must be at least 2 characters'
        }
      }
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email address',
      icon: Mail,
      validation: {
        required: 'Email address is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      }
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      icon: Phone,
      validation: {
        pattern: {
          value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
          message: 'Invalid phone number format'
        }
      }
    },
    {
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: "Tell us what you're looking for or how we can help",
      icon: MessageSquare,
      validation: { required: 'Message is required' }
    }
  ];
  
  // Contact method options
  const contactMethods = [
    { id: 'contactPhone', name: 'contactPhone', label: 'Phone Call' },
    { id: 'contactWhatsApp', name: 'contactWhatsApp', label: 'WhatsApp' },
    { id: 'contactEmail', name: 'contactEmail', label: 'Email' }
  ];
  
  // Interest options
  const interestOptions = [
    { value: 'buying', label: 'Buying Property' },
    { value: 'selling', label: 'Selling Property' },
    { value: 'renting', label: 'Renting' },
    { value: 'investment', label: 'Investment Opportunities' },
    { value: 'management', label: 'Property Management' },
    { value: 'general', label: 'General Inquiry' },
  ];

  // Progress indicator component
  const ProgressIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8 relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center relative z-10">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: index === activeStep ? 1.05 : 1,
                  boxShadow: index === activeStep ? '0 0 15px rgba(255, 38, 38, 0.4)' : 'none'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${index === activeStep ? 'bg-gradient-to-r from-[#FF2626] to-[#FF5050] text-white' : index < activeStep ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                {index < activeStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="font-['Montserrat'] font-semibold">{index + 1}</span>
                )}
              </motion.div>
              <span className={`text-xs mt-2 font-medium font-['Montserrat'] ${index === activeStep ? 'text-[#FF2626]' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="relative mx-2 w-16">
                <div className="absolute top-5 transform -translate-y-1/2 w-full">
                  <div className="h-0.5 w-full bg-gray-200"></div>
                  <motion.div 
                    initial={{ width: index < activeStep ? '100%' : '0%' }}
                    animate={{ width: index < activeStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                    className="h-0.5 bg-gradient-to-r from-[#FF2626] to-[#FF5050] absolute top-0 left-0"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {formSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-green-50 border border-green-100 rounded-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
            <p className="text-green-600 mb-6">Thank you for contacting us. We'll get back to you shortly.</p>
            <motion.button
              onClick={() => setFormSuccess(false)}
              className="px-6 py-2 bg-white border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${activeStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProgressIndicator />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{steps[activeStep].title}</h4>
                <p className="text-sm text-gray-500">{steps[activeStep].description}</p>
              </div>
              
              {/* Step 1: Personal Details */}
              {activeStep === 0 && (
                <div className="space-y-4">
                  {formFields.slice(0, 3).map((field) => (
                    <div key={field.name} className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <field.icon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={field.type}
                        id={field.id}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors[field.name] ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-[#FF2626] focus:border-[#FF2626] shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 focus:shadow-md`}
                        placeholder={field.placeholder}
                        {...register(field.name, field.validation)}
                      />
                      {field.id === 'phone' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                          Optional
                        </div>
                      )}
                      {errors[field.name] && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors[field.name].message}</span>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Step 2: Requirements */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  {/* Interest Dropdown */}
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="interest"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.interest ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-[#FF2626] focus:border-[#FF2626] shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 focus:shadow-md`}
                      {...register('interest', { required: 'Please select your interest' })}
                    >
                      <option value="">Select an option</option>
                      {interestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.interest && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.interest.message}</span>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Message Field */}
                  <div className="relative">
                    <div className="flex items-center mb-1">
                      <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message <span className="text-[#FF2626]">*</span>
                      </label>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your requirements..."
                        className={`w-full px-4 py-3 rounded-lg ${errors.message ? 'border-red-300 bg-red-50' : 'border border-gray-200 bg-white shadow-sm'} focus:outline-none focus:ring-2 focus:ring-[#FF2626] focus:border-transparent transition-all resize-none`}
                        {...register('message', { required: 'Please enter your message' })}
                      ></textarea>
                    </div>
                    
                    {errors.message && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.message.message}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 3: Contact Preferences */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  {/* Contact Method Selection */}
                  <div className="relative">
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Preferred Contact Method <span className="text-[#FF2626]">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Please select at least one contact method</p>
                    </div>
                    
                    <div className="space-y-3">
                      {contactMethods.map((method) => (
                        <div key={method.name} className="flex items-center">
                          <input
                            type="checkbox"
                            id={method.id}
                            className="h-4 w-4 text-[#FF2626] focus:ring-[#FF2626] border-gray-300 rounded"
                            {...register(method.id, {
                              validate: () => watchPhone || watchWhatsApp || watchEmail || 'Please select at least one contact method'
                            })}
                          />
                          <label htmlFor={method.id} className="ml-2 block text-sm text-gray-700">
                            {method.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    {errors.contactPhone && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.contactPhone.message}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                {activeStep > 0 ? (
                  <motion.button
                    type="button"
                    onClick={handlePrevious}
                    className="px-5 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md font-medium bg-white/90 backdrop-blur-sm"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                ) : (
                  <div>{/* Empty div for spacing */}</div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-xl ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-[#FF2626] to-[#FF4040] hover:from-[#FF4040] hover:to-[#FF5050]'} text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg`}
                  whileHover={{ x: activeStep < steps.length - 1 ? 2 : 0, y: activeStep === steps.length - 1 ? -2 : 0 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : activeStep < steps.length - 1 ? (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
            <p className="text-gray-400 text-xs text-center mt-2">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;