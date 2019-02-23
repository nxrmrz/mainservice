/* ========================================= MODULES ========================================== */

const path = require("path");
const moment = require("moment");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ========================================== MODELS ========================================== */

const User = require("../models/User");
// Load User Profile Model
const UserProfile = require("../models/UserProfile");
// Load Print Order Model
const PrintOrder = require("../models/PrintOrder");

/* ========================================== EXPORT ========================================== */

module.exports = (app, passport, conn) => {
  /* ================================= SET MONGODB CONNECTION ================================= */

  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  // @route   GET /login-status
  // @desc    Get Login Status
  // @access  Public
  app.get("/users/login-status", (req, res) => {
    if (req.isAuthenticated()) {
      UserProfile.findOne({ ownerId: req.user._id }, (error, profile) => {
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Fetching Profile Details"
          });
        }
        return res.send({ status: "success", content: profile });
      });
    } else {
      return res.send({ status: "failed", content: "" });
    }
  });

  // @route   POST users/signup
  // @desc    User register
  // @access  Public
  app.post(
    "/users/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/", // redirect back to the homepage
      failureRedirect: "/registration" // redirect back to the homepage
    })
  );

  // @route   POST users/login
  // @desc    User login
  // @access  Public
  app.post(
    "/users/login",
    passport.authenticate("local-login", {
      successRedirect: "/", // redirect back to the homepage
      failureRedirect: "/registration" // redirect back to the homepage
    })
  );

  // @route   GET users/profile
  // @desc    Tests profile route
  // @access  Private
  app.get("/users/profile", restrictedPages, (req, res) => {
    res.json({ msg: "Profile Works" });
    console.log(req.isAuthenticated());
  });

  // @route   GET users/login
  // @desc    Receive failed login attempts
  // @access  Public
  app.get("/registration", (req, res) =>
    res.sendFile(path.join(__dirname, "../views/registration.html"))
  );

  // @route   POST users/logout
  // @desc    Logout user
  // @access  Public
  app.get("/users/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // @route   POST /validate/login
  // @desc    Validate Login Information
  // @access  Public
  app.post("/validate/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }, (error, user) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching User"
        });
      }

      if (!user) {
        return res.send({
          status: "failed",
          content: "404: No User Found"
        });
      }

      if (!user.validatePassword(password)) {
        return res.send({
          status: "failed",
          content: "Incorrect Password"
        });
      }

      return res.send({
        status: "success",
        content: "Valid"
      });
    });
  });

  // @route   POST /validate/username
  // @desc    Validate Login Information
  // @access  Public
  app.post("/validate/username", (req, res) => {
    const username = req.body.username;

    User.findOne({ username }, (error, user) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching User"
        });
      }

      if (!user) {
        return res.send({
          status: "failed",
          content: "404: No User Found"
        });
      }

      return res.send({
        status: "success",
        content: "Valid"
      });
    });
  });

  // @route   POST /validate/email
  // @desc    Validate Login Information
  // @access  Public
  app.post("/validate/email", (req, res) => {
    const email = req.body.email;

    User.findOne({ email }, (error, user) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching User"
        });
      }

      if (!user) {
        return res.send({
          status: "failed",
          content: "404: No User Found"
        });
      }

      return res.send({
        status: "success",
        content: "Valid"
      });
    });
  });

  // @route   POST /validate/password
  // @desc    Validate Login Information
  // @access  Public
  app.post("/validate/password", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }, (error, user) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching User"
        });
      }

      if (!user) {
        return res.send({
          status: "failed",
          content: "404: No User Found"
        });
      }

      if (!user.validatePassword(password)) {
        return res.send({
          status: "failed",
          content: "Incorrect Password"
        });
      }

      return res.send({
        status: "success",
        content: "Valid"
      });
    });
  });

  /* ===================================== ACCOUNT TYPE ===================================== */

  app.post("/account-type", restrictedPages, (req, res) => {
    res.send(req.user.accountType);
  });

  /* ================================= UPDATE ACCOUNT TYPE ================================== */

  app.post("/account-type/update/partner", restrictedPages, (req, res) => {
    const id = req.user._id;

    User.findById(id, (error, user) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching User"
        });
      }

      user.accountType = "partner";

      user.save((error, updatedUser) => {
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Saving New Updates of User"
          });
        }

        // If successfully saved
        return res.send({
          status: "success",
          content: updatedUser
        });
      });
    });
  });

  /* ================================= PARTNERSHIP: REQUEST ================================= */

  app.post("/partnership/request", (req, res) => {
    /* -------------------------------- CHECK AUTHENTICATION -------------------------------- */
    if (!req.isAuthenticated()) {
      // IF NOT AUTHENTICATED
      return res.send({
        status: "failed",
        content: "Not Authenticated"
      });
    }
    // CONTINUE IF AUTHENTICATED
    const user = req.user;
    /* ----------------------- CHECK IF USER IS AN ADMIN OR A PARTNER ----------------------- */
    if (user.accountType == "admin") {
      // IF USER IS AN ADMIN
      return res.send({
        status: "failed",
        content: "User is an Admin"
      });
    } else if (user.accountType == "partner") {
      // IF USER IS A PARTNER
      return res.send({
        status: "failed",
        content: "User is a Partner"
      });
    }
    // CONTINUE IF USER IS NEITHER AN ADMIN NOR A PARTNER
    /* ----------------------- CHECK IF USER IS VALID FOR PARTNERSHIP ----------------------- */
    PrintOrder.find(
      { ownerId: user._id, orderStatus: "Order Completed" },
      (error, orders) => {
        // CHECK IF AN ERROR OCCURED WHILE FETCHING ORDERS
        if (error) {
          return res.send({
            status: "failed",
            content: "Error when Fetching Orders"
          });
        }
        // CHECK IF NO ORDER WAS FOUND
        if (!orders || orders.length == 0) {
          return res.send({
            status: "failed",
            content: "No Order Found"
          });
        }
        // CONSTRACT START DATES AND END DATES
        let startDates = [];
        let endDates = [];
        startDates.unshift(moment().startOf("month")._d);
        endDates.unshift(moment()._d);
        for (let i = 1; i < 7; i++) {
          // START DATE
          startDates.unshift(
            moment()
              .subtract(i, "month")
              .startOf("month")._d
          );
          // END DATE
          endDates.unshift(
            moment()
              .subtract(i, "month")
              .endOf("month")._d
          );
        }
        // FILTER AND ORGANISE ORDERS
        let organisedOrders = [[], [], [], [], [], [], []];
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          const date = order.orderCompletionDate;
          for (let i = 0; i < 7; i++) {
            const startDate = startDates[i];
            const endDate = endDates[i];
            if (isDateWithinRange(date, startDate, endDate)) {
              organisedOrders[i].push(order);
              break;
            }
          }
        }
        gfs.files
          .find({
            "metadata.ownerId": user._id,
            "metadata.fileType": "Order New Print"
          })
          .toArray((error, files) => {
            // CHECK IF AN ERROR OCCURED WHILE FETCHING FILES
            if (error) {
              return res.send({
                status: "failed",
                content: "Error when Fetching Files"
              });
            }
            // CHECK IF NO FILE WAS FOUND
            if (!files || files.length == 0) {
              return res.send({
                status: "failed",
                content: "No File Found"
              });
            }
            // CUMULATIVE ORDER VALUES
            let cumulativeOrderValues = [];
            for (let i = 0; i < organisedOrders.length; i++) {
              const orders = organisedOrders[i];
              let cumulativeOrderValue = 0;
              for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                // Parts Price
                let partsPrice = 0;
                for (let i = 0; i < order.parts.length; i++) {
                  const part = order.parts[i];
                  const file = files.filter(file => file._id == part.fileId)[0];
                  partsPrice +=
                    Number(part.orderQuantity) * Number(file.metadata.price);
                }
                const pricing = order.pricing;
                // Pricing Price
                let pricingRate;
                if (pricing == "Basic") {
                  pricingRate = 0;
                } else if (pricing == "Priority") {
                  pricingRate = 0.3;
                } else if (pricing == "Urgent") {
                  pricingRate = 0.6;
                }
                const pricingPrice = partsPrice * pricingRate;
                const preDiscountedPrice = partsPrice + pricingPrice;
                // Discount Price
                const discounts = order.discounts;
                let discountPrice = 0;
                for (let i = 0; i < discounts.length; i++) {
                  const discount = discounts[i];
                  let discountableValue;
                  const minOrderValue = discount.minOrderValue;
                  const maxOrderValue = discount.maxOrderValue;
                  if (maxOrderValue > 0) {
                    if (
                      preDiscountedPrice > minOrderValue &&
                      preDiscountedPrice > maxOrderValue
                    ) {
                      discountableValue = maxOrderValue - minOrderValue;
                    } else if (preDiscountedPrice > minOrderValue) {
                      discountableValue = preDiscountedPrice - minOrderValue;
                    } else {
                      discountableValue = 0;
                    }
                  } else {
                    if (preDiscountedPrice > minOrderValue) {
                      discountableValue = preDiscountedPrice - minOrderValue;
                    } else {
                      discountableValue = 0;
                    }
                  }
                  discountPrice += discountableValue * discount.rate;
                }
                // Delivery Price
                const delivery = order.delivery;
                let deliveryPrice;
                if (delivery == "Pickup") {
                  deliveryPrice = 0;
                } else if (delivery == "Tracking") {
                  deliveryPrice = 5.5;
                } else if (delivery == "Courier") {
                  deliveryPrice = 7;
                }
                // Order Price
                const orderPrice =
                  partsPrice + pricingPrice - discountPrice + deliveryPrice;
                // Update Cumulative Order Value
                cumulativeOrderValue += orderPrice;
              }
              // Update Cumulative Order Values
              cumulativeOrderValues[i] = cumulativeOrderValue;
            }
            /* ---------------------------------- CONCLUDE ---------------------------------- */
            const currentMonthCumulativeOrderValue = cumulativeOrderValues[6];
            const previousMonthCumulativeOrderValue = cumulativeOrderValues[5];
            const averageCumulativeOrderValue =
              (cumulativeOrderValues[0] +
                cumulativeOrderValues[1] +
                cumulativeOrderValues[2] +
                cumulativeOrderValues[3] +
                cumulativeOrderValues[4] +
                cumulativeOrderValues[5]) /
              6;
            if (
              currentMonthCumulativeOrderValue > 1000 ||
              previousMonthCumulativeOrderValue > 1000 ||
              averageCumulativeOrderValue > 1000
            ) {
              // UPDATE ACCOUNT TYPE TO PARTNER
              User.findById(user._id, (error, user) => {
                if (error) {
                  return res.send({
                    status: "failed",
                    content: "Error Found when Fetching User"
                  });
                }

                user.accountType = "partner";

                user.save((error, updatedUser) => {
                  if (error) {
                    return res.send({
                      status: "failed",
                      content: "Error Found when Saving New Updates of User"
                    });
                  }

                  // If successfully saved
                  return res.send({
                    status: "success",
                    content: "Request Approved"
                  });
                });
              });
            } else {
              return res.send({
                status: "failed",
                content: "Request Denied"
              });
            }
          });
      }
    );
  });
};

