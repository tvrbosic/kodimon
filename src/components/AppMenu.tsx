import { Box, VStack } from '@chakra-ui/react';

import Text from './Text';
import ThemeContainer from './ThemeContainer';
import Button from './Button';

export default function AppMenu() {
  return (
    <Box>
      <Text fontWeight="bold">Menu</Text>
      <ThemeContainer flexDirection="column">
        <VStack spacing="4">
          <Button>Home</Button>
          <Button>New Game</Button>
          <Button>New opponent</Button>
        </VStack>
      </ThemeContainer>
    </Box>
  );
}
