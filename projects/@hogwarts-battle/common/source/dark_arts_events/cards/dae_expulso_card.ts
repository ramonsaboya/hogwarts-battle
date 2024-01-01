import {GameState} from '../../game_state';
import {getPlayerState} from '../../player_state';
import {PlayerID} from '../../player_view';
import {DarkArtsEventsCard} from '../dark_arts_events_card';

export class DarkArtsEventsExpulsoCard extends DarkArtsEventsCard {
  constructor() {
    super('Expulso', '');
  }

  applyEffect(state: GameState, playerID: PlayerID): GameState {
    const playerState = getPlayerState(state.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const newPlayerState = {
      ...playerState,
      health: playerState.health - 2,
    };

    const otherPlayers = state.players.filter(
      player => player.playerID !== playerID
    );

    return {
      ...state,
      players: [...otherPlayers, newPlayerState],
    };
  }
}
