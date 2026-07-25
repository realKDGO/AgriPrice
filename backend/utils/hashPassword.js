/**
 * utils/hashPassword.js
 *
 * bcrypt password hashing utilities.
 *
 * Centralises all password operations so that the hashing algorithm and work
 * factor can be changed in one place without touching business logic.
 *
 * The salt rounds value of 12 is a production-grade default that balances
 * security (resistance to brute force) with acceptable latency (~250 ms on
 * modern hardware).
 */

import bcrypt from 'bcrypt';

/** Number of bcrypt salt rounds (cost factor). Higher = slower & more secure. */
const SALT_ROUNDS = 12;

/**
 * Hashes a plain-text password using bcrypt.
 *
 * @param {string} plainText - The plain-text password to hash.
 * @returns {Promise<string>} The resulting bcrypt hash string.
 */
const hashPassword = async (plainText) => {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};

/**
 * Compares a plain-text password against a bcrypt hash.
 *
 * @param {string} plainText  - The plain-text password provided by the user.
 * @param {string} hashedPassword - The hash stored in the database.
 * @returns {Promise<boolean>} True if the password matches; false otherwise.
 */
const comparePassword = async (plainText, hashedPassword) => {
  return bcrypt.compare(plainText, hashedPassword);
};

export { hashPassword, comparePassword };
