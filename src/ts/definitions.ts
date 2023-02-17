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
  remainingHp?: number;
  stats: IPokemonStat[];
  sprites: {
    front_default: string;
  };
}

export type TBattlingPokemonIndex = 0 | 1;

export interface IProcessAttackDamage {
  damage: number;
  defendingPokemon: TBattlingPokemonIndex;
}

// Redux state slice interface
export interface IGameState {
  pokemonDataUrls: IPokemonUrl[];
  battlingPokemonUrls: string[];
  battlingPokemons: IPokemon[];
  activePokemon: TBattlingPokemonIndex;
  log: string[];
  missChance: number;
  battleStatus: 'pending' | 'ongoing' | 'finished';
}
