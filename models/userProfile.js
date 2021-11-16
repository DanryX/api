module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    userId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'users',
        key: 'id'
      },
      primaryKey: true,
      allowNull: false
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
    
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      defaultValue: null
    },

    dob: {
      type: DataTypes.DATEONLY
    }
  },
  {
    tableName: 'usersProfiles',
    timestamps: false
  });

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
  };

  return UserProfile;
};
