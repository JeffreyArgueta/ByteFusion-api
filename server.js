require('dotenv').config()
const express = require('express');
const routes = require('./src/routes');
const { connectDB } = require('./src/config/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: 'API working succesfully!',
    version: '1.0.0'
  });
});

app.use('/byte/v1', routes);

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Route not defined',
    error: '404 Not Found'
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.info('🚀 Server running in PORT http://localhost:3000')
      console.info(`📊 Process ID: ${process.pid}`);
    });
  } catch (error) {
    console.error('Error starting server: ', error);
    process.exit(1);
  }
};

startServer();
