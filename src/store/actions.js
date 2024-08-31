// src/store/actions.js
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});
