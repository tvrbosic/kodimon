import { Center, VStack, Flex, Box, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchData } from '../../hooks/useFetchData';
import Banner from '../../components/Banner';
import AppMenu from '../../components/AppMenu';

export default function Game() {
  const { isLoading, data, error } = useFetchData('/pokemon');

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
            <AppMenu />
          </Box>
          <Spacer />
          <Box flex="2">Box 2</Box>
        </Flex>
      </VStack>
    </Center>
  );
}
