// src/store/reducers.js
import { ADD_EMPLOYEE } from "./actions";
import { generateMockEmployees } from "../utils/mockData";

const initialState = {
  employees: generateMockEmployees(), // Initialise avec les données fictives
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload], // Ajoute un nouvel employé
      };
    default:
      return state;
  }
};

export default rootReducer;
