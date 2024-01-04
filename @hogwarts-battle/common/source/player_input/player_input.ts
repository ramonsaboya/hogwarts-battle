export enum PlayerInputType {
  CHOOSE_PLAYER_CARD_EFFECT = 'CHOOSE_PLAYER_CARD_EFFECT',
  CHOOSE_DISCARD_CARD = 'CHOOSE_DISCARD_CARD',
  CHOOSE_ONE_HERO_FOR_HEAL = 'CHOOSE_ONE_HERO_FOR_HEAL',
}

export interface PlayerInput {
  type: PlayerInputType;
}

export interface ChooseEffectPlayerInput extends PlayerInput {
  type: PlayerInputType.CHOOSE_PLAYER_CARD_EFFECT;
  options: string[];
}

export interface ChooseCardPlayerInput extends PlayerInput {
  type: PlayerInputType.CHOOSE_DISCARD_CARD;
}

export interface ChooseHeroPlayerInput extends PlayerInput {
  type: PlayerInputType.CHOOSE_ONE_HERO_FOR_HEAL;
}
