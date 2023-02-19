import { useNavigate } from 'react-router-dom';
import { Box, VStack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  setBattlingPokemonUrls,
  resetGameState,
  resetForNewOpponent,
  setInfoMessage,
} from '../screens/game/gameSlice';
import { randomInteger } from '../utils/utility';
import ThemeContainer from './ThemeContainer';
import Button from './Button';

interface IAppMenuProps {
  display?: 'none' | 'block';
  resetGameComponentState: () => void;
}

export default function AppMenu({ display = 'block', resetGameComponentState }: IAppMenuProps) {
  const pokemonDataUrls = useAppSelector((state) => state.game.pokemonDataUrls);
  const winnerName = useAppSelector((state) => state.game.winnerName);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const homeClickHandler = () => {
    navigate('/');
  };

  const newGameClickHandler = () => {
    resetGameComponentState();
    dispatch(resetGameState());
    // Get two random pokemon URL's which will be used on Game page to fetch Pokemon data
    const leftPokemonUrl = pokemonDataUrls[randomInteger(1, pokemonDataUrls.length)].url;
    const rightPokemonUrl = pokemonDataUrls[randomInteger(1, pokemonDataUrls.length)].url;
    // Set battling pokemon URL's to state
    dispatch(setBattlingPokemonUrls([leftPokemonUrl, rightPokemonUrl]));
  };

  const newOpponentClickHandler = () => {
    // If battle still in progress
    if (!winnerName) {
      dispatch(
        setInfoMessage('The winner has not yet been determined. End the current battle first!')
      );
      return;
    }
    // Reset necessary game states
    resetGameComponentState();
    dispatch(resetForNewOpponent()); // Logs will remain
    // Find URL of winning Pokemon
    const winnerURL = pokemonDataUrls.find((element) => element.name === winnerName)?.url!;
    // Change URL's of loosing pokemon which will be used on Game page to fetch Pokemon data
    const leftPokemonUrl = winnerURL;
    const rightPokemonUrl = pokemonDataUrls[randomInteger(1, pokemonDataUrls.length)].url;
    // Set battling pokemon URL's to state
    dispatch(setBattlingPokemonUrls([leftPokemonUrl, rightPokemonUrl]));
  };

  return (
    <Box display={display}>
      <Text fontWeight="bold" ml="2" mb="2">
        Menu
      </Text>
      <ThemeContainer flexDirection="column" p="6">
        <VStack spacing="3">
          <Button onClick={homeClickHandler}>Home</Button>
          <Button onClick={newGameClickHandler}>New Game</Button>
          <Button onClick={newOpponentClickHandler}>New opponent</Button>
        </VStack>
      </ThemeContainer>
    </Box>
  );
}
