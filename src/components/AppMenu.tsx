import { useNavigate } from 'react-router-dom';
import { Box, VStack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  setBattlingPokemonUrls,
  resetGameState,
  resetForNewOpponent,
} from '../screens/game/gameSlice';
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
  const winningPokemonUrl = useAppSelector(
    // NOTE: battlingPokemonUrls[0] corresponds to pokemon at battlingPokemons[0]
    (state) => state.game.battlingPokemonUrls[state.game.winner!]
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleNewGameClick = () => {
    resetGameComponentState();
    dispatch(resetGameState());
    // Get two random pokemon URL's which will be used on Game page to fetch Pokemon data
    const battlingPokemonUrls: string[] = [];
    battlingPokemonUrls.push(pokemonDataUrls[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
    battlingPokemonUrls.push(pokemonDataUrls[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
    // Set battling pokemon URL's to state
    dispatch(setBattlingPokemonUrls(battlingPokemonUrls));
  };

  const handleNewOpponentClick = () => {
    // Reset necessary game states
    resetGameComponentState();
    dispatch(resetForNewOpponent());
    // Rembember  winning Pokemon URL's and get new random pokemon URL which will be new opponent
    const battlingPokemonUrls: string[] = [];
    battlingPokemonUrls.push(winningPokemonUrl);
    battlingPokemonUrls.push(pokemonDataUrls[randomInteger(1, parseInt(pokemonSpeciesCount!))].url);
    // Set battling pokemon URL's to state
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
          <Button onClick={handleNewOpponentClick}>New opponent</Button>
        </VStack>
      </ThemeContainer>
    </Box>
  );
}
