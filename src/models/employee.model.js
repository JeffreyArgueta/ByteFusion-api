const { sequelize, DataTypes } = require('../config/database');

const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    }
  },
  {
    timestamps: false,
    tableName: 'employees'
  }
);

module.exports = { Employee, sequelize };
