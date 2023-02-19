import { Flex, Text, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

interface IAttackStatusProps {
  statusText: string | null;
  justifyContent: 'start' | 'end';
}

// Create element with chakra factory function that will accept framer motion props
const StatusTextAnimation = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop), // Allow motion props and non-Chakra props to be forwarded
});

export default function AttackStatus({ statusText, justifyContent }: IAttackStatusProps) {
  const statusTextElement =
    statusText === 'Miss !' ? (
      <Text color="black" transform="rotate(-15deg)">
        {statusText}
      </Text>
    ) : (
      <Text color="red" transform="rotate(15deg)">
        {statusText}
      </Text>
    );

  return (
    <Flex minHeight="16" fontSize="22" fontWeight="bold" justifyContent={justifyContent}>
      {statusText && (
        <StatusTextAnimation
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            opacity: [1, 1, 0.75, 0.5, 0],
          }}
          // @ts-ignore no problem in operation, although type error appears (Chakra UI documentation)
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          {statusTextElement}
        </StatusTextAnimation>
      )}
    </Flex>
  );
}
