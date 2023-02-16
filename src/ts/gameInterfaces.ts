// API Pokemon data
interface IPokemon {
  someKey: string;
}

interface ILogEntry {
  text: string;
}

// Game state slice
export interface IGameState {
  pokemonCount: number;
  pokemons: IPokemon[];
  activePokemon: number | undefined;
  battleStatus: 'pending' | 'ongoing' | 'finished';
  log: ILogEntry[];
  missChance: number;
}
