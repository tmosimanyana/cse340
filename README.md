# CSE340 — Vehicle Inventory Web Application

A Node.js and Express coursework application using EJS templates and PostgreSQL-backed data access. The repository contains vehicle inventory, account-management, and review-related code.

> **Status:** Development/coursework project. The repository has not yet been run successfully against a configured PostgreSQL database. Treat the listed features as implemented code paths, not as verified production functionality.

## Technology

- Node.js and Express
- EJS and express-ejs-layouts
- PostgreSQL with pg-promise (and the pg package)
- bcrypt, express-session, connect-pg-simple
- jsonwebtoken, express-validator, connect-flash

## Current code areas

- Inventory listing and vehicle detail controllers
- Account login, account updates, and password updates
- Session-based login checks and JWT-related middleware
- Vehicle review controller and route (review model is not implemented yet)
- Shared PostgreSQL connection module at `database/index.js`
- Centralized error handling

## Local setup

1. Install a supported Node.js version and PostgreSQL.
2. Clone the repository:

   ```bash
   git clone https://github.com/tmosimanyana/cse340.git
   cd cse340
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

5. Set `DATABASE_URL` to a PostgreSQL connection string and set a long, unique `SESSION_SECRET` in `.env`.
6. Create the database tables and seed data required by the SQL queries. The repository currently does not include a verified schema or seed script.
7. Start the server:

   ```bash
   npm run dev
   ```

The default port is 5500. Set `PORT` in `.env` to override it.

## Environment variables

See [`.env.example`](.env.example). Keep real credentials in your local `.env` file only; do not commit secrets.

## Known limitations and work in progress

- The inventory model now uses the shared `database/index.js` pg-promise connection rather than the empty `config/database.js` module.
- Vehicle column names and the shape of vehicle records still need to be reconciled across the model, controller, and EJS templates.
- The review model is empty. Review submissions and review display are not yet a complete working feature, and the database schema is unknown.
- Some inventory management links/forms do not currently match the routes registered in `routes/inventoryRoutes.js`.
- The home template is currently a simple heading rather than a vehicle listing.
- The header links to account registration, but no registration route is currently defined.
- The app has not been tested against a real PostgreSQL database. No automated test suite is defined in `package.json`.
- Review authentication, authorization, session-cookie settings, CSRF protection, and error handling before any production deployment.

## Project scope

This is a learning/coursework project. Verify functionality locally before presenting individual features as fully working or production-ready.

Repository: https://github.com/tmosimanyana/cse340