module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    permissions: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'roles',
    timestamps: false
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, { sourceKey: 'name', foreignKey: 'role' });
  };

  return Role;
};
