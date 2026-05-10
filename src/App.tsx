import { useEffect, useState } from "react";
import { getHealthStatus } from "./services/healthService";

const App = () => {
  const [count, setCount] = useState<number>(0);
  const [health, setHealth] = useState<string>("");

  const handleCountInsrease = () => {
    return setCount((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        console.log("get Data");
        const response = await getHealthStatus();
        setHealth(response?.message);
        console.log("Date from health", response);
      } catch (err) {
        console.error("Health API Error", err);
      }
    };
    fetchHealth();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      {health && (
        <h1 className="text-6xl font-bold text-emerald-500">{health}</h1>
      )}
      <h3 className="text-5xl font-bold text-cyan-400">Count: {count}</h3>
      <div>
        <button
          className="font-bold text-black-300 w-18 h-6 m-4 bg-amber-300"
          onClick={handleCountInsrease}
        >
          Inc
        </button>
      </div>
    </div>
  );
};

export default App;
