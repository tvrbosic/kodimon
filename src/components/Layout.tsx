import { Outlet } from 'react-router-dom';
import { Box, useDisclosure } from '@chakra-ui/react';

import { useAppSelector } from '../state/hooks';

import InfoModal from './InfoModal';

function Layout() {
  const { onClose } = useDisclosure();
  const infoMessage = useAppSelector((state) => state.game.infoMessage);
  const modalIsOpen = infoMessage ? true : false;

  return (
    <Box height="100vh" px={{ base: 20, '2xl': 36 }} py="5" fontSize={{ base: 16, '2xl': 18 }}>
      <Outlet />
      <InfoModal isOpen={modalIsOpen} onClose={onClose} message={infoMessage!}></InfoModal>
    </Box>
  );
}

export default Layout;
