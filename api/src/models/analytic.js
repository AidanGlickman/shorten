const analytic = (sequelize, DataTypes) => {
  const Analytic = sequelize.define('analytic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
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
