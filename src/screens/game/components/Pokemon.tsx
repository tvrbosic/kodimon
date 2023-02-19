import { useEffect } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';

import { IPokemon } from '../../../ts/definitions';
import { useAppDispatch } from '../../../state/hooks';
import { setBattleStatus } from '../../../state/gameSlice';
import { capitalize } from '../../../utils/utility';

import HpBar from './HpBar';
import Stats from './Stats';
import PokemonAttackAnimation from './PokemonAttackAnimation';

interface IPokemonProps {
  pokemonData: IPokemon;
  imgKeyRef: number;
  animationAttackDirection: 'left' | 'right';
}

const calculateRemainingHpPercentage = (pokemonData: IPokemon): number =>
  (pokemonData.remainingHp! / pokemonData.stats[0].base_stat) * 100;

export default function Pokemon({
  pokemonData,
  imgKeyRef,
  animationAttackDirection,
}: IPokemonProps) {
  const remainingHpPercentage = calculateRemainingHpPercentage(pokemonData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pokemonData.remainingHp === 0) {
      dispatch(setBattleStatus('finished'));
    }
  }, [pokemonData.remainingHp, dispatch]);

  return (
    <Box>
      <HpBar remainingPercentage={remainingHpPercentage} />
      <Flex flexDirection="column" alignItems="center">
        <Text fontWeight="bold">{capitalize(pokemonData.name)}</Text>
      </Flex>

      <Flex width="100%" flexDirection="column" alignItems="center">
        <PokemonAttackAnimation
          imgKeyRef={imgKeyRef}
          animationAttackDirection={animationAttackDirection}
        >
          <Image
            boxSize={{ base: '130px', '2xl': '175px' }}
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
        </PokemonAttackAnimation>
      </Flex>
      <Stats stats={pokemonData.stats} />
    </Box>
  );
}
