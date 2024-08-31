import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees); // Récupère les employés du store
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = employees.filter((item) => {
    const lowerCaseFilter = filterText.toLowerCase();

    return (
      item.firstName.toLowerCase().includes(lowerCaseFilter) ||
      item.lastName.toLowerCase().includes(lowerCaseFilter) ||
      item.birthDate.toLocaleDateString().includes(lowerCaseFilter) ||
      item.startDate.toLocaleDateString().includes(lowerCaseFilter) ||
      item.address.street.toLowerCase().includes(lowerCaseFilter) ||
      item.address.city.toLowerCase().includes(lowerCaseFilter) ||
      item.address.state.toLowerCase().includes(lowerCaseFilter) ||
      item.address.zipCode.toString().includes(lowerCaseFilter) ||
      item.department.toLowerCase().includes(lowerCaseFilter)
    );
  });

  const columns = [
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    {
      name: "Date of Birth",
      selector: (row) => row.birthDate,
      sortable: true,
      format: (row) => row.birthDate.toLocaleDateString(),
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
      format: (row) => row.startDate.toLocaleDateString(),
    },
    { name: "Street", selector: (row) => row.address.street, sortable: true },
    { name: "City", selector: (row) => row.address.city, sortable: true },
    { name: "State", selector: (row) => row.address.state, sortable: true },
    {
      name: "Zip Code",
      selector: (row) => row.address.zipCode,
      sortable: true,
    },
    { name: "Department", selector: (row) => row.department, sortable: true },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h1 className="link-center">Current Employees</h1>

      <div className="table-toolbar">
        <div className="table-entries">
          <label>
            Show
            <select
              className="entries-select"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
        </div>

        <div className="table-search">
          <label>
            Search:
            <input
              type="text"
              placeholder="Search employees..."
              className="search-input"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </label>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={currentItems}
        pagination={false}
        highlightOnHover
        responsive
        striped
        defaultSortFieldId={1}
      />
      <div className="bottom">
        <div className="entries-info">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredItems.length)} of{" "}
          {filteredItems.length} entries
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="button-color"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={currentPage === number ? "active-page" : ""}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="button-color"
          >
            Next
          </button>
        </div>
      </div>

      <div className="link-center">
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default EmployeeList;
