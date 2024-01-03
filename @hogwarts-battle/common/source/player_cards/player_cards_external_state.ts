import {PlayerView} from '../player_view';
import {PlayerCardInstance} from './player_cards';

export interface AcquireCardActionArgs {
  cardInstance: PlayerCardInstance;
}
export interface PlayerCardsEvents {
  acquireCard: (
    args: AcquireCardActionArgs,
    callback: (playerView: PlayerView) => void
  ) => void;
}

export interface PlayerCardsExternalState {
  availableCards: PlayerCardInstance[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SerializedPlayerCardsExternalState
  extends PlayerCardsExternalState {}

export const serializePlayerCardsExternalState = (
  state: PlayerCardsExternalState
): SerializedPlayerCardsExternalState => state;

export const deserializePlayerCardsExternalState = (
  state: SerializedPlayerCardsExternalState
): PlayerCardsExternalState => state;
