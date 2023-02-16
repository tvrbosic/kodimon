import { Text as CText, TextProps } from '@chakra-ui/react';

interface IProps extends TextProps {
  children: React.ReactNode;
}

export default function Text({ children, ...rest }: IProps) {
  return (
    <CText ml="2" mb="2" {...rest}>
      {children}
    </CText>
  );
}
