import {Socket, io} from 'socket.io-client';
import {PlayerView} from '../game/player_view';
import {VillainsEvents} from '../../server/villain/villains_actions';
import {PlayerEvents} from '../../server/player/player_actions';
import {GameState} from '../../server/game_state';
import {PlayerID} from '../../server/game';
import {Hero} from '../../server/player/player_state';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> = {} as Socket;
export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => socket;
export function startSocket(serverAddress: string): void {
  socket = io(`http://${serverAddress}:4030/`, {
    autoConnect: false,
  });
}

export interface ServerToClientEvents {
  sync: (playerView: PlayerView) => void;
}

export type ClientToServerEvents = {
  join: (
    playerName: string,
    hero: Hero,
    callback: (playerView: PlayerView | null) => void
  ) => void;
} & VillainsEvents &
  PlayerEvents;

export type Action = Omit<ClientToServerEvents, 'join'>;
export type ActionListener = {
  [K in keyof Action]: [
    K,
    (
      state: GameState,
      actionArgs: Parameters<Action[K]>[0],
      playerID: PlayerID
    ) => GameState,
  ];
}[keyof Action];
export type ActionEmitter = {
  [K in keyof Action]: {action: K; args: Parameters<Action[K]>[0]};
}[keyof Action];
