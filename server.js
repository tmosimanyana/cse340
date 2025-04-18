require("dotenv").config();
const express          = require("express");
const path             = require("path");
const expressLayouts   = require("express-ejs-layouts");
const errorHandler     = require("./middleware/errorHandler");
const inventoryRoutes  = require("./routes/inventoryRoutes");
const reviewsRoute     = require("./routes/reviewsRoute");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
// Serve static files (CSS, client JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Parse URL‑encoded bodies (forms) and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS layouts setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

// Make user object available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// ─── Routes ────────────────────────────────────────────────────────────────────
// Home page
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Inventory management at /inventory/*
app.use("/inventory", inventoryRoutes);

// Reviews feature at /reviews/*
app.use("/reviews", reviewsRoute);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Server Startup ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`App listening on ${HOST}:${PORT}`);
});
