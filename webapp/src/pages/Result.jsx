import Navbar from "../components/Navbar";
import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom"; // Added for better UX
import "./Result.css";

const Result = () => {
  const { result } = useResult();
  const navigate = useNavigate();
console.log(result)
  // Handle case where result is empty or null
  if (!result) {
    return (
      <>
        <Navbar />
        <div className="result-page">
          <div className="result-card result-empty">
            <h2 className="result-title">No Result Yet</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Please upload your resume and job description to see the analysis.
            </p>
            <button className="analyze-btn" onClick={() => navigate("/")}>
              Go to Upload
            </button>
          </div>
        </div>
      </>
    );
  }

  const { matchScore, matchedSkills = [], missingSkills = [] } = result;

  return (
    <>
      <Navbar />

      <div className="result-page">
        <div className="result-card">
          <h2 className="result-title">Resume Analysis Result</h2>

          {/* Score Circle */}
          {/* Note: We pass the score to the CSS variable --score */}
          <div 
            className="score-circle" 
            style={{ "--score": matchScore }}
          >
            <span>{matchScore}%</span>
          </div>

          {/* Skills Container */}
          <div className="skills-wrapper">
            {/* Matched Skills */}
            <div className="skills-box">
              <h3>Matched Skills</h3>
              <div className="tags success">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((s, i) => <span key={i}>{s}</span>)
                ) : (
                  <span style={{ background: 'none', color: '#999' }}>None detected</span>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="skills-box">
              <h3>Missing Skills</h3>
              <div className="tags danger">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s, i) => <span key={i}>{s}</span>)
                ) : (
                  <span style={{ background: 'none', color: '#999' }}>None detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="analyze-btn" onClick={() => navigate("/upload")}>
            Analyze Another
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;