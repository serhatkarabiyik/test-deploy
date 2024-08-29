import React, { useState, useEffect } from "react";

const Timer = ({ userId }) => {
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setCurrentDuration(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, startTime]);

  const startSequence = () => {
    setReactionTime(null);
    setCurrentDuration(0);
    setMessage("");

    const lightIntervals = [
      1000,
      1000,
      1000,
      1000,
      Math.random() * 2000 + 1000,
    ];

    lightIntervals.forEach((delay, index) => {
      setTimeout(
        () => {
          setLights((prevLights) => prevLights.map((light, i) => i <= index));

          if (index === lights.length - 1) {
            setTimeout(() => {
              setLights([false, false, false, false, true]);
              setRunning(true);
              setStartTime(Date.now());
              setMessage("Go!");
            }, delay);
          }
        },
        lightIntervals.slice(0, index + 1).reduce((a, b) => a + b, 0)
      );
    });
  };

  const stopTimer = async () => {
    if (running) {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setRunning(false);

      try {
        const response = await fetch(
          "http://localhost:5000/api/timer/submit-reaction-time",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ time: reaction, user_id: userId }),
          }
        );
        const data = await response.json();
        console.log("Saved:", data);
      } catch (error) {
        console.error("Error saving reaction time:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>F1 Reaction Timer</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {lights.map((light, index) => (
          <div
            key={index}
            style={{
              width: "50px",
              height: "50px",
              margin: "5px",
              borderRadius: "50%",
              backgroundColor: light
                ? index === lights.length - 1 && running
                  ? "green"
                  : "red"
                : "black",
            }}
          ></div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={startSequence} disabled={running}>
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!running}
          style={{
            backgroundColor: running ? "green" : "grey",
            color: "white",
            cursor: running ? "pointer" : "not-allowed",
          }}
        >
          Stop
        </button>
      </div>

      {running && (
        <div>
          <h2>Current Duration: {currentDuration} ms</h2>
        </div>
      )}

      {reactionTime !== null && (
        <div>
          <h2>Your reaction time is: {reactionTime} ms</h2>
        </div>
      )}

      {message && <h3>{message}</h3>}
    </div>
  );
};

export default Timer;
