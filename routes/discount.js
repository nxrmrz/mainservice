/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const moment = require("moment");

/* ========================================= MODELS ========================================= */

// Discount Model
const Discount = require("../models/Discount");
// Profile Model
const UserProfile = require("../models/UserProfile");
// Print Order Model
const PrintOrder = require("../models/PrintOrder");

module.exports = (app, passport, conn) => {
  /* ================================ SET MONGODB CONNECTION ================================ */

  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });
  /* ====================================== DISCOUNTS ======================================= */

  // @route   POST /discounts
  // @desc    Get all Discounts
  // @access  Admin
  app.get("/discounts", adminRestrictedPages, (req, res) => {
    /* ------------------------ ACCESS DISCOUNT TO GET ALL DISCOUNTS ------------------------ */

    Discount.find({}, (err, docs) => {
      if (err) return res.send("error");

      if (!docs) return res.send("no discounts found");

      return res.send(docs);
    });
  });

  /* ===================================== ADD DISCOUNT ===================================== */

  // @route   POST /discount/create
  // @desc    Create a Discount
  // @access  Admin
  app.post("/discount/create", adminRestrictedPages, (req, res) => {
    /* ----------------------------- ASSIGN DISCOUNT ATTRIBUTES ----------------------------- */

    const name = req.body.name;
    const code = req.body.code;
    const rate = req.body.rate;
    const type = req.body.type;
    const minOrderValue = req.body.minOrderValue;
    const maxOrderValue = req.body.maxOrderValue;
    let startDate;
    let endDate;

    // Set Start Date
    if (req.body.startDate === "Invalid Date") {
      startDate = "";
    } else {
      startDate = req.body.startDate;
    }

    // Set End Date
    if (req.body.endDate === "Invalid Date") {
      endDate = "";
    } else {
      endDate = req.body.endDate;
    }

    /* ---------------------------- VALIDATE DISCOUNT ATTRIBUTES ---------------------------- */

    if (
      !discountAttributeValidator(
        name,
        code,
        rate,
        type,
        minOrderValue,
        maxOrderValue,
        startDate,
        endDate
      )
    ) {
      return res.send("failed");
    }

    /* ----------------------------------- SAVE DISCOUNT ------------------------------------ */

    // Create the Discount
    let newDiscount = new Discount();

    newDiscount.name = name;
    newDiscount.code = code;
    newDiscount.rate = rate;
    newDiscount.type = type;
    newDiscount.minOrderValue = minOrderValue;
    newDiscount.maxOrderValue = maxOrderValue;
    newDiscount.startDate = startDate;
    newDiscount.endDate = endDate;

    // Save to the Database
    newDiscount.save((err, discount) => {
      if (err) return res.send("failed");

      res.send("success");
    });
  });

  /* =================================== DELETE DISCOUNT ==================================== */

  // @route   POST /discount/delete
  // @desc    Delete a Discount
  // @access  Admin
  app.post("/discount/delete", adminRestrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.id);

    /* -------------------------------- FIND DISCOUNT BY ID --------------------------------- */

    Discount.findByIdAndDelete(id, (err, discount) => {
      if (err) return res.send("failed to fetch a discount");

      if (!discount) return res.send("no discount found");

      return res.send("success");
    });
  });

  /* ==================================== GET DISCOUNTS ===================================== */

  // @route   POST /discounts/order
  // @desc    Post Discounts
  // @access  Admin
  app.post("/discounts/order", restrictedPages, (req, res) => {
    let profileObject = {};
    let orderObjectArray = [];
    let discountObjectArray = [];

    UserProfile.find({ ownerId: req.user._id }, (err, profile) => {
      if (err) console.log("error found when fetching profile");

      if (!profile) console.log("no profile found");

      profileObject = profile;

      PrintOrder.find({ ownerId: req.user._id }, (err, orders) => {
        if (err) console.log("error found when fetching orders");

        if (!orders) console.log("no order found");

        orderObjectArray = orders;

        Discount.find({}, (err, discounts) => {
          if (err) console.log("error found when fetching discounts");

          if (!discounts) console.log("no discount found");

          discountObjectArray = discounts;

          getDiscounts(
            res,
            req.user,
            profileObject,
            orderObjectArray,
            discountObjectArray
          );
        });
      });
    });
  });
};

/* =================================== OBJECT CONSTRUCTOR =================================== */

/* ------------------------------------ DISCOUNT OBJECT ------------------------------------- */

