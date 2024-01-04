import {DarkArtsEventsEvents} from './dark_arts_events/dark_arts_events_external_state';
import {Hero, PlayersEvents} from './player/players_external_state';
import {PlayerCardsEvents} from './player_cards/player_cards_external_state';
import {SerializedPlayerView} from './player_view';
import {VillainsEvents} from './villains/villains_external_state';

export interface ServerToClientEvents {
  sync: (playerView: SerializedPlayerView) => void;
}

export type ClientToServerEvents = JoinEvent &
  StartGameEvent &
  GameEvents &
  StateActions;

type JoinEvent = {
  join: (
    playerName: string,
    hero: Hero,
    callback: (playerView: SerializedPlayerView | null) => void
  ) => void;
};
type StartGameEvent = {
  startGame: (
    args: {},
    callback: (playerView: SerializedPlayerView) => void
  ) => void;
};

type GameEvents = {
  endTurn: (
    args: {},
    callback: (playerView: SerializedPlayerView) => void
  ) => void;
};
type StateActions = PlayersEvents &
  PlayerCardsEvents &
  VillainsEvents &
  DarkArtsEventsEvents;

export type Action = Omit<Omit<ClientToServerEvents, 'join'>, 'startGame'>;
