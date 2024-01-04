import {PlayerID, PlayerView} from '../player_view';
import {PlayerCardInstance} from '../player_cards/player_cards';
import {PlayerInput} from '../player_input/player_input';

export interface PlayCardActionArgs {
  cardInstance: PlayerCardInstance;
}
export interface ChooseDiscardCardArgs {
  cardInstance: PlayerCardInstance;
}
export interface PlayersEvents {
  playCard: (
    args: PlayCardActionArgs,
    callback: (playerView: PlayerView) => void
  ) => void;
  chooseDiscardCard: (
    args: ChooseDiscardCardArgs,
    callback: (playerView: PlayerView) => void
  ) => void;
}

export enum Hero {
  HARRY = 'Harry',
  HERMIONE = 'Hermione',
  RON = 'Ron',
  NEVILLE = 'Neville',
}

export interface ExternalPlayer {
  requiredPlayerInput: PlayerInput | null;
  playerID: PlayerID;
  hero: Hero;
  health: number;
  influenceTokens: number;
  attackTokens: number;
}

export interface SelfExternalPlayer extends ExternalPlayer {
  hand: PlayerCardInstance[];
  discardPile: PlayerCardInstance[];
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
