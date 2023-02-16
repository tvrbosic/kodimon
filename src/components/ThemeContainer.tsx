import { Flex, FlexProps } from '@chakra-ui/react';

interface IProps extends FlexProps {
  children: React.ReactNode;
}

export default function ThemeContainer({ children, ...rest }: IProps) {
  console.log(rest);
  return (
    <Flex bg="lightYellow" border="4px" borderRadius="16" borderColor="yellow" {...rest}>
      {children}
    </Flex>
  );
}
