import {Stack} from '../../common/stack';
import {PlayerID} from '../game';

export type Hero = 'Harry' | 'Hermione' | 'Ron' | 'Neville';

export type CardType = 'SPELL' | 'ITEM' | 'ALLY';

export interface Card {
  name: string;
  type: CardType;
}

export interface HeroCard extends Card {
  hero: Hero;
}

export interface HogwartsCard extends Card {
  cost: number;
}

export interface PlayerState {
  playerID: PlayerID;
  health: number;
  influenceTokens: number;
  attackTokens: number;
  hero: Hero;
  hand: Card[];
  deck: Stack<Card>;
  discardPile: Card[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayersState extends Array<PlayerState> {}

export const getPlayerState = (
  playersState: PlayersState,
  playerID: PlayerID
): PlayerState | undefined => playersState.find(p => p.playerID === playerID);

export const getInitialPlayersState = (): PlayersState => [];
