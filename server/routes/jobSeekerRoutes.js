const express = require("express");
const router = express.Router();
const {
  upsertProfile,
  getMyProfile,
  recommendJobs,
} = require("../controllers/jobSeekerController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// 🔒 Protected Profile Routes
router.post("/profile", protect, upsertProfile);
router.get("/profile", protect, getMyProfile);

// 📤 Upload Resume Route
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      const filePath = `uploads/${req.file.filename}`;
      const JobSeekerProfile = require("../models/JobSeekerProfile");
      const profile = await JobSeekerProfile.findOneAndUpdate(
        { user: req.user.id },
        { resumeUrl: filePath },
        { new: true }
      );
      res.status(200).json({ message: "Resume uploaded", resumeUrl: filePath, profile });
    } catch (err) {
      res.status(500).json({ message: "Resume upload failed", error: err.message });
    }
  }
);

// 🧠 Job Recommendations
router.get("/recommendations", protect, recommendJobs);

module.exports = router;
