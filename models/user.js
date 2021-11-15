module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
      isEmail: true
    },

    phone: {
      type: DataTypes.STRING,
      unique: true
    },

    password: {
      type: DataTypes.STRING()
    },

    firstName: {
      type: DataTypes.STRING
    },

    lastName: {
      type: DataTypes.STRING
    },

    patronymic: {
      type: DataTypes.STRING
    },

    role: {
      type: DataTypes.STRING,
      references: {
        model: 'roles',
        key: 'name'
      },
      allowNull: false
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  },
  {
    tableName: 'users',
    hooks: {
      beforeCreate: function (users, options) {
        users.createdAt = new Date();
        users.updatedAt = new Date();
      },
      beforeUpdate: function (users, options) {
        users.updatedAt = new Date();
      }
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'role', targetKey: 'name' });
  };

  return User;
};
