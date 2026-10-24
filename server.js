const express = require('express');
const youtubedl = require('yt-dlp-exec');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// បើកឱ្យដំណើរការ Frontend ពី Folder public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint សម្រាប់ឱ្យ Frontend ឆែកមើលថា Server មាន yt-dlp ឬยัง
app.get('/check', (req, res) => {
    res.json({ installed: true, message: 'yt-dlp-exec is ready' });
});

app.get('/status', (req, res) => {
    res.json({ status: 'ok', ytdlp: true });
});

// Endpoint សម្រាប់ Convert វីដេអូ
app.get('/convert', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ error: 'Please provide a URL' });
    }

    try {
        const output = await youtubedl(videoUrl, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
        });
        res.json({ success: true, data: output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process media' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
