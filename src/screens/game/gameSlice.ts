import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IGameState } from '../../ts/gameInterfaces';
import type { RootState } from '../../app/store';

// Define the initial state using IGameState
const initialState: IGameState = {
  pokemonCount: 0,
  pokemons: [],
  activePokemon: undefined,
  battleStatus: 'pending',
  log: [],
  missChance: 0.2,
};

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPokemonCount: (state, action: PayloadAction<number>) => {
      state.pokemonCount = action.payload;
    },
  },
});

//export const { ...gameSlice.reducers } = gameSlice.actions;

export default gameSlice.reducer;

/**
export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const selectCount = (state: RootState) => state.game.value;
 */
