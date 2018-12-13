const path = require("path");

module.exports = (app, passport) => {
  // @route   GET /
  // @desc    Route User to the Homepage Page
  // @access  Public
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/homepage.html"));
  });

  // @route   GET /about
  // @desc    Route User to the About Page
  // @access  Public
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/about.html"));
  });

  // @route   GET /about/team
  // @desc    Route User to the About: Team Page
  // @access  Public
  app.get("/about/team", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/aboutTeam.html"));
  });

  // @route   GET /about/partners
  // @desc    Route User to the About: Partners Page
  // @access  Public
  app.get("/about/partners", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/aboutPartners.html"));
  });

  // @route   GET /partnership
  // @desc    Route User to the Partnership Page
  // @access  Public
  app.get("/partnership", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/partnership.html"));
  });

  // @route   GET /partnership/discounts
  // @desc    Route User to the Partnership Page
  // @access  Public
  app.get("/partnership/discounts", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/partnershipDiscounts.html"));
  });

  // @route   GET /partnership/become-a-partner
  // @desc    Route User to the Partnership Page
  // @access  Public
  app.get("/partnership/become-a-partner", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../views/partnershipBecomeAPartner.html")
    );
  });

  // @route   GET /services
  // @desc    Route User to the Services Page
  // @access  Public
  app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/services.html"));
  });

  // @route   GET /services
  // @desc    Route User to the Services Page
  // @access  Public
  app.get("/services/3d-printing", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/services3dPrinting.html"));
  });

  // @route   GET /services
  // @desc    Route User to the Services Page
  // @access  Public
  app.get("/services/3d-modelling", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/services3dModelling.html"));
  });

  // @route   GET /services
  // @desc    Route User to the Services Page
  // @access  Public
  app.get("/services/marketplace", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/servicesMarketplace.html"));
  });

  // @route   GET /pricing
  // @desc    Route User to the Pricing Page
  // @access  Public
  app.get("/pricing", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/pricing.html"));
  });

  // @route   GET /pricing/3d-modelling
  // @desc    Route User to the Pricing Page
  // @access  Public
  app.get("/pricing/3d-modelling", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/pricing3DModelling.html"));
  });

  // @route   GET /pricing/marketplace
  // @desc    Route User to the Pricing Page
  // @access  Public
  app.get("/pricing/marketplace", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/pricingMarketplace.html"));
  });
};

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
