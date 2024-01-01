import {
  ExternalPlayer,
  Hero,
  PlayerCard,
  PlayerID,
  SelfExternalPlayer,
  SerializedPlayersExternalState,
  Stack,
  serializePlayersExternalState,
} from '@hogwarts-battle/common';

export interface InternalPlayer {
  playerID: PlayerID;
  health: number;
  influenceTokens: number;
  attackTokens: number;
  hero: Hero;
  hand: PlayerCard[];
  deck: Stack<PlayerCard>;
  discardPile: PlayerCard[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayersInternalState extends Array<InternalPlayer> {}

export function getInitialPlayersState(): PlayersInternalState {
  return [];
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
