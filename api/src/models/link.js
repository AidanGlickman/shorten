const link = (sequelize, DataTypes) => {
  const Link = sequelize.define('link', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
  });

  Link.associate = (models) => {
    Link.belongsTo(models.Workspace);
    Link.hasMany(models.Analytic, {
      onDelete: 'CASCADE',
      foreignKey: {
        constraints: false,
        allowNull: true,
      },
    });
  };

  return Link;
};

export default link;
