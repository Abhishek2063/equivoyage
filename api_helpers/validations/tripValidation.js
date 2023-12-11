import validator from "validator";

/**
 * Validates input for creating a trip.
 *
 * @param {Object} input - The input object containing trip details.
 * @param {string} input.tripName - The name of the trip.
 * @param {string} input.startDate - The start date of the trip.
 * @param {string} input.endDate - The end date of the trip.
 * @param {string} input.leaderId - The ID of the trip leader.
 * @returns {Array} errors - An array containing error messages, empty if no errors.
 */
const validateTripCreateInput = ({
  tripName,
  startDate,
  endDate,
  leaderId,
}) => {
  const errors = [];

  // Check if tripName is provided and not empty
  if (!tripName || validator.isEmpty(tripName.trim())) {
    errors.push("Trip name is required.");
  }

  // Check if startDate is provided and in a valid date format
  if (!startDate || !validator.isDate(startDate, "YYYY/MM/DD")) {
    errors.push("Start date is required and must be a valid date.");
  }

  // Check if endDate is provided and in a valid date format
  if (!endDate || !validator.isDate(endDate, "YYYY/MM/DD")) {
    errors.push("End date is required and must be a valid date.");
  }

  // Check if leaderId is provided and not empty
  if (!leaderId || validator.isEmpty(leaderId.trim())) {
    errors.push("Leader ID is required.");
  }

  return errors;
};

const validateTripUpdateInput = ({
  tripName,
  startDate,
  endDate,
  leaderId,
}) => {
  const errors = [];

  // Check if tripName is provided and not empty
  if (tripName && validator.isEmpty(tripName.trim())) {
    errors.push("Trip name is required.");
  }

  // Check if startDate is provided and in a valid date format
  if (startDate && !validator.isDate(startDate, "YYYY/MM/DD")) {
    errors.push("Start date is required and must be a valid date.");
  }

  // Check if endDate is provided and in a valid date format
  if (endDate && !validator.isDate(endDate, "YYYY/MM/DD")) {
    errors.push("End date is required and must be a valid date.");
  }

  // Check if leaderId is provided and not empty
  if (leaderId && validator.isEmpty(leaderId.trim())) {
    errors.push("Leader ID is required.");
  }

  return errors;
};

export { validateTripCreateInput ,validateTripUpdateInput};
