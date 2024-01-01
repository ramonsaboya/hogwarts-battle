import {PlayerView} from './player_view';
import {Stack} from './stack';

export interface VillainsEvents {
  killVillain: (args: {}, callback: (playerView: PlayerView) => void) => void;
}

export interface Villain {
  name: string;
  health: number;
}

export interface VillainsState {
  deck: Stack<Villain>;
  active: Villain;
}

export interface SerializedVillainsState {
  deck: Villain[];
  active: Villain;
}

export const serializeVillainsState: (
  villainsState: VillainsState
) => SerializedVillainsState = villainsState => ({
  deck: villainsState.deck.getItems,
  active: villainsState.active,
});

export const deserializeVillainsState: (
  serializedVillainsState: SerializedVillainsState
) => VillainsState = serializedVillainsState => ({
  deck: new Stack(serializedVillainsState.deck),
  active: serializedVillainsState.active,
});
