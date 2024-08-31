// src/utils/mockData.js

export function generateMockEmployees() {
  return [
    {
      firstName: "Claudine",
      lastName: "Lowe",
      birthDate: new Date("1962-01-29"),
      startDate: new Date("2024-07-01"),
      address: {
        street: "9051 Manor Road",
        city: "West Cassandre",
        state: "MA",
        zipCode: "52921-9627",
      },
      department: "Toys",
    },
    {
      firstName: "John",
      lastName: "Doe",
      birthDate: new Date("1980-03-15"),
      startDate: new Date("2020-08-20"),
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: "62704",
      },
      department: "Electronics",
    },
    // Ajoutez d'autres employés ici
  ];
}
