import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useResult } from "../context/ResultContext";

const History = () => {
  const { history, fetchHistory } = useResult();

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">History</h2>

        {history.map((item) => (
          <div key={item._id} className="border p-4 mb-3 rounded">
          <p><b>Score:</b> {item.matchScore}</p>
<p><b>Matched Skills:</b> {item.matchedSkills?.join(", ")}</p>
<p><b>Missing Skills:</b> {item.missingSkills?.join(", ")}</p>

          </div>
        ))}
      </div>
    </>
  );
};

export default History;
