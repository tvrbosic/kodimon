import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, VStack, Flex, Box, Spacer, Spinner } from '@chakra-ui/react';

import { useFetchBatchData } from '../../hooks/useFetchBatchData';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { IPokemon, TBattlingPokemonIndex } from '../../ts/definitions';
import { capitalize, randomNumber, roundToTwoDecimalPlaces } from '../../utils/utility';
import {
  setBattlingPokemons,
  switchActivePokemon,
  processAttackDamage,
  addLogEntry,
} from './gameSlice';

import AttackStatus from './components/AttackStatus';
import Pokemon from './components/Pokemon';
import AttackControl from './components/AttackControl';
import Logs from './components/Logs';
import AppMenu from '../../components/AppMenu';
import EndGameModal from './components/EndGameModal';

export default function Game() {
  const battlingPokemonUrls = useAppSelector((state) => state.game.battlingPokemonUrls);
  const { isLoading, data, isError, error } = useFetchBatchData<IPokemon>(battlingPokemonUrls);
  const battlingPokemon = useAppSelector((state) => state.game.battlingPokemons);
  const activePokemon = useAppSelector((state) => state.game.activePokemon);
  const missChance = useAppSelector((state) => state.game.missChance);
  const battleStatus = useAppSelector((state) => state.game.battleStatus);
  const [leftAttackStatus, setLeftAttackStatus] = useState<null | string>(null);
  const [rightAttackStatus, setRightAttackStatus] = useState<null | string>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Dispatch setBattlingPokemons after data fetching finishes
  useEffect(() => {
    if (!isLoading && data && data.length !== 2) {
      // Covers case if user manually refreshes page while on /game (battlingPokemonUrls required to fetch data will be null)
      navigate('/');
    } else if (data) {
      dispatch(setBattlingPokemons(data!));
    }
  }, [isLoading, data, dispatch, navigate]);

  // If battle is finished set gameFinished to trigger end game menu
  useEffect(() => {
    battleStatus === 'finished' ? setGameFinished(true) : setGameFinished(false);
  }, [battleStatus]);

  const processMissChance = () => {
    // Miss = true, hit = false
    return randomNumber(0, 1) <= missChance ? true : false;
  };

  const calculateDamageDone = (
    attackingPokemon: TBattlingPokemonIndex,
    defendingPokemon: TBattlingPokemonIndex
  ) => {
    // Stats indexes: 0-hp, 1-attack, 2-defense, 5-speed
    // Damage done = ( Attacking Pokemon Attack / Defending Pokemon Defense ) * 10
    return (
      (battlingPokemon[attackingPokemon].stats[1].base_stat /
        battlingPokemon[defendingPokemon].stats[2].base_stat) *
      10
    );
  };

  const constructLogMessage = (
    attackingPokemon: TBattlingPokemonIndex,
    defendingPokemon: TBattlingPokemonIndex,
    damage?: number
  ): string => {
    const attackerName = capitalize(battlingPokemon[attackingPokemon].name);
    const defenderName = capitalize(battlingPokemon[defendingPokemon].name);

    // If damage parameter is not specified, log miss else log hit
    return damage
      ? `${attackerName} attacked ${defenderName} for ${roundToTwoDecimalPlaces(damage)} dmg`
      : `${attackerName} missed ${defenderName}`;
  };

  // Reset Game component local state required to start new game from AppMenu
  const resetGameComponentState = () => {
    setGameFinished(false);
    setLeftAttackStatus(null);
    setRightAttackStatus(null);
  };

  const attackHandler = (activePokemon: TBattlingPokemonIndex): void => {
    let attackingPokemon: TBattlingPokemonIndex, defendingPokemon: TBattlingPokemonIndex;
    // Set attacking and defending Pokemon indexes
    if (activePokemon === 0) {
      attackingPokemon = 0;
      defendingPokemon = 1;
    } else {
      attackingPokemon = 1;
      defendingPokemon = 0;
    }
    // Reset attack statuses
    setLeftAttackStatus(null);
    setRightAttackStatus(null);
    // Check if attack will miss
    const attackMissed = processMissChance();
    const damgeOnHit = calculateDamageDone(attackingPokemon, defendingPokemon);
    if (attackMissed) {
      // Attack missed, set miss status above defending Pokemon (UI trigger)
      attackingPokemon === 0 ? setRightAttackStatus('Miss !') : setLeftAttackStatus('Miss !');
      // Dispatch log message
      const logMsg = constructLogMessage(attackingPokemon, defendingPokemon);
      dispatch(addLogEntry(logMsg));
    } else {
      // Attack hit, set hit status (UI trigger)
      attackingPokemon === 0
        ? setRightAttackStatus(`${roundToTwoDecimalPlaces(damgeOnHit)} dmg !`)
        : setLeftAttackStatus(`${roundToTwoDecimalPlaces(damgeOnHit)} dmg !`);
      // Dispatch processAttackDamage which will reduce defending Pokemon's HP
      dispatch(
        processAttackDamage({
          damage: damgeOnHit,
          defendingPokemon,
        })
      );
      // Dispatch log message
      const logMsg = constructLogMessage(
        attackingPokemon,
        defendingPokemon,
        roundToTwoDecimalPlaces(damgeOnHit)
      );
      dispatch(addLogEntry(logMsg));
    }
    // Switch attacking Pokemon
    dispatch(switchActivePokemon());
  };

  // Boolean to display loading spinner until all data is ready
  const renderScreen = !isLoading && battlingPokemon.length === 2;

  /**
   * IMPORTANT !
   * Battle is finished when one of the battling Pokemon's HP reaches 0.
   * That functionality is implemented in Pokemon component.
   */

  return (
    <Center height="100%" flexDirection="column">
      {renderScreen ? (
        <VStack width="100%" pt="4">
          <Flex width="100%" mb="8">
            <Box width="20%">
              <AttackStatus statusText={leftAttackStatus} justifyContent="end" />
              <Pokemon pokemonData={battlingPokemon[0]} />
            </Box>
            <Spacer />
            <Box width="15%">
              <AttackControl
                activePokemon={activePokemon}
                attackHandler={attackHandler}
                display={gameFinished ? 'none' : 'flex'}
              />
            </Box>
            <Spacer />
            <Box width="20%">
              <AttackStatus statusText={rightAttackStatus} justifyContent="start" />
              <Pokemon pokemonData={battlingPokemon[1]} />
            </Box>
          </Flex>

          <Flex width="100%">
            <Box flex="1">
              <Flex flexDirection="column" justifyContent="end" height="100%">
                <AppMenu
                  display={gameFinished ? 'none' : 'block'}
                  resetGameComponentState={resetGameComponentState}
                />
              </Flex>
            </Box>
            <Spacer />
            <Box flex="2">
              <Logs />
            </Box>
          </Flex>
        </VStack>
      ) : (
        <Center minHeight="100vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue" size="xl" />
        </Center>
      )}

      {gameFinished && (
        <EndGameModal
          isOpen={gameFinished}
          onClose={() => setGameFinished(false)}
          resetGameComponentState={resetGameComponentState}
        />
      )}
    </Center>
  );
}
