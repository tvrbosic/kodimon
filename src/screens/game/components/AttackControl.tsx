import { Flex, Image } from '@chakra-ui/react';

import { TBattlingPokemonIndex } from '../../../ts/definitions';

import Arrow from '../../../assets/images/arrow.svg';
import Button from '../../../components/Button';

interface IAttackControl {
  activePokemon: TBattlingPokemonIndex;
  attackHandler: (activePokemon: TBattlingPokemonIndex) => void;
}

export default function AttackControl({ activePokemon, attackHandler }: IAttackControl) {
  const leftIsActive = activePokemon === 0 ? true : false;

  return (
    <Flex height="100%" flexDirection="column" justifyContent="end" alignItems="center">
      {leftIsActive ? (
        <Image
          mb="6"
          src={Arrow}
          alt="Attack direction arrow"
          transform="rotate(180deg)"
          transition="all 0.2s ease-in-out"
        />
      ) : (
        <Image mb="6" src={Arrow} alt="Attack direction arrow" transition="all 0.2s ease-in-out" />
      )}
      <Button mb="10" onClick={() => attackHandler(activePokemon)}>
        Attack
      </Button>
    </Flex>
  );
}
