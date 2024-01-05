import {PlayerView} from '../player_view';
import {VillainCard} from './villain_cards';

export interface AttackVillainArgs {
  attackTokens: number;
}
export interface VillainsEvents {
  attackVillain: (
    args: AttackVillainArgs,
    callback: (playerView: PlayerView) => void
  ) => void;
}

export interface VillainsExternalState {
  deckSize: number;
  activeVillain: VillainCard | null;
  discardPile: VillainCard[];
  attackTokens: number;
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
