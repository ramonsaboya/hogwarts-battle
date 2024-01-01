import {PlayerID, PlayerView} from '../player_view';
import {PlayerCard} from './player_cards';

export interface PlayCardActionArgs {
  cardIndex: number;
}
export interface PlayerEvents {
  playCard: (
    args: PlayCardActionArgs,
    callback: (playerView: PlayerView) => void
  ) => void;
}

export type Hero = 'Harry' | 'Hermione' | 'Ron' | 'Neville';

export interface ExternalPlayer {
  playerID: PlayerID;
  hero: Hero;
  health: number;
  influenceTokens: number;
  attackTokens: number;
}

export interface SelfExternalPlayer extends ExternalPlayer {
  hand: PlayerCard[];
  discardPile: PlayerCard[];
}

export interface PlayersExternalState {
  selfPlayer: SelfExternalPlayer;
  otherPlayers: ExternalPlayer[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SerializedPlayersExternalState extends PlayersExternalState {}

export const serializePlayersExternalState = (
  state: PlayersExternalState
): SerializedPlayersExternalState => state;

export const deserializePlayersExternalState = (
  state: SerializedPlayersExternalState
): PlayersExternalState => state;
