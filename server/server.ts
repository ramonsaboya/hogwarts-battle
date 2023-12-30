import express from 'express';
import cors from 'cors';
import {Server, Socket} from 'socket.io';
import {createServer} from 'http';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {PlayerView} from '../src/game/player_view';

const PORT = 4030;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
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
    (playerName: string, callback: (gameState: PlayerView | null) => {}) => {
      const [canJoin, reason] = game.canPlayerJoin(playerName);
      if (!canJoin) {
        console.log(`player ${playerName} cannot join: ${reason}`);
        callback(null);
        return;
      }

      socket.leave('outside');

      const player = game.addPlayer(playerName, socket);
      registerListeners(player.id, socket);

      callback(createPlayerView(game.getState(), player.id));
      broadcastPlayerViews(player.id);

      console.log('player joined: ' + player.name);
      socket.removeAllListeners('join');
    }
  );
});

function registerListeners(playerID: number, socket: Socket) {
  socket.on(
    'kill villain',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args: any, callback: (playerView: PlayerView) => {}) => {
      console.log('kill vilain action');

      const state = game.getState();

      const activeVillain = state.villains.active;
      console.log('killing villain: ' + activeVillain.name);

      const newDeck = state.villains.deck;
      const newVillain = newDeck.pop();
      if (!newVillain) {
        throw new Error('No more villains');
      }

      game.setState({
        ...state,
        villains: {
          deck: newDeck,
          active: newVillain,
        },
      });

      callback(createPlayerView(game.getState(), playerID));
      broadcastPlayerViews(playerID);
    }
  );
}

function broadcastPlayerViews(expectPlayerID: number) {
  const gameState = game.getState();
  const players = game.getPlayers();

  players
    .filter(player => player.id !== expectPlayerID)
    .forEach(player => {
      console.log('broadcasting to player: ' + player.name);
      const playerView = createPlayerView(gameState, player.id);
      game.getPlayerSocket(player.id).emit('sync', playerView);
    });
}

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
