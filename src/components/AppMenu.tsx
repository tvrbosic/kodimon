import { useNavigate } from 'react-router-dom';
import { Box, VStack, Text } from '@chakra-ui/react';

import ThemeContainer from './ThemeContainer';
import Button from './Button';

interface IAppMenuProps {
  display?: 'none' | 'block';
}

export default function AppMenu({ display = 'block' }: IAppMenuProps) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Box display={display}>
      <Text fontWeight="bold" ml="2" mb="2">
        Menu
      </Text>
      <ThemeContainer flexDirection="column" p="6">
        <VStack spacing="3">
          <Button onClick={handleHomeClick}>Home</Button>
          <Button>New Game</Button>
          <Button>New opponent</Button>
        </VStack>
      </ThemeContainer>
    </Box>
  );
}
