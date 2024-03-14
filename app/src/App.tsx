import { useState } from "react";
import { BuildCharacter } from "./BuildCharacter";
import { PlayerData, PlayerPanel } from "./PlayerPanel";
import { GameScreen } from "./GameScreen";
import { PlayerActions } from "./PlayerActions";
import { GameOver } from "./GameOver";

function App() {
  const { playerData, startGame, fight, rest, startOver } = useApp();

  if (!playerData) {
    return (
      <main>
        <BuildCharacter onGameStart={startGame} />
      </main>
    );
  }

  if (playerData.currentHp === 0) {
    return <GameOver onStartOver={startOver} />;
  }

  return (
    <main>
      <GameScreen>
        <PlayerPanel playerData={playerData} />
        <PlayerActions onFight={fight} onRest={rest} />
      </GameScreen>
    </main>
  );
}

export default App;

function useApp() {
  const [playerData, setPlayerData] = useState<PlayerData | undefined>();

  return {
    playerData,
    startOver() {
      setPlayerData(undefined);
    },
    startGame(playerData: Omit<PlayerData, "currentHp">) {
      setPlayerData({
        ...playerData,
        currentHp: playerData.stats.hp,
      });
    },
    fight() {
      if (!playerData) {
        return;
      }

      setPlayerData({
        ...playerData,
        currentHp: playerData?.currentHp - 1,
      });
    },
    rest() {
      if (!playerData) {
        return;
      }

      setPlayerData({
        ...playerData,
        currentHp: playerData.stats.hp,
      });
    },
  };
}
