import styles from "./GameOver.module.scss";

type GameOverProps = {
  onStartOver(): void;
};

export function GameOver({ onStartOver }: GameOverProps) {
  return (
    <main className={styles.wrapper}>
      <div>
        <h1>Game over...</h1>
        <button onClick={onStartOver}>Start over</button>
      </div>
    </main>
  );
}
