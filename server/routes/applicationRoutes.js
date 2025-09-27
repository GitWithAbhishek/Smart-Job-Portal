const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getApplicationsForJob,
  getApplicantsForJob, // ✅ added
} = require("../controllers/applicationController");
const protect = require("../middlewares/authMiddleware");

router.post("/apply/:jobId", protect, applyToJob);
router.get("/job/:jobId", protect, getApplicationsForJob);

// ✅ Recruiter route to view applicants
router.get("/applicants/:jobId", protect, getApplicantsForJob);

module.exports = router;
