import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  IGameState,
  IPokemonUrl,
  IPokemon,
  IProcessAttackDamage,
  TBattleStatus,
} from '../../ts/definitions';

// Define the initial state using IGameState
const initialState: IGameState = {
  pokemonDataUrls: [],
  battlingPokemonUrls: [],
  battlingPokemons: [],
  activePokemon: 0, // battlingPokemons array index
  battleStatus: 'pending',
  log: [],
  missChance: 0.2,
};

const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPokemonDataUrls: (state, action: PayloadAction<IPokemonUrl[]>) => {
      state.pokemonDataUrls = action.payload;
    },
    setBattlingPokemonUrls: (state, action: PayloadAction<string[]>) => {
      state.battlingPokemonUrls = action.payload;
    },
    setBattlingPokemons: (state, action: PayloadAction<IPokemon[]>) => {
      state.battlingPokemons = action.payload;
      // Set remainingHp to Hp stat value for each battling Pokemon
      state.battlingPokemons.forEach((pokemon) => {
        pokemon.remainingHp = pokemon.stats[0].base_stat;
      });
      // Determine which Pokemon attacks first
      // Stats array indexes: 0-hp, 1-attack, 2-defense, 5-speed
      // state.activePokemon contains battlingPokemons array index (0 - left Pokemon, 1 - right Pokemon)
      state.battlingPokemons[0].stats[5].base_stat >= state.battlingPokemons[1].stats[5].base_stat
        ? (state.activePokemon = 0)
        : (state.activePokemon = 1);
    },
    setBattleStatus: (state, action: PayloadAction<TBattleStatus>) => {
      state.battleStatus = action.payload;
    },
    switchActivePokemon: (state) => {
      state.activePokemon = state.activePokemon === 0 ? 1 : 0;
    },
    processAttackDamage: (state, action: PayloadAction<IProcessAttackDamage>) => {
      // New remaining HP value (current value - damage)
      const updatedRemainingHp =
        state.battlingPokemons[action.payload.defendingPokemon].remainingHp! -
        action.payload.damage;

      // Prevent remaining HP to be less than 0
      state.battlingPokemons[action.payload.defendingPokemon].remainingHp =
        updatedRemainingHp < 0 ? 0 : updatedRemainingHp;
    },
    addLogEntry: (state, action: PayloadAction<string>) => {
      state.log.push(action.payload);
    },
  },
});

// Actions to be used with dispatch
export const {
  setPokemonDataUrls,
  setBattlingPokemonUrls,
  setBattlingPokemons,
  setBattleStatus,
  switchActivePokemon,
  processAttackDamage,
  addLogEntry,
} = gameSlice.actions;

// Used by Redux Provider in index.js
export default gameSlice.reducer;
