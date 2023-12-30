import {Socket, io} from 'socket.io-client';
import {PlayerView} from '../game/player_view';

export interface ServerToClientEvents {
  sync: (playerView: PlayerView) => void;
}

export interface ClientToServerEvents {
  join: (
    playerName: string,
    callback: (playerView: PlayerView | null) => void
  ) => void;
  killVillain: (args: {}, callback: (playerView: PlayerView) => void) => void;
  playCard: (
    args: {cardIndex: number},
    callback: (playerView: PlayerView) => void
  ) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:4030',
  {
    autoConnect: false,
  }
);
