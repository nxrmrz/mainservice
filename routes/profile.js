/* ========================================= MODULES ========================================== */

const mongoose = require("mongoose");
const path = require("path");

/* ========================================== MODELS ========================================== */

// Load User Profile Model
const UserProfile = require("../models/UserProfile");

module.exports = (app, passport) => {
  // @route   GET /profile
  // @desc    Get Profile HTML
  // @access  Private
  app.get("/profile", restrictedPages, (req, res) => {
    if (req.user.accountType == "admin") {
      res.sendFile(path.join(__dirname, "../views/adminProfile.html"));
    } else if (
      req.user.accountType == "normal" ||
      req.user.accountType == "partner"
    ) {
      res.sendFile(path.join(__dirname, "../views/profile.html"));
    }
  });

  /* ================================= SAVE PROFILE DETAILS ================================= */

  // @route   POST /profile/update
  // @desc    Save Profile Changes
  // @access  Private
  app.post("/profile/update", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const ownerId = req.user._id;
    const profile = req.body.profile;
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { ownerId };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = profile;
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    UserProfile.updateProfileDetails(res, query, updateMethod, updateObject);
  });

  /* ================================= GET PROFILE DETAILS ================================== */

  // @route   POST /profile/profile-details
  // @desc    Get Profile Details
  // @access  Private
  app.post("/profile/profile-details", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    let ownerId;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      ownerId = mongoose.Types.ObjectId(req.body.ownerId);
    } else {
      // USER ACCESS
      ownerId = mongoose.Types.ObjectId(req.user._id);
    }
    const query = { ownerId };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    UserProfile.getProfileDetails(res, query);
  });
};

/* ======================================= MIDDLEWARE ======================================= */

// Route middleware to make sure a user is logged in
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

/* ========================================================================================== */
