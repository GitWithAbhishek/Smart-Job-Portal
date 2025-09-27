const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: String,
  location: String,
  description: String,
  salary: String,
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
