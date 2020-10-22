import { Router } from 'express';
import sessionService from '../services/sessionService';

const router = new Router();

router.post('/refresh', async (req, res) => {
  const rToken = req.signedCookies.refresh;

  if (!rToken) {
    return res.status(401).send('No valid refresh token found');
  }

  const response = await sessionService.refresh(rToken);
  res.cookie('refresh', response.refresh.token, {
    httpOnly: true,
    maxAge: response.refresh.time * 1000,
    signed: true,
  });

  return res.send({ token: response.jwtToken, user: response.user });
});

router.post('/logout', (req, res) => {
  const rToken = req.signedCookies.refresh;

    const response = sessionService.logout(rToken);
    res.cookie('refresh', '', {
      maxAge: 0,
    });
    return res.send(response);
})

export default router;
