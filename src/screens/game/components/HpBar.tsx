import { Box, Flex, Text } from '@chakra-ui/react';

interface IHpBarProps {
  remainingPercentage: number;
}

const HpBar = ({ remainingPercentage = 0 }: IHpBarProps) => {
  const transition = 'all 200ms ease-in-out';
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
      <Text color={color} fontWeight="bold" transition={transition}>{`${Math.ceil(
        remainingPercentage
      )} %`}</Text>
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
          borderRadius="full"
          transition={transition}
        ></Box>
      </Flex>
    </Flex>
  );
};

export default HpBar;
