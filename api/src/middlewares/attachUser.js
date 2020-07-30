import models from '../models';

export default async (req, res, next) => {
  const decodedTokenData = req.tokenData;
  const userRecord = await models.User.findOne({ uuid: decodedTokenData.uuid });

  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).end('User not found');
  } else {
    return next();
  }
};
