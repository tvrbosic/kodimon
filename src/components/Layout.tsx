import { Outlet } from 'react-router-dom';
import { Box, useDisclosure } from '@chakra-ui/react';

import { useAppSelector } from '../state/hooks';

import InfoModal from './InfoModal';

function Layout() {
  const { onClose } = useDisclosure();
  const infoMessage = useAppSelector((state) => state.game.infoMessage);
  const modalIsOpen = infoMessage ? true : false;
  console.log(infoMessage);

  return (
    <Box minHeight="100vh" px="20" py="5" fontSize="18">
      <Outlet />
      <InfoModal isOpen={modalIsOpen} onClose={onClose} message={infoMessage!}></InfoModal>
    </Box>
  );
}

export default Layout;
