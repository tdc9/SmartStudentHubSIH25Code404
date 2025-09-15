import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const LoginCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (checked) => {
    setAgreeToTerms(checked);
    // Clear terms error when user checks the box
    if (checked && errors?.terms) {
      setErrors(prev => ({
        ...prev,
        ...prev,
        terms: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 3) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setApiError(''); // Clear any previous API errors
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: formData.email,
        password: formData.password,
        role: "government" // Explicitly set the role for this portal
      });

      const token = res.data?.token;
      const userRole = res.data?.user?.role;

      // Validate the response
      if (!token || userRole !== 'government') {
        throw new Error("Invalid credentials or role.");
      }

      // Set cookies
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('role', userRole, { expires: 7, secure: true, sameSite: 'Strict' });

      // Redirect the user
      navigate('/government-dashboard', { replace: true });
      
    } catch (err) {
      console.error('Login failed:', err);
      // Set a user-friendly error message from the backend or a default one
      setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glassmorphic-card p-8 rounded-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 backdrop-blur-sm"
          >
            <Icon name="Shield" size={32} className="text-primary" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-foreground mb-2"
          >
            Government Portal Login
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground text-sm"
          >
            Secure access for government officers to monitor institutions & compliance
          </motion.p>
        </div>

        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded bg-red-100 text-red-600 text-sm text-center"
          >
            {apiError}
          </motion.div>
        )}

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <Input
              label="Government Email"
              type="email"
              name="email"
              placeholder="Enter your government email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
              className="pl-12 transition-all duration-300"
            />
            <div className="absolute left-3 top-9 text-muted-foreground">
              <Icon name="Mail" size={20} />
            </div>
          </div>

          <div className="relative">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="pl-12 transition-all duration-300"
            />
            <div className="absolute left-3 top-9 text-muted-foreground">
              <Icon name="Lock" size={20} />
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-start space-x-3 cursor-pointer"
              onClick={() => handleCheckboxChange(!agreeToTerms)}
            >
              <Checkbox
                id="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={handleCheckboxChange}
                className="mt-1 pointer-events-auto"
              />
              <label 
                htmlFor="agreeToTerms" 
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer select-none"
              >
                I agree to the Terms & Conditions and acknowledge that all activities are monitored and logged for security purposes
              </label>
            </motion.div>
            {errors?.terms && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 ml-7"
              >
                {errors?.terms}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!agreeToTerms || isLoading}
            className={cn(
              "bg-white text-slate-900 font-semibold glow-effect transition-all duration-200",
              agreeToTerms 
                ? "hover:bg-gray-100 hover:scale-105 cursor-pointer" :"opacity-60 cursor-not-allowed"
            )}
          >
            {isLoading ? 'Authenticating...' : 'Login to Portal'}
          </Button>
        </motion.form>

        {/* Ministry Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center space-y-3"
        >
          <p className="text-sm text-muted-foreground">
            Official portal of{' '}
            <a
              href="https://www.education.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-200 underline decoration-primary hover:decoration-secondary"
            >
              Ministry of Education
            </a>
          </p>
          
          <p className="text-sm text-muted-foreground">
            For technical support:{' '}
            <a
              href="https://www.education.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-200 underline decoration-primary hover:decoration-secondary"
            >
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginCard;