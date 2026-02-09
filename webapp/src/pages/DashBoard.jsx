import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import "./DashBoard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const {user} = useAuth()

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-card">
          <h2 className="dashboard-title"> Welcome {user?.name ? ` ${user.name}` : ""} 👋</h2>

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