const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:admin@192.168.0.9:5432/prueba')

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.info('✅ Conexión establecida a postgreSQL satisfactoriamente');
  } catch (error) {
    console.error('❌ Incapaz de establecer conexión a postgreSQL', error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    console.info('✅ Conexión a postgreSQL cerrada satisfactoriamente');
  } catch (error) {
    console.error('❌ Error al cerrar conexión a postgreSQL', error);
    throw error;
  }
};

module.exports = { sequelize, DataTypes, connectDB, closeDB }
