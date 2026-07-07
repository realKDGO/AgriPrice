'use strict';

/**
 * response.js — Standardized API response helpers.
 *
 * Using these functions ensures every API response has
 * a consistent shape, making frontend consumption easier.
 *
 * Success shape:  { success: true,  data: ..., message: "..." }
 * Error shape:    { success: false, message: "...", errors: [...] }
 */

/**
 * Send a 200 OK success response.
 * @param {import('express').Response} res
 * @param {*} data - The payload to return
 * @param {string} [message]
 * @param {number} [statusCode=200]
 */
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {string} [message]
 * @param {number} [statusCode=400]
 * @param {Array} [errors=[]]
 */
const sendError = (res, message = 'An error occurred', statusCode = 400, errors = []) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
  });
};

module.exports = { sendSuccess, sendError };
