const { Employee, sequelize } = require('../models/employee.model');

const getEmployees = async () => {
  try {
    const employees = await Employee.findAll();
    console.info('All employees retrived succesfully', { count: employees.length });
    return employees;
  } catch (error) {
    console.error('Error retrieving employees', { error: error.message });
    throw error;
  }
};

const createEmployee = async ({ name, email }) => {
  const transaction = await sequelize.transaction();
  try {
    const employee = await Employee.create(
      { name, email },
      { transaction }
    );
    console.info(`Employee created succesfully: ${email}`, { employee_id: employee.id })
    await transaction.commit();
    return employee;
  } catch (error) {
    await transaction.rollback();
    console.error(`Error creating employee: ${email}`, { error: error.message });
    throw error;
  }
};

const updateEmployee = async (id, { name, email }) => {
  const transaction = await sequelize.transaction();
  try {
    const employee = await Employee.findByPk(id, { transaction });
    if (!employee) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }
    await employee.update(
      { name, email },
      { transaction }
    );
    console.info(`Employee updated succesfully with ID: ${id}`, { employee: id, email })
    await transaction.commit();
    return employee;
  } catch (error) {
    await transaction.rollback();
    console.error(`Error updating employee with ID: ${id}`, { error: error.message });
    throw error;
  }
};

const deleteEmployee = async (id) => {
  const transaction = await sequelize.transaction();
  try {
    const employee = await Employee.findByPk(id, { transaction });
    if (!employee) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }
    await employee.destroy({ transaction });
    console.info(`Employee deleted succesfully with ID: ${id}`, { employee: id, email })
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(`Error deleting employee with ID: ${id}`, { error: error.message });
    throw error;
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
