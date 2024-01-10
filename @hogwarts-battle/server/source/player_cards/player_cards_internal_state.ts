import {v4 as uuidv4} from 'uuid';
import {
  PLAYER_HOGWARTS_CARDS,
  PlayerCardInstance,
  PlayerHogwartsCard,
  SerializedPlayerCardsExternalState,
  Stack,
  serializePlayerCardsExternalState,
  shuffle,
} from '@hogwarts-battle/common';
import {getPlayerHogwartsCardAmount} from './player_cards_config';

export interface PlayerCardsInternalState {
  availableCards: (PlayerCardInstance | null)[];
  deck: Stack<PlayerCardInstance>;
}

export function getInitialPlayerCardsState(): PlayerCardsInternalState {
  const deck = shuffle(
    PLAYER_HOGWARTS_CARDS.reduce(
      (acc: PlayerCardInstance[], card: PlayerHogwartsCard) => [
        ...acc,
        ...new Array(getPlayerHogwartsCardAmount(card.name))
          .fill(null)
          .map(() => ({
            id: uuidv4(),
            card,
          })),
      ],
      [] as PlayerCardInstance[]
    )
  );

  return {
    availableCards: deck.slice(0, 6),
    deck: new Stack(deck.slice(6)),
  };
}

export function convertAndSerializePlayerCardsState(
  state: PlayerCardsInternalState
): SerializedPlayerCardsExternalState {
  return serializePlayerCardsExternalState({
    availableCards: state.availableCards,
  });
}
