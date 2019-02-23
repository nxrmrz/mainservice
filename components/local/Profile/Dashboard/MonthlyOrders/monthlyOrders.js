/* ======================================= INITIALISATION ======================================= */

const profileDashboardMonthlyOrdersInit = () => {
  profileDashboardMonthlyOrdersStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileDashboardMonthlyOrdersStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_dashboard_monthly_orders_graph'>" +
    "<div id='profile_dashboard_monthly_orders_graph_heading_body'>" +
    "<div id='profile_dashboard_monthly_orders_graph_heading'>Monthly Orders</div>" +
    "</div>" +
    "<div id='profile_dashboard_monthly_orders_graph_type_body'></div>" +
    "<div id='profile_dashboard_monthly_orders_graph_filter_body'></div>" +
    "<div id='profile_dashboard_monthly_orders_bar_graph_body'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_dashboard_monthly_orders_body"
  ).innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // GRAPH FILTER
  profileDashboardMonthlyOrdersFilter();
  // GRAPH TYPE
  profileDashboardMonthlyOrdersType();
};

/* ============================================ TYPE ============================================ */

const profileDashboardMonthlyOrdersType = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    `<div class='profile_dashboard_monthly_orders_graph_type'>` +
    `<input type='radio' id='profile_dashboard_monthly_orders_graph_type_value' class='profile_dashboard_monthly_orders_graph_type_input' value='value' onchange='profileDashboardMonthlyOrdersTypeSelect("value");' />` +
    `<div class='profile_dashboard_monthly_orders_graph_type_label'>Value</div>` +
    `</div>` +
    `<div class='profile_dashboard_monthly_orders_graph_type'>` +
    `<input type='radio' id='profile_dashboard_monthly_orders_graph_type_quantity' class='profile_dashboard_monthly_orders_graph_type_input' value='quantity' onchange='profileDashboardMonthlyOrdersTypeSelect("quantity");' />` +
    `<div class='profile_dashboard_monthly_orders_graph_type_label'>Quantity</div>` +
    `</div>`;
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_dashboard_monthly_orders_graph_type_body"
  ).innerHTML = html;
  /* ---------------------------------------- PRE SELECT ---------------------------------------- */
  document.querySelector(
    "#profile_dashboard_monthly_orders_graph_type_value"
  ).checked = true;
  profileDashboardMonthlyOrdersFilterPopulateDate("value");
};

/* ------------------------------------------- SELECT ------------------------------------------- */

const profileDashboardMonthlyOrdersTypeSelect = type => {
  const valueElement = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_type_value"
  );
  const quantityElement = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_type_quantity"
  );

  if (type == "value") {
    quantityElement.checked = false;
    profileDashboardMonthlyOrdersFilterPopulateDate("value", "filter");
  }

  if (type == "quantity") {
    valueElement.checked = false;
    profileDashboardMonthlyOrdersFilterPopulateDate("quantity", "filter");
  }
};

/* =========================================== FILTER =========================================== */

