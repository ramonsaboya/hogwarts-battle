import {DarkArtsEventsExpulsoCard} from './cards/dae_expulso_card';
// import {DarkArtsEventsFlipendoCard} from './cards/dae_flipendo_card';
// import {DarkArtsEventsHeWhoMustNotBeNamedCard} from './cards/dae_he_who_must_not_be_named_card';
// import {DarkArtsEventsPetrificationCard} from './cards/dae_petrification_card';
import {DarkArtsEventsCard} from './dark_arts_events_card';

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
