import { useState } from 'react';
import 'animate.css';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import OfficeInfo from './OfficeInfo';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white overflow-hidden items-center">
    <ContactHero />
    <ContactForm />
    <div className='flex justify-start gap-8 items-center p-10'>
    <OfficeInfo />
    </div>
  </div>
  );
};

export default Contact;















