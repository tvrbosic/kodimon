import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchData } from '../../hooks/useFetchData';
import { useAppDispatch } from '../../app/hooks';
import { setPokemonDataUrls, setBattlingPokemonUrls } from '../game/gameSlice';
import { IPokemonDataUrls, IPokemonDataUrl } from '../../ts/apiInterfaces';
import { randomInteger } from '../../utils/utility';
import Banner from '../../components/Banner';
import Button from '../../components/Button';

const pokemonSpeciesCount = process.env.REACT_APP_POKEMON_COUNT;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, data, isError, error } = useFetchData<IPokemonDataUrls>(
    `/pokemon?limit=${pokemonSpeciesCount}`
  );

  // After
  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      const battlingPokemonUrls: string[] = [];
      // Get two random pokemon URL's and set to state
      battlingPokemonUrls.push(data.results[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
      battlingPokemonUrls.push(data.results[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
      dispatch(setPokemonDataUrls(data.results));
      dispatch(setBattlingPokemonUrls(battlingPokemonUrls));
    }
  }, [isLoading, data, dispatch]);

  const handleClick = () => {
    navigate('/game');
  };

  return (
    <Center height="100%" flexDirection="column">
      <Banner />
      <Center>
        <Button onClick={handleClick} isLoading={isLoading}>
          New Game
        </Button>
      </Center>
    </Center>
  );
}
