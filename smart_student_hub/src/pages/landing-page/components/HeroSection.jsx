import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

 const handleRoleSelection = (role) => {
  const roleRoutes = {
    student: "/login",
    institution: "/institute-login",
    government: "/government-login",
  };

  const path = roleRoutes[role.toLowerCase()]; // in case role is "Student" with caps

  if (path) {
    navigate(path, { state: { selectedRole: role } });
  } else {
    console.error("Unknown role:", role);
  }
};


  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold text-white">Smart Student Hub</h1>
            <p className="text-emerald-300 text-sm">Educational Excellence Platform</p>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Streamline Educational
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
            Administration
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          A unified platform connecting students, institutions, and government bodies for efficient 
          data management, compliance monitoring, and academic progress tracking.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            variant="default"
            size="lg"
            onClick={() => handleRoleSelection('student')}
            iconName="User"
            iconPosition="left"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
          >
            Student Portal
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleRoleSelection('institution')}
            iconName="Building2"
            iconPosition="left"
            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Institution Admin
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleRoleSelection('government')}
            iconName="Shield"
            iconPosition="left"
            className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Government Officer
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-emerald-400 mb-2">10,000+</div>
            <div className="text-slate-300">Active Students</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-slate-300">Partner Institutions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
            <div className="text-slate-300">Compliance Rate</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} color="rgba(255,255,255,0.6)" />
      </div>
    </section>
  );
};

export default HeroSection;