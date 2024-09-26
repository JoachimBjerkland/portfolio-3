// src/utils/validators.js
export const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    return dateString.match(regex) !== null;
  };
  