import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

const players: { name: string }[] = [];
const maxPlayers = 4;

app.use(cors({
    origin: ['http://localhost:3000', 'https://ramonsaboya.github.io']
}));
app.use(express.json());

app.post('/join', (req, res) => {
    const playerName: string = req.body.playerName;

    const playerExists = players.some(player => player.name === playerName);
    if (playerExists) {
        return res.status(400).json({ error: 'Player name already exists' });
    }

    if (players.length >= maxPlayers) {
        return res.status(400).json({ error: 'Room is full' });
    }

    players.push({ name: playerName });

    return res.status(200).json({ message: 'Player joined successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
