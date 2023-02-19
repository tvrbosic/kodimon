import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, VStack, Flex, Box, Spacer, Spinner } from '@chakra-ui/react';

import { IPokemon, TBattlingPokemonIndex } from '../../ts/definitions';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  setBattlingPokemons,
  switchActivePokemon,
  processAttackDamage,
  addLogEntry,
  setInfoMessage,
  resetGameState,
} from '../../state/gameSlice';
import { useFetchBatchData } from '../../hooks/useFetchBatchData';
import {
  randomInteger,
  randomNumber,
  capitalize,
  roundToTwoDecimalPlaces,
} from '../../utils/utility';

import AttackStatus from './components/AttackStatus';
import Pokemon from './components/Pokemon';
import AttackControl from './components/AttackControl';
import Logs from './components/Logs';
import AppMenu from '../../components/AppMenu';
import EndGameModal from './components/EndGameModal';

export default function Game() {
  const pokemonDataUrls = useAppSelector((state) => state.game.pokemonDataUrls);
  const battlingPokemonUrls = useAppSelector((state) => state.game.battlingPokemonUrls);
  const battlingPokemon = useAppSelector((state) => state.game.battlingPokemons);
  const activePokemon = useAppSelector((state) => state.game.activePokemon);
  const missChance = useAppSelector((state) => state.game.missChance);
  const battleStatus = useAppSelector((state) => state.game.battleStatus);
  const [leftAttackStatus, setLeftAttackStatus] = useState<null | string>(null);
  const [rightAttackStatus, setRightAttackStatus] = useState<null | string>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const { isLoading, data, isError, sendBatchRequest } = useFetchBatchData<IPokemon>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Following ref's are used as key props on image animation component
  // Changing ref (key) is used to trigger animation on Pokemon attack
  const leftPokemonImageRef = useRef(0);
  const rightPokemonImageRef = useRef(0);

  // On initial component mount get two random pokemon URL's and fetch that data
  useEffect(() => {
    if (pokemonDataUrls && pokemonDataUrls.length === 0) {
      // Covers case if user manually refreshes page while on path '/game'
      // pokemonDataUrls required to fetch data will be null because they are fetched and set on homepage
      navigate('/');
    } else {
      const leftPokemonUrl = pokemonDataUrls[randomInteger(1, pokemonDataUrls.length)].url;
      const rightPokemonUrl = pokemonDataUrls[randomInteger(1, pokemonDataUrls.length)].url;
      sendBatchRequest([leftPokemonUrl, rightPokemonUrl]);
    }
  }, [navigate, sendBatchRequest, pokemonDataUrls]);

  // Dispatch setBattlingPokemons after data fetching finishes
  useEffect(() => {
    if (!isLoading && isError) {
      dispatch(setInfoMessage('An error occurred while fetching data, please try again later!'));
      dispatch(resetGameState());
      resetGameComponentState();
    } else if (!isLoading && data && data.length === 2) {
      // Set remainingHp to Hp stat value for each battling Pokemon (remainingHp is field which will be modified through battle)
      const battlingPokemon = data.map((pokemon) => ({
        ...pokemon,
        remainingHp: pokemon.stats[0].base_stat,
      }));
      dispatch(setBattlingPokemons(battlingPokemon));
    }
  }, [isLoading, data, dispatch, isError]);

  // New game or New opponent actions will set battlingPokemonUrls
  // On battlingPokemonUrls change, and if battlingPokemonUrls is set, fetch new Pokemon data
  useEffect(() => {
    if (battlingPokemonUrls && battlingPokemonUrls.length === 2) {
      sendBatchRequest(battlingPokemonUrls);
    }
  }, [battlingPokemonUrls, sendBatchRequest]);

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
    leftPokemonImageRef.current = 0;
    rightPokemonImageRef.current = 0;
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
      // Change ref to trigger attack animation
      leftPokemonImageRef.current++;
    } else {
      attackingPokemon = 1;
      defendingPokemon = 0;
      // Change ref to trigger attack animation
      rightPokemonImageRef.current++;
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
          <Flex width="100%" mb={{ base: 8, '2xl': 10 }}>
            <Box width="20%">
              <AttackStatus statusText={leftAttackStatus} justifyContent="end" />
              <Pokemon
                pokemonData={battlingPokemon[0]}
                imgKeyRef={leftPokemonImageRef.current}
                animationAttackDirection="right"
              />
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
              <Pokemon
                pokemonData={battlingPokemon[1]}
                imgKeyRef={rightPokemonImageRef.current}
                animationAttackDirection="left"
              />
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
