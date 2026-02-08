import Navbar from "../components/Navbar";
import { useUpload } from "../context/UploadContext";
import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import "./Upload.css";   // ✅ add css

const Upload = () => {
  const { file, setFile, description, setDescription, uploadResume } = useUpload();
  const { analyzeResume } = useResult();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const uploadData = await uploadResume();

      const jobRes = await API.post("/job", { description });
      const jobId = jobRes.data._id;

      await analyzeResume(uploadData._id, jobId);

      navigate("/result");
    } catch (err) {
      alert(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="upload-page">
        <form onSubmit={handleSubmit} className="upload-card">
          <h2 className="upload-title">Upload Your Resume</h2>

          <label className="file-box">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <span>
              {file ? file.name : "Click to choose PDF or drag it here"}
            </span>
          </label>

          <textarea
            className="job-input"
            placeholder="Paste Job Description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button className="analyze-btn" disabled={loading}>
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;