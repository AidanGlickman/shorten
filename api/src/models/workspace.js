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
  });

  Workspace.associate = (models) => {
    Workspace.belongsTo(models.User);
  };

  return Workspace;
};

export default workspace;
