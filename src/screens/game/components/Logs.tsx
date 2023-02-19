import { Flex, Box, Text } from '@chakra-ui/react';

import { useAppSelector } from '../../../state/hooks';

import ThemeContainer from '../../../components/ThemeContainer';

export default function Logs() {
  const logEntries = useAppSelector((state) => state.game.log);
  return (
    <Flex flexDirection="column" height="100%">
      <Text fontWeight="bold" ml="2" mb="2">
        Logs
      </Text>
      <ThemeContainer width="100%" height="25vh" px="3" py="5" flexDirection="column">
        <Box
          maxHeight="22vh"
          overflow="auto"
          sx={{
            '::-webkit-scrollbar': {
              width: '2',
            },
            '::-webkit-scrollbar-track': {
              width: '2',
              borderRadius: 'full',
              background: 'lighterOrange',
            },
            '::-webkit-scrollbar-thumb': {
              background: 'lightOrange',
              borderRadius: 'full',
            },
            '::-webkit-scrollbar-button': {
              display: 'none',
            },
          }}
        >
          {logEntries.map((entry, index) => (
            <Text key={index} fontWeight="bold">
              {entry}
            </Text>
          ))}
        </Box>
      </ThemeContainer>
    </Flex>
  );
}
