import {Server} from 'socket.io';
import {createServer} from 'http';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {registerListeners} from './actions';
import {InactivityMonitor} from './inactivity_monitor';
import {
  ClientToServerEvents,
  Hero,
  SerializedPlayerView,
  ServerToClientEvents,
} from '@hogwarts-battle/common';

const PORT = 4030;

const httpServer = createServer();
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://hogwarts-battle.vitaes.io'],
  },
});
const inactivityMonitor = new InactivityMonitor(httpServer, 10);

const game = new Game();

io.on('connection', socket => {
  inactivityMonitor.clearShutdownTimer();
  socket.on('disconnect', () => {
    if (io.engine.clientsCount === 0) {
      inactivityMonitor.scheduleShutdown();
    }
  });

  socket.join('outside');

  socket.on(
    'join',
    (
      playerName: string,
      hero: Hero,
      callback: (gameState: SerializedPlayerView | null) => void
    ) => {
      const [canJoin, reason] = game.canPlayerJoin();
      if (!canJoin) {
        console.log(`player ${playerName} cannot join: ${reason}`);
        callback(null);
        return;
      }

      socket.leave('outside');

      const playerID = game.addPlayer(playerName, hero, socket);
      registerListeners(game, playerID, socket);

      callback(createPlayerView(game, playerID));
      game.broadcastPlayerViews(playerID);

      console.log(
        'player joined: ' +
          game.gameState.players.find(player => player.playerID === playerID)!
            .playerName
      );
      socket.removeAllListeners('join');
    }
  );
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  inactivityMonitor.scheduleShutdown();
});
