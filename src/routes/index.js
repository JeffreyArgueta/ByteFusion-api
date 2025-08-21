const express = require('express');
const employeeRoutes = require('./employee.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: true,
    message: 'Routes working succesfully!',
    version: '1.0.0'
  });
});

router.use('/employees', employeeRoutes);

module.exports = router;
