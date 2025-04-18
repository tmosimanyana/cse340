const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const inventoryRoutes = require("./routes/inventoryRoutes");
const expressLayouts = require("express-ejs-layouts");
const errorHandler = require('./middleware/errorHandler');

// Middleware setup
app.use(express.urlencoded({ extended: true })); // For form data handling
app.use(express.json()); // For handling JSON data
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

// Routes
app.use("/", inventoryRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5500;
const host = process.env.HOST || "localhost";
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
