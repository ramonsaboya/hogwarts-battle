import { Server, Origins } from 'boardgame.io/server';
import HogwartsBattleGame from './game/game';

const PORT = process.env.PORT || 3000;
const server = Server({
    games: [HogwartsBattleGame],
    origins: [Origins.LOCALHOST, 'https://ramonsaboya.github.io/hogwarts-battle'],
});

server.run(PORT, () => {
    console.log(`Serving at port ${PORT}`);
});