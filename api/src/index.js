import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import middlewares from './middlewares';

import models, { sequelize } from './models';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', routes.auth);
app.use(
  '/admin',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(2),
  routes.admin
);
app.use('/workspace', routes.workspace);
app.use('/link/:workspaceCode', routes.link);

sequelize.sync().then(() => {
  const listPort = process.env.PORT || 3000;
  app.listen(listPort, () =>
    console.log('Siren Paw listening on port ' + listPort + '!')
  );
});