class DiscountObject {
  constructor(
    name,
    code,
    rate,
    minOrderValue,
    maxOrderValue,
    startDate,
    endDate
  ) {
    this.name = name;
    this.code = code;
    this.rate = rate;
    this.minOrderValue = minOrderValue;
    this.maxOrderValue = maxOrderValue;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

/* ======================================== FUNCTION ======================================== */

/* -------------------------------------- GET DISCOUNT -------------------------------------- */

const getDiscountByDiscountCode = (discounts, discountCode) => {
  const rawDiscount = discounts.find(
    discount => discount.code === discountCode
  );

  discount = new DiscountObject(
    rawDiscount.name,
    rawDiscount.code,
    rawDiscount.rate,
    rawDiscount.minOrderValue,
    rawDiscount.maxOrderValue,
    rawDiscount.startDate,
    rawDiscount.endDate
  );

  return discount;
};

/* ------------------------------------- GET DISCOUNTS -------------------------------------- */

const getDiscounts = (res, user, profile, orders, discounts) => {
  let discountObjectArray = [];

  if (user.accountType === "normal") {
    discountObjectArray = [
      ...discountObjectArray,
      ...normalDiscount(discounts)
    ];
  } else if (user.accountType === "partner") {
    if (user.email === "") {
      discountObjectArray = [
        ...discountObjectArray,
        ...gettingLostDiscount(discounts, orders)
      ];
    } else {
      discountObjectArray = [
        ...discountObjectArray,
        ...partnerDiscount(discounts, orders)
      ];
    }
  } else if (user.accountType === "student") {
    discountObjectArray = [...discountObjectArray, ...studentDiscount()];
  }

  res.send(discountObjectArray);
};

/* --------------------------------- PERSONALISED DISCOUNTS --------------------------------- */

const gettingLostDiscount = (discounts, orders) => {
  let totalPartnerDiscountRate = 0;
  const discountObjectArray = [...partnerDiscount(discounts, orders)];
  const customDiscountObjectArray = [
    getDiscountByDiscountCode(discounts, "40%gettinglostdiscount")
  ];

  discountObjectArray.forEach(discountObject => {
    const rate = Number(discountObject.rate);

    totalPartnerDiscountRate = totalPartnerDiscountRate + rate;
  });

  if (totalPartnerDiscountRate <= 0.4) {
    return customDiscountObjectArray;
  } else if (totalPartnerDiscountRate > 0.4) {
    return discountObjectArray;
  }
};

/* ------------------------------------ NORMAL DISCOUNTS ------------------------------------ */

const normalDiscount = discounts => {
  let discountObjectArray = [];

  discountObjectArray.push(overHundredDollarDiscount(discounts));

  return discountObjectArray;
};

const overHundredDollarDiscount = discounts => {
  const discountCode = "20%over$100discount";

  return getDiscountByDiscountCode(discounts, discountCode);
};

/* ----------------------------------- STUDENT DISCOUNTS ------------------------------------ */

const studentDiscount = discounts => {
  let discountObjectArray = [];

  discountObjectArray.push(studentDefaultDiscount(discounts));

  return discountObjectArray;
};

const studentDefaultDiscount = discounts => {
  const discountCode = "20%studentdiscount";

  return getDiscountByDiscountCode(discounts, discountCode);
};

/* ----------------------------------- PARTNER DISCOUNTS ------------------------------------ */

const partnerDiscount = (discounts, orders) => {
  let discountObjectArray = [];

  // Default 15% Partner Discount
  discountObjectArray.push(partnerDefaultDiscount(discounts));

  // Monthly Partner Discount
  const previousMonthCumulativeOrderValue = partnerPreviousMonthCumulativeOrderValue(
    orders
  );

  if (previousMonthCumulativeOrderValue >= 2000) {
    discountObjectArray.push(
      partnerMonthlyDiscount(discounts, previousMonthCumulativeOrderValue)
    );
  }

  // Weekly Partner Discount
  const previousWeekCumulativeOrderValue = partnerPreviousWeekCumulativeOrderValue(
    orders
  );

  if (previousWeekCumulativeOrderValue >= 1000) {
    discountObjectArray.push(
      partnerWeeklyDiscount(discounts, previousWeekCumulativeOrderValue)
    );
  }

  return discountObjectArray;
};

// Default 15% Partner Discount
const partnerDefaultDiscount = () => {
  const discountCode = "15%partnerdiscount";

  return getDiscountByDiscountCode(discounts, discountCode);
};

// Monthly Partner Discount
const partnerMonthlyDiscount = (
  discounts,
  previousMonthCumulativeOrderValue
) => {
  let discountCode;

  if (
    previousMonthCumulativeOrderValue >= 2000 &&
    previousMonthCumulativeOrderValue < 3000
  ) {
    discountCode = "5%partnermonthlydiscount";
  } else if (
    previousMonthCumulativeOrderValue >= 3000 &&
    previousMonthCumulativeOrderValue < 4000
  ) {
    discountCode = "10%partnermonthlydiscount";
  } else if (
    previousMonthCumulativeOrderValue >= 4000 &&
    previousMonthCumulativeOrderValue < 5000
  ) {
    discountCode = "15%partnermonthlydiscount";
  } else if (previousMonthCumulativeOrderValue >= 5000) {
    discountCode = "20%partnermonthlydiscount";
  }

  return getDiscountByDiscountCode(discounts, discountCode);
};
// Calculate Previous Month's Cumulative Order Value
const partnerPreviousMonthCumulativeOrderValue = orders => {
  let previousMonthCumulativeOrderValue = 0;
  const startDateOfPreviousMonth = moment()
    .startOf("month")
    .subtract(1, "days")
    .startOf("month")._d;

  const endDateOfPreviousMonth = moment()
    .startOf("month")
    .subtract(1, "days")._d;

  for (i = 0; i < orders.length; i++) {
    if (orders[i].orderStatus != "Order Completed") {
      return;
    }

    if (
      !isDateWithinRange(
        orders[i].orderCompletionDate,
        startDateOfPreviousMonth,
        endDateOfPreviousMonth
      )
    ) {
      return;
    }

    previousMonthCumulativeOrderValue =
      previousMonthCumulativeOrderValue + Number(orders[i].price);
  }

  return previousMonthCumulativeOrderValue;
};

// Weekly Partner Discount
const partnerWeeklyDiscount = (discounts, previousWeekCumulativeOrderValue) => {
  let discountCode;

  if (
    previousWeekCumulativeOrderValue >= 1000 &&
    previousWeekCumulativeOrderValue < 2000
  ) {
    discountCode = "7.5%partnerweeklydiscount";
  } else if (previousWeekCumulativeOrderValue >= 2000) {
    discountCode = "15%partnerweeklydiscount";
  }

  return getDiscountByDiscountCode(discounts, discountCode);
};
// Calculate Previous Week's Cumulative Order Value
const partnerPreviousWeekCumulativeOrderValue = orders => {
  let previousWeekCumulativeOrderValue = 0;
  const startDateOfPreviousWeek = moment()
    .subtract(7, "days")
    .startOf("week")
    .add(1, "days")._d;

  const endDateOfPreviousWeek = moment().startOf("week")._d;

  for (i = 0; i < orders.length; i++) {
    if (orders[i].orderStatus != "Order Completed") {
      return;
    }

    if (
      !isDateWithinRange(
        orders[i].orderCompletionDate,
        startDateOfPreviousWeek,
        endDateOfPreviousWeek
      )
    ) {
      return;
    }

    previousWeekCumulativeOrderValue =
      previousWeekCumulativeOrderValue + Number(orders[i].price);
  }

  return previousWeekCumulativeOrderValue;
};

/* ----------------------------- CHECK IF DATE IS WITHIN RANGE ------------------------------ */

const isDateWithinRange = (date, startDate, endDate) => {
  const dateObject = dateFormatter(date);
  const momentDate = moment([
    Number(dateObject.year),
    Number(dateObject.month[1]),
    Number(dateObject.date)
  ]);
  const startDateObject = dateFormatter(startDate);
  const momentStartDate = moment([
    Number(startDateObject.year),
    Number(startDateObject.month[1]),
    Number(startDateObject.date)
  ]);
  const endDateObject = dateFormatter(endDate);
  const momentEndDate = moment([
    Number(endDateObject.year),
    Number(endDateObject.month[1]),
    Number(endDateObject.date)
  ]);

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

/* -------------------------------- EVENT/HOLIDAY DISCOUNTS --------------------------------- */

/* ------------------------------ DISCOUNT ATTRIBUTE VALIDATOR ------------------------------ */

const discountAttributeValidator = (
  name,
  code,
  rate,
  type,
  minOrderValue,
  maxOrderValue,
  startDate,
  endDate
) => {
  let invalid = 0;

  // Validate Discount Name
  if (!name) {
    invalid++;
  }

  // Validate Discount Code
  if (!code) {
    invalid++;
  }

  // Validate Discount Rate
  if (!rate) {
    invalid++;
  }

  // Validate Discount Type
  if (!type) {
    invalid++;
  }

  // Validate Discount Min Order Value
  if (!minOrderValue) {
    invalid++;
  }

  // Validate Discount Max Order Value
  if (!maxOrderValue) {
    invalid++;
  }

  // Return Validation Results
  if (invalid) {
    return false;
  } else {
    return true;
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

/* ======================================= MIDDLEWARE ======================================= */

/* ------------------------------------- GENERAL ACCESS ------------------------------------- */

const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};

/* -------------------------------------- ADMIN ACCESS -------------------------------------- */

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ========================================================================================== */
