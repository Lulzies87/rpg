import { FormEvent, useReducer } from "react";
import { PlayerData, Stats } from "./PlayerPanel";
import axios from "axios";

const server = axios.create({
  baseURL:"http://localhost:3000",
});

type BuildCharacterProps = {
  onGameStart(playerData: Omit<PlayerData, "currentHp">): void;
};

export function BuildCharacter({ onGameStart }: BuildCharacterProps) {
  const {
    hp,
    updateHp,
    stamina,
    updateStamina,
    attack,
    updateAttack,
    defense,
    updateDefense,
    remainingPoints,
    startGame,
  } = useStats(onGameStart);

  return (
    <>
      <h1>Build your character</h1>
      <form onSubmit={startGame}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="hp">HP</label>
          <input
            type="number"
            name="hp"
            id="hp"
            value={hp}
            onChange={updateHp}
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="stamina">Stamina</label>
          <input
            type="number"
            name="stamina"
            id="stamina"
            value={stamina}
            onChange={updateStamina}
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="attack">Attack</label>
          <input
            type="number"
            name="attack"
            id="attack"
            value={attack}
            onChange={updateAttack}
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="defense">Defense</label>
          <input
            type="number"
            name="defense"
            id="defense"
            value={defense}
            onChange={updateDefense}
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="remainingPoints">Remaining points</label>
          <input
            type="number"
            id="remainingPoints"
            value={remainingPoints}
            max={0}
            readOnly
          />
        </div>
        <button>Start!</button>
      </form>
    </>
  );
}

const maxPoints = 16;

type StatsAction = { statToUpdate: keyof Stats; newValue: number };

const initialStats: Stats = {
  hp: 4,
  stamina: 4,
  attack: 4,
  defense: 4,
};

function statsReducer(stats: Stats, action: StatsAction) {
  const updatedStats = {
    ...stats,
    [action.statToUpdate]: action.newValue,
  };

  const newTotal =
    updatedStats.hp +
    updatedStats.stamina +
    updatedStats.attack +
    updatedStats.defense;

  return newTotal > maxPoints ? stats : updatedStats;
}

function useStats(
  onGameStart: (playerData: Omit<PlayerData, "currentHp">) => void
) {
  const [stats, updateStat] = useReducer(statsReducer, initialStats);

  const remainingPoints =
    maxPoints - stats.hp - stats.stamina - stats.attack - stats.defense;

  return {
    ...stats,
    remainingPoints,
    updateHp: (e: FormEvent<HTMLInputElement>) =>
      updateStat({
        statToUpdate: "hp",
        newValue: e.currentTarget.valueAsNumber,
      }),
    updateStamina: (e: FormEvent<HTMLInputElement>) =>
      updateStat({
        statToUpdate: "stamina",
        newValue: e.currentTarget.valueAsNumber,
      }),
    updateAttack: (e: FormEvent<HTMLInputElement>) =>
      updateStat({
        statToUpdate: "attack",
        newValue: e.currentTarget.valueAsNumber,
      }),
    updateDefense: (e: FormEvent<HTMLInputElement>) =>
      updateStat({
        statToUpdate: "defense",
        newValue: e.currentTarget.valueAsNumber,
      }),
    startGame: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (remainingPoints > 0) {
        console.error("Need to invest all points");
        return;
      }

      const formData = new FormData(e.currentTarget);

      const characterData = {
        name: formData.get("name")!.toString(),
        stats: {
          hp: stats.hp,
          stamina: stats.stamina,
          attack: stats.attack,
          defence: stats.defense,
        },
      };

      try {
        const response = await server.post(
          "/api/characters",
          characterData
        );
        console.log("Character saved:", response.data);
      } catch (error) {
        console.error("Error saving character:", error);
      }

      onGameStart({
        name: formData.get("name")!.toString(),
        stats: {
          hp: stats.hp,
          stamina: stats.stamina,
          attack: stats.attack,
          defense: stats.defense,
        },
      });
    },
  };
}