const profileDashboardMonthlyOrdersFilter = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    `<div class='profile_dashboard_monthly_orders_graph_filter'>` +
    `<div class='profile_dashboard_monthly_orders_graph_filter_heading_body'>` +
    `<div class='profile_dashboard_monthly_orders_graph_filter_heading'>Start Date</div>` +
    `</div>` +
    `<select id="profile_dashboard_monthly_orders_graph_filter_start_date_month" class="profile_dashboard_monthly_orders_graph_filter_date profile_dashboard_monthly_orders_graph_filter_date_month"></select>` +
    `<select id="profile_dashboard_monthly_orders_graph_filter_start_date_year" class="profile_dashboard_monthly_orders_graph_filter_date profile_dashboard_monthly_orders_graph_filter_date_year"></select>` +
    `</div>` +
    `<div class='profile_dashboard_monthly_orders_graph_filter'>` +
    `<div class='profile_dashboard_monthly_orders_graph_filter_heading_body'>` +
    `<div class='profile_dashboard_monthly_orders_graph_filter_heading'>End Date</div>` +
    `</div>` +
    `<select id="profile_dashboard_monthly_orders_graph_filter_end_date_month" class="profile_dashboard_monthly_orders_graph_filter_date profile_dashboard_monthly_orders_graph_filter_date_month"></select>` +
    `<select id="profile_dashboard_monthly_orders_graph_filter_end_date_year" class="profile_dashboard_monthly_orders_graph_filter_date profile_dashboard_monthly_orders_graph_filter_date_year"></select>` +
    `</div>` +
    `<div id="profile_dashboard_monthly_orders_graph_filter_apply_button_body">` +
    `<div class="button_one_body">` +
    `<div id="profile_dashboard_monthly_orders_graph_filter_apply_button" class="button_one">` +
    `<div class="button_one_label">Apply</div>` +
    `</div>` +
    `<div id="profile_dashboard_monthly_orders_graph_filter_apply_button_loader" class="button_one_loader"></div>` +
    `</div>` +
    `</div>`;
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_dashboard_monthly_orders_graph_filter_body"
  ).innerHTML = html;
  /* -------------------------------------- EVENT LISTENER -------------------------------------- */
  document
    .querySelector(
      "#profile_dashboard_monthly_orders_graph_filter_apply_button"
    )
    .addEventListener("click", () => {
      const valueElement = document.querySelector(
        "#profile_dashboard_monthly_orders_graph_type_value"
      );
      const quantityElement = document.querySelector(
        "#profile_dashboard_monthly_orders_graph_type_quantity"
      );
      if (valueElement.checked) {
        profileDashboardMonthlyOrdersFilterPopulateDate("value", "filter");
      } else if (quantityElement.checked) {
        profileDashboardMonthlyOrdersFilterPopulateDate("quantity", "filter");
      }
    });
};

const profileDashboardMonthlyOrdersFilterPopulateDate = (dataType, type) => {
  /* ------------------------------------- SELECT ELEMENTS -------------------------------------- */
  const endMonthSelect = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_filter_end_date_month"
  );
  const endYearSelect = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_filter_end_date_year"
  );
  const startMonthSelect = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_filter_start_date_month"
  );
  const startYearSelect = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_filter_start_date_year"
  );
  /* ---------------------------------------- SET VALUES ---------------------------------------- */
  const preSetEndMonth = endMonthSelect.value;
  const preSetEndYear = endYearSelect.value;
  const preSetStartMonth = startMonthSelect.value;
  const preSetStartYear = startYearSelect.value;
  const currentDateMoment = moment().startOf("months");
  const currentDate = dateFormatter(currentDateMoment._d);
  // SET END DATE VALUES
  const endDateMoment = moment(preSetEndYear + "-" + preSetEndMonth, "YYYY-MM");
  const currentMonthsDifference = currentDateMoment.diff(
    endDateMoment,
    "months"
  );
  let endDate;
  let endMonth;
  let endYear;
  if (currentMonthsDifference < 0 || type != "filter") {
    // End Date exceeds Current Date
    endDate = currentDate;
  } else {
    // End Date does not exceed Current Date
    endDate = dateFormatter(endDateMoment._d);
  }
  endMonth = endDate.month[1];
  endYear = endDate.year;
  const defaultEndDate = moment(endYear + "-" + endMonth, "YYYY-MM")._d;
  // SET START DATE VALUES
  const startDateMoment = moment(
    preSetStartYear + "-" + preSetStartMonth,
    "YYYY-MM"
  );
  const monthsDifference = endDateMoment.diff(startDateMoment, "months");
  let startDate;
  let startMonth;
  let startYear;
  if (type == "filter") {
    if (currentMonthsDifference < 0) {
      startDate = dateFormatter(currentDateMoment.subtract(5, "months")._d);
    } else if (monthsDifference < 0 || monthsDifference > 5) {
      // Start Date exceeds End Date
      startDate = dateFormatter(endDateMoment.subtract(5, "months")._d);
    } else {
      // Start Date does not exceed End Date
      startDate = dateFormatter(startDateMoment._d);
    }
  } else {
    startDate = dateFormatter(currentDateMoment.subtract(5, "months")._d);
  }
  startMonth = startDate.month[1];
  startYear = startDate.year;
  const defaultStartDate = moment(startYear + "-" + startMonth, "YYYY-MM")._d;
  /* -------------------------------------- EMPTY OPTIONS --------------------------------------- */
  endMonthSelect.innerHTML = "";
  endYearSelect.innerHTML = "";
  startMonthSelect.innerHTML = "";
  startYearSelect.innerHTML = "";
  /* ------------------------------------- POPULATE SELECT -------------------------------------- */
  // MONTH
  const months = [
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
  for (i = 0; i < months.length; i++) {
    const monthName = months[i];
    const monthNumber = monthNameToNumberConversion(monthName);
    const html = `<option value="${monthNumber}">${monthName}</option>`;
    startMonthSelect.insertAdjacentHTML("beforeend", html);
    endMonthSelect.insertAdjacentHTML("beforeend", html);
  }
  // YEAR
  for (i = 2018; i <= Number(currentDate.year); i++) {
    const html = `<option value="${i}">${i}</option>`;
    startYearSelect.insertAdjacentHTML("beforeend", html);
    endYearSelect.insertAdjacentHTML("beforeend", html);
  }
  /* ----------------------------------- SELECT INPUT VALUES ------------------------------------ */
  endMonthSelect.value = Number(endMonth);
  endYearSelect.value = endYear;
  startMonthSelect.value = Number(startMonth);
  startYearSelect.value = startYear;
  /* ----------------------------------- FETCH AND LOAD DATA ------------------------------------ */
  const element = document.querySelector(
    "#profile_dashboard_monthly_orders_graph_filter_apply_button_loader"
  );
  const elements = [element];
  loadLoader(elements, "small").then(() => {
    profileDashboardMonthlyOrdersFetchData(
      dataType,
      defaultStartDate,
      defaultEndDate
    );
  });
};

