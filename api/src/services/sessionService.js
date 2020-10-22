import redis from '../helpers/redisClient';
import sessionHelpers from '../helpers/sessionHelpers';
import models from '../models';

const sessionService = {
  newRefresh: (user) => sessionHelpers.setRefresh(user),
  refresh: async (rToken) => {
    const userId = await redis.get(rToken);
    redis.del(rToken);
    const user = await models.User.findByPk(userId);
    const jwtToken = sessionHelpers.generateJWT(user);
    const refresh = sessionHelpers.setRefresh(user);
    return {
      jwtToken,
      refresh,
      user: {username: user.username, email: user.email}
    };
  },
  logout: async (rToken) => {
    try {
      redis.del(rToken);
    } finally {
      return true;
    }
  }
};

export default sessionService;
