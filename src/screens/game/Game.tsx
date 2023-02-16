import { Center, VStack, Flex, Box, Spacer, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchBatchData } from '../../hooks/useFetchBatchData';
import { IPokemon } from '../../ts/interfaces';
import { setBattlingPokemons } from './gameSlice';

import Pokemon from './components/Pokemon';
import AppMenu from '../../components/AppMenu';
import Logs from './components/Logs';

export default function Game() {
  const dispatch = useAppDispatch();
  const battlingPokemonUrls = useAppSelector((state) => state.game.battlingPokemonUrls);
  const battlingPokemon = useAppSelector((state) => state.game.battlingPokemons);
  const { isLoading, data, isError, error } = useFetchBatchData<IPokemon>(battlingPokemonUrls);

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      dispatch(setBattlingPokemons(data));
    }
  }, [isLoading, data, dispatch]);

  const renderScreen = !isLoading && battlingPokemon.length === 2;
  console.log(battlingPokemon);

  return (
    <Center height="100%" flexDirection="column">
      {renderScreen ? (
        <VStack width="100%">
          <Flex width="100%" mb="8">
            <Box flex="2">
              <Pokemon pokemonData={battlingPokemon[0]} />
            </Box>
            <Spacer />
            <Box flex="3">Attack control component</Box>
            <Spacer />

            <Box flex="2">
              <Pokemon pokemonData={battlingPokemon[1]} />
            </Box>
          </Flex>

          <Flex width="100%">
            <Box flex="1">
              <Flex flexDirection="column" justifyContent="end" height="100%">
                <AppMenu />
              </Flex>
            </Box>
            <Spacer />
            <Box flex="2">
              <Logs />
            </Box>
          </Flex>
        </VStack>
      ) : (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue" size="xl" />
      )}
    </Center>
  );
}
