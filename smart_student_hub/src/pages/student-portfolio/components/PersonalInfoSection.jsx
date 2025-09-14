import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import api from "../../../utils/api"; // ✅ use your axios instance

const PersonalInfoSection = ({ data, isEditable = false, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(data || {});

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
  try {
    const res = await api.put(`/auth/me/`, personalInfo);

    setPersonalInfo(res.data?.user || res.data);
    setIsEditing(false);

    // ✅ update parent state (StudentPortfolio)
    if (onUpdate) onUpdate(res.data?.user || res.data);

    // ✅ refresh the page after saving
    window.location.reload();
  } catch (err) {
    console.error("Error updating student info:", err);
  }
};


  const handleInputChange = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!personalInfo) return <p>No personal info found</p>;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Personal Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Basic details and contact information
            </p>
          </div>
        </div>

        {isEditable && (
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={isEditing ? handleSave : handleEdit}
            iconName={isEditing ? "Check" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={personalInfo?.fullname || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              />
            ) : (
              <p className="text-foreground font-medium">{personalInfo?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              Email Address
            </label>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <p className="text-foreground">{personalInfo?.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={personalInfo?.phone || ""}
                placeholder="Add your phone number"
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <p className="text-foreground">
                  {personalInfo?.phone || "Add your phone number"}
                </p>
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={personalInfo?.location || ""}
                placeholder="Add your location"
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <p className="text-foreground">
                  {personalInfo?.location || "Add your location"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* LinkedIn */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              LinkedIn Profile
            </label>
            {isEditing ? (
              <input
                type="url"
                value={personalInfo?.linkedIn || ""}
                placeholder="Add your LinkedIn profile"
                onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Icon name="Linkedin" size={16} className="text-muted-foreground" />
                {personalInfo?.linkedIn ? (
                  <a
                    href={personalInfo?.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {personalInfo?.linkedIn}
                  </a>
                ) : (
                  <p className="text-foreground">Add your LinkedIn profile</p>
                )}
              </div>
            )}
          </div>

          {/* GitHub */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              GitHub Profile
            </label>
            {isEditing ? (
              <input
                type="url"
                value={personalInfo?.github || ""}
                placeholder="Add your GitHub profile"
                onChange={(e) => handleInputChange("github", e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Icon name="Github" size={16} className="text-muted-foreground" />
                {personalInfo?.github ? (
                  <a
                    href={personalInfo?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {personalInfo?.github}
                  </a>
                ) : (
                  <p className="text-foreground">Add your GitHub profile</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
