import {v4 as uuidv4} from 'uuid';
import {
  ExternalPlayer,
  Hero,
  PLAYER_HERO_CARDS,
  PlayerCardInstance,
  PlayerHeroCard,
  PlayerHeroCardName,
  PlayerID,
  SelfExternalPlayer,
  SerializedPlayersExternalState,
  Stack,
  serializePlayersExternalState,
  shuffle,
} from '@hogwarts-battle/common';

const STARTING_ALOHOMORA_CARDS = 7;

export interface InternalPlayer {
  playerID: PlayerID;
  health: number;
  influenceTokens: number;
  attackTokens: number;
  hero: Hero;
  hand: PlayerCardInstance[];
  deck: Stack<PlayerCardInstance>;
  discardPile: PlayerCardInstance[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayersInternalState extends Array<InternalPlayer> {}

export function getInitialPlayersState(): PlayersInternalState {
  return [];
}

export function getInitialPlayerState(
  playerID: PlayerID,
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
    playerID: playerID,
    health: 10,
    influenceTokens: 0,
    attackTokens: 0,
    hero: hero,
    hand: startingDeck.slice(0, 5),
    deck: new Stack<PlayerCardInstance>(startingDeck.slice(5)),
    discardPile: [],
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
    hero: selfInternalPlayer.hero,
    health: selfInternalPlayer.health,
    influenceTokens: selfInternalPlayer.influenceTokens,
    attackTokens: selfInternalPlayer.attackTokens,
    hand: selfInternalPlayer.hand,
    discardPile: selfInternalPlayer.discardPile,
  };
  const otherExternalPlayers: ExternalPlayer[] = state
    .filter(player => player.playerID !== playerID)
    .map(player => ({
      playerID: player.playerID,
      hero: player.hero,
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
