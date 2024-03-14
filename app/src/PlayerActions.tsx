import styles from "./PlayerActions.module.scss";

export function PlayerActions() {
  return (
    <article>
      <h2>What would you like to do?</h2>
      <menu className={styles.menu}>
        <li>
          <button>Fight</button>
        </li>
        <li>
          <button>Rest</button>
        </li>
      </menu>
    </article>
  );
}
