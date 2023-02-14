import React from 'react';
import { Button as CButton, ButtonProps } from '@chakra-ui/react';

interface IProps extends ButtonProps {
  children: React.ReactNode;
}
export default function Button({ children, ...rest }: IProps) {
  return (
    <CButton
      as="button"
      height="10"
      color="white"
      bg="blue"
      px="12"
      fontWeight="bold"
      border="4px"
      borderRadius="full"
      borderColor="lightBlue"
      transition="all 0.2s ease-in-out"
      _hover={{ bg: 'lightBlue', color: 'blue', borderColor: 'blue' }}
      _active={{
        bg: 'lightYellow',
        transform: 'scale(0.98)',
        borderColor: 'yellow',
      }}
      _focus={{
        boxShadow: '0 0 1px 2px lightYellow',
      }}
      {...rest}
    >
      {children}
    </CButton>
  );
}
