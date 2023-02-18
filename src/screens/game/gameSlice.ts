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
  battlingPokemonUrls: [], // NOTE: battlingPokemonUrls[0] corresponds to pokemon at battlingPokemons[0]
  battlingPokemons: [], // NOTE: battlingPokemonUrls[0] corresponds to pokemon at battlingPokemons[0]
  battleStatus: 'pending',
  log: [],
  missChance: 0.2,
  activePokemon: 0, // battlingPokemons array index
  winner: null, // battlingPokemons array index
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
      if (action.payload === 'finished') {
        // Battle is finished, find remaining Pokemon index and set as winner
        // NOTE: battlingPokemonUrls[0] corresponds to pokemon at battlingPokemons[0]
        state.winner = state.battlingPokemons.findIndex((pokemon) => pokemon.remainingHp! > 0);
      }
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
    resetGameState: (state) => {
      state.battlingPokemonUrls = [];
      state.battlingPokemons = [];
      state.activePokemon = 0;
      state.battleStatus = 'pending';
      state.log = [];
      state.activePokemon = 0;
      state.winner = null;
    },
    resetForNewOpponent: (state) => {
      // Difference from resetGameState is that logs are not cleared
      state.battlingPokemonUrls = [];
      state.battlingPokemons = [];
      state.activePokemon = 0;
      state.battleStatus = 'pending';
      state.activePokemon = 0;
      state.winner = null;
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
  resetGameState,
  resetForNewOpponent,
} = gameSlice.actions;

// Used by Redux Provider in index.js
export default gameSlice.reducer;
