import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

interface IPokemonAttackAnimation {
  children: React.ReactNode;
  imgKeyRef: number;
  animationAttackDirection: 'left' | 'right';
}

// Create animation element with chakra factory function that will accept framer motion props
const AnimateAttack = chakra(motion.div, {
  // Allow motion props and non-Chakra props to be forwarded
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const PokemonAttackAnimation = ({
  children,
  imgKeyRef,
  animationAttackDirection,
}: IPokemonAttackAnimation) => {
  const configureTranslateX =
    animationAttackDirection === 'right'
      ? ['0vw', '32vw', '64vw', '64vw', '32vw', '0vw']
      : ['0vw', '-32vw', '-64vw', '-64vw', '-32vw', '0vw'];
  return (
    <AnimateAttack
      key={imgKeyRef}
      animate={
        imgKeyRef === 0
          ? {}
          : {
              translateX: configureTranslateX,
              translateY: ['0rem', '-6rem', '0rem', '0rem', '-6rem', '0rem'],
            }
      }
      // @ts-ignore no problem in operation, although type error appears (Chakra UI documentation)
      transition={{
        duration: 0.5,
        ease: 'linear',
      }}
    >
      {children}
    </AnimateAttack>
  );
};

export default PokemonAttackAnimation;
