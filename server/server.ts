import express from 'express';
import cors from 'cors';
import {Server, Socket} from 'socket.io';
import {createServer} from 'http';
import {GameState} from '../src/game/GameState';

const PORT = 4030;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io'],
    methods: ['GET', 'POST'],
  },
});
let nextPlayerID = 1;
const maxPlayers = 4;
let gameState: GameState = {
  gameContext: {
    players: [],
    currentPlayer: 0,
  },
  playerView: {
    activeVillains: ['malfoy', 'voldemort'],
  },
};

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io'],
  })
);
app.use(express.json());

io.on('connection', socket => {
  socket.join('outside');

  socket.on(
    'join',
    (playerName: string, callback: (gameState: GameState | null) => {}) => {
      console.log('join emiiited for ' + playerName);

      const playerExists = gameState.gameContext.players.some(
        player => player.name === playerName
      );
      if (playerExists) {
        console.log('player already exists for ' + playerName);
        callback(null);
        return;
      }

      if (gameState.gameContext.players.length >= maxPlayers) {
        console.log('room is full for ' + playerName);
        callback(null);
        return;
      }

      socket.leave('outside');

      const playerID = nextPlayerID++;
      registerListeners(playerID, socket);
      gameState = {
        ...gameState,
        gameContext: {
          ...gameState.gameContext,
          players: [
            ...gameState.gameContext.players,
            {id: playerID, name: playerName},
          ],
        },
      };

      callback(gameState);
      socket.broadcast.except('outside').emit('sync', gameState);

      console.log('player joined: ' + playerName);
      socket.removeAllListeners('join');
    }
  );
});

function registerListeners(playerID: number, socket: Socket) {
  socket.on('vilain', (vilain: string) => {
    console.log('kill vilain: ' + vilain);
    gameState = {
      ...gameState,
      playerView: {
        ...gameState.playerView,
        activeVillains: gameState.playerView.activeVillains.filter(
          (v: string) => v !== vilain
        ),
      },
    };
    io.except('outside').emit('sync', gameState);
  });
}

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