/* ========================================= FETCH DATA ========================================= */

const profileDashboardMonthlyOrdersFetchData = (type, startDate, endDate) => {
  /* ------------------------------------------ LOADER ------------------------------------------ */
  // ELEMENT
  const element = document.querySelector(
    "#profile_dashboard_monthly_orders_bar_graph_body"
  );
  const elements = [element];
  loadLoader(elements).then(() => {
    // PROMISE
    let defaultStartDate;
    let defaultEndDate;
    let defaultStartDates = [];
    let defaultEndDates = [];
    let months = [];
    let years = [];
    let i;
    /* -------------------------------- POPULATE START DATE ARRAY --------------------------------- */
    if (startDate) {
      i = 0;
      while (defaultStartDate + "" != endDate + "") {
        defaultStartDate = moment(startDate).add(i, "months")._d;
        defaultStartDates.push(defaultStartDate);
        months.push(dateFormatter(defaultStartDate).month[0]);
        years.push(dateFormatter(defaultStartDate).year);
        i++;
      }
    } else {
      defaultStartDate = moment().startOf("month")._d;
      defaultStartDates.push(defaultStartDate);
      months.push(dateFormatter(defaultStartDate).month[0]);
      years.push(dateFormatter(defaultStartDate).year);
      for (let i = 5; i >= 1; i--) {
        defaultStartDate = moment()
          .subtract(i, "month")
          .startOf("month")._d;
        defaultStartDates.push(defaultStartDate);
        months.push(dateFormatter(defaultStartDate).month[0]);
        years.push(dateFormatter(defaultStartDate).year);
      }
    }
    /* --------------------------------- POPULATE END DATE ARRAY ---------------------------------- */
    if (endDate) {
      endDate = moment(endDate)
        .add(i, "months")
        .endOf("month")._d;
      i = 0;
      while (defaultEndDate + "" != endDate + "") {
        defaultEndDate = moment(startDate)
          .add(i, "months")
          .endOf("month")._d;
        defaultEndDates.push(defaultEndDate);
        i++;
      }
    } else {
      for (let i = 5; i >= 1; i--) {
        defaultEndDate = moment()
          .subtract(i, "month")
          .endOf("month")._d;
        defaultEndDates.push(defaultEndDate);
      }
      defaultEndDate = moment()._d;
      defaultEndDates.push(defaultEndDate);
    }
    /* -------------------------------- MONTHLY ORDER OBJECT ARRAY -------------------------------- */
    let promises = [];
    for (let i = 0; i < defaultStartDates.length; i++) {
      defaultStartDate = defaultStartDates[i];
      defaultEndDate = defaultEndDates[i];
      promises.push(
        cumulativeOrderValueByDateRange(defaultStartDate, defaultEndDate)
      );
    }
    Promise.all(promises)
      .then(monthlyOrdersObjects => {
        document.querySelector(
          "#profile_dashboard_monthly_orders_graph_filter_apply_button_loader"
        ).innerHTML = "";
        /* ------------------------------------- CREATE HTML -------------------------------------- */
        const html =
          `<div id="profile_dashboard_monthly_orders_bar_graph_legends">` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend">` +
          `<div id="profile_dashboard_monthly_orders_bar_graph_legend_color_active" class="profile_dashboard_monthly_orders_bar_graph_legend_color"></div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend_label">Active</div>` +
          `</div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend">` +
          `<div id="profile_dashboard_monthly_orders_bar_graph_legend_color_delivering" class="profile_dashboard_monthly_orders_bar_graph_legend_color"></div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend_label">Delivering</div>` +
          `</div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend">` +
          `<div id="profile_dashboard_monthly_orders_bar_graph_legend_color_completed" class="profile_dashboard_monthly_orders_bar_graph_legend_color"></div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend_label">Completed</div>` +
          `</div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend">` +
          `<div id="profile_dashboard_monthly_orders_bar_graph_legend_color_archived" class="profile_dashboard_monthly_orders_bar_graph_legend_color"></div>` +
          `<div class="profile_dashboard_monthly_orders_bar_graph_legend_label">Archived</div>` +
          `</div>` +
          `</div>` +
          `<div id="profile_dashboard_monthly_orders_bar_graph_yaxis"></div>` +
          `<div id="profile_dashboard_monthly_orders_bar_graph"></div>` +
          `<div id="profile_dashboard_monthly_orders_bar_graph_xaxis"></div>`;
        /* ------------------------------------- INSERT HTML -------------------------------------- */
        document.querySelector(
          "#profile_dashboard_monthly_orders_bar_graph_body"
        ).innerHTML = html;
        /* --------------------------------------- CONTENTS --------------------------------------- */
        let monthlyOrdersDetailsArray = [];
        for (let i = 0; i < monthlyOrdersObjects.length; i++) {
          monthlyOrdersDetailsArray.push(
            profileDashboardMonthlyOrdersDetails(
              monthlyOrdersObjects[i],
              months[i],
              years[i]
            )
          );
        }
        profileDashboardMonthlyOrdersDisplay(monthlyOrdersDetailsArray, type);
      })
      .catch(error => {
        console.log(error);
      });
  });
};

