/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoutes") // ✅ Import inventory routes
const expressLayouts = require("express-ejs-layouts")
const errorHandler = require('./middleware/errorHandler') // Import error handler middleware

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Static Routes
 *************************/
app.use(static)

/* ***********************
 * Inventory Routes
 *************************/
app.use("/", inventoryRoutes) // ✅ Mount inventory routes

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Error middleware
 *************************/
// Error handler middleware should be placed after routes
app.use(errorHandler) // Error handler middleware placed before app.listen()

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})
