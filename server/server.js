const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve resume files

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobseeker", require("./routes/jobSeekerRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

// ✅ Default Test Route
app.get("/", (req, res) => {
  res.send("✅ API is running successfully!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
