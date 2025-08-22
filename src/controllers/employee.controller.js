const employeeService = require('../services/employee.service');

const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getEmployees();
    console.info('Handled GET /employees request', { count: employees.length });
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(error.status).json({
      success: false,
      message: error.message,
      data: null
    });
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    console.info('Handled POST /employees request', {employee_id: employee.id, email: employee.email });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(error.status).json({
      success: false,
      message: error.message,
      data: null
    });
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    console.info(`Handled PUT /employees/${req.params.id} request`, {employee_id: employee.id, email: employee.email });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(error.status).json({
      success: false,
      message: error.message,
      data: null
    });
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    console.info(`Handled DELETE /employees/${req.params.id} request`);
    res.status(202).json({
      success: true,
      message: 'Request accepted, starting deleting employee.',
      data: employee
    });
  } catch (error) {
    res.status(error.status).json({
      success: false,
      message: error.message,
      data: null
    });
    next(error);
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
