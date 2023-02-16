import { Box, VStack } from '@chakra-ui/react';

import { Text } from '@chakra-ui/react';
import ThemeContainer from './ThemeContainer';
import Button from './Button';

export default function AppMenu() {
  return (
    <Box>
      <Text fontWeight="bold" ml="2" mb="2">
        Menu
      </Text>
      <ThemeContainer flexDirection="column" p="6">
        <VStack spacing="3">
          <Button>Home</Button>
          <Button>New Game</Button>
          <Button>New opponent</Button>
        </VStack>
      </ThemeContainer>
    </Box>
  );
}
