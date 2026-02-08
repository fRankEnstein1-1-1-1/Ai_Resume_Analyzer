import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useResult } from "../context/ResultContext";
import "./History.css";

const History = () => {
  const { history, fetchHistory } = useResult();

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="history-page">
        <h2 className="history-title">Analysis History</h2>

        <div className="history-grid">
          {history.map((item) => (
            <div key={item._id} className="history-card">
              <div className="score-badge">
                {item.matchScore}%
              </div>

              <div className="skills-section">
                <p className="label">Matched Skills</p>
                <div className="tag-group success">
                  {item.matchedSkills?.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="skills-section">
                <p className="label">Missing Skills</p>
                <div className="tag-group danger">
                  {item.missingSkills?.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;