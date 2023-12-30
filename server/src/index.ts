import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import {createServer} from 'http';

const PORT = 4030;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io'],
    methods: ['GET', 'POST'],
  },
});

interface GameState {
  playerView: {
    activeVillains: string[];
  };
  players: number[];
  currentPlayer: number;
}

const players: {id: number; name: string}[] = [];
let nextPlayerID = 1;
const maxPlayers = 4;
let gameState: GameState = {
  playerView: {
    activeVillains: ['malfoy', 'voldemort'],
  },
  players: [],
  currentPlayer: 1,
};

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io'],
  })
);
app.use(express.json());

app.post('/join', (req, res) => {
  const playerName: string = req.body.playerName;

  const playerExists = players.some(player => player.name === playerName);
  if (playerExists) {
    return res.status(400).json({error: 'Player name already exists'});
  }

  if (players.length >= maxPlayers) {
    return res.status(400).json({error: 'Room is full'});
  }

  const playerID = nextPlayerID++;
  players.push({id: playerID, name: playerName});
  gameState = {
    ...gameState,
    players: [...gameState.players, playerID],
  };

  return res
    .status(200)
    .json({playerID: playerID, message: 'Player joined successfully'});
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('message', msg => {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('vilain', (vilain: string, callback) => {
    console.log('kill vilain: ' + vilain);
    gameState = {
      ...gameState,
      playerView: {
        ...gameState.playerView,
        activeVillains: gameState.playerView.activeVillains.filter(
          v => v !== vilain
        ),
      },
    };
    callback(gameState);
  });

  setInterval(() => {
    console.log(gameState);
    socket.emit('sync', gameState);
  }, 5000);
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
