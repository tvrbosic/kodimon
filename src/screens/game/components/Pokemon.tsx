import { Box, Flex, Text, VStack, Image, Progress } from '@chakra-ui/react';

import { IPokemon, IPokemonStat } from '../../../ts/interfaces';
import { capitalize } from '../../../utils/utility';

import ThemeContainer from '../../../components/ThemeContainer';

interface IHpBarProps {
  remainingPercentage: number;
}

interface IStatsProps {
  stats: IPokemonStat[];
}

interface IPokemonProps {
  pokemonData: IPokemon;
}

const HpBar = ({ remainingPercentage }: IHpBarProps) => {
  const transition = 'all 300ms ease-in-out';
  let color = 'green',
    fillColor = 'lightGreen';
  if (remainingPercentage > 29 && remainingPercentage < 50) {
    color = 'orange';
    fillColor = 'lightOrange';
  } else if (remainingPercentage < 30) {
    color = 'red';
    fillColor = 'lightRed';
  }

  return (
    <Flex flexDirection="column" alignItems="center" mb="4">
      <Text
        color={color}
        fontWeight="bold"
        transition={transition}
      >{`${remainingPercentage} %`}</Text>
      <Flex
        width="100%"
        height="4"
        border="2px"
        borderColor={color}
        borderRadius="full"
        overflow="hidden"
        transition={transition}
      >
        <Box
          height="100%"
          width={`${remainingPercentage}%`}
          bg={fillColor}
          transition={transition}
        ></Box>
      </Flex>
    </Flex>
  );
};

const Stats = ({ stats }: IStatsProps) => {
  // Stats array indexes: 0-hp, 1-attack, 2-defense, 5-speed
  // Stats array format: [{ base_stat: number, stat: { name: string, url: string }}, {}, ...]

  return (
    <Flex flexDirection="column" height="100%">
      <Text fontWeight="bold" ml="2" mb="2">
        Stats
      </Text>
      <ThemeContainer width="100%" height="100%" p="3" flexDirection="column">
        <VStack spacing="1" alignItems="start">
          <Text fontWeight="bold">{`HP: ${stats[0].base_stat}`}</Text>
          <Text fontWeight="bold">{`Attack: ${stats[1].base_stat}`}</Text>
          <Text fontWeight="bold">{`Defense: ${stats[2].base_stat}`}</Text>
          <Text fontWeight="bold">{`Speed: ${stats[5].base_stat}`}</Text>
        </VStack>
      </ThemeContainer>
    </Flex>
  );
};

export default function Pokemon({ pokemonData }: IPokemonProps) {
  return (
    <Box>
      <HpBar remainingPercentage={60} />
      <Flex flexDirection="column" alignItems="center" mb="2">
        <Text fontWeight="bold" ml="2" mb="2">
          {capitalize(pokemonData.name)}
        </Text>
      </Flex>

      <Flex width="100%" flexDirection="column" alignItems="center" mb="2">
        <Image boxSize="150px" src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      </Flex>
      <Stats stats={pokemonData.stats} />
    </Box>
  );
}
