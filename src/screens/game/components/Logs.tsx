import { Flex, VStack } from '@chakra-ui/react';

import { Text } from '@chakra-ui/react';
import ThemeContainer from '../../../components/ThemeContainer';

export default function Logs() {
  return (
    <Flex flexDirection="column" height="100%">
      <Text fontWeight="bold" ml="2" mb="2">
        Logs
      </Text>
      <ThemeContainer
        width="100%"
        height="100%"
        minHeight="25vh"
        px="3"
        py="5"
        flexDirection="column"
      >
        <VStack spacing="1" alignItems="start">
          <Text fontWeight="bold">Test</Text>
          <Text fontWeight="bold">Test</Text>
          <Text fontWeight="bold">Test</Text>
        </VStack>
      </ThemeContainer>
    </Flex>
  );
}
