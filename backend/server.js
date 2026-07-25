/**
 * server.js
 *
 * HTTP server entry point.
 *
 * Sole responsibility: import the configured Express app, bind it to a port,
 * and log a startup message. Keeping this separate from app.js means the app
 * can be imported in integration tests without starting a real server.
 */

import { env } from './config/env.js';
import app from './app.js';

const PORT = env.PORT;
const ENV  = env.NODE_ENV;

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║          🌾  AgriPrice API  — Online             ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  ▶  Server   : http://localhost:${PORT}`);
  console.log(`  ▶  Env      : ${ENV}`);
  console.log(`  ▶  Health   : http://localhost:${PORT}/api/v1/health`);
  console.log('');
});

