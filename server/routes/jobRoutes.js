const express = require("express");
const router = express.Router();
const { createJob, getMyJobs, deleteJob, getAllJobs } = require("../controllers/jobController"); // ✅ one-time import
const protect = require("../middlewares/authMiddleware");


// Routes
router.post("/", protect, createJob);         // POST /api/jobs
router.get("/my", protect, getMyJobs);        // GET /api/jobs/my
router.delete("/:id", protect, deleteJob);    // DELETE /api/jobs/:id

module.exports = router;
router.get("/", getAllJobs); // 📢 Public route for all jobs

