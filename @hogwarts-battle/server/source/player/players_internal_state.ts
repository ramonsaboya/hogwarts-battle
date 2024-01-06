import {v4 as uuidv4} from 'uuid';
import {ChooseCardEffectPlayerInputCallback} from '../state_mutations/state_mutation_manager';
import {
  ExternalPlayer,
  Hero,
  PLAYER_HERO_CARDS,
  PlayerCardInstance,
  PlayerHeroCard,
  PlayerHeroCardName,
  PlayerID,
  PlayerInput,
  SelfExternalPlayer,
  SerializedPlayersExternalState,
  Stack,
  serializePlayersExternalState,
  shuffle,
} from '@hogwarts-battle/common';

const STARTING_ALOHOMORA_CARDS = 7;

export interface InternalPlayer {
  playerID: PlayerID;
  playerName: string;
  hero: Hero;
  requiredPlayerInput: PlayerInput | null;
  playerInputCallbacks: ChooseCardEffectPlayerInputCallback[] | null;
  health: number;
  influenceTokens: number;
  attackTokens: number;
  hand: PlayerCardInstance[];
  deck: Stack<PlayerCardInstance>;
  discardPile: PlayerCardInstance[];
  cardsDuringTurnPile: PlayerCardInstance[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayersInternalState extends Array<InternalPlayer> {}

export function getInitialPlayersState(): PlayersInternalState {
  return [];
}

export function getInitialPlayerState(
  playerID: PlayerID,
  playerName: string,
  hero: Hero
): InternalPlayer {
  const startingDeck = shuffle(
    PLAYER_HERO_CARDS.filter(card => card.hero === hero).reduce(
      (acc: PlayerCardInstance[], card: PlayerHeroCard) => {
        if (card.name === PlayerHeroCardName.ALOHOHOMORA) {
          return [
            ...acc,
            ...new Array(STARTING_ALOHOMORA_CARDS)
              .fill(null)
              .map(() => ({id: uuidv4(), card})),
          ];
        }
        return [...acc, {id: uuidv4(), card}];
      },
      [] as PlayerCardInstance[]
    )
  );

  return {
    playerID,
    playerName,
    hero: hero,
    requiredPlayerInput: null,
    playerInputCallbacks: null,
    health: 10,
    influenceTokens: 0,
    attackTokens: 0,
    hand: startingDeck.slice(0, 5),
    deck: new Stack<PlayerCardInstance>(startingDeck.slice(5)),
    discardPile: [],
    cardsDuringTurnPile: [],
  };
}

export function convertAndSerializePlayersState(
  state: PlayersInternalState,
  playerID: PlayerID
): SerializedPlayersExternalState {
  const selfInternalPlayer = getInternalPlayer(state, playerID);
  if (!selfInternalPlayer) {
    throw new Error('Self Player not found');
  }

  const selfExternalPlayer: SelfExternalPlayer = {
    playerID: selfInternalPlayer.playerID,
    playerName: selfInternalPlayer.playerName,
    hero: selfInternalPlayer.hero,
    requiredPlayerInput: selfInternalPlayer.requiredPlayerInput,
    health: selfInternalPlayer.health,
    influenceTokens: selfInternalPlayer.influenceTokens,
    attackTokens: selfInternalPlayer.attackTokens,
    hand: selfInternalPlayer.hand,
    discardPile: selfInternalPlayer.discardPile,
    cardsDuringTurnPile: selfInternalPlayer.cardsDuringTurnPile,
  };
  const otherExternalPlayers: ExternalPlayer[] = state
    .filter(player => player.playerID !== playerID)
    .map(player => ({
      playerID: player.playerID,
      playerName: player.playerName,
      hero: player.hero,
      requiredPlayerInput: player.requiredPlayerInput,
      health: player.health,
      influenceTokens: player.influenceTokens,
      attackTokens: player.attackTokens,
    }));

  return serializePlayersExternalState({
    selfPlayer: selfExternalPlayer,
    otherPlayers: otherExternalPlayers,
  });
}

export const getInternalPlayer = (
  playersInternalState: PlayersInternalState,
  playerID: PlayerID
): InternalPlayer | undefined =>
  playersInternalState.find(player => player.playerID === playerID);
