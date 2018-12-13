const path = require("path");

// Load User Profile Model
const UserProfile = require("../models/UserProfile");

module.exports = (app, passport) => {
  // @route   GET /Profile
  // @desc    Get Profile HTML
  // @access  Private
  app.get("/Profile", restrictedPages, (req, res) => {
    if (req.user.accountType == "admin") {
      res.sendFile(path.join(__dirname, "../views/adminProfile.html"));
    } else if (req.user.accountType == "normal") {
      res.sendFile(path.join(__dirname, "../views/profile.html"));
    }
  });

  // @route   GET /profile
  // @desc    Get Profile Details
  // @access  Private
  app.get("/Profile/profile-details", restrictedPages, (req, res) => {
    UserProfile.findOne({ ownerId: req.user._id }, (err, profile) => {
      res.send(profile);
    });
  });

  // @route   POST /profile/save
  // @desc    Save Profile Changes
  // @access  Private
  app.post("/Profile/save-profile-details", restrictedPages, (req, res) => {
    UserProfile.findOne({ ownerId: req.user._id }).then(profile => {
      // Update Profile Values
      for (component in req.body) {
        if (component == "shippingAddress") {
          for (component in req.body.shippingAddress) {
            profile.shippingAddress[component] =
              req.body.shippingAddress[component];
          }
        } else {
          profile[component] = req.body[component];
        }
      }
      profile.save((err, profile) => {
        if (err) throw err;

        console.log(profile);

        res.send("success");
      });
    });
  });

  /* =================================== GET PROFILE DETAILS ==================================== */

  // @route   POST /profile/profile-details
  // @desc    Get Profile Details
  // @access  Private
  app.post("/profile/profile-details", restrictedPages, (req, res) => {
    /* -------------------------- ASSIGNING AND SIMPLIFYING VARIABLES --------------------------- */
    let _id;
    /* ---------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE ----------------------- */
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      _id = mongoose.Types.ObjectId(req.body._id);
    } else {
      // USER ACCESS
      _id = mongoose.Types.ObjectId(req.user._id);
    }
    const query = { _id };
    /* ------------------------- ACCESS DATABASE AND SEND TO FRONT-END -------------------------- */
    getProfileDetails(res, query);
  });
};

/* ========================================== FUNCTION ========================================== */

/* ------------------------------- GET PROFILE DETAILS (FIND ONE) ------------------------------- */

const getProfileDetails = (res, query, filter) => {
  UserProfile.findOne(query, (error, profileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        error: "500: Error Found when Fetching Profile Details"
      });
    }

    if (!profileDetails) {
      return res.send({
        status: "failed",
        error: "404: No Profile Found"
      });
    }

    if (filter) {
      const filteredProfileDetails = filter(profileDetails);
      return res.send({
        status: "success",
        profileDetails: filteredProfileDetails
      });
    }

    return res.send({
      status: "success",
      profileDetails
    });
  });
};

/* ========================================= MIDDLEWARE ========================================= */

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

/* ============================================================================================== */
