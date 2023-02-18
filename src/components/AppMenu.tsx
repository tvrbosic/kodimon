import { useNavigate } from 'react-router-dom';
import { Box, VStack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setBattlingPokemonUrls, resetGameState } from '../screens/game/gameSlice';
import { randomInteger } from '../utils/utility';
import ThemeContainer from './ThemeContainer';
import Button from './Button';

interface IAppMenuProps {
  display?: 'none' | 'block';
  resetGameComponentState: () => void;
}

const pokemonSpeciesCount = process.env.REACT_APP_POKEMON_COUNT;

export default function AppMenu({ display = 'block', resetGameComponentState }: IAppMenuProps) {
  const pokemonDataUrls = useAppSelector((state) => state.game.pokemonDataUrls);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleNewGameClick = () => {
    resetGameComponentState();
    dispatch(resetGameState());
    const battlingPokemonUrls: string[] = [];
    // Get two random pokemon URL's and set to state which will be used on Game page to fetch Pokemon data
    battlingPokemonUrls.push(pokemonDataUrls[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
    battlingPokemonUrls.push(pokemonDataUrls[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
    dispatch(setBattlingPokemonUrls(battlingPokemonUrls));
  };

  return (
    <Box display={display}>
      <Text fontWeight="bold" ml="2" mb="2">
        Menu
      </Text>
      <ThemeContainer flexDirection="column" p="6">
        <VStack spacing="3">
          <Button onClick={handleHomeClick}>Home</Button>
          <Button onClick={handleNewGameClick}>New Game</Button>
          <Button>New opponent</Button>
        </VStack>
      </ThemeContainer>
    </Box>
  );
}
