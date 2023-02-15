import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchData } from '../../hooks/useFetchData';
import { useAppDispatch } from '../../app/hooks';
import { gameSlice } from '../game/gameSlice';
import { IAllPokemon } from '../../ts/pokemonApiInterfaces';
import { IUseFetchData } from '../../ts/httpInterfaces';
import Banner from '../../components/Banner';
import Button from '../../components/Button';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    data = { count: 0 },
    error,
  }: IUseFetchData<IAllPokemon> = useFetchData('/pokemon');

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      dispatch(gameSlice.actions.setPokemonCount(data.count));
    }
  }, [isLoading, data]);

  const handleClick = () => {
    navigate('/game');
  };

  return (
    <Center height="100%" flexDirection="column">
      <Banner />
      <Center>
        <Button onClick={handleClick}>New Game</Button>
      </Center>
    </Center>
  );
}
