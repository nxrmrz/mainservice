/* ======================================= INITIALISATION ======================================= */

const orderShippedInit = order => {
  const orderStatusId = constructOrderStatusId(order.orderStatus);
  constructOrderDetailsOrderShippedModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  orderShippedDescriptionBodyDetails(order);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsOrderShippedModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsOrderShippedModalHeader = orderDetailsModalHeader;
  const orderDetailsOrderShippedModalFooter =
    "<div id='order_shipped_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_shipped_complete_order_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Complete Order</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_shipped_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='order_shipped_complete_order_footer_buttons_body' class='order_details_footer_buttons_body order_shipped_footer_buttons_body_close'>" +
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
  const orderDetailsOrderShippedModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsOrderShippedModalHeader,
    orderDetailsOrderShippedModalFooter
  );
  // CSS
  const orderDetailsOrderShippedModalMobileHeight = 90;
  const orderDetailsOrderShippedModalMobileWidth = 90;
  const orderDetailsOrderShippedModalDesktopHeight = 90;
  const orderDetailsOrderShippedModalDesktopWidth = 60;
  const orderDetailsOrderShippedModalFooterHeight = 14;
  const orderDetailsOrderShippedModalCSSObject = new modalCSSObject(
    orderDetailsOrderShippedModalMobileHeight,
    orderDetailsOrderShippedModalMobileWidth,
    orderDetailsOrderShippedModalDesktopHeight,
    orderDetailsOrderShippedModalDesktopWidth,
    orderDetailsOrderShippedModalFooterHeight
  );

  addModal(
    orderDetailsOrderShippedModalElementObject,
    orderDetailsOrderShippedModalCSSObject
  );

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
      orderShippedCompleteOrderConfirm(order, orderStatusId);
    });

  /* ------------------------------------ ADD REQUEST REFUND ------------------------------------ */

  const orderNumber = order.orderNumber;

  orderDetailsRequestRefundInit(orderNumber, orderStatusId);
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const orderShippedDescriptionBodyDetails = order => {
  const estimatedDeliveryDate = orderShippedEstimatedDeliveryDate(order);

  const detailOne =
    "We have now shipped your order! The expected arrival day of your shipment is <strong>" +
    estimatedDeliveryDate +
    "</strong>";
  const detailTwo = "Your order will automatically be declared 'Completed' in:";
  const detailThree =
    "You can also press 'Complete Order' once you receive your order and if you believe that the order has been fully fulfilled";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    detailOne +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    detailTwo +
    "</div>" +
    "</div>" +
    "<div id='order_details_order_shipped_order_autocomplete_timer_body'>" +
    "<div id='order_details_order_shipped_order_autocomplete_timer_text'></div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    detailThree +
    "</div>" +
    "</div>";

  document
    .querySelector("#order_shipped_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);

  // Apply Auto Complete Timer
  orderDetailsOrderShippedUpAutoCompleteTimer(order);
  orderShippedAutoCompleteOrderTimer = setInterval(() => {
    orderDetailsOrderShippedUpAutoCompleteTimer(order);
  }, 1000);
  // Remove Interval when Order Details is closed
  document
    .querySelector("#order_shipped_backdrop")
    .addEventListener("click", () => {
      clearInterval(orderShippedAutoCompleteOrderTimer);
    });
};

/* ================================== ESTIMATED DELIVERY DATE =================================== */

let orderShippedNumberOfDeliveryDays;

const orderShippedEstimatedDeliveryDate = order => {
  const dateObject = dateFormatter(order.orderDeliveryDate);

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

  const dateOfDelivery = moment(order.orderDeliveryDate).add(
    orderShippedNumberOfDeliveryDays,
    "days"
  );
  const dateOfDeliveryObject = dateFormatter(dateOfDelivery._d);
  const dateOfDeliveryMessage =
    dateOfDeliveryObject.day +
    ", " +
    dateOfDeliveryObject.date +
    " " +
    dateOfDeliveryObject.month[0] +
    " " +
    dateOfDeliveryObject.year;

  return dateOfDeliveryMessage;
};

/* ================================== ORDER AUTOCOMPLETE TIMER ================================== */

let orderShippedAutoCompleteOrderTimer;

const orderDetailsOrderShippedUpAutoCompleteTimer = order => {
  const dateOfAutoComplete = moment(order.orderDeliveryDate).add(
    5 + orderShippedNumberOfDeliveryDays,
    "days"
  );
  const currentDate = moment();
  const totalRemainingSeconds = dateOfAutoComplete.diff(currentDate, "seconds");
  const remainingDays = Math.floor(totalRemainingSeconds / (24 * 60 * 60));
  const remainingHours = Math.floor(
    (totalRemainingSeconds % (24 * 60 * 60)) / (60 * 60)
  );
  const remainingMinutes = Math.floor(
    ((totalRemainingSeconds % (24 * 60 * 60)) % (60 * 60)) / 60
  );
  const remainingSeconds =
    ((totalRemainingSeconds % (24 * 60 * 60)) % (60 * 60)) % 60;
  const timerMessage =
    remainingDays +
    "D : " +
    remainingHours +
    "H : " +
    remainingMinutes +
    "M : " +
    remainingSeconds +
    "S";
  document.querySelector(
    "#order_details_order_shipped_order_autocomplete_timer_text"
  ).innerHTML = timerMessage;
};

/* ======================================= COMPLETE ORDER ======================================= */

const orderShippedCompleteOrderButton = () => {
  // Set new CSS
  document
    .querySelector("#order_shipped_footer_buttons_body")
    .classList.toggle("order_shipped_footer_buttons_body_open");

  document
    .querySelector("#order_shipped_complete_order_footer_buttons_body")
    .classList.toggle("order_shipped_footer_buttons_body_open");
};

const orderShippedCompleteOrderConfirm = (order, modalId) => {
  loadLoader(document.querySelector("#order_shipped_modal_body")).then(() => {
    clearInterval(orderShippedAutoCompleteOrderTimer);

    $.ajax({
      type: "POST",
      url: "/order/update-order-status",
      data: JSON.stringify(order),
      contentType: "application/json",
      success: data => {
        removeModal(modalId);
        removeBackdrop(modalId);
        loadProfileOrdersPrintsOrdersListTableContents();
        setTimeout(() => {
          viewOrderDetails(data);
        }, 500);
      }
    });
  });
};

/* ============================================================================================== */
