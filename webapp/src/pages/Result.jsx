import Navbar from "../components/Navbar";
import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Result.css";

const Result = () => {
  const { result } = useResult();
  const navigate = useNavigate();

  const [animatedScore, setAnimatedScore] = useState(0);

  console.log(result);

  // Handle empty result
  if (!result) {
    return (
      <>
        <Navbar />
        <div className="result-page">
          <div className="result-card result-empty">
            <h2 className="result-title">No Result Yet</h2>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              Please upload your resume and job description to see the analysis.
            </p>
            <button className="analyze-btn" onClick={() => navigate("/upload")}>
              Go to Upload
            </button>
          </div>
        </div>
      </>
    );
  }

  const { matchScore = 0, matchedSkills = [], missingSkills = [] } = result;

  // Normalize score safely
  const normalizedScore =
    matchScore <= 1 ? matchScore * 100 : matchScore;

  const formattedScore = Math.round(normalizedScore);

  // Animate score counting
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = Math.abs(Math.floor(duration / formattedScore));

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);

      if (start >= formattedScore) {
        clearInterval(timer);
      }
    }, stepTime || 10);

    return () => clearInterval(timer);
  }, [formattedScore]);

  // Score interpretation
  const getScoreStatus = () => {
    if (formattedScore >= 90)
      return { text: "Excellent Match", className: "excellent" };

    if (formattedScore >= 70)
      return { text: "Strong Match", className: "strong" };

    if (formattedScore >= 50)
      return { text: "Moderate Match", className: "moderate" };

    return { text: "Needs Improvement", className: "low" };
  };

  const status = getScoreStatus();

  return (
    <>
      <Navbar />

      <div className="result-page">
        <div className="result-card">
          <h2 className="result-title">Resume Analysis Result</h2>

          {/* Score Circle */}
          <div
            className="score-circle"
            style={{ "--score": animatedScore }}
          >
            <span>{animatedScore}%</span>
          </div>

          {/* Score Status */}
          <div className={`score-status ${status.className}`}>
            {status.text}
          </div>

          {/* AI Insight */}
          <div className="ai-insight">
            {formattedScore >= 80 &&
              "Your resume aligns strongly with the job requirements. Great work!"}

            {formattedScore >= 60 &&
              formattedScore < 80 &&
              "Your resume shows good alignment. Improving missing skills can increase your match score."}

            {formattedScore >= 40 &&
              formattedScore < 60 &&
              "Your resume partially matches the role. Consider updating skills and highlighting relevant experience."}

            {formattedScore < 40 &&
              "Your resume needs improvement to better match this job. Focus on adding required skills and relevant keywords."}
          </div>

          {/* Skills */}
          <div className="skills-wrapper">

            <div className="skills-box">
              <h3>Matched Skills</h3>
              <div className="tags success">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))
                ) : (
                  <span className="empty">None detected</span>
                )}
              </div>
            </div>

            <div className="skills-box">
              <h3>Missing Skills</h3>
              <div className="tags danger">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))
                ) : (
                  <span className="empty">None detected</span>
                )}
              </div>
            </div>

          </div>

          <button
            className="analyze-btn"
            onClick={() => navigate("/upload")}
          >
            Analyze Another
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
