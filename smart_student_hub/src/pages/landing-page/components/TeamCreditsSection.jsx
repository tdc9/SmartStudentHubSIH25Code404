import React from 'react';
import Icon from '../../../components/AppIcon';

const TeamCreditsSection = () => {
  const teamData = {
    teamCode: "404",
    leader: "Jayesh Gaur",
    coLeader: "Adarsh Upadhyay",
    members: ["Nisha", "Aditi", "Shipra Bharti", "Aditya Pratap Singh"]
  };

  const teamMembers = [
    {
      name: teamData?.leader,
      role: "Team Leader",
      avatar: "https://darncreative.xyz/team/jayesh.jpg",
      skills: ["Full Stack Development", "Project Management", "System Architecture"],
      isLeader: true
    },
    {
      name: teamData?.coLeader,
      role: "Co-Leader",
      avatar: "https://darncreative.xyz/team/adarsh.jpg",
      skills: ["Frontend Development", "UI/UX Design", "Team Coordination"],
      isCoLeader: true
    },
    ...teamData?.members?.map((member, index) => ({
      name: member,
      role: "Team Member",
      avatar: `https://darncreative.xyz/team/${[
        'Nisha.jpg',
        'Aditi.jpg',
        'Shipra.jpg',
        'Aditaya.jpg'
      ]?.[index]}?w=150&h=150&fit=crop&crop=face`,
      skills: [
        ["Frontend Development", "Database Design", "API Integration"],
        ["Frontend Development", "React.js", "Component Design"],
        ["Quality Assurance", "Testing", "Documentation"],
        ["DevOps", "Deployment", "System Integration"]
      ]?.[index],
      isLeader: false,
      isCoLeader: false
    }))
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-6">
            <Icon name="Users" size={24} color="var(--color-emerald-400)" />
            <span className="text-emerald-400 font-semibold">Team Code {teamData?.teamCode}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
              Development Team
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A dedicated team of developers and designers working together to create 
            innovative educational technology solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers?.map((member, index) => (
            <div
              key={index}
              className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl ${
                member?.isLeader 
                  ? 'border-emerald-500/50 shadow-emerald-500/10' 
                  : member?.isCoLeader 
                    ? 'border-blue-500/50 shadow-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {/* Role Badge */}
              {(member?.isLeader || member?.isCoLeader) && (
                <div className={`absolute -top-3 left-6 px-4 py-1 rounded-full text-xs font-semibold ${
                  member?.isLeader 
                    ? 'bg-emerald-500 text-white' :'bg-blue-500 text-white'
                }`}>
                  {member?.role}
                </div>
              )}

              {/* Avatar */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-full overflow-hidden mx-auto border-4 ${
                  member?.isLeader 
                    ? 'border-emerald-500' 
                    : member?.isCoLeader 
                      ? 'border-blue-500' :'border-slate-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <img 
                    src={member?.avatar} 
                    alt={member?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                
                {/* Status Indicator */}
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center ${
                  member?.isLeader 
                    ? 'bg-emerald-500' 
                    : member?.isCoLeader 
                      ? 'bg-blue-500' :'bg-purple-500'
                }`}>
                  <Icon 
                    name={member?.isLeader ? "Crown" : member?.isCoLeader ? "Star" : "User"} 
                    size={12} 
                    color="white" 
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  {member?.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {member?.role}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {member?.skills?.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center bg-slate-800/30 rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-emerald-400 mb-2">6</div>
            <div className="text-slate-300 text-sm">Team Members</div>
          </div>
          <div className="text-center bg-slate-800/30 rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">100+</div>
            <div className="text-slate-300 text-sm">Hours Invested</div>
          </div>
          <div className="text-center bg-slate-800/30 rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
            <div className="text-slate-300 text-sm">Features Built</div>
          </div>
          <div className="text-center bg-slate-800/30 rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-orange-400 mb-2">3</div>
            <div className="text-slate-300 text-sm">User Roles</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCreditsSection;