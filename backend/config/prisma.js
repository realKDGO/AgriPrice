/**
 * config/prisma.js
 *
 * Singleton PrismaClient instance.
 *
 * Instantiating PrismaClient inside every module that needs it would create
 * multiple database connection pools and exhaust the Supabase connection limit
 * quickly. By exporting a single shared instance from this module, the Node.js
 * module cache guarantees that only one PrismaClient is ever created per
 * process — even if this file is imported from many places.
 */

import { env } from './env.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});

export default prisma;
