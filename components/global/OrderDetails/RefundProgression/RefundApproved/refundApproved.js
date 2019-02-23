/* ======================================= INITIALISATION ======================================= */

const refundApprovedInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsRefundApprovedModal(orderStatusId);
  constructHTMLStructure(orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  addOrderDetailsRefundDescription(order, orderStatusId);
  addOrderDetailsRefundApprovedDescription(order);
  addOrderDetailsRefundApprovedButtonClickListener(order, orderStatusId);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsRefundApprovedModal = orderStatusId => {
  // ELEMENTS
  const orderDetailsRefundApprovedModalHeader = orderDetailsModalHeader;
  const orderDetailsRefundApprovedModalFooter =
    "<div id='refund_approved_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_approved_end_request_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>End Request</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='refund_approved_end_request_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_approved_end_request_confirm_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='refund_approved_end_request_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  const orderDetailsRefundApprovedModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsRefundApprovedModalHeader,
    orderDetailsRefundApprovedModalFooter
  );
  // CSS
  const orderDetailsRefundApprovedModalMobileHeight = 90;
  const orderDetailsRefundApprovedModalMobileWidth = 90;
  const orderDetailsRefundApprovedModalDesktopHeight = 90;
  const orderDetailsRefundApprovedModalDesktopWidth = 60;
  const orderDetailsRefundApprovedModalFooterHeight = 14;
  const orderDetailsRefundApprovedModalCSSObject = new modalCSSObject(
    orderDetailsRefundApprovedModalMobileHeight,
    orderDetailsRefundApprovedModalMobileWidth,
    orderDetailsRefundApprovedModalDesktopHeight,
    orderDetailsRefundApprovedModalDesktopWidth,
    orderDetailsRefundApprovedModalFooterHeight
  );

  addModal(
    orderDetailsRefundApprovedModalElementObject,
    orderDetailsRefundApprovedModalCSSObject
  );
};

/* ========================================== CONTENTS ========================================== */

const addOrderDetailsRefundApprovedDescription = order => {
  addOrderDetailsRefundApprovedDescriptionApproveMessage(order);
  // Apply Auto Complete Timer
  orderDetailsRefundProcessedAutoCompleteTimer(order);
  const refundApprovedAutoCompleteOrderTimer = setInterval(() => {
    orderDetailsRefundProcessedAutoCompleteTimer(order);
  }, 1000);
  // Remove Interval when Order Details is closed
  document
    .querySelector("#refund_approved_backdrop")
    .addEventListener("click", () => {
      clearInterval(refundApprovedAutoCompleteOrderTimer);
    });
};

/* ------------------------------------- REASON FOR DECLINE ------------------------------------- */

const addOrderDetailsRefundApprovedDescriptionApproveMessage = order => {
  const approveMessage =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Your refund request has been approved! We have sent the specified 'Refund Value' to the specified 'Bank Number'." +
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
    .querySelector("#refund_approved_order_status_description_body")
    .insertAdjacentHTML("beforeend", approveMessage);
};

/* =================================== BUTTON CLICK LISTENER ==================================== */

const addOrderDetailsRefundApprovedButtonClickListener = (
  order,
  orderStatusId
) => {
  /* --------------------------------------- END REQUEST ---------------------------------------- */

  // MAIN
  document
    .querySelector("#refund_approved_end_request_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsRefundApprovedEndRequest();
    });
  // CONFIRM
  document
    .querySelector("#refund_approved_end_request_confirm_footer_button")
    .addEventListener("click", () => {
      orderDetailsUpdateRefundApprovedDeclined(order.orderNumber);
    });
  // CANCEL
  document
    .querySelector("#refund_approved_end_request_cancel_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsRefundApprovedEndRequest();
    });
};

/* ------------------------------------- TOGGLE END REQUEST ------------------------------------- */

const toggleOrderDetailsRefundApprovedEndRequest = () => {
  document
    .querySelector("#refund_approved_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#refund_approved_end_request_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

/* ============================================================================================== */
