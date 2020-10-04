import proxy from 'express-http-proxy';

const workspaceProxy = proxy(process.env.WORKSPACE_CLIENT_URL, {
  filter: (req) => req.hostname.match(/[^]*\./g),
});

export default workspaceProxy;
