import { createContext, useContext, useState } from "react";
import API from "../api/axios.js";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

 const analyzeResume = async (uploadId, jobId) => {
  const res = await API.post("/analyze", { uploadId, jobId });
  setResult(res.data);
};

  const fetchHistory = async () => {
    const res = await API.get("/previousresults");
    setHistory(res.data);
  };

  return (
    <ResultContext.Provider
      value={{ result, history, analyzeResume, fetchHistory }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => useContext(ResultContext);
