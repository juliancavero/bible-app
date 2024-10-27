import { useEffect } from "react";

const useTimer = (every: number, onTick: () => void) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onTick();
    }, every);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default useTimer;
