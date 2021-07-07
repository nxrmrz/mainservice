/* ======================== POPULATE DATE, MONTH AND YEAR SELECT FIELDS ========================= */

const populateDateMonthYearSelectFields = (dateId, monthId, yearId) => {
  const date = document.getElementById(dateId);
  const month = document.getElementById(monthId);
  const year = document.getElementById(yearId);

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

/* =================================== DATE DIFFERENCE OBJECT =================================== */

const momentDateDifference = (dateOne, dateTwo) => {
  const totalRemainingSeconds = dateTwo.diff(dateOne, "seconds");
  const remainingDays = Math.floor(totalRemainingSeconds / (24 * 60 * 60));
  const remainingHours = Math.floor(
    (totalRemainingSeconds % (24 * 60 * 60)) / (60 * 60)
  );
  const remainingMinutes = Math.floor(
    ((totalRemainingSeconds % (24 * 60 * 60)) % (60 * 60)) / 60
  );
  const remainingSeconds =
    ((totalRemainingSeconds % (24 * 60 * 60)) % (60 * 60)) % 60;

  return {
    days: remainingDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds
  };
};

/* ================================ POPULATE DATE SELECT INPUTS ================================= */

const populateDateSelectInputs = (
  dateId,
  monthId,
  yearId,
  minusYear,
  plusYear
) => {
  const currentDate = dateFormatter(new Date());

  const dateElement = document.getElementById(dateId);
  const monthElement = document.getElementById(monthId);
  const yearElement = document.getElementById(yearId);

  let dateArray = [];
  const monthArray = [
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
  let yearArray = [];

  for (i = 0; i < 31; i++) {
    dateArray[i] = i + 1;
  }

  for (
    i = Number(currentDate.year) - minusYear;
    i <= Number(currentDate.year) + plusYear;
    i++
  ) {
    yearArray[i] = i;
  }

  dateArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    dateElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  monthArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    monthElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  yearArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    yearElement.insertAdjacentHTML("beforeend", optionHTML);
  });
};

/* ================================ POPULATE TIME SELECT INPUTS ================================= */

const populateTimeSelectInputs = (
  hourId,
  minuteId,
  periodId,
  minuteIncrement
) => {
  const hourElement = document.getElementById(hourId);
  const minuteElement = document.getElementById(minuteId);
  const periodElement = document.getElementById(periodId);

  let hourArray = [];
  let minuteArray = [];
  const periodArray = ["AM", "PM"];

  for (i = 0; i < 12; i++) {
    hourArray[i] = i + 1;
  }

  for (i = 0; i < 60 / minuteIncrement; i++) {
    minuteArray[i] = i * minuteIncrement;
  }

  hourArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    hourElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  minuteArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    minuteElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  periodArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    periodElement.insertAdjacentHTML("beforeend", optionHTML);
  });
};

/* ============================================================================================== */
