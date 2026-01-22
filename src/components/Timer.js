import React, { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const totalSeconds = Number(secondsRemaining);
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
      // Timer logic to update every second can be added here
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const isDanger = totalSeconds <= 30 && totalSeconds > 0;
  return (
    <div className={`timer ${isDanger ? "timer--danger" : ""}`}>
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
