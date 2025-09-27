const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, recruiter: req.user.id });
    await job.save();
    res.status(201).json({ message: "Job created", job });
  } catch (err) {
    res.status(500).json({ message: "Failed to create job", error: err.message });
  }
};

// Get all jobs of the recruiter
exports.getMyJobs = async (req, res) => {
  try {
    console.log("👤 Recruiter ID from token:", req.user.id); // ✅ log user
    const jobs = await Job.find({ recruiter: req.user.id });
    console.log("📦 Found jobs:", jobs);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};

// 🗑️ Delete job by ID
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.user.id,
    });

    if (!job) return res.status(404).json({ message: "Job not found or unauthorized" });

    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// 🌐 Get all jobs (public, with optional filters)
exports.getAllJobs = async (req, res) => {
  try {
    const { keyword, location, company } = req.query;

    const filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (company) {
      filter.company = { $regex: company, $options: "i" };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};
