import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'js-cookie';

import LoginHeader from './components/LoginHeader';
import SecurityBadges from './components/SecurityBadges';
import CredentialsHelper from './components/CredentialsHelper';
import TeamCreditsSection from './components/TeamCreditsSection';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const LoginPage = () => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    bio: "",
    avatar: "",
    location: "",
    linkedin: "",
    github: "",
    twitter: "",
    portfolio: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignupMode) {
        // Call register API with all profile fields
        const res = await axios.post(`${API_BASE}/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          bio: formData.bio,
          avatar: formData.avatar,
          location: formData.location,
          socialLinks: {
            linkedin: formData.linkedin,
            github: formData.github,
            twitter: formData.twitter,
            portfolio: formData.portfolio,
          },
        });

        alert(res.data.message || "Signup successful, please login!");
        setIsSignupMode(false);

        // If backend returns token on signup, set cookie
        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: 'strict' });
        }
      } else {
        // Call login API
        const res = await axios.post(`${API_BASE}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: 'strict' });
        alert("Login successful!");
        window.location.href = "/student-dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isSignupMode ? 'Sign Up' : 'Login'} - Smart Student Hub</title>
        <meta
          name="description"
          content="Sign in to your Smart Student Hub account. Secure authentication for students, institutions, and government officers."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <LoginHeader />

        <main className="flex-1 py-12 px-6">
          <div className="max-w-7xl mx-auto">

            {/* Team Credits */}
            <TeamCreditsSection />

            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {isSignupMode ? 'Join Our Platform' : 'Secure Access Portal'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {isSignupMode 
                  ? 'Create your account to access personalized features and role-based dashboards'
                  : 'Sign in to access your personalized dashboard with role-based features and secure multi-factor authentication'}
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col items-center space-y-8">
              <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-card p-6 rounded-xl shadow">
                {error && <p className="text-red-500">{error}</p>}

                {isSignupMode && (
                  <>
                    <input
                      type="text"
                      name="name"
                      placeholder="Username"
                      value={formData.name}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                      required
                    />

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <textarea
                      name="bio"
                      placeholder="Short Bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="url"
                      name="avatar"
                      placeholder="Avatar (Image URL)"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="url"
                      name="linkedin"
                      placeholder="LinkedIn URL"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="url"
                      name="github"
                      placeholder="GitHub URL"
                      value={formData.github}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="url"
                      name="twitter"
                      placeholder="Twitter URL"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />

                    <input
                      type="url"
                      name="portfolio"
                      placeholder="Portfolio Website"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-4 py-2 rounded w-full"
                >
                  {loading ? "Please wait..." : (isSignupMode ? "Sign Up" : "Login")}
                </button>

                <p className="text-center">
                  {isSignupMode ? (
                    <>
                      Already have an account?{" "}
                      <button type="button" onClick={() => setIsSignupMode(false)} className="text-blue-500">
                        Login
                      </button>
                    </>
                  ) : (
                    <>
                      Don’t have an account?{" "}
                      <button type="button" onClick={() => setIsSignupMode(true)} className="text-blue-500">
                        Sign up
                      </button>
                    </>
                  )}
                </p>
              </form>

              {!isSignupMode && <CredentialsHelper />}
            </div>

            <SecurityBadges />

          </div>
        </main>

        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date()?.getFullYear()} Smart Student Hub. All rights reserved. |
              <span className="ml-2">Secure • Reliable • Trusted</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
