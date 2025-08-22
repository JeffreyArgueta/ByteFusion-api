require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URI)

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.info('🔗 Conection stablished with postgreSQL succesfully');
  } catch (error) {
    console.error('❌ Error while connecting postgreSQL', error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    console.info('🔒 Conection to postgreSQL closed succesfully');
  } catch (error) {
    console.error('❌ Error while closing connection with postgreSQL', error);
    throw error;
  }
};

module.exports = { sequelize, DataTypes, connectDB, closeDB }
