import jwt from 'jsonwebtoken';

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return undefined;
};

export default async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const signature = process.env.JWT_SECRET;
  let tokenData;
  jwt.verify(token, signature, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid Token');
    }
    tokenData = decoded.data;
    req.tokenData = tokenData;
    return next();
  });
};
