const workspace = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('workspace', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
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
    Workspace.hasMany(models.Link, { onDelete: 'CASCADE' });
    Workspace.hasMany(models.Analytic, { onDelete: 'CASCADE' });
  };

  return Workspace;
};

export default workspace;
