import {Card} from '../../server/player/player_state';
import {Villain} from '../../server/villain/villains_state';

export interface PlayerView {
  activeVillain: Villain;
  player: {
    hand: Card[];
    discardPile: Card[];
  };
}
