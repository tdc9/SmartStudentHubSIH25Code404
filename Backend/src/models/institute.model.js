const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Institute name
    code: { type: String, unique: true, required: true }, // Short unique code, e.g. "IITD"
    type: { type: String, enum: ["school", "college", "university"], required: true },

    // Location info
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: "India" },

    // Faculties linked to this institute
    faculty: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // must have role: "faculty"
      },
    ],

    // Optional head of institution (faculty user)
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // must be faculty
    },

    // Created/Approved by gov user
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role: "gov"
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institution", institutionSchema);
