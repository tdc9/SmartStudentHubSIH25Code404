import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Dean of Academic Affairs",
      institution: "State University",
      userType: "institution",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763c0c?w=150&h=150&fit=crop&crop=face",
      content: `The Smart Student Hub has revolutionized how we manage student data and compliance reporting. The automated NAAC report generation alone saves us weeks of manual work every semester.`,
      rating: 5,
      highlight: "Automated NAAC Reports"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Computer Science Student",
      institution: "Tech Institute",
      userType: "student",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Having all my achievements, certificates, and portfolio in one place has made job applications so much easier. The auto-generated portfolio feature is incredible!`,
      rating: 5,
      highlight: "Portfolio Generation"
    },
    {
      id: 3,
      name: "Mr. Rajesh Kumar",
      role: "Education Officer",
      institution: "State Education Department",
      userType: "government",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The compliance monitoring and audit trail features provide unprecedented transparency. We can now track institutional performance across the entire state in real-time.`,
      rating: 5,
      highlight: "Real-time Monitoring"
    }
  ];

  const useCases = [
    {
      title: "Student Success Story",
      description: "Track achievements from enrollment to graduation",
      icon: "TrendingUp",
      stats: "95% completion rate",
      color: "emerald"
    },
    {
      title: "Institution Efficiency",
      description: "Streamlined compliance and reporting workflows",
      icon: "Zap",
      stats: "70% time savings",
      color: "blue"
    },
    {
      title: "Government Oversight",
      description: "Comprehensive monitoring and audit capabilities",
      icon: "Eye",
      stats: "100% transparency",
      color: "purple"
    }
  ];

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case 'student':
        return 'User';
      case 'institution':
        return 'Building2';
      case 'government':
        return 'Shield';
      default:
        return 'User';
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'student':
        return 'emerald';
      case 'institution':
        return 'blue';
      case 'government':
        return 'purple';
      default:
        return 'emerald';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
            <Icon name="MessageSquare" size={24} color="var(--color-blue-400)" />
            <span className="text-blue-400 font-semibold">Success Stories</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Thousands
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
              Across the Nation
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See how students, institutions, and government bodies are transforming 
            educational administration with our comprehensive platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} color="var(--color-yellow-400)" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-slate-300 leading-relaxed mb-6 italic">
                "{testimonial?.content}"
              </blockquote>

              {/* Highlight */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 ${
                getUserTypeColor(testimonial?.userType) === 'emerald' ?'bg-emerald-500/20 text-emerald-400'
                  : getUserTypeColor(testimonial?.userType) === 'blue' ?'bg-blue-500/20 text-blue-400' :'bg-purple-500/20 text-purple-400'
              }`}>
                <Icon name="Sparkles" size={12} />
                {testimonial?.highlight}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600">
                    <img 
                      src={testimonial?.avatar} 
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center ${
                    getUserTypeColor(testimonial?.userType) === 'emerald' ?'bg-emerald-500'
                      : getUserTypeColor(testimonial?.userType) === 'blue' ?'bg-blue-500' :'bg-purple-500'
                  }`}>
                    <Icon name={getUserTypeIcon(testimonial?.userType)} size={10} color="white" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial?.name}
                  </h4>
                  <p className="text-slate-400 text-xs">
                    {testimonial?.role}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {testimonial?.institution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases?.map((useCase, index) => (
            <div
              key={index}
              className="group text-center bg-slate-800/30 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border group-hover:scale-110 transition-transform duration-300 ${
                useCase?.color === 'emerald' ?'bg-emerald-500/10 border-emerald-500/20'
                  : useCase?.color === 'blue' ?'bg-blue-500/10 border-blue-500/20' :'bg-purple-500/10 border-purple-500/20'
              }`}>
                <Icon 
                  name={useCase?.icon} 
                  size={28} 
                  color={`var(--color-${useCase?.color}-400)`}
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                {useCase?.title}
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {useCase?.description}
              </p>
              <div className={`text-2xl font-bold mb-2 ${
                useCase?.color === 'emerald' ?'text-emerald-400'
                  : useCase?.color === 'blue' ?'text-blue-400' :'text-purple-400'
              }`}>
                {useCase?.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;