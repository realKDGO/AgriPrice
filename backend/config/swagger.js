/**
 * config/swagger.js
 *
 * Isolated Swagger / OpenAPI 3.0 configuration.
 *
 * swagger-jsdoc reads @swagger JSDoc annotations from the route files
 * listed in `apis` and merges them with the base definition below.
 *
 * swaggerUiOptions customises the Swagger UI appearance and behaviour.
 *
 * To document a new module (Crops, Forecasting, Reports, etc.):
 *   1. Add JSDoc @swagger comments to the new route file.
 *   2. Add the route file path to the `apis` array below.
 *   No other changes to this file are needed.
 */

import swaggerJsdoc from 'swagger-jsdoc';

// ─── OpenAPI Base Definition ──────────────────────────────────────────────────

const swaggerDefinition = {
  openapi: '3.0.0',

  info: {
    title: 'AgriPrice API',
    version: '1.0.0',
    description:
      'Crop Price Forecasting and Market Decision Support System API.\n\n' +
      '## Authentication\n' +
      'Protected endpoints require a **Bearer JWT** token.\n' +
      'Login via `POST /auth/login`, copy the `token` from the response,\n' +
      'and click **Authorize** at the top of this page to paste it.',
    contact: {
      name: 'AgriPrice Team',
    },
  },

  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local Development Server',
    },
  ],

  // ── JWT Bearer Security Scheme ──────────────────────────────────────────────
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste the JWT token obtained from POST /auth/login.',
      },
    },

    // ── Reusable Schemas ──────────────────────────────────────────────────────
    schemas: {
      // ── Request Bodies ──────────────────────────────────────────────────────

      RegisterRequest: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password', 'municipalityId'],
        properties: {
          firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            example: 'Juan',
          },
          lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            example: 'Dela Cruz',
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 255,
            example: 'juan@example.com',
          },
          password: {
            type: 'string',
            minLength: 8,
            maxLength: 100,
            example: 'securepass123',
          },
          municipalityId: {
            type: 'integer',
            minimum: 1,
            example: 3,
            description: 'ID of a municipality from the Municipality table (1–14 for Rizal Province).',
          },
        },
      },

      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'juan@example.com',
          },
          password: {
            type: 'string',
            example: 'securepass123',
          },
        },
      },

      // ── Response Models ─────────────────────────────────────────────────────

      Municipality: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 3 },
          name: { type: 'string', example: 'Baras' },
        },
      },

      User: {
        type: 'object',
        properties: {
          id:           { type: 'string', format: 'uuid', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
          firstName:    { type: 'string', example: 'Juan' },
          lastName:     { type: 'string', example: 'Dela Cruz' },
          email:        { type: 'string', format: 'email', example: 'juan@example.com' },
          role:         { type: 'string', enum: ['FARMER', 'ADMIN'], example: 'FARMER' },
          createdAt:    { type: 'string', format: 'date-time', example: '2026-07-21T10:00:00.000Z' },
          municipality: { $ref: '#/components/schemas/Municipality' },
        },
      },

      AuthenticationResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Login successful.' },
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              },
              user: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },

      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'An error occurred.' },
        },
      },

      ValidationErrorItem: {
        type: 'object',
        properties: {
          field:   { type: 'string', example: 'email' },
          message: { type: 'string', example: 'Invalid email address.' },
        },
      },

      ValidationError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Validation failed.' },
          errors: {
            type: 'array',
            items: { $ref: '#/components/schemas/ValidationErrorItem' },
          },
        },
      },
    },
  },
};

// ─── swagger-jsdoc Options ────────────────────────────────────────────────────

const swaggerOptions = {
  swaggerDefinition,
  apis: [
    './routes/v1/index.js',
    './routes/v1/authRoutes.js',
    './routes/v1/adminRoutes.js',
    './routes/v1/farmerRoutes.js',
    './routes/v1/commonRoutes.js',
  ],
};

// Generate the OpenAPI specification object
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ─── Swagger UI Options ───────────────────────────────────────────────────────

const swaggerUiOptions = {
  customSiteTitle: 'AgriPrice API Docs',
  customCss: `
    .topbar { background-color: #2e7d32; }
    .topbar-wrapper img { content: url(''); }
    .topbar-wrapper::after {
      content: '🌾 AgriPrice API';
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      padding-left: 1rem;
    }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true,
  },
};

export { swaggerSpec, swaggerUiOptions };
