/* ======================================= INITIALISATION ======================================= */

const orderShippedInit = order => {
  orderProgressionOrderShippedModal(order);
  orderProgressionOrderShippedStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionOrderShippedModal = order => {
  const modalFooter =
    "<div id='order_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_shipped_complete_order_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Complete Order</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='order_footer_confirm_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_shipped_order_completed_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_shipped_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  orderModal(modalFooter, order);
};

/* ========================================= STRUCTURE ========================================== */

const orderProgressionOrderShippedStructure = order => {
  // CREATE HTML
  const html =
    `<div class='order_description_content_instruction_body'>` +
    `<div class='order_description_content_instruction_heading_body'>` +
    `<div class='order_description_content_instruction_heading'><a href="https://www.nzpost.co.nz/tools/tracking/item/${
      order.trackingNumber
    }">Click here</a> to track your shipment. Your tracking details are:</div>` +
    `</div>` +
    `<div class='order_description_content_instruction_list_body'>` +
    `<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_number_label_body'>` +
    `<div class='order_description_content_instruction_list_label'>Provider:</div>` +
    `</div>` +
    `<div class='order_description_content_instruction_list_content_body'>` +
    `<div class='order_description_content_instruction_list_content'>New Zealand Post</div>` +
    `</div>` +
    `</div>` +
    `<div class='order_description_content_instruction_list_body'>` +
    `<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_number_label_body'>` +
    `<div class='order_description_content_instruction_list_label'>Number:</div>` +
    `</div>` +
    `<div class='order_description_content_instruction_list_content_body'>` +
    `<div class='order_description_content_instruction_list_content'>${
      order.trackingNumber
    }</div>` +
    `</div>` +
    `</div>` +
    `<div class='order_description_content_paragraph_body'>` +
    `<div class='order_description_content_paragraph'>Your order will automatically be declared 'Completed' in:</div>` +
    `</div>` +
    `<div class='order_description_content_paragraph_body'>` +
    `<div id='order_description_content_autocomplete_timer' class='order_description_content_paragraph'></div>` +
    `</div>` +
    `<div class='order_description_content_paragraph_body'>` +
    `<div class='order_description_content_paragraph'>You can also press 'Complete Order' if you believe that the order has been fully fulfilled.</div>` +
    `</div>`;
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
  // POPULATE CONTENTS
  // Print Timer
  orderProgressionOrderShippedAutocompleteTime(order);
  const timer = setInterval(() => {
    orderProgressionOrderShippedAutocompleteTime(order);
  }, 1000);
  // Delete Interval Upon Closure
  document.querySelector("#order_backdrop").addEventListener("click", () => {
    clearInterval(timer);
  });
  // EVENT LISTENER
  orderProgressionOrderShippedEventListener(order, timer);
  // REQUEST REFUND
  orderRequestRefundInit(order);
};

/* ===================================== AUTOCOMPLETE TIMER ===================================== */

const orderProgressionOrderShippedAutocompleteTime = order => {
  // SET CURRENT DATE
  const currentDate = moment();
  // SET DEADLINE
  const dateObject = dateFormatter(order.orderDeliveryDate);
  let orderShippedNumberOfDeliveryDays;
  if (order.delivery == "Tracking") {
    switch (dateObject.day) {
      case "Sunday":
        orderShippedNumberOfDeliveryDays = 4;
        break;
      case "Monday":
        orderShippedNumberOfDeliveryDays = 3;
        break;
      case "Tuesday":
        orderShippedNumberOfDeliveryDays = 3;
        break;
      case "Wednesday":
        orderShippedNumberOfDeliveryDays = 5;
        break;
      case "Thursday":
        orderShippedNumberOfDeliveryDays = 5;
        break;
      case "Friday":
        orderShippedNumberOfDeliveryDays = 5;
        break;
      case "Saturday":
        orderShippedNumberOfDeliveryDays = 5;
        break;
    }
  } else if (order.delivery == "Courier") {
    switch (dateObject.day) {
      case "Sunday":
        orderShippedNumberOfDeliveryDays = 2;
        break;
      case "Monday":
        orderShippedNumberOfDeliveryDays = 1;
        break;
      case "Tuesday":
        orderShippedNumberOfDeliveryDays = 1;
        break;
      case "Wednesday":
        orderShippedNumberOfDeliveryDays = 1;
        break;
      case "Thursday":
        orderShippedNumberOfDeliveryDays = 1;
        break;
      case "Friday":
        orderShippedNumberOfDeliveryDays = 3;
        break;
      case "Saturday":
        orderShippedNumberOfDeliveryDays = 3;
        break;
    }
  }
  if (dateObject.hour[0] > "16") {
    orderShippedNumberOfDeliveryDays++;
  }
  const deadline = moment(order.orderDeliveryDate).add(
    5 + orderShippedNumberOfDeliveryDays,
    "d"
  );
  // GET DATE DIFFERENCE OBJECT
  const dateDifference = momentDateDifference(currentDate, deadline);
  // CREATE TIMER TEXTs
  const timer =
    dateDifference.days +
    "D : " +
    dateDifference.hours +
    "H : " +
    dateDifference.minutes +
    "M : " +
    dateDifference.seconds +
    "S";
  // INSERT TIMER TEXT
  document.querySelector(
    "#order_description_content_autocomplete_timer"
  ).innerHTML = timer;
};

/* ======================================= EVENT LISTENER ======================================= */

const orderProgressionOrderShippedEventListener = (order, timer) => {
  /* FOOTER BUTTON CLICK LISTENER */
  document
    .querySelector("#order_shipped_complete_order_footer_button")
    .addEventListener("click", () => {
      orderShippedCompleteOrderButton();
    });
  document
    .querySelector("#order_shipped_cancel_footer_button")
    .addEventListener("click", () => {
      orderShippedCompleteOrderButton();
    });
  document
    .querySelector("#order_shipped_order_completed_confirm_button")
    .addEventListener("click", () => {
      orderShippedCompleteOrderConfirm(order, timer);
    });
};

/* ======================================= COMPLETE ORDER ======================================= */

const orderShippedCompleteOrderButton = () => {
  // Set new CSS
  document
    .querySelector("#order_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#order_footer_confirm_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

const orderShippedCompleteOrderConfirm = (orderDetails, timer) => {
  const element = document.querySelector("#order_modal_body");
  const elements = [element];
  loadLoader(elements).then(() => {
    clearInterval(timer);
    $.ajax({
      type: "POST",
      url: "/order/update-order-status",
      data: JSON.stringify({ orderDetails }),
      contentType: "application/json",
      success: data => {
        removeModal("order");
        removeBackdrop("order");
        profileOrdersPrintsOrdersSummaryFilterUpdateOrderList(
          profileOrdersPrintsOrdersSummaryFilterSelected
        );
        setTimeout(() => {
          viewOrderDetails(data.content.orderNumber);
        }, 500);
      }
    });
  });
};

/* ============================================================================================== */
