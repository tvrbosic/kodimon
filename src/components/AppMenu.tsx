import { Box, VStack } from '@chakra-ui/react';

import { Text } from '@chakra-ui/react';
import ThemeContainer from './ThemeContainer';
import Button from './Button';

interface IAppMenuProps {
  display?: 'none' | 'block';
}

export default function AppMenu({ display = 'block' }: IAppMenuProps) {
  return (
    <Box display={display}>
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
