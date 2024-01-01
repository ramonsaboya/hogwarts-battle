import {DarkArtsEventsEvents} from './dark_arts_events/dark_arts_events_external_state';
import {Hero, PlayerEvents} from './player_state';
import {SerializedPlayerView} from './player_view';
import {VillainsEvents} from './villains_state';

export interface ServerToClientEvents {
  sync: (playerView: SerializedPlayerView) => void;
}

export type ClientToServerEvents = JoinEvent &
  GameEvents &
  PlayerEvents &
  VillainsEvents &
  DarkArtsEventsEvents;
type JoinEvent = {
  join: (
    playerName: string,
    hero: Hero,
    callback: (playerView: SerializedPlayerView | null) => void
  ) => void;
};
type GameEvents = {
  endTurn: (
    args: {},
    callback: (playerView: SerializedPlayerView) => void
  ) => void;
};
export type Action = Omit<ClientToServerEvents, 'join'>;
