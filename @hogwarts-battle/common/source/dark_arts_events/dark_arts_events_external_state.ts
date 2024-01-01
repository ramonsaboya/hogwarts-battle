import {PlayerView} from '../player_view';
import {DarkArtsEventCard} from './dark_arts_event_cards';

export interface DarkArtsEventsEvents {
  revealDarkArtsEvent: (
    args: {},
    callback: (playerView: PlayerView) => void
  ) => void;
}

export interface DarkArtsEventsExternalState {
  deckSize: number;
  active: DarkArtsEventCard | null;
  discardPile: DarkArtsEventCard[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SerializedDarkArtsEventsExternalState
  extends DarkArtsEventsExternalState {}

export const serializeDarkArtsEventsExternalState = (
  state: DarkArtsEventsExternalState
): SerializedDarkArtsEventsExternalState => state;

export const deserializeDarkArtsEventsExternalState = (
  state: SerializedDarkArtsEventsExternalState
): DarkArtsEventsExternalState => state;
