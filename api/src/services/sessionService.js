import redis from '../helpers/redisClient';
import sessionHelpers from '../helpers/sessionHelpers';
import models from '../models';

const sessionService = {
  newRefresh: (user) => {
    return sessionHelpers.setRefresh(user);
  },
  refresh: async (rToken) => {
    const userId = await redis.get(rToken);
    redis.del(rToken);
    const user = await models.User.findByPk(userId);
    const jwtToken = sessionHelpers.generateJWT(user);
    const refresh = sessionHelpers.setRefresh(user);
    return {
      jwtToken: jwtToken,
      refresh,
    };
  },
};

export default sessionService;
