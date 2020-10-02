const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Workspace, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async (login) => {
    let found = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      found = await User.findOne({
        where: { email: login },
      });
    }

    return found;
  };

  return User;
};

export default user;
