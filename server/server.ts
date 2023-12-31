import {Server} from 'socket.io';
import {createServer} from 'http';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {PlayerView} from '../src/game/player_view';
import {ClientToServerEvents, ServerToClientEvents} from '../src/socket/socket';
import {registerListeners} from './actions';
import {Hero} from './player/player_state';
import {InactivityMonitor} from './inactivity_monitor';

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
      callback: (gameState: PlayerView | null) => void
    ) => {
      const [canJoin, reason] = game.canPlayerJoin(playerName);
      if (!canJoin) {
        console.log(`player ${playerName} cannot join: ${reason}`);
        callback(null);
        return;
      }

      socket.leave('outside');

      const player = game.addPlayer(playerName, hero, socket);
      registerListeners(game, player.id, socket);

      callback(createPlayerView(game, player.id));
      game.broadcastPlayerViews(player.id);

      console.log('player joined: ' + player.name);
      socket.removeAllListeners('join');
    }
  );
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  inactivityMonitor.scheduleShutdown();
});
