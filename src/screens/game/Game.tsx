import { Center, VStack, Flex, Box, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';
import { useFetchBatchData } from '../../hooks/useFetchBatchData';
import { IPokemon } from '../../ts/apiInterfaces';
import AppMenu from '../../components/AppMenu';
import Logs from './components/Logs';

export default function Game() {
  const battlingPokemonUrls = useAppSelector((state) => state.game.battlingPokemonUrls);
  const { isLoading, data, isError, error } = useFetchBatchData<IPokemon>(battlingPokemonUrls);
  console.log(data);
  // TODO: set battlingPokemon in use effect

  return (
    <Center height="100%" flexDirection="column">
      <VStack width="100%">
        <Flex width="100%">
          <Box flex="1">Box 1</Box>
          <Box flex="1">Box 2</Box>
          <Box flex="1">Box 3</Box>
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
    </Center>
  );
}
