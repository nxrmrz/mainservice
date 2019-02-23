/* =========================== ADMIN PROFILE ORDER: PRINTS COMPONENTS =========================== */

// Profile Orders Prints Object
let adminProfileOrdersPrintsObject;

// Profile Orders Prints Object Properties
const adminProfileOrdersPrintsId = "prints";
const adminProfileOrdersPrintsName = "Prints";

// Contruct Profile Orders Prints Object
const contructAdminProfileOrdersPrintsObject = () => {
  adminProfileOrdersPrintsObject = new adminProfileOrdersComponentObject(
    adminProfileOrdersPrintsId,
    adminProfileOrdersPrintsName,
    adminProfileOrdersPrintsInit
  );
};

/* ======================================= INITIALISATION ======================================= */

const adminProfileOrdersPrintsInit = () => {
  constructAdminProfileOrdersPrintsBaseHTML();
  loadAdminProfileOrdersPrintsOrderLists();
  adminProfileOrdersPrintsDiscountInit();
};

/* ==================================== CREATE THE BASE HTML ==================================== */

const constructAdminProfileOrdersPrintsBaseHTML = () => {
  const adminProfileOrdersPrintsBaseHTML =
    "<div id='admin_profile_orders_prints_body'>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Awaiting Quote</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_awaiting_quote_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Awaiting Payment Confirmation</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_awaiting_payment_confirmation_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Printing Order</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_printing_order_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Ready for Pickup</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_ready_for_pickup_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Ready for Shipping</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_ready_for_shipping_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Requesting Refund</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_requesting_refund_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_order_list_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_body'>" +
    "<div class='admin_profile_orders_prints_order_list_header_text'>Orders</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_orders_list_contents_body' class='admin_profile_orders_prints_order_list_contents_body'></div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#admin_profile_orders_contents_body"
  ).innerHTML = adminProfileOrdersPrintsBaseHTML;
};

/* ======================================= LOAD ORDER LIST ====================================== */

const adminPorfileOrdersOrderStatusArray = [
  "Awaiting Quote",
  "Awaiting Payment Confirmation",
  "Printing Order",
  "Ready for Pickup",
  "Ready for Shipping",
  "Requesting Refund",
  "Orders"
];

const loadAdminProfileOrdersPrintsOrderLists = () => {
  adminPorfileOrdersOrderStatusArray.forEach(orderStatus => {
    const orderStatusId = constructOrderStatusId(orderStatus);

    loadLoader(
      document.querySelector(
        "#admin_profile_orders_prints_" + orderStatusId + "_list_contents_body"
      )
    ).then(() => {
      if (orderStatus == "Orders") {
        $.ajax({
          type: "POST",
          url: "/order/get-order-details-array",
          success: data => {
            addAdminProfileOrdersPrintsOrderList(data.content, orderStatusId);
          }
        });
      } else {
        $.ajax({
          type: "POST",
          url: "/order/get-order-details-array-by-order-status",
          data: JSON.stringify({ orderStatus }),
          contentType: "application/json",
          success: data => {
            addAdminProfileOrdersPrintsOrderList(data.content, orderStatusId);
          }
        });
      }
    });
  });
};

const adminPorfileOrdersOrderStatusIdsArray = [
  "awaiting_quote",
  "awaiting_payment_confirmation",
  "printing_order",
  "ready_for_pickup",
  "ready_for_shipping",
  "requesting_refund",
  "orders"
];

const addAdminProfileOrdersPrintsOrderList = (orders, id) => {
  // Table Body
  const profileOrdersPrintsOrdersListTableBodyHTML =
    "<table class='admin_profile_orders_prints_" +
    id +
    "_list_table admin_profile_orders_prints_orders_list_table'>" +
    "<tbody id='admin_profile_orders_prints_" +
    id +
    "_list_table_content_body'></tbody>" +
    "</table>";
  document.querySelector(
    "#admin_profile_orders_prints_" + id + "_list_contents_body"
  ).innerHTML = profileOrdersPrintsOrdersListTableBodyHTML;
  // Populate the Table with Contents
  orders.forEach(ele => {
    let totalOrderedQuantity = 0;
    let totalProducedQuantity = 0;
    let deadline = "";

    for (i = 0; i < ele.parts.length; i++) {
      totalOrderedQuantity += Number(ele.parts[i].orderQuantity);
      totalProducedQuantity += Number(ele.parts[i].producedQuantity);
    }

    if (!ele.paymentConfirmationDate) {
      deadline = "---";
    } else {
      const dateObject = dateFormatter(ele.paymentConfirmationDate);
      let numberOfDays;
      switch (ele.pricing) {
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
      const deadlineDefaultFormat = moment(ele.paymentConfirmationDate).add(
        numberOfDays,
        "d"
      );
      deadline = dayDateMonthYearFormat(deadlineDefaultFormat._d);
    }

    const creationDate = dayDateMonthYearFormat(ele.creationDate);
    const lastUpdateDate = dateFormatter(ele.lastUpdateDate).fromNow;

    const adminProfileOrdersPrintsOrdersListTableContent =
      "<tr id='admin_profile_orders_prints_" +
      id +
      "_order_number_" +
      ele.orderNumber +
      "' class='admin_profile_orders_prints_orders_list_table_row'>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_order_number_content'>" +
      ele.orderNumber +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_creation_date_content'>" +
      creationDate +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_status_content'>" +
      ele.orderStatus +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_update_content'>" +
      lastUpdateDate +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_quantity_content'>" +
      totalProducedQuantity +
      "/" +
      totalOrderedQuantity +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_deadline_content'>" +
      deadline +
      "</td>" +
      "<td class='admin_profile_orders_prints_orders_list_table_content_text admin_profile_orders_prints_orders_list_table_content admin_profile_orders_prints_orders_list_print_setting_content'>" +
      ele.pricing +
      ", " +
      ele.delivery +
      "</td>" +
      "</tr>";
    document
      .querySelector(
        "#admin_profile_orders_prints_" + id + "_list_table_content_body"
      )
      .insertAdjacentHTML(
        "beforeend",
        adminProfileOrdersPrintsOrdersListTableContent
      );
    document
      .querySelector(
        "#admin_profile_orders_prints_" +
          id +
          "_order_number_" +
          ele.orderNumber
      )
      .addEventListener("click", () => {
        viewAdminProfileOrdersPrintsOrderDetails(ele.orderNumber);
      });
  });
};

/* ============================================================================================== */
