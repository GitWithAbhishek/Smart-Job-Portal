// controllers/jobSeekerController.js
const JobSeekerProfile = require("../models/JobSeekerProfile");
const Job = require("../models/Job");

// @desc Create or update job seeker profile
exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = {
      user: userId,
      personalInfo: req.body.personalInfo,
      education: req.body.education,
      experience: req.body.experience,
      skills: req.body.skills,
      portfolio: req.body.portfolio,
      resumeUrl: req.body.resumeUrl,
    };

    const profile = await JobSeekerProfile.findOneAndUpdate(
      { user: userId },
      { $set: data },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Profile saved", profile });
  } catch (err) {
    res.status(500).json({ message: "Error saving profile", error: err.message });
  }
};

// @desc Get current user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findOne({ user: req.user.id }).populate("user", "name email role");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// @desc Recommend jobs to the job seeker
exports.recommendJobs = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const keywords = profile.skills;

    const recommendedJobs = await Job.find({
      $or: [
        { title: { $in: keywords.map(k => new RegExp(k, 'i')) } },
        { description: { $in: keywords.map(k => new RegExp(k, 'i')) } },
        { location: new RegExp(profile.personalInfo?.address || "", "i") }
      ]
    }).limit(10);

    res.status(200).json(recommendedJobs);
  } catch (err) {
    res.status(500).json({ message: "Recommendation failed", error: err.message });
  }
};
