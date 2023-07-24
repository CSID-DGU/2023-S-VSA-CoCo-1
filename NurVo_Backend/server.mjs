import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { router as listRouter } from './controllers/list.mjs';
import { router as dialoguesRouter } from './controllers/dialogues.mjs';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('NurseVoice!');
});


app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

app.use('/api/dialogues/:thema', listRouter);
app.use('/api/dialogues', dialoguesRouter);


