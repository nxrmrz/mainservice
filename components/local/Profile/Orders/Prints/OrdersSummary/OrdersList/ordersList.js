/* ======================================= INITIALISATION ======================================= */

const profileOrdersPrintsOrdersSummaryListInit = () => {
  profileOrdersPrintsOrdersSummaryListStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileOrdersPrintsOrdersSummaryListStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_orders_prints_orders_summary_list'>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'><strong>Order Number</strong></div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'><strong>Date of Creation</strong></div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'><strong>Status</strong></div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'><strong>Last Update</strong></div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'><strong>Quantity</strong></div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'><strong>Print Deadline</strong></div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell profile_orders_prints_orders_summary_list_print_setting'><strong>Print Setting</strong></div>" +
    "<div id='profile_orders_prints_orders_summary_list_tables'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_orders_prints_orders_summary_list_contents"
  ).innerHTML = html;
};

/* ======================================= POPULATE LIST ======================================== */

const profileOrdersPrintsOrdersSummaryListPopulate = filters => {
  const element = document.querySelector(
    "#profile_orders_prints_orders_summary_list_tables"
  );
  if (!element) {
    return;
  }

  if (filters) {
    let promises = [];
    for (let i = 0; i < filters.length; i++) {
      promises.push(getOrderDetailsArrayByOrderStatus(filters[i]));
    }
    Promise.all(promises)
      .then(ordersArray => {
        element.innerHTML = "";
        orders = [].concat.apply([], ordersArray);
        if (orders.length == 0) {
          profileOrdersPrintsOrdersSummaryListNoOrderFound();
        }
        newOrders = removeDuplicatedOrder(orders);
        for (let i = 0; i < newOrders.length; i++) {
          profileOrdersPrintsOrdersSummaryListAddOrder(newOrders[i]);
        }
      })
      .catch(error => console.log(error));
  } else {
    getOrderDetailsArray()
      .then(orders => {
        element.innerHTML = "";
        if (orders.length == 0) {
          profileOrdersPrintsOrdersSummaryListNoOrderFound();
        }
        newOrders = removeDuplicatedOrder(orders);
        for (let i = 0; i < newOrders.length; i++) {
          profileOrdersPrintsOrdersSummaryListAddOrder(newOrders[i]);
        }
      })
      .catch(error => console.log(error));
  }
};

/* ======================================== SORT ORDERS ========================================= */

const compareOrderNumbers = (orderA, orderB) => {
  return Number(orderA.orderNumber) - Number(orderB.orderNumber);
};

/* ----------------------------------- SORT ORDERS DESCENDING ----------------------------------- */

const sortOrderNumbersDescending = (orderA, orderB) => {
  return Number(orderB.orderNumber) - Number(orderA.orderNumber);
};

/* ================================== REMOVE DUPLICATED ORDERS ================================== */

const removeDuplicatedOrder = orders => {
  orders.sort(compareOrderNumbers);
  let newOrders = [orders[0]];

  for (let i = 1; i < orders.length; i++) {
    if (newOrders[newOrders.length - 1].orderNumber != orders[i].orderNumber) {
      newOrders.push(orders[i]);
    }
  }

  newOrders.sort(sortOrderNumbersDescending);

  return newOrders;
};

/* ===================================== ADD ORDER SUMMARY ====================================== */

const profileOrdersPrintsOrdersSummaryListAddOrder = order => {
  /* ------------------------------------- DEFINE VARIABLES ------------------------------------- */

  let totalOrderedQuantity = 0;
  let totalProducedQuantity = 0;
  let deadline = "";

  for (i = 0; i < order.parts.length; i++) {
    totalOrderedQuantity += Number(order.parts[i].orderQuantity);
    totalProducedQuantity += Number(order.parts[i].producedQuantity);
  }

  if (!order.paymentConfirmationDate) {
    deadline = "---";
  } else {
    let numberOfDays;
    switch (order.pricing) {
      case "Basic":
        numberOfDays = 5;
        break;
      case "Priority":
        numberOfDays = 3;
        break;
      case "Urgent":
        numberOfDays = 1;
        break;
    }
    const deadlineDefaultFormat = moment(order.paymentConfirmationDate).add(
      numberOfDays,
      "d"
    );
    deadline = dayDateMonthYearFormat(deadlineDefaultFormat._d);
  }

  const creationDate = dayDateMonthYearFormat(order.creationDate);
  const lastUpdateDate = dateFormatter(order.lastUpdateDate).fromNow;

  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_orders_prints_orders_summary_list_table' onclick='viewOrderDetails(" +
    order.orderNumber +
    ")'>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'>" +
    order.orderNumber +
    "</div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'>" +
    creationDate +
    "</div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'>" +
    order.orderStatus +
    "</div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'>" +
    lastUpdateDate +
    "</div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'>" +
    totalProducedQuantity +
    "/" +
    totalOrderedQuantity +
    "</div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell'>" +
    deadline +
    "</div>" +
    "<div class='profile_orders_prints_orders_summary_list_cell profile_orders_prints_orders_summary_list_print_setting'>" +
    order.pricing +
    ", " +
    order.delivery +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document
    .querySelector("#profile_orders_prints_orders_summary_list_tables")
    .insertAdjacentHTML("beforeend", html);
};

/* ======================================= NO ORDER FOUND ======================================= */

const profileOrdersPrintsOrdersSummaryListNoOrderFound = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_orders_prints_orders_summary_list_no_order'>No Order Found</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_orders_prints_orders_summary_list_tables"
  ).innerHTML = html;
};

/* ============================================================================================== */
