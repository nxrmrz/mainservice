/* ======================================= INITIALISATION ======================================= */

const refundDeclinedInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsRefundDeclinedModal(orderStatusId);
  constructHTMLStructure(orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  addOrderDetailsRefundDescription(order, orderStatusId);
  addOrderDetailsRefundDeclinedDescription(order);
  addOrderDetailsRefundDeclinedButtonClickListener(order, orderStatusId);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsRefundDeclinedModal = orderStatusId => {
  // ELEMENTS
  const orderDetailsRefundDeclinedModalHeader = orderDetailsModalHeader;
  const orderDetailsRefundDeclinedModalFooter =
    "<div id='refund_declined_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_declined_continue_order_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Continue Order</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_declined_end_request_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>End Request</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='refund_declined_continue_order_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_declined_continue_order_confirm_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_declined_continue_order_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='refund_declined_end_request_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_declined_end_request_confirm_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_declined_end_request_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  const orderDetailsRefundDeclinedModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsRefundDeclinedModalHeader,
    orderDetailsRefundDeclinedModalFooter
  );
  // CSS
  const orderDetailsRefundDeclinedModalMobileHeight = 90;
  const orderDetailsRefundDeclinedModalMobileWidth = 90;
  const orderDetailsRefundDeclinedModalDesktopHeight = 90;
  const orderDetailsRefundDeclinedModalDesktopWidth = 60;
  const orderDetailsRefundDeclinedModalFooterHeight = 14;
  const orderDetailsRefundDeclinedModalCSSObject = new modalCSSObject(
    orderDetailsRefundDeclinedModalMobileHeight,
    orderDetailsRefundDeclinedModalMobileWidth,
    orderDetailsRefundDeclinedModalDesktopHeight,
    orderDetailsRefundDeclinedModalDesktopWidth,
    orderDetailsRefundDeclinedModalFooterHeight
  );

  addModal(
    orderDetailsRefundDeclinedModalElementObject,
    orderDetailsRefundDeclinedModalCSSObject
  );
};

/* ========================================== CONTENTS ========================================== */

const addOrderDetailsRefundDeclinedDescription = order => {
  addOrderDetailsRefundDeclinedReasonForDecline(order);
  // Apply Auto Complete Timer
  orderDetailsRefundProcessedAutoCompleteTimer(order);
  const refundDeclinedAutoCompleteOrderTimer = setInterval(() => {
    orderDetailsRefundProcessedAutoCompleteTimer(order);
  }, 1000);
  // Remove Interval when Order Details is closed
  document
    .querySelector("#refund_declined_backdrop")
    .addEventListener("click", () => {
      clearInterval(refundDeclinedAutoCompleteOrderTimer);
    });
};

/* ------------------------------------- REASON FOR DECLINE ------------------------------------- */

const addOrderDetailsRefundDeclinedReasonForDecline = order => {
  const reason = order.requestRefundInformation.declineMessage;

  const reasonForDecline =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Reason For Decline:" +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body order_status_description_sub_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    reason +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Your refund request will automatically be declared 'processed' in:" +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body order_status_description_sub_details_body'>" +
    "<div id='order_details_refund_approved_declined_auto_complete_timer' class='order_status_description_details_text'></div>" +
    "</div>";

  document
    .querySelector("#refund_declined_order_status_description_body")
    .insertAdjacentHTML("beforeend", reasonForDecline);
};

/* =================================== BUTTON CLICK LISTENER ==================================== */

const addOrderDetailsRefundDeclinedButtonClickListener = (
  order,
  orderStatusId
) => {
  /* -------------------------------------- CONTINUE ORDER -------------------------------------- */

  // MAIN
  document
    .querySelector("#refund_declined_continue_order_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsRefundDeclinedContinueOrder();
    });
  // CONFIRM
  document
    .querySelector("#refund_declined_continue_order_confirm_footer_button")
    .addEventListener("click", () => {
      orderDetailsCancelRefundRequest(order.orderNumber, orderStatusId);
    });
  // CANCEL
  document
    .querySelector("#refund_declined_continue_order_cancel_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsRefundDeclinedContinueOrder();
    });

  /* --------------------------------------- END REQUEST ---------------------------------------- */

  // MAIN
  document
    .querySelector("#refund_declined_end_request_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsRefundDeclinedEndRequest();
    });
  // CONFIRM
  document
    .querySelector("#refund_declined_end_request_confirm_footer_button")
    .addEventListener("click", () => {
      orderDetailsUpdateRefundApprovedDeclined(order.orderNumber);
    });
  // CANCEL
  document
    .querySelector("#refund_declined_end_request_cancel_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsRefundDeclinedEndRequest();
    });
};

/* ----------------------------------- TOGGLE CONTINUE ORDER ------------------------------------ */

const toggleOrderDetailsRefundDeclinedContinueOrder = () => {
  document
    .querySelector("#refund_declined_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#refund_declined_continue_order_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

/* ------------------------------------- TOGGLE END REQUEST ------------------------------------- */

const toggleOrderDetailsRefundDeclinedEndRequest = () => {
  document
    .querySelector("#refund_declined_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#refund_declined_end_request_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

/* ============================================================================================== */
