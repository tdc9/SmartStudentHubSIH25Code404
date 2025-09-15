import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const LoginCard = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 3) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: formData.email,
        password: formData.password,
        role: "faculty"   // ✅ enforce faculty role
      });

      if (res.data?.token && res.data?.user?.role) {
        // ✅ Save token & role in cookies
        Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set("role", res.data.user.role, { expires: 7, secure: true, sameSite: 'strict' });

        // Also keep in localStorage (optional)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        // ✅ Redirect based on role
        if (res.data.user.role === "faculty") {
          window.location.href = "/institution-dashboard";
        } else {
          alert("Unauthorized role for this portal!");
          Cookies.remove("token");
          Cookies.remove("role");
        }
      }
    } catch (err) {
      setErrors({
        email: err.response?.data?.message || "Invalid login credentials",
        password: "Please try again"
      });
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
      <div className="glassmorphic-card p-8">
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
            Institute Secure Access Portal
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground text-sm"
          >
            Access your institutional dashboard with faculty credentials
          </motion.p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your institutional email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="transition-all duration-300"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="transition-all duration-300"
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            className="bg-white text-slate-900 hover:bg-gray-100 font-semibold glow-effect"
          >
            {isLoading ? 'Authenticating...' : 'Login to Portal'}
          </Button>
        </motion.form>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center space-y-3"
        >
          <p className="text-sm text-muted-foreground">
            Need help with credentials?{' '}
            <a
              href="https://www.aicte-india.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-200 underline decoration-primary hover:decoration-secondary"
            >
              Contact AICTE
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginCard;