/* ========================================== DETAILS =========================================== */

const profileDashboardMonthlyOrdersDetails = (
  monthlyOrdersObject,
  month,
  year
) => {
  let cumulativeActiveOrderValue = 0;
  let cumulativeDeliveringOrderValue = 0;
  let cumulativeCompletedOrderValue = 0;
  let cumulativeArchivedOrderValue = 0;
  let activeOrderQuantity = 0;
  let deliveringOrderQuantity = 0;
  let completedOrderQuantity = 0;
  let archivedOrderQuantity = 0;
  const xAxisLabel =
    month[0].toUpperCase() +
    month[1].toLowerCase() +
    month[2].toLowerCase() +
    " '" +
    year[2] +
    year[3];

  for (let i = 0; i < monthlyOrdersObject.length; i++) {
    const order = monthlyOrdersObject[i];
    const orderStatus = order.orderStatus;
    if (
      orderStatus == "Awaiting Quote" ||
      orderStatus == "Awaiting Payment" ||
      orderStatus == "Awaiting Payment Confirmation" ||
      orderStatus == "Printing Order"
    ) {
      cumulativeActiveOrderValue += order.orderPrice;
      activeOrderQuantity++;
    } else if (
      orderStatus == "Ready for Pickup" ||
      orderStatus == "Order Picked Up" ||
      orderStatus == "Ready for Shipping" ||
      orderStatus == "Order Shipped"
    ) {
      cumulativeDeliveringOrderValue += order.orderPrice;
      deliveringOrderQuantity++;
    } else if (orderStatus == "Order Completed") {
      cumulativeCompletedOrderValue += order.orderPrice;
      completedOrderQuantity++;
    } else {
      cumulativeArchivedOrderValue += order.orderPrice;
      archivedOrderQuantity++;
    }
  }

  const totalCumulativeOrderValue =
    cumulativeActiveOrderValue +
    cumulativeDeliveringOrderValue +
    cumulativeCompletedOrderValue +
    cumulativeArchivedOrderValue;

  const totalOrderQuantity =
    activeOrderQuantity +
    deliveringOrderQuantity +
    completedOrderQuantity +
    archivedOrderQuantity;

  return {
    cumulativeOrderValue: {
      active: cumulativeActiveOrderValue,
      delivering: cumulativeDeliveringOrderValue,
      completed: cumulativeCompletedOrderValue,
      archived: cumulativeArchivedOrderValue,
      total: totalCumulativeOrderValue
    },
    orderQuantity: {
      active: activeOrderQuantity,
      delivering: deliveringOrderQuantity,
      completed: completedOrderQuantity,
      archived: archivedOrderQuantity,
      total: totalOrderQuantity
    },
    xAxisLabel
  };
};

