import { PropsWithChildren } from "react";
import { PlayerActions } from "./PlayerActions";
import styles from "./GameScreen.module.scss";

export function GameScreen({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Welcome lone traveler!</h1>
      <div className={styles.wrapper}>
        {children}
        <PlayerActions />
      </div>
    </>
  );
}
