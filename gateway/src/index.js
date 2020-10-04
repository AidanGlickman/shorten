import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes';
import { apiProxy, workspaceProxy } from './middlewares';

const app = express();
app.use(express.json());

app.use(cors());

app.use(workspaceProxy);
app.use('/api', apiProxy);
app.use('/', router);

const listPort = process.env.PORT || 80;
// eslint-disable-next-line no-console
app.listen(listPort, () => console.log(`Siren Paw listening on port ${listPort}!`));
