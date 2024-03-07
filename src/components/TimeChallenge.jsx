import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer; // put outside so it doesn't get recreated

export default function TimeChallenge({ title, targetTime }) {
  // defined inside, so, it is component instance specific
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current); // to stop the setInterval if time is up
    // setTimeRemaining(targetTime * 1000); //only resets when timeremaining is <= 0
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000); //reset timer when dialog is closed
  }

  function handleStart() {
    // setTimerStarted(true);
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.open();
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
      // deduct 10 ms from the current timeRemaining.
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
    // setTimerStarted(false);
  }

  return (
    <>
      {/* {timerExpired && (
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      )} */}
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You Lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
