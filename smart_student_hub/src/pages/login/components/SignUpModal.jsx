import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import axios from 'axios'; // Import Axios for making API calls

// Define your backend API URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SignUpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    institute: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const institutes = [
    { value: 'ccs-university', label: 'Chaudhary Charan Singh University' },
    { value: 'du', label: 'Delhi University' },
    { value: 'jnu', label: 'Jawaharlal Nehru University' },
    { value: 'bhu', label: 'Banaras Hindu University' },
    { value: 'amu', label: 'Aligarh Muslim University' },
    { value: 'iit-delhi', label: 'Indian Institute of Technology Delhi' },
    { value: 'iit-bombay', label: 'Indian Institute of Technology Bombay' },
    { value: 'iit-kanpur', label: 'Indian Institute of Technology Kanpur' },
    { value: 'iit-madras', label: 'Indian Institute of Technology Madras' },
    { value: 'iit-kharagpur', label: 'Indian Institute of Technology Kharagpur' },
    { value: 'iisc-bangalore', label: 'Indian Institute of Science Bangalore' },
    { value: 'bits-pilani', label: 'Birla Institute of Technology and Science Pilani' },
    { value: 'nit-trichy', label: 'National Institute of Technology Tiruchirappalli' },
    { value: 'nit-warangal', label: 'National Institute of Technology Warangal' },
    { value: 'jadavpur-university', label: 'Jadavpur University' },
    { value: 'anna-university', label: 'Anna University' },
    { value: 'osmania-university', label: 'Osmania University' },
    { value: 'pune-university', label: 'University of Pune' },
    { value: 'mumbai-university', label: 'University of Mumbai' },
    { value: 'calcutta-university', label: 'University of Calcutta' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      institute: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError(''); // Clear any previous errors

    if (formData?.password !== formData?.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/auth/register`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        institute: formData.institute,
        location: formData.location,
        role: "student" // Ensure the user is registered as a student
      });

      // Handle successful registration
      if (response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose(); // Close the modal
          // Optionally, you can also navigate or show a login prompt
        }, 2000);
      }
    } catch (err) {
      // Handle errors from the API
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glassmorphism-card p-8 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gradient">Create Account</h2>
                <p className="text-muted-foreground text-sm">Join our academic community</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-white/10"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 rounded bg-red-100 text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 rounded-xl bg-green-100 border border-green-300 text-green-700 text-center"
              >
                <Icon name="CheckCircle" size={20} className="inline mr-2" />
                Registration successful! Welcome to Smart Student Hub!
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={handleInputChange}
                required
              />

              <Select
                label="Select Institute"
                placeholder="Choose your institute"
                options={institutes}
                value={formData?.institute}
                onChange={handleSelectChange}
                searchable
                required
              />

              <Input
                type="text"
                name="location"
                label="Location"
                placeholder="City, State"
                value={formData?.location}
                onChange={handleInputChange}
                required
              />

              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={handleInputChange}
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Create a password"
                value={formData?.password}
                onChange={handleInputChange}
                required
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData?.confirmPassword}
                onChange={handleInputChange}
                error={formData?.confirmPassword && formData?.password !== formData?.confirmPassword ? "Passwords do not match" : ""}
                required
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1 bg-white text-slate-900 hover:bg-white/90"
                  disabled={
                    !formData?.fullName ||
                    !formData?.institute ||
                    !formData?.email ||
                    !formData?.password ||
                    formData?.password !== formData?.confirmPassword ||
                    loading
                  }
                >
                  {loading ? (
                    'Signing Up...'
                  ) : (
                    <>
                      <Icon name="UserPlus" size={18} className="mr-2" />
                      Sign Up
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;