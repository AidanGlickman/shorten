const analytic = (sequelize, DataTypes) => {
  const Analytic = sequelize.define('analytic', {
    timestamp: {
      type: DataTypes.DATE,
    },
    device: {
      type: DataTypes.STRING,
    },
    deviceType: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
    },
    refurl: {
      type: DataTypes.STRING,
    },
  });

  Analytic.associate = (models) => {
    Analytic.belongsTo(models.Workspace);
    Analytic.belongsTo(models.Link);
  };

  return Analytic;
};

export default analytic;