/* ======================================= MIDDLEWARE ======================================= */

// Route middleware to make sure a user is logged in
const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};

/* ======================================== DATE OBJECT ========================================= */

const dateFormatter = defaultDate => {
  const defaultDateString = defaultDate + "";
  const dateArray = defaultDateString.split(" ");
  let day;
  let month = [];
  const date = dateArray[2];
  const year = dateArray[3];
  const timeArray = dateArray[4].split(":");
  let hour = [];
  const minute = timeArray[1];
  const second = timeArray[2];
  let period;

  switch (dateArray[0]) {
    case "Sun":
      day = "Sunday";
      break;
    case "Mon":
      day = "Monday";
      break;
    case "Tue":
      day = "Tuesday";
      break;
    case "Wed":
      day = "Wednesday";
      break;
    case "Thu":
      day = "Thursday";
      break;
    case "Fri":
      day = "Friday";
      break;
    case "Sat":
      day = "Saturday";
  }

  switch (dateArray[1]) {
    case "Jan":
      month[0] = "January";
      month[1] = "01";
      break;
    case "Feb":
      month[0] = "February";
      month[1] = "02";
      break;
    case "Mar":
      month[0] = "March";
      month[1] = "03";
      break;
    case "Apr":
      month[0] = "April";
      month[1] = "04";
      break;
    case "May":
      month[0] = "May";
      month[1] = "05";
      break;
    case "Jun":
      month[0] = "June";
      month[1] = "06";
      break;
    case "Jul":
      month[0] = "July";
      month[1] = "07";
      break;
    case "Aug":
      month[0] = "August";
      month[1] = "08";
      break;
    case "Sep":
      month[0] = "September";
      month[1] = "09";
      break;
    case "Oct":
      month[0] = "October";
      month[1] = "10";
      break;
    case "Nov":
      month[0] = "November";
      month[1] = "11";
      break;
    case "Dec":
      month[0] = "December";
      month[1] = "12";
  }

  if (timeArray[0] >= "12") {
    if (timeArray[0] == "12") {
      hour[0] = timeArray[0];
    } else {
      hour[0] = Number(timeArray[0]) - 12 + "";
    }
    period = "PM";
  } else {
    hour[0] = timeArray[0];
    period = "AM";
  }

  hour[1] = timeArray[0];

  const dateObject = {
    day: day,
    month: month,
    date: date,
    year: year,
    hour: hour,
    minute: minute,
    second: second,
    period: period,
    fromNow: moment(
      year +
        "-" +
        month[1] +
        "-" +
        date +
        " " +
        timeArray[0] +
        ":" +
        minute +
        ":" +
        second
    ).fromNow()
  };

  return dateObject;
};

/* ==================================== IS DATE WITHIN RANGE ==================================== */

const isDateWithinRange = (date, startDate, endDate) => {
  const dateObject = dateFormatter(date);
  const momentDate = moment(
    String(dateObject.year) +
      String(dateObject.month[1]) +
      String(dateObject.date)
  );
  const startDateObject = dateFormatter(startDate);
  const momentStartDate = moment(
    String(startDateObject.year) +
      String(startDateObject.month[1]) +
      String(startDateObject.date)
  );
  const endDateObject = dateFormatter(endDate);
  const momentEndDate = moment(
    String(endDateObject.year) +
      String(endDateObject.month[1]) +
      String(endDateObject.date)
  );

  // Positive means date is over the start date
  const startDateDifference = momentDate.diff(momentStartDate, "days");
  // Positive means date is under the end date
  const endDateDifference = momentEndDate.diff(momentDate, "days");
  if (startDateDifference >= 0 && endDateDifference >= 0) {
    return true;
  } else {
    return false;
  }
};
