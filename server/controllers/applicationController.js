const Application = require("../models/Application");

// ✅ Apply to a job
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;
    const resumeUrl = req.body.resumeUrl || "";

    console.log("🔐 User ID:", userId);
    console.log("📎 Job ID:", jobId);
    console.log("📄 Resume URL:", resumeUrl);

    // Check if already applied
    const existing = await Application.findOne({ job: jobId, applicant: userId });
    if (existing) return res.status(400).json({ message: "Already applied" });

    // Create new application
    const application = new Application({
      job: jobId,
      applicant: userId,
      resumeUrl
    });

    await application.save();

    // Emit real-time event (optional: requires io to be passed in or set globally)
    // io.emit("new-application", { jobId, applicantId: userId });

    res.status(201).json({ message: "Applied successfully", application });
  } catch (err) {
    console.error("❌ Application error:", err);
    res.status(500).json({ message: "Application failed", error: err.message });
  }
};

// ✅ Get all applications for a specific job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("applicant", "name email");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
};

// ✅ Get applicants for a specific job (for recruiters)
exports.getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email resumeUrl");

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applicants", error: err.message });
  }
};
