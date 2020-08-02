const link = (sequelize, DataTypes) => {
  const Link = sequelize.define('link', {
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
  };

  Link.associate = (models) => {
    Link.hasMany(models.Analytic);
  };

  return Link;
};

export default link;
