import {Socket, io} from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Action,
} from '@hogwarts-battle/common';

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

export type ActionEmitter = {
  [K in keyof Action]: {action: K; args: Parameters<Action[K]>[0]};
}[keyof Action];
