require("dotenv").config();
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");

const errorHandler = require("./middleware/errorHandler");

// Routes
const inventoryRoutes = require("./routes/inventoryRoutes");
const reviewsRoute = require("./routes/reviewsRoute");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
// Serve static assets (CSS, images, client JS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session and Flash setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Set up EJS with layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

// Global variables available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.message = req.flash("message");
  res.locals.errors = req.flash("errors");
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────────────
// Root route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Modular route groups
app.use("/inventory", inventoryRoutes); // inventory-related CRUD
app.use("/reviews", reviewsRoute);      // review submission & display
app.use("/account", accountRoutes);     // login, logout, management

// ─── Error Handling ────────────────────────────────────────────────────────────
app.use(errorHandler); // centralized error handling for unhandled issues

// ─── Server Launch ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

