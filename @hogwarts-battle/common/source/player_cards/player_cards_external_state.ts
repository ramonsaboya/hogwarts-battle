import {PlayerCardInstance} from './player_cards';

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
