import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useResult } from "../context/ResultContext";
import "./History.css";

const History = () => {
  const { history = [], fetchHistory } = useResult();

  useEffect(() => {
    fetchHistory();
  }, []);

  console.log(history);

  // Score interpretation helper
  const getScoreStatus = (score) => {
    if (score >= 90)
      return { text: "Excellent Match", className: "excellent" };

    if (score >= 70)
      return { text: "Strong Match", className: "strong" };

    if (score >= 50)
      return { text: "Moderate Match", className: "moderate" };

    return { text: "Needs Improvement", className: "low" };
  };

  return (
    <>
      <Navbar />

      <div className="history-page">
        <h2 className="history-title">Analysis History</h2>

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="history-empty">
            No previous analysis found.
          </div>
        ) : (
          <div className="history-grid">

            {history.map((item) => {

              // Normalize score
              const normalizedScore =
                item.matchScore <= 1
                  ? item.matchScore * 100
                  : item.matchScore;

              const formattedScore = Math.round(normalizedScore);

              const status = getScoreStatus(formattedScore);

              return (
                <div key={item._id} className="history-card">

                  {/* Score Badge */}
                  <div className="score-badge">
                    {formattedScore}%
                  </div>

                  {/* Status Label */}
                  <div className={`score-status ${status.className}`}>
                    {status.text}
                  </div>

                  {/* Matched Skills */}
                  <div className="skills-section">
                    <p className="label">Matched Skills</p>
                    <div className="tag-group success">
                      {item.matchedSkills?.length ? (
                        item.matchedSkills.map((s, i) => (
                          <span key={i}>{s}</span>
                        ))
                      ) : (
                        <span className="empty">None detected</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="skills-section">
                    <p className="label">Missing Skills</p>
                    <div className="tag-group danger">
                      {item.missingSkills?.length ? (
                        item.missingSkills.map((s, i) => (
                          <span key={i}>{s}</span>
                        ))
                      ) : (
                        <span className="empty">None detected</span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </>
  );
};

export default History;
