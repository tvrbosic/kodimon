import { Center, Container, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Banner from '../../components/Banner';
import Button from '../../components/Button';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/game');
  };

  return (
    <Center height="100%" flexDirection="column">
      <Container>
        <Banner />
        <Center>
          <Button onClick={handleClick}>New Game</Button>
        </Center>
      </Container>
    </Center>
  );
}
