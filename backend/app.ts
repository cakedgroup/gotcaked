import express from 'express';
import path from 'path';
import { apiRouter } from './api'

const dotenv = require('dotenv');
dotenv.config({ path: './config/app.env' });

const app = express();

app.use('/api', apiRouter);

app.use(express.static(process.env.FRONTEND_DIST_PATH as string));
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, process.env.FRONTEND_DIST_PATH as string, 'index.html'))
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`App listening at http://localhost:${process.env.NODE_PORT}`)
});
