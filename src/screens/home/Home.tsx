import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchData } from '../../hooks/useFetchData';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
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
  const { isLoading, data, isError, error, sendRequest } = useFetchData<IPokemonUrls>();

  // Initial data fetch
  useEffect(() => {
    sendRequest(`/pokemon?limit=${pokemonSpeciesCount}`);
  }, [sendRequest]);

  // Reset required game state values when homepage is re-visited
  useEffect(() => {
    dispatch(resetGameState());
  }, [dispatch]);

  // Set Pokemon URL's to state after data fetch
  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(setPokemonDataUrls(data.results));
    }
  }, [isLoading, data, isError, dispatch]);

  const newGameClickHandler = () => {
    dispatch(setBattleStatus('ongoing'));
    navigate('/game');
  };

  // Disable new game button until data is ready
  const disableButton = isLoading || isError;

  return (
    <Center height="100vh" flexDirection="column">
      <Banner />
      <Center>
        <Button onClick={newGameClickHandler} isLoading={disableButton}>
          New Game
        </Button>
      </Center>
    </Center>
  );
}
