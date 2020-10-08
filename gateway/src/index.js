import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import proxy from 'express-http-proxy';
import { workspaceProxy } from './middlewares';

const app = express();
app.use(express.json());

app.use(cors());

app.use(workspaceProxy);
app.use('/api', proxy(process.env.API_URL));
app.use('/', proxy(process.env.MAIN_CLIENT_URL));

const listPort = process.env.PORT || 80;
// eslint-disable-next-line no-console
app.listen(listPort, () => console.log(`Siren Paw listening on port ${listPort}!`));
