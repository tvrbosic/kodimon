import { IPokemonDataUrl, IPokemon } from './apiInterfaces';

interface ILogEntry {
  text: string;
}

// Game state slice
export interface IGameState {
  pokemonDataUrls: IPokemonDataUrl[];
  battlingPokemonUrls: string[];
  battlingPokemons: IPokemon[];
  activePokemon: number | undefined;
  battleStatus: 'pending' | 'ongoing' | 'finished';
  log: ILogEntry[];
  missChance: number;
}
