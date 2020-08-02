const workspace = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('workspace', {
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    private: {
      type: DataTypes.BOOLEAN,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  Workspace.associate = (models) => {
    Workspace.belongsTo(models.User);
  };

  Workspace.associate = (models) => {
    Workspace.hasMany(models.Link);
  };

  Workspace.associate = (models) => {
    Workspace.hasMany(models.Analytic);
  };

  return Workspace;
};

export default workspace;
