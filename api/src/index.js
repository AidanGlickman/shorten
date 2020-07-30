import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';

import models, { sequelize } from './models';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', routes.auth);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log('Example app listening on port 3000!')
  );
});
