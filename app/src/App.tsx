import { useState } from "react";
import { BuildCharacter } from "./BuildCharacter";
import { PlayerData, PlayerPanel } from "./PlayerPanel";
import { GameScreen } from "./GameScreen";

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | undefined>();

  if (!playerData) {
    return (
      <main>
        <BuildCharacter onGameStart={setPlayerData} />
      </main>
    );
  }

  return (
    <main>
      <GameScreen>
        <PlayerPanel playerData={playerData} />
      </GameScreen>
    </main>
  );
}

export default App;
