import { Modal as CModal, ModalOverlay, ModalContent, Flex, Text } from '@chakra-ui/react';

import { useAppDispatch } from '../state/hooks';
import { clearInfoMessage } from '../screens/game/gameSlice';
import ThemeContainer from './ThemeContainer';

import Button from './Button';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

function InfoModal({ isOpen, onClose, message, ...rest }: IModalProps) {
  const dispatch = useAppDispatch();

  const closeClickHandler = () => {
    dispatch(clearInfoMessage());
  };

  return (
    <>
      <CModal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} {...rest}>
        <ModalOverlay bg="whiteAlpha.700" />
        <ModalContent boxShadow="none" alignItems="center" mt="20vh">
          <ThemeContainer flexDirection="column" p="10">
            <Text fontWeight="bold" textAlign="center" mb="6">
              {message}
            </Text>
            <Button onClick={closeClickHandler}>Okay</Button>
          </ThemeContainer>
        </ModalContent>
      </CModal>
    </>
  );
}

export default InfoModal;
