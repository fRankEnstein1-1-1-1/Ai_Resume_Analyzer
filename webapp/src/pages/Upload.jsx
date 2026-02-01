import Navbar from "../components/Navbar";
import { useUpload } from "../context/UploadContext";
import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios"; // ✅ add this

const Upload = () => {
  const { file, setFile, description, setDescription, uploadResume } = useUpload();
  const { analyzeResume } = useResult();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ 1) Upload resume
      const uploadData = await uploadResume();
      console.log("done uploading", uploadData);

      // ✅ 2) Create Job (from textarea)
      const jobRes = await API.post("/job", { description });
      console.log("job created", jobRes.data);

      const jobId = jobRes.data._id;

      // ✅ 3) Analyze resume (uploadId + jobId)
      await analyzeResume(uploadData._id, jobId);
      console.log("Done analyzing");

      navigate("/result");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit} className="p-10 space-y-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold">Upload Resume</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <textarea
          className="border w-full p-2"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </form>
    </>
  );
};

export default Upload;
