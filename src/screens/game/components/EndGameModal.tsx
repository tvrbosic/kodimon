import { Modal as CModal, ModalOverlay, ModalContent, Text, Spacer } from '@chakra-ui/react';

import { useAppSelector } from '../../../state/hooks';
import { capitalize } from '../../../utils/utility';

import AppMenu from '../../../components/AppMenu';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  resetGameComponentState: () => void;
}

function EndGameModal({ isOpen, onClose, resetGameComponentState, ...rest }: IModalProps) {
  const winningPokemon = useAppSelector((state) => state.game.winnerName);

  return (
    <>
      <CModal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} {...rest}>
        <ModalOverlay bg="whiteAlpha.700" />
        <ModalContent boxShadow="none" alignItems="center" mt="20vh">
          <Text fontSize="4xl" fontWeight="bold" mb="12">
            {capitalize(winningPokemon!)} won!
          </Text>
          <Spacer />
          <AppMenu resetGameComponentState={resetGameComponentState} />
        </ModalContent>
      </CModal>
    </>
  );
}

export default EndGameModal;