/* ========================================== DISPLAY =========================================== */

const profileDashboardMonthlyOrdersDisplay = (
  monthlyOrdersDetailsArray,
  type
) => {
  let highestTotalCumulativeOrderValue = 0;
  let highestTotalOrderQuantity = 0;
  let yAxisMaxCumulativeOrderValue = 0;
  let yAxisMaxOrderQuantity = 0;
  for (let i = 0; i < monthlyOrdersDetailsArray.length; i++) {
    const monthlyOrdersDetails = monthlyOrdersDetailsArray[i];
    const xAxisLabel = monthlyOrdersDetails.xAxisLabel;
    const totalCumulativeOrderValue =
      monthlyOrdersDetails.cumulativeOrderValue.total;
    const totalOrderQuantity = monthlyOrdersDetails.orderQuantity.total;
    /* ------------------------------------- HIGHEST TOTALS ------------------------------------- */
    if (highestTotalCumulativeOrderValue < totalCumulativeOrderValue) {
      highestTotalCumulativeOrderValue = totalCumulativeOrderValue;
      const highestTotalCumulativeOrderValueString = String(
        Math.ceil(highestTotalCumulativeOrderValue)
      );
      const highestTotalCumulativeOrderValueStringLength =
        highestTotalCumulativeOrderValueString.length;
      if (highestTotalCumulativeOrderValueStringLength > 1) {
        for (let i = 1; i < highestTotalCumulativeOrderValueStringLength; i++) {
          if (Number(highestTotalCumulativeOrderValueString[i]) > 0) {
            yAxisMaxCumulativeOrderValue =
              Number(highestTotalCumulativeOrderValueString[0]) + 1;
            break;
          }
          if (i + 1 == highestTotalCumulativeOrderValueStringLength) {
            if (
              highestTotalCumulativeOrderValueString[
                highestTotalCumulativeOrderValueStringLength - 1
              ] == 0
            ) {
              yAxisMaxCumulativeOrderValue = Number(
                highestTotalCumulativeOrderValueString[0]
              );
              break;
            }
          }
        }
      } else {
        yAxisMaxCumulativeOrderValue = "10";
      }

      for (let i = 1; i < highestTotalCumulativeOrderValueStringLength; i++) {
        yAxisMaxCumulativeOrderValue += "0";
      }
    }
    if (highestTotalOrderQuantity < totalOrderQuantity) {
      highestTotalOrderQuantity = totalOrderQuantity;
      const highestTotalOrderQuantityString = String(
        Math.ceil(highestTotalOrderQuantity)
      );
      const highestTotalOrderQuantityStringLength =
        highestTotalOrderQuantityString.length;
      if (highestTotalOrderQuantityStringLength > 1) {
        for (let i = 1; i < highestTotalOrderQuantityStringLength; i++) {
          if (Number(highestTotalOrderQuantityString[i]) > 0) {
            yAxisMaxOrderQuantity =
              Number(highestTotalOrderQuantityString[0]) + 1;
            break;
          }
          if (i + 1 == highestTotalOrderQuantityStringLength) {
            if (
              highestTotalOrderQuantityString[
                highestTotalOrderQuantityStringLength - 1
              ] == 0
            ) {
              yAxisMaxOrderQuantity = Number(
                highestTotalOrderQuantityString[0]
              );
              break;
            }
          }
        }
      } else {
        yAxisMaxOrderQuantity = "10";
      }

      for (let i = 1; i < highestTotalOrderQuantityStringLength; i++) {
        yAxisMaxOrderQuantity += "0";
      }
    }
    /* -------------------------------------- X-AXIS LABEL -------------------------------------- */
    const htmlThree = `<div class='profile_dashboard_monthly_orders_bar_graph_xaxis_label profile_dashboard_monthly_orders_bar_graph_xaxis_label_${
      monthlyOrdersDetailsArray.length
    }'>${xAxisLabel}</div>`;
    document
      .querySelector(`#profile_dashboard_monthly_orders_bar_graph_xaxis`)
      .insertAdjacentHTML("beforeend", htmlThree);
  }
  /* --------------------------------------- Y-AXIS LABEL --------------------------------------- */
  for (let i = 4; i >= 1; i--) {
    let yAxisLabel;
    if (type == "value") {
      yAxisLabel =
        "$" +
        numberWithCommas(
          numberToTwoDecimalStringConverter(
            (Number(yAxisMaxCumulativeOrderValue) / 4) * i
          )
        );
    } else if (type == "quantity") {
      yAxisLabel = (Number(yAxisMaxOrderQuantity) / 4) * i;
    }
    const htmlTwo = `<div class='profile_dashboard_monthly_orders_bar_graph_yaxis_label'>${yAxisLabel}</div>`;
    document
      .querySelector("#profile_dashboard_monthly_orders_bar_graph_yaxis")
      .insertAdjacentHTML("beforeend", htmlTwo);
  }
  /* ---------------------------------------- BAR GRAPHS ---------------------------------------- */
  for (let i = 0; i < monthlyOrdersDetailsArray.length; i++) {
    const monthlyOrdersDetails = monthlyOrdersDetailsArray[i];
    let archivedCumulativeOrderHeight;
    let completedCumulativeOrderHeight;
    let deliveringCumulativeOrderHeight;
    let activeCumulativeOrderHeight;
    if (type == "value") {
      archivedCumulativeOrderHeight =
        (monthlyOrdersDetails.cumulativeOrderValue.archived /
          Number(yAxisMaxCumulativeOrderValue)) *
          100 +
        "%";
      completedCumulativeOrderHeight =
        (monthlyOrdersDetails.cumulativeOrderValue.completed /
          Number(yAxisMaxCumulativeOrderValue)) *
          100 +
        "%";
      deliveringCumulativeOrderHeight =
        (monthlyOrdersDetails.cumulativeOrderValue.delivering /
          Number(yAxisMaxCumulativeOrderValue)) *
          100 +
        "%";
      activeCumulativeOrderHeight =
        (monthlyOrdersDetails.cumulativeOrderValue.active /
          Number(yAxisMaxCumulativeOrderValue)) *
          100 +
        "%";
    } else if ((type = "quantity")) {
      archivedCumulativeOrderHeight =
        (monthlyOrdersDetails.orderQuantity.archived /
          Number(yAxisMaxOrderQuantity)) *
          100 +
        "%";
      completedCumulativeOrderHeight =
        (monthlyOrdersDetails.orderQuantity.completed /
          Number(yAxisMaxOrderQuantity)) *
          100 +
        "%";
      deliveringCumulativeOrderHeight =
        (monthlyOrdersDetails.orderQuantity.delivering /
          Number(yAxisMaxOrderQuantity)) *
          100 +
        "%";
      activeCumulativeOrderHeight =
        (monthlyOrdersDetails.orderQuantity.active /
          Number(yAxisMaxOrderQuantity)) *
          100 +
        "%";
    }
    // CREATE HTML
    const htmlOne =
      `<div class='profile_dashboard_monthly_orders_bar_graph_bar_body profile_dashboard_monthly_orders_bar_graph_bar_body_${
        monthlyOrdersDetailsArray.length
      }'>` +
      `<div style='height:${archivedCumulativeOrderHeight};' class='profile_dashboard_monthly_orders_bar_graph_bar_cumulative_order_archived'></div>` +
      `<div style='height:${completedCumulativeOrderHeight};' class='profile_dashboard_monthly_orders_bar_graph_bar_cumulative_order_completed'></div>` +
      `<div style='height:${deliveringCumulativeOrderHeight};' class='profile_dashboard_monthly_orders_bar_graph_bar_cumulative_order_delivering'></div>` +
      `<div style='height:${activeCumulativeOrderHeight};' class='profile_dashboard_monthly_orders_bar_graph_bar_cumulative_order_active'></div>` +
      `</div>`;
    // INSERT HTML
    document
      .querySelector("#profile_dashboard_monthly_orders_bar_graph")
      .insertAdjacentHTML("beforeend", htmlOne);
  }
};

/* ============================================================================================== */
