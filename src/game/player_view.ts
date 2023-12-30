import {Card} from '../../server/game_state';
import {Villain} from '../../server/villain/villains_state';

export interface PlayerView {
  activeVillain: Villain;
  player: {
    hand: Card[];
    discardPile: Card[];
  };
}
