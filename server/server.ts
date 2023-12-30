import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import {createServer} from 'http';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {PlayerView} from '../src/game/player_view';
import {ClientToServerEvents, ServerToClientEvents} from '../src/socket/socket';
import {registerListeners} from './actions';

const PORT = 4030;

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io'],
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io'],
  })
);
app.use(express.json());

const game = new Game();

io.on('connection', socket => {
  socket.join('outside');

  socket.on(
    'join',
    (playerName: string, callback: (gameState: PlayerView | null) => void) => {
      const [canJoin, reason] = game.canPlayerJoin(playerName);
      if (!canJoin) {
        console.log(`player ${playerName} cannot join: ${reason}`);
        callback(null);
        return;
      }

      socket.leave('outside');

      const player = game.addPlayer(playerName, socket);
      registerListeners(game, player.id, socket);

      callback(createPlayerView(game.getState(), player.id));
      game.broadcastPlayerViews(player.id);

      console.log('player joined: ' + player.name);
      socket.removeAllListeners('join');
    }
  );
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
