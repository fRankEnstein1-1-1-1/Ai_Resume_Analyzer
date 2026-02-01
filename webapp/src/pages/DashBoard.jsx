import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Welcome 👋</h2>

        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Upload Resume
        </button>
      </div>
    </>
  );
};

export default Dashboard;
