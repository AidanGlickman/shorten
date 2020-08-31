import models from '../models';

const createAnalytic = async (
  timestamp,
  deviceType,
  device,
  ip,
  refurl,
  attached
) => {
  const foreignModel = attached.model + 'Id';
  const options = {
    timestamp,
    deviceType,
    device,
    ip,
    refurl,
  };
  options[foreignModel] = attached.id;
  const newAnalytic = await models.Analytic.create(options);
};

const analyticsService = {
  attachAnalytic: async (req, model, objId) => {
    const timestamp = Date.now();
    const deviceType = req.device_type;
    const device = req.device_name;
    const ip = req.ip;
    const refurl = req.get('Referrer');
    const attached = {
      model,
      id: objId,
    };
    console.log(attached);

    await createAnalytic(timestamp, deviceType, device, ip, refurl, attached);
  },
};

export default analyticsService;
