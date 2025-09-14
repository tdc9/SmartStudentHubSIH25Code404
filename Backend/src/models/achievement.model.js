const { Schema, model } = require('mongoose');

const AchievementSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  title: String,
  type: { type: String, enum: ['conference','workshop','certification','club','volunteering','internship','competition','leadership'] },
  description: String,
  date: Date,
  issuingAuthority: String,
  proofUrl: String,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  verifier: { type: Schema.Types.ObjectId, ref: 'User' },
  verifierRemarks: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  verifiedAt: Date
});

module.exports = model('Achievement', AchievementSchema);