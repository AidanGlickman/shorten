import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({ response: 'NOSUB' });
});

export default router;
