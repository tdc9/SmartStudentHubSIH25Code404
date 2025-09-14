const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Auth Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin", "gov"],
      default: "student",
    },

    // Personal Info Section
    fullName: { type: String },
    phone: { type: String },
    bio: { type: String },
    avatar: { type: String }, // profile picture URL
    location: { type: String },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
      portfolio: { type: String },
    },

    // 🔗 Achievements (reference to Achievement model)
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
      },
    ],
  }

);

module.exports = mongoose.model("User", userSchema);
