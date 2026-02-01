import Navbar from "../components/Navbar";
import { useResult } from "../context/ResultContext";

const Result = () => {
  const { result } = useResult();

  if (!result) return <p className="p-10">No result yet</p>;

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>

        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default Result;
