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

// Global user setup (for now, we assume there's no authentication system)
// You can modify this to work with your authentication system (e.g., Passport.js)
app.use((req, res, next) => {
  res.locals.user = req.user || null;  // If user is authenticated, this will hold the user object, otherwise null
  next();
});

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
