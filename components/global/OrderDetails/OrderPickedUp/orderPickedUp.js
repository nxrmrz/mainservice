/* ======================================= INITIALISATION ======================================= */

const orderPickedUpInit = order => {
  const orderStatusId = constructOrderStatusId(order.orderStatus);
  constructOrderDetailsOrderPickedUpModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  orderPickedUpDescriptionBodyDetails(order);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsOrderPickedUpModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsOrderPickedUpModalHeader = orderDetailsModalHeader;
  const orderDetailsOrderPickedUpModalFooter =
    "<div id='order_picked_up_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_picked_up_complete_order_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Complete Order</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_picked_up_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='order_picked_up_complete_order_footer_buttons_body' class='order_details_footer_buttons_body order_picked_up_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_details_order_completed_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_picked_up_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  const orderDetailsOrderPickedUpModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsOrderPickedUpModalHeader,
    orderDetailsOrderPickedUpModalFooter
  );
  // CSS
  const orderDetailsOrderPickedUpModalMobileHeight = 90;
  const orderDetailsOrderPickedUpModalMobileWidth = 90;
  const orderDetailsOrderPickedUpModalDesktopHeight = 90;
  const orderDetailsOrderPickedUpModalDesktopWidth = 60;
  const orderDetailsOrderPickedUpModalFooterHeight = 14;
  const orderDetailsOrderPickedUpModalCSSObject = new modalCSSObject(
    orderDetailsOrderPickedUpModalMobileHeight,
    orderDetailsOrderPickedUpModalMobileWidth,
    orderDetailsOrderPickedUpModalDesktopHeight,
    orderDetailsOrderPickedUpModalDesktopWidth,
    orderDetailsOrderPickedUpModalFooterHeight
  );

  addModal(
    orderDetailsOrderPickedUpModalElementObject,
    orderDetailsOrderPickedUpModalCSSObject
  );

  /* FOOTER BUTTON CLICK LISTENER */
  document
    .querySelector("#order_picked_up_complete_order_footer_button")
    .addEventListener("click", () => {
      orderPickedUpCompleteOrderButton();
    });
  document
    .querySelector("#order_picked_up_cancel_footer_button")
    .addEventListener("click", () => {
      orderPickedUpCompleteOrderButton();
    });
  document
    .querySelector("#order_details_order_completed_confirm_button")
    .addEventListener("click", () => {
      orderPickedUpCompleteOrderConfirm(order, orderStatusId);
    });

  /* ------------------------------------ ADD REQUEST REFUND ------------------------------------ */

  const orderNumber = order.orderNumber;

  orderDetailsRequestRefundInit(orderNumber, orderStatusId);
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const orderPickedUpDescriptionBodyDetails = order => {
  const detailOne = "Your order will automatically be declared 'Completed' in:";
  const detailTwo =
    "You can also press 'Complete Order' if you believe that the order has been fully fulfilled";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    detailOne +
    "</div>" +
    "</div>" +
    "<div id='order_details_order_picked_up_order_autocomplete_timer_body'>" +
    "<div id='order_details_order_picked_up_order_autocomplete_timer_text'></div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    detailTwo +
    "</div>" +
    "</div>";

  document
    .querySelector("#order_picked_up_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);

  // Apply Auto Complete Timer
  orderDetailsOrderPickedUpAutoCompleteTimer(order);
  autoCompleteOrderTimer = setInterval(() => {
    orderDetailsOrderPickedUpAutoCompleteTimer(order);
  }, 1000);
  // Remove Interval when Order Details is closed
  document
    .querySelector("#order_picked_up_backdrop")
    .addEventListener("click", () => {
      clearInterval(autoCompleteOrderTimer);
    });
};

/* ================================== ORDER AUTOCOMPLETE TIMER ================================== */

let autoCompleteOrderTimer;

const orderDetailsOrderPickedUpAutoCompleteTimer = order => {
  const dateOfAutoComplete = moment(order.orderDeliveryDate).add(5, "days");
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
    "#order_details_order_picked_up_order_autocomplete_timer_text"
  ).innerHTML = timerMessage;
};

/* ======================================= COMPLETE ORDER ======================================= */

const orderPickedUpCompleteOrderButton = () => {
  // Set new CSS
  document
    .querySelector("#order_picked_up_footer_buttons_body")
    .classList.toggle("order_picked_up_footer_buttons_body_open");

  document
    .querySelector("#order_picked_up_complete_order_footer_buttons_body")
    .classList.toggle("order_picked_up_footer_buttons_body_open");
};

const orderPickedUpCompleteOrderConfirm = (order, modalId) => {
  loadLoader(document.querySelector("#order_picked_up_modal_body")).then(() => {
    clearInterval(autoCompleteOrderTimer);

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
