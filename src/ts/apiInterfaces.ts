export interface IPokemonDataUrl {
  name: string;
  url: string;
}

export interface IPokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemon {
  data: {
    name: string;
    stats: IPokemonStat[];
  };
}

export interface IPokemonDataUrls {
  count: number;
  results: IPokemonDataUrl[];
}
