import jwt from 'express-jwt';

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

export default jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256'],
  userProperty: 'token',

  getToken: getTokenFromHeader,
});
