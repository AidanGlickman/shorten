import proxy from 'express-http-proxy';

const apiProxy = proxy(process.env.API_URL, {
  // proxyReqPathResolver: (req) => req.url.slice(4),
});

export default apiProxy;
