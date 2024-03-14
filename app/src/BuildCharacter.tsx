import { FormEvent, useReducer } from "react";

export function BuildCharacter() {
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
  } = useStats();

  return (
    <>
      <h1>Build your character</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (remainingPoints > 0) {
            console.error("Need to invest all points");
            return;
          }

          const formData = new FormData(e.currentTarget);

          console.log({
            name: formData.get("name"),
            hp,
            stamina,
            attack,
            defense,
          });
        }}
      >
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
            onInput={updateHp}
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
            onInput={updateStamina}
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
            onInput={updateAttack}
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
            onInput={updateDefense}
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
          />
        </div>
        <button>Start!</button>
      </form>
    </>
  );
}

const maxPoints = 16;

type Stats = {
  hp: number;
  stamina: number;
  attack: number;
  defense: number;
};

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

function useStats() {
  const [stats, updateStat] = useReducer(statsReducer, initialStats);

  return {
    ...stats,
    remainingPoints:
      maxPoints - stats.hp - stats.stamina - stats.attack - stats.defense,
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
  };
}
