// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Replace with your actual component paths
import JobSearch from "./components/JobSearch"; // ✅ Use JobSearch instead of JobList
import ProfileForm from "./components/ProfileForm";
import RecruiterDashboard from "./components/RecruiterDashboard";

const token = localStorage.getItem("token");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={token ? <JobSearch /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <ProfileForm /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <RecruiterDashboard /> : <Navigate to="/login" />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
