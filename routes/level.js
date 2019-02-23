/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");

/* ========================================= MODELS ========================================= */

/* ----------------------------------------- LEVEL ------------------------------------------ */

const Level = require("../models/Level");

/* ========================================= EXPORT ========================================= */

module.exports = (app, passport) => {
  /* =================================== ADD A NEW LEVEL ==================================== */

  // @route   POST /level/add-new-level
  // @desc    Add a New Level
  // @access  Admin
  app.post("/level/add-new-level", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */

    const levelObject = req.body.levelObject;

    /* ------------- SAVING TO DATABASE AND SENDING THE SAVED DATA TO FRONT-END ------------- */

    Level.saveLevelObject(res, levelObject);
  });

  /* ============================== GET ALL LEVEL OBJECT ARRAY ============================== */

  // @route   POST /level/get-level-object-array
  // @desc    Get an array of order details
  // @access  Private
  app.post("/level/get-level-object-array", restrictedPages, (req, res) => {
    /* ------------------------------- SETTING MONGOOSE QUERY ------------------------------- */

    const query = {};

    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */

    Level.getLevelObjectArray(res, query);
  });
};

/* ======================================= MIDDLEWARE ======================================= */

/* ---------------------------------- USER AUTHENTICATION ----------------------------------- */

const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    loginStatus = true;
    return next();
  } else {
    loginStatus = false;
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ========================================================================================== */
