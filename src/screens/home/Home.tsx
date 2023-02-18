import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchData } from '../../hooks/useFetchData';
import { useAppDispatch } from '../../state/hooks';
import {
  setPokemonDataUrls,
  setBattlingPokemonUrls,
  setBattleStatus,
  resetGameState,
} from '../game/gameSlice';
import { IPokemonUrls } from '../../ts/definitions';
import { randomInteger } from '../../utils/utility';

import Banner from '../../components/Banner';
import Button from '../../components/Button';

const pokemonSpeciesCount = process.env.REACT_APP_POKEMON_COUNT;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, data, isError, error } = useFetchData<IPokemonUrls>(
    `/pokemon?limit=${pokemonSpeciesCount}`
  );

  // Reset required game state values when Home page is visited
  useEffect(() => {
    dispatch(resetGameState());
  }, [dispatch]);

  // Set Pokemon URL's to state after data fetch
  useEffect(() => {
    if (!isLoading && data) {
      const battlingPokemonUrls: string[] = [];
      // Get two random pokemon URL's and set to state which will be used on Game page to fetch Pokemon data
      battlingPokemonUrls.push(data.results[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
      battlingPokemonUrls.push(data.results[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
      dispatch(setBattlingPokemonUrls(battlingPokemonUrls));
      // Set all Pokemon URL's to state which will be used in AppMenu component
      dispatch(setPokemonDataUrls(data.results));
    }
  }, [isLoading, data, dispatch]);

  const handleClick = () => {
    dispatch(setBattleStatus('ongoing'));
    navigate('/game');
  };

  return (
    <Center height="100vh" flexDirection="column">
      <Banner />
      <Center>
        <Button onClick={handleClick} isLoading={isLoading}>
          New Game
        </Button>
      </Center>
    </Center>
  );
}
