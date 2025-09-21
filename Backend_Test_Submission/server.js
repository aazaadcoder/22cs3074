import express from 'express';
import {Log} from '../Logging_Middleware/LoggingMiddleware.js';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const data = Log("nice", "ok", "fine", "good");
    res.json({message : "good", data});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
