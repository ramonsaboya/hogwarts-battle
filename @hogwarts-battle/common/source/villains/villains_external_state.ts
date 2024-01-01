import {PlayerView} from '../player_view';
import {VillainCard} from './villain_cards';

export interface VillainsEvents {
  killVillain: (args: {}, callback: (playerView: PlayerView) => void) => void;
}

export interface VillainsExternalState {
  deckSize: number;
  activeVillain: VillainCard;
  discardPile: VillainCard[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SerializedVillainsExternalState
  extends VillainsExternalState {}

export const serializeVillainsExternalState = (
  state: VillainsExternalState
): SerializedVillainsExternalState => state;

export const deserializeVillainsExternalState = (
  state: SerializedVillainsExternalState
): VillainsExternalState => state;
