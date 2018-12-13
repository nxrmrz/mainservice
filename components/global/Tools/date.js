/* ======================== POPULATE DATE, MONTH AND YEAR SELECT FIELDS ========================= */

const populateDateMonthYearSelectFields = (dateId, monthId, yearId) => {
  const date = document.getElementById(dateId);
  const month = document.getElementById(monthId);
  const year = document.getElementById(yearId);
  date.insertAdjacentHTML(
    "beforeend",
    '<option id="day_empty" value="empty"></option>'
  );
  month.insertAdjacentHTML(
    "beforeend",
    '<option id="month_empty" value="empty"></option>'
  );
  year.insertAdjacentHTML(
    "beforeend",
    '<option id="year_empty" value="empty"></option>'
  );
  for (let i = 1; i <= 31; i++) {
    dayOptionHTML =
      '<option id="day_' + i + '" value="' + i + '">' + i + "</option>";
    date.insertAdjacentHTML("beforeend", dayOptionHTML);
  }
  monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  for (let i = 0; i < monthArray.length; i++) {
    monthOptionHTML =
      '<option id="month_' +
      monthArray[i] +
      '" value="' +
      monthArray[i] +
      '">' +
      monthArray[i] +
      "</option>";
    month.insertAdjacentHTML("beforeend", monthOptionHTML);
  }
  for (let i = 2000; i <= 2050; i++) {
    yearOptionHTML =
      '<option id="year_' + i + '" value="' + i + '">' + i + "</option>";
    year.insertAdjacentHTML("beforeend", yearOptionHTML);
  }
};

/* ====================================== MONTH CONVERTION ====================================== */

const monthNameToNumberConversion = monthName => {
  monthName = monthName.toLowerCase();

  let monthNumber;

  switch (monthName) {
    case "january":
      monthNumber = 1;
      break;
    case "february":
      monthNumber = 2;
      break;
    case "march":
      monthNumber = 3;
      break;
    case "april":
      monthNumber = 4;
      break;
    case "may":
      monthNumber = 5;
      break;
    case "june":
      monthNumber = 6;
      break;
    case "july":
      monthNumber = 7;
      break;
    case "august":
      monthNumber = 8;
      break;
    case "september":
      monthNumber = 9;
      break;
    case "october":
      monthNumber = 10;
      break;
    case "november":
      monthNumber = 11;
      break;
    case "december":
      monthNumber = 12;
  }

  return monthNumber;
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

/* ================================= DAY DATE MONTH YEAR FORMAT ================================= */

const dayDateMonthYearFormat = defaultDate => {
  const dateObject = dateFormatter(defaultDate);
  const day = dateObject.day.slice(0, 3);
  const date = dateObject.date;
  const month = dateObject.month[0].slice(0, 3);
  const year = dateObject.year;
  const dayDateMonthYearString = day + ", " + date + " " + month + " " + year;

  return dayDateMonthYearString;
};

/* ==================================== IS DATE WITHIN RANGE ==================================== */

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

/* ============================= GET LAST MONTH START AND END DATES ============================= */

const getLastMonthStartAndEndDates = promise => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      const startDateOfPreviousMonth = moment()
        .startOf("month")
        .subtract(1, "days")
        .startOf("month")._d;

      const endDateOfPreviousMonth = moment()
        .startOf("month")
        .subtract(1, "days")._d;

      resolve({
        startDate: startDateOfPreviousMonth,
        endDate: endDateOfPreviousMonth
      });
    });
  } else {
    const startDateOfPreviousMonth = moment()
      .startOf("month")
      .subtract(1, "days")
      .startOf("month")._d;

    const endDateOfPreviousMonth = moment()
      .startOf("month")
      .subtract(1, "days")._d;

    return {
      startDate: startDateOfPreviousMonth,
      endDate: endDateOfPreviousMonth
    };
  }
};

/* ============================================================================================== */
