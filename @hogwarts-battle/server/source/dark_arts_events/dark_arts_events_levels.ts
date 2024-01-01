import {
  DarkArtsEventsCard,
  DarkArtsEventsExpulsoCard,
} from '@hogwarts-battle/common';

export const DARK_ARTS_EVENTS_CARDS_PER_LEVEL: {
  [level: number]: DarkArtsEventsCard[];
} = {
  1: [
    ...repeat(DarkArtsEventsExpulsoCard, 3),
    // ...repeat(DarkArtsEventsPetrificationCard, 2),
    // ...repeat(DarkArtsEventsFlipendoCard, 2),
    // ...repeat(DarkArtsEventsHeWhoMustNotBeNamedCard, 3),
  ],
};

function repeat(
  cardClass: new () => DarkArtsEventsCard,
  times: number
): DarkArtsEventsCard[] {
  return new Array(times).fill(null).map(() => new cardClass());
}
