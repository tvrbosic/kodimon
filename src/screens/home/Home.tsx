import { Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Banner from '../../components/Banner';
import Button from '../../components/Button';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/game');
  };

  return (
    <Center minH="100vh" flexDirection="column">
      <Banner />
      <Button onClick={handleClick}>New Game</Button>
    </Center>
  );
}
