import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import device from 'express-device';
import 'regenerator-runtime/runtime';
import routes from './routes';
import middlewares from './middlewares';

import { sequelize } from './models';

const app = express();

app.set('trust proxy', true);

app.use(express.json());

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(device.capture());

app.use('/auth', routes.auth);
app.use(
  '/admin',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(2),
  routes.admin,
);
app.use('/workspace', routes.workspace);
app.use('/link/:workspaceCode', routes.link);
app.use(
  '/user',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  routes.user,
);
app.use('/session', routes.session);
app.get('/', (req, res) => res.send('Hello!'));

sequelize.sync({ alter: process.env.NODE_ENV === 'development' }).then(() => {
  const listPort = process.env.PORT || 3000;
  // eslint-disable-next-line no-console
  app.listen(listPort, () => console.log(`Siren Paw listening on port ${listPort}!`));
});
