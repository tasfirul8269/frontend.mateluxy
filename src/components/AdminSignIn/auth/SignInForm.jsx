import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { useNavigate } from 'react-router-dom';


const SignInForm = () => {
  const navigate = useNavigate();
  const initialFormData = {
    email: '',
    password: '',
    rememberMe: false,
  };
  const [formData, setFormData] = useState({initialFormData});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {


    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
    setLoading(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate API call
      try {
        setLoading(true);
        setIsSubmitting(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
        if (data.success == false) {
          setLoading(false);
          isSubmitting(false);
          setError("An error occurred while adding the agent. Please try again.");
          return;
        }
        setLoading(false);
        setIsSubmitting(false); 
        setError(null);
        navigate('/admin-pannel'); 
        setFormData(initialFormData);
  
  
      } catch (error) {
        setLoading(false);
        setIsSubmitting(false);
        setError('An error occurred while adding the agent. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5 animate-fadeIn">
      <Input
        label="Email address"
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={<Mail size={18} />}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        icon={<Lock size={18} />}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox
          id="rememberMe"
          name="rememberMe"
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleChange}
        />

        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" fullWidth size="lg" isLoading={isSubmitting} className="mt-6">
        Sign in
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

    </form>
  );
};

export default SignInForm;