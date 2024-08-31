// src/components/EmployeeForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployee } from "../store/actions";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/home-icon.svg"; // Assurez-vous que le chemin d'importation de l'icône est correct
import Modal from "./Modal"; // Importer le composant Modal
import "../App.css"; // Assurez-vous que le CSS est bien importé

// Définition des options d'état et de département
const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];
const EmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalVisible, setModalVisible] = useState(false); // État pour la visibilité du modal
  const dispatch = useDispatch();

  // Fonction de validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!birthDate) newErrors.birthDate = "Date of birth is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!street) newErrors.street = "Street is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!zipCode) newErrors.zipCode = "Zip code is required";
    if (!department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour personnaliser l'en-tête du sélecteur de date
  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        {"<"}
      </button>
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(Number(value))}
      >
        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
      <select
        value={date.getMonth()}
        onChange={({ target: { value } }) => changeMonth(Number(value))}
      >
        {Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "long" })
        ).map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        {">"}
      </button>
      <button
        type="button"
        onClick={() => {
          const today = new Date();
          setBirthDate(today);
          setStartDate(today);
          changeMonth(today.getMonth());
          changeYear(today.getFullYear());
        }}
        style={{ border: "none", background: "none", marginLeft: 10 }}
      >
        <img src={HomeIcon} alt="Today" style={{ width: 20, height: 20 }} />
      </button>
    </div>
  );

  // Fonction de soumission du formulaire
  const handleSubmit = () => {
    console.log("Submitting form...");

    if (validateForm()) {
      const newEmployee = {
        id: Date.now(),
        firstName,
        lastName,
        birthDate,
        startDate,
        address: { street, city, state: state.value, zipCode },
        department: department.value,
      };

      console.log("New Employee:", newEmployee);

      dispatch(addEmployee(newEmployee));
      setModalVisible(true); // Afficher le modal au lieu de l'alerte
    } else {
    }
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Rendu du formulaire
  return (
    <>
      <div className="link-center">
        <h1>HRnet</h1>
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
      </div>
      <form>
        {/* Champ de prénom */}
        <div className="form-item">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>

        {/* Champ de nom */}
        <div className="form-item">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        {/* Champ de date de naissance */}
        <div className="form-item">
          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            className="form-input"
            dateFormat="MM/dd/yyyy"
            renderCustomHeader={renderCustomHeader} // Ajout de l'en-tête personnalisé
          />
          {errors.birthDate && (
            <span className="error">{errors.birthDate}</span>
          )}
        </div>

        {/* Champ de date de début */}
        <div className="form-item">
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-input"
            dateFormat="MM/dd/yyyy"
            renderCustomHeader={renderCustomHeader} // Ajout de l'en-tête personnalisé
          />
          {errors.startDate && (
            <span className="error">{errors.startDate}</span>
          )}
        </div>

        {/* Adresse */}
        <fieldset className="address">
          <legend>Address</legend>

          {/* Champ de rue */}
          <div className="form-item">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            {errors.street && <span className="error">{errors.street}</span>}
          </div>

          {/* Champ de ville */}
          <div className="form-item">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          {/* Champ de sélection d'état */}
          <div className="form-item">
            <label htmlFor="state">State</label>
            <Select
              options={stateOptions}
              value={state}
              onChange={setState}
              className="state-select"
              placeholder="Select a state"
              isClearable
            />
            {errors.state && <span className="error">{errors.state}</span>}
          </div>

          {/* Champ de code postal */}
          <div className="form-item">
            <label htmlFor="zip-code">Zip Code</label>
            <input
              type="text"
              id="zip-code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
          </div>
        </fieldset>

        {/* Champ de sélection de département */}
        <div className="form-item">
          <label htmlFor="department">Department</label>
          <Select
            options={departmentOptions}
            value={department}
            onChange={setDepartment}
            className="state-select"
            placeholder="Select a department"
            isClearable
          />
          {errors.department && (
            <span className="error">{errors.department}</span>
          )}
        </div>

        {/* Bouton de soumission */}
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>

      {/* Modal pour la confirmation */}
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <h2>Employee Created!</h2>
        <p>The new employee has been successfully added.</p>
      </Modal>
    </>
  );
};

export default EmployeeForm;
