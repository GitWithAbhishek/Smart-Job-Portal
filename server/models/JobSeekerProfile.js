// models/JobSeekerProfile.js
const mongoose = require("mongoose");

const jobSeekerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  personalInfo: {
    phone: String,
    address: String,
    bio: String,
  },
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startYear: String,
      endYear: String,
    },
  ],
  experience: [
    {
      company: String,
      title: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  skills: [String],
  portfolio: String,
  resumeUrl: String, // Cloud or local resume link
}, { timestamps: true });

module.exports = mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);
