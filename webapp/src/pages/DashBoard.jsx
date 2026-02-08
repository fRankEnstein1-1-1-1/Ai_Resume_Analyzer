import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-card">
          <h2 className="dashboard-title">Welcome 👋</h2>

          <button
            className="upload-btn"
            onClick={() => navigate("/upload")}
          >
            Upload Resume
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;