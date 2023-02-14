import { Center, VStack, Flex, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Banner from '../../components/Banner';
import Button from '../../components/Button';

export default function Game() {
  return (
    <Center height="100%" flexDirection="column">
      <VStack width="100%">
        <Flex width="100%">
          <Box flex="1">Box 1</Box>
          <Box flex="1">Box 2</Box>
          <Box flex="1">Box 3</Box>
        </Flex>
        <Flex width="100%">
          <Box flex="1">Box 1</Box>
          <Box flex="1">Box 2</Box>
        </Flex>
      </VStack>
    </Center>
  );
}
