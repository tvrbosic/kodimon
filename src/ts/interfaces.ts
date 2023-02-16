export interface IHttpError {
  status: number | undefined;
  message: string;
}

export interface IPokemonUrl {
  name: string;
  url: string;
}

export interface IPokemonUrls {
  count: number;
  results: IPokemonUrl[];
}

export interface IPokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemon {
  name: string;
  stats: IPokemonStat[];
  sprites: {
    front_default: string;
  };
}

export interface ILogEntry {
  text: string;
}

// Redux state slice interface
export interface IGameState {
  pokemonDataUrls: IPokemonUrl[];
  battlingPokemonUrls: string[];
  battlingPokemons: IPokemon[];
  activePokemon: number | undefined;
  battleStatus: 'pending' | 'ongoing' | 'finished';
  log: ILogEntry[];
  missChance: number;
}
