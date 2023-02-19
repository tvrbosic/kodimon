import { Flex, Text, VStack } from '@chakra-ui/react';

import { IPokemonStat } from '../../../ts/definitions';

import ThemeContainer from '../../../components/ThemeContainer';

interface IStatsProps {
  stats: IPokemonStat[];
}

const Stats = ({ stats }: IStatsProps) => {
  // Stats array indexes: 0-hp, 1-attack, 2-defense, 5-speed
  // Stats array format: [{ base_stat: number, stat: { name: string, url: string }}, {}, ...]

  return (
    <Flex flexDirection="column" height="100%">
      <Text fontWeight="bold" ml="2" mb="2">
        Stats
      </Text>
      <ThemeContainer width="100%" height="100%" p="3" flexDirection="column">
        <VStack spacing="0.5" alignItems="start">
          <Text fontWeight="bold">{`HP: ${stats[0].base_stat}`}</Text>
          <Text fontWeight="bold">{`Attack: ${stats[1].base_stat}`}</Text>
          <Text fontWeight="bold">{`Defense: ${stats[2].base_stat}`}</Text>
          <Text fontWeight="bold">{`Speed: ${stats[5].base_stat}`}</Text>
        </VStack>
      </ThemeContainer>
    </Flex>
  );
};

export default Stats;
