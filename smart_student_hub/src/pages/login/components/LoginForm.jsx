import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'institution', label: 'Institution Admin' },
    { value: 'government', label: 'Government Officer' }
  ];

  // Mock credentials for different user types
  const mockCredentials = {
    student: { email: 'student@smartstudent.com', password: 'student123' },
    institution: { email: 'admin@institution.edu', password: 'admin123' },
    government: { email: 'officer@gov.in', password: 'gov123', mfa: '123456' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockCreds = mockCredentials?.[formData?.role];
      
      if (formData?.email !== mockCreds?.email || formData?.password !== mockCreds?.password) {
        setErrors({ 
          general: `Invalid credentials. Use ${mockCreds?.email} / ${mockCreds?.password}${mockCreds?.mfa ? ' (MFA: ' + mockCreds?.mfa + ')' : ''}` 
        });
        setIsLoading(false);
        return;
      }

      // Check if MFA is required for government officers
      if (formData?.role === 'government' && !showMFA) {
        setShowMFA(true);
        setIsLoading(false);
        return;
      }

      // Validate MFA for government officers
      if (formData?.role === 'government' && showMFA) {
        if (mfaCode !== mockCredentials?.government?.mfa) {
          setErrors({ mfa: 'Invalid MFA code. Use: 123456' });
          setIsLoading(false);
          return;
        }
      }

      // Successful login
      const userData = {
        email: formData?.email,
        role: formData?.role,
        name: formData?.role === 'student' ? 'Student User' : 
              formData?.role === 'institution' ? 'Institution Admin' : 'Government Officer',
        id: Date.now()?.toString()
      };

      login(userData);

      // Redirect to intended page or dashboard
      const from = location?.state?.from?.pathname || '/student-dashboard';
      const dashboardRoutes = {
        student: '/student-dashboard',
        institution: '/institution-dashboard',
        government: '/institution-dashboard'
      };

      navigate(from !== '/login' ? from : dashboardRoutes?.[formData?.role]);
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFASubmit = (e) => {
    e?.preventDefault();
    handleLogin(e);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  if (showMFA) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} color="var(--color-accent-foreground)" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Multi-Factor Authentication</h2>
            <p className="text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <form onSubmit={handleMFASubmit} className="space-y-6">
            <Input
              label="Authentication Code"
              type="text"
              placeholder="Enter 6-digit code"
              value={mfaCode}
              onChange={(e) => setMfaCode(e?.target?.value)}
              error={errors?.mfa}
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              required
            />

            {errors?.general && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-destructive text-sm">{errors?.general}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                iconName="Shield"
                iconPosition="left"
              >
                Verify & Login
              </Button>

              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={() => setShowMFA(false)}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={32} color="var(--color-primary-foreground)" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Smart Student Hub account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />

          <Select
            label="Select Role"
            placeholder="Choose your role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          {errors?.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-destructive text-sm">{errors?.general}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              onClick={handleForgotPassword}
              className="p-0 h-auto text-sm"
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            New to Smart Student Hub?{' '}
            <Button
              variant="link"
              onClick={onSwitchToSignup}
              className="p-0 h-auto text-sm font-medium"
            >
              Create Account
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;