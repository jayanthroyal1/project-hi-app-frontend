import { useState } from "react";

const App = () => {
  const [count, setCount] = useState<number>(0);
  const handleCountInsrease = () => {
    return setCount((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
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
