const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('YouTube to MP3 Server is running successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});