import { Flex, Text } from '@chakra-ui/react';
interface IAttackStatusProps {
  status: string | null;
  justifyContent: 'start' | 'end';
}

export default function AttackStatus({ status, justifyContent }: IAttackStatusProps) {
  const statusText =
    status === 'Miss !' ? (
      <Text color="black" transform="rotate(-15deg)">
        {status}
      </Text>
    ) : (
      <Text color="red" transform="rotate(15deg)">
        {status}
      </Text>
    );
  return (
    <Flex minHeight="16" fontSize="22" fontWeight="bold" justifyContent={justifyContent}>
      {statusText}
    </Flex>
  );
}
