/**
 * config/env.js
 *
 * Environment variable loader and validator.
 *
 * This module ensures the application fails fast if critical configuration
 * is missing or malformed. It checks all required environment variables on startup
 * and exports a validated configuration object. If validation fails, it outputs
 * clear, actionable errors and exits the process to prevent starting the server
 * or database client with invalid configurations.
 */

import 'dotenv/config';

/**
 * Validates required environment variables and returns a clean configuration object.
 * Throws a descriptive error containing all failed validations if any checks fail.
 *
 * @returns {{ PORT: number, DATABASE_URL: string, DIRECT_URL: string, JWT_SECRET: string, NODE_ENV: string }}
 * @throws {Error}
 */
export const validateEnv = () => {
  const errors = [];

  // 1. NODE_ENV validation
  let nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv) {
    nodeEnv = 'development';
  } else {
    nodeEnv = nodeEnv.trim();
    if (!['development', 'production', 'test'].includes(nodeEnv)) {
      errors.push(`Invalid NODE_ENV: "${nodeEnv}". Allowed values are development, production, test.`);
    }
  }

  // 2. PORT validation
  const portStr = process.env.PORT;
  let port;
  if (portStr === undefined || portStr === null || portStr.toString().trim() === '') {
    errors.push('Missing environment variable: PORT');
  } else {
    port = Number(portStr);
    if (isNaN(port) || !Number.isInteger(port) || port <= 0) {
      errors.push('Invalid PORT. Expected a numeric value.');
    }
  }

  // 3. DATABASE_URL validation
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim() === '') {
    errors.push('Missing environment variable: DATABASE_URL');
  }

  // 4. DIRECT_URL validation
  const directUrl = process.env.DIRECT_URL;
  if (!directUrl || directUrl.trim() === '') {
    errors.push('Missing environment variable: DIRECT_URL');
  }

  // 5. JWT_SECRET validation
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.trim() === '') {
    errors.push('Missing environment variable: JWT_SECRET');
  } else if (jwtSecret.length < 32) {
    errors.push('Invalid JWT_SECRET. Expected at least 32 characters long.');
  }

  if (errors.length > 0) {
    const errorMsg = errors.map(msg => `❌ ${msg}`).join('\n');
    throw new Error(errorMsg);
  }

  return {
    PORT: port,
    DATABASE_URL: dbUrl,
    DIRECT_URL: directUrl,
    JWT_SECRET: jwtSecret,
    NODE_ENV: nodeEnv,
  };
};

let validatedEnv;
try {
  validatedEnv = validateEnv();
} catch (error) {
  console.error('\n=========================================');
  console.error('⚙️  ENVIRONMENT VALIDATION ERROR');
  console.error('=========================================');
  console.error(error.message);
  console.error('=========================================\n');
  process.exit(1);
}

export const env = validatedEnv;
