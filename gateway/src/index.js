import 'dotenv/config';
import cors from 'cors';
import express, { Router } from 'express';

const app = express();
app.use(express.json());

app.use(cors());

const subdomainMiddleware = (req, res, next) => {
  if (req.hostname.match(/[^]*\./g)) {
    res.send({ response: 'SUB' });
  } else {
    next();
  }
};

const router = Router();

router.get('/', subdomainMiddleware, (req, res) => {
  res.send({ response: 'NOSUB' });
});

app.use('/', router);

const listPort = process.env.PORT || 80;
// eslint-disable-next-line no-console
app.listen(listPort, () => console.log(`Siren Paw listening on port ${listPort}!`));
