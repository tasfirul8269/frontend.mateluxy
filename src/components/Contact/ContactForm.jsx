import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Send, User, Mail, Phone, MessageSquare, ArrowRight } from 'lucide-react';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Form steps
  const steps = [
    { title: 'Personal Details', description: 'Tell us about yourself' },
    { title: 'Your Message', description: 'What can we help you with?' },
  ];

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const onSubmit = async (data) => {
    if (activeStep === 0) {
      handleNext(data);
      return;
    }
    
    // Combine data from all steps
    const completeFormData = { ...formData, ...data };
    
    setIsSubmitting(true);
    console.log("Form data:", completeFormData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormSuccess(true);
    reset();
    setActiveStep(0);
    setFormData({});
    
    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  // Step 1 fields
  const personalFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      icon: User,
      validation: { required: 'Name is required' }
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@example.com',
      icon: Mail,
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      }
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+971 50 123 4567',
      icon: Phone,
      validation: { required: 'Phone number is required' }
    }
  ];

  // Step 2 fields
  const messageFields = [
    {
      id: 'message',
      label: 'Your Message',
      type: 'textarea',
      placeholder: 'Tell us about your inquiry...',
      icon: MessageSquare,
      validation: { required: 'Message is required' }
    }
  ];

  // Progress indicator
  const Progress = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= activeStep ? 'bg-[#FF2626] text-white' : 'bg-gray-100 text-gray-400'}`}
            >
              {index < activeStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={`text-xs mt-2 font-medium ${index <= activeStep ? 'text-[#FF2626]' : 'text-gray-400'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#FF2626]" 
          initial={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {formSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center shadow-sm"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-3 font-['Montserrat']">Message Sent Successfully!</h3>
            <p className="text-green-700 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormSuccess(false)}
              className="px-8 py-3 bg-white text-green-700 rounded-lg border border-green-200 hover:bg-green-50 transition-colors font-medium shadow-sm"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${activeStep}`}
            initial={{ opacity: 0, x: activeStep === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeStep === 0 ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <Progress />
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1 font-['Montserrat']">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-500">{steps[activeStep].description}</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {activeStep === 0 ? (
                <>
                  {personalFields.map((field, index) => (
                    <motion.div 
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <label 
                        htmlFor={field.id} 
                        className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                      >
                        <field.icon className="h-4 w-4 text-[#FF2626]" />
                        {field.label}
                      </label>
                      
                      <input
                        id={field.id}
                        type={field.type}
                        className={`w-full px-4 py-3 rounded-lg border ${errors[field.id] ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-[#FF2626] focus:border-transparent transition-colors`}
                        placeholder={field.placeholder}
                        defaultValue={formData[field.id] || ''}
                        {...register(field.id, field.validation)}
                      />
                      
                      <AnimatePresence>
                        {errors[field.id] && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 text-sm text-red-500 flex items-center gap-1"
                          >
                            <AlertCircle className="h-3 w-3" />
                            {errors[field.id].message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </>
              ) : (
                <>
                  {messageFields.map((field, index) => (
                    <motion.div 
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <label 
                        htmlFor={field.id} 
                        className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                      >
                        <field.icon className="h-4 w-4 text-[#FF2626]" />
                        {field.label}
                      </label>
                      
                      <textarea
                        id={field.id}
                        rows="6"
                        className={`w-full px-4 py-3 rounded-lg border ${errors[field.id] ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-[#FF2626] focus:border-transparent transition-colors`}
                        placeholder={field.placeholder}
                        defaultValue={formData[field.id] || ''}
                        {...register(field.id, field.validation)}
                      ></textarea>
                      
                      <AnimatePresence>
                        {errors[field.id] && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 text-sm text-red-500 flex items-center gap-1"
                          >
                            <AlertCircle className="h-3 w-3" />
                            {errors[field.id].message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </>
              )}
              
              <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-100">
                {activeStep > 0 ? (
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back
                  </motion.button>
                ) : (
                  <div></div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 ${
                    activeStep === steps.length - 1
                      ? 'bg-[#FF2626] text-white hover:bg-[#FF4040]'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  } transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
                  whileHover={{ x: activeStep === steps.length - 1 ? 0 : 2, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : activeStep === steps.length - 1 ? (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-gray-400 text-xs text-center mt-6">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;