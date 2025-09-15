import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const LoginForm = ({ onSignUpClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError("");

    if (!formData?.email || !formData?.password || !formData?.agreeToTerms) {
      setError("Please fill all fields and accept terms");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: formData.email,
        password: formData.password,
        role: "student", // enforce student role on this login form
      });

      const token = res.data?.token;
      const userRole = res.data?.user?.role || "student";

      if (!token) throw new Error("No token returned from server");

      if (userRole !== "student") {
        // If server says different role, prevent access from this form
        throw new Error("Only students can access this portal");
      }

      // Persist token + role
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" });
      Cookies.set("role", userRole, { expires: 7, secure: true, sameSite: "strict" });
      localStorage.setItem("token", token);

      setShowSuccess(true);
      
      // Use a brief timeout to allow the "Login successful" message to show
      // before navigating away. This is better for user experience.
      setTimeout(() => {
        navigate("/student-dashboard", { replace: true });
      }, 1000); // 1-second delay
      
    } catch (err) {
      // axios error => err.response?.data?.message; fallback to err.message
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glassmorphism-card p-8 w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gradient mb-2"
        >
          Student Portal Login
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground flex items-center justify-center gap-2"
        >
          <Icon name="Shield" size={16} />
          Secure Access to Academic Records
        </motion.p>
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
          Login successful! Redirecting...
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
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
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          required
        />

        <Checkbox
          name="agreeToTerms"
          label="I agree to the Terms & Conditions and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          required
        />

        <Button
          type="submit"
          variant="default"
          fullWidth
          disabled={!formData?.agreeToTerms || loading}
          className="bg-white text-slate-900 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
        >
          {loading ? (
            "Authenticating..."
          ) : (
            <>
              <Icon name="LogIn" size={20} className="mr-2" />
              Login to Portal
            </>
          )}
        </Button>

        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-muted-foreground text-sm">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={onSignUpClick}
              className="text-accent hover:text-accent/80 font-medium underline underline-offset-2"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;