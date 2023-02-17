import { Flex, VStack } from '@chakra-ui/react';

import { Text } from '@chakra-ui/react';
import ThemeContainer from '../../../components/ThemeContainer';
import { useAppSelector } from '../../../state/hooks';

export default function Logs() {
  const logEntries = useAppSelector((state) => state.game.log);
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
          {logEntries.map((entry, index) => (
            <Text key={index} fontWeight="bold">
              {entry}
            </Text>
          ))}
        </VStack>
      </ThemeContainer>
    </Flex>
  );
}
