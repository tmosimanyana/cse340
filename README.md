# CSE340 — Vehicle Inventory Web Application

A Node.js and Express coursework application for browsing a vehicle inventory and managing user accounts. The project uses server-rendered EJS views and PostgreSQL-backed data access.

> **Project status:** Coursework / development project. A local database and environment configuration are required. The repository has not yet been verified as a clean, reproducible deployment.

## Features represented in the code

- Express server with EJS templates and layouts
- Vehicle inventory listing and vehicle detail controllers
- PostgreSQL data-access modules
- Account login and logout flows
- Password hashing with bcrypt
- Account detail and password update handlers
- Request validation with express-validator
- Session-based access checks and JWT verification middleware
- Flash messages and centralized error handling

## Technology

- Node.js
- Express
- EJS and express-ejs-layouts
- PostgreSQL, pg-promise and pg
- bcrypt
- express-session and connect-pg-simple
- jsonwebtoken
- express-validator

## Requirements

- Node.js and npm
- PostgreSQL database
- Git

## Local setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/tmosimanyana/cse340.git
   cd cse340
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file by copying the example:

   ```bash
   cp .env.example .env
   ```

4. Create a PostgreSQL database and set its connection string in `.env`. The database schema and seed data must match the SQL queries used by the application.

5. Set a long, unique `SESSION_SECRET` value in your local `.env` file. Do not commit `.env` or share its contents.

6. Start the development server:

   ```bash
   npm run dev
   ```

The package scripts configure the application to listen on port 5500 by default. If a different port is required, set `PORT` in `.env`.

## Environment variables

See [`.env.example`](.env.example) for the variable names. Replace the placeholders locally; never put real credentials in this repository.

## Important maintenance notes

- The inventory model currently imports `../config/database`, while the account model imports `../database/index`. The former configuration file is empty in the current repository, so the inventory database path needs to be reconciled before the full application can be considered runnable.
- The project contains both `pg` and `pg-promise` dependencies and appears to use different database APIs in different models. These should be standardized and tested.
- The session store expects a working PostgreSQL connection.
- Review cookie settings, session secret handling, authorization checks, and CSRF protections before any production deployment.
- No automated test suite is currently defined in `package.json`.

## Scope and attribution

This repository is presented as a learning/coursework project. Features listed above are based on the code structure and should be verified locally before being described as fully working or production-ready.

---

Repository: https://github.com/tmosimanyana/cse340
