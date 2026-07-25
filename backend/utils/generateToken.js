/**
 * utils/generateToken.js
 *
 * JWT generation utility.
 *
 * Creates a signed JSON Web Token containing the minimum payload needed to
 * identify and authorise the authenticated user on subsequent requests.
 * The secret is read from JWT_SECRET in the .env file; never hard-code it.
 */

import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT for the given user.
 *
 * @param {{ id: string, email: string, role: string }} user - The user object.
 * @returns {string} A signed JWT string valid for 7 days.
 */
const generateToken = ({ id, email, role }) => {
  const payload = { id, email, role };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
