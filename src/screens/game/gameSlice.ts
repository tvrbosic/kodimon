import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IGameState } from '../../ts/gameInterfaces';
import { IPokemonDataUrl } from '../../ts/apiInterfaces';
import type { RootState } from '../../app/store';

// Define the initial state using IGameState
const initialState: IGameState = {
  pokemonDataUrls: [],
  battlingPokemonUrls: [],
  battlingPokemons: [],
  activePokemon: undefined,
  battleStatus: 'pending',
  log: [],
  missChance: 0.2,
};

const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPokemonDataUrls: (state, action: PayloadAction<IPokemonDataUrl[]>) => {
      state.pokemonDataUrls = action.payload;
    },
    setBattlingPokemonUrls: (state, action: PayloadAction<string[]>) => {
      state.battlingPokemonUrls = action.payload;
    },
  },
});

export const { setPokemonDataUrls, setBattlingPokemonUrls } = gameSlice.actions;

// Used by Redux Provider in index.js
export default gameSlice.reducer;
