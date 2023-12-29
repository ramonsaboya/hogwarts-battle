import express from 'express';

const app = express();
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
