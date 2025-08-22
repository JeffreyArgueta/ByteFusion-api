require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const { connectDB, closeDB } = require('./src/config/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
    const server = app.listen(process.env.PORT, () => {
      console.info(`🚀 Server running in http://localhost:${process.env.PORT}`)
      console.info(`📊 Process ID: ${process.pid}`);
    });
    // Shutdown on SIGINT (Ctrl+C) and SIGTERM
    process.on('SIGINT', async () => {
      await closeDB();
      server.close(() => {
        console.info('🛑 Server closed succesfully');
        process.exit(0);
      });
    });
    process.on('SIGTERM', async () => {
      await closeDB();
      server.close(() => {
        console.info('🛑 Server closed succesfully');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error while starting server: ', error);
    await closeDB();
    process.exit(1);
  }
};

startServer();
