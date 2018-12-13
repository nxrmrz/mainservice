/* ===================================== INITIALISATION ===================================== */

const express = require("express");
const mongoose = require("mongoose");

const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const passport = require("passport");
const keys = require("./config/key/key");

const app = express();

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

/* ======================================= MIDDLEWARE ======================================= */

// Body Parser Middleware (Get Information from HTML Forms)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Other Express Applications
app.use(morgan("dev")); // Log Every Request to the Console
app.use(cookieParser()); // Read Cookies (for Authentication)

/* ================================= DATABASE CONFIGURATION ================================= */

// Database URI
const mongoURI = require("./config/database/database").mongoURI;

// Create Mongo Connection
const conn = mongoose.createConnection(mongoURI);

conn.once("open", () => {
  console.log("Connected to MongoDB");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      metadata: {}
    };
  }
});
const upload = multer({ storage });

/* ================================= PASSPORT CONFIGURATION ================================= */

require("./config/passport/passport")(passport); // pass passport for configuration

// Required for Passport
app.use(
  session({
    secret: keys.key, // Session Secret
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session()); // Persistent Logan Sessions

/* ======================================== ROUTING ========================================= */

require("./routes/general")(app, passport); // General
require("./routes/users")(app, passport); // Users
require("./routes/profile")(app, passport); // Profile
require("./routes/prints")(app, passport, upload, conn); // Prints
require("./routes/discount")(app, passport, conn); // Discount
require("./routes/file")(app, passport, upload, conn); // File

/* ========================================================================================== */
