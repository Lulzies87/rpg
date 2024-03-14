import { useEffect, useState } from "react";
import styles from "./PlayerActions.module.scss";

const restTimeInSeconds = 10;

type PlayerActionsProps = {
  onFight(): void;
  onRest(): void;
};

export function PlayerActions({ onFight, onRest }: PlayerActionsProps) {
  const [timeToRest, setTimeToRest] = useState(0);

  useEffect(() => {
    if (timeToRest === 0) {
      return;
    }

    const handle = setTimeout(() => {
      setTimeToRest(timeToRest - 1);

      if (timeToRest === 1) {
        onRest();
      }
    }, 1000);

    return () => {
      clearTimeout(handle);
    };
  }, [timeToRest, onRest]);

  function rest() {
    setTimeToRest(restTimeInSeconds);
  }

  if (timeToRest > 0) {
    return (
      <article>
        <p>Resting...</p>
        <progress max={restTimeInSeconds} value={timeToRest} />
      </article>
    );
  }

  return (
    <article>
      <h2>What would you like to do?</h2>
      <menu className={styles.menu}>
        <li>
          <button onClick={onFight}>Fight</button>
        </li>
        <li>
          <button onClick={rest}>Rest</button>
        </li>
      </menu>
    </article>
  );
}
