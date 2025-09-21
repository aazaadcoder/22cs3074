import express from 'express'
import { shortenUrl } from './controllers/urlControllers.js';

const app = express();

app.use(express.json());

// In-memory storage (in production, we will use a database)
const urlDatabase = new Map();
const statsDatabase = new Map();



app.post('/shorturls', shortenUrl);

// Retrieve Short URL Statistics endpoint
app.get('/shorturls/:shortcode', );

// Redirect endpoint (bonus feature to make the short URLs functional)
app.get('/:shortcode', )


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`URL Shortener service is running on port ${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`POST /shorturls - Create short URL`);
    console.log(`GET /shorturls/:shortcode - Get URL statistics`);
    console.log(`GET /:shortcode - Redirect to original URL`);
    console.log(`GET /health - Health check`);
});

export {app, urlDatabase, statsDatabase};