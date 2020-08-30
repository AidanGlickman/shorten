import { Router } from 'express';
import sessionService from '../services/sessionService';

const router = new Router();

router.post('/refresh', async (req, res) => {
  const rToken = req.cookies.refresh;

  if (!rToken) {
    return res.status(401).send('No valid refresh token found');
  }

  const response = await sessionService.refresh(rToken);
  res.cookie('refresh', response.refresh.token, {
    httpOnly: true,
    maxAge: response.refresh.time * 1000,
    // signed: true,
  });

  return res.send({ token: response.jwtToken });
});

export default router;
