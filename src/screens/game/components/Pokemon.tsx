import { useEffect } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';

import { IPokemon } from '../../../ts/definitions';
import { useAppDispatch } from '../../../state/hooks';
import { setBattleStatus } from '../../../state/gameSlice';
import { capitalize } from '../../../utils/utility';

import HpBar from './HpBar';
import Stats from './Stats';

interface IPokemonProps {
  pokemonData: IPokemon;
}

const calculateRemainingHpPercentage = (pokemonData: IPokemon): number =>
  (pokemonData.remainingHp! / pokemonData.stats[0].base_stat) * 100;

export default function Pokemon({ pokemonData }: IPokemonProps) {
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
      <Flex flexDirection="column" alignItems="center" mb="2">
        <Text fontWeight="bold" ml="2" mb="2">
          {capitalize(pokemonData.name)}
        </Text>
      </Flex>

      <Flex width="100%" flexDirection="column" alignItems="center" mb="2">
        <Image
          boxSize={{ base: '150px', '2xl': '175px' }}
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
      </Flex>
      <Stats stats={pokemonData.stats} />
    </Box>
  );
}
