/* ======================================= INITIALISATION ======================================= */

const orderPickedUpInit = order => {
  orderProgressionOrderPickedUpModal(order);
  orderProgressionOrderPickedUpStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionOrderPickedUpModal = order => {
  const modalFooter =
    "<div id='order_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_picked_up_complete_order_footer_button' class='order_details_footer_button'>" +
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

  orderModal(modalFooter, order);
};

/* ========================================= STRUCTURE ========================================== */

const orderProgressionOrderPickedUpStructure = order => {
  // CREATE HTML
  const html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>Your order will automatically be declared 'Completed' in:</div>" +
    "</div>" +
    "<div class='order_description_content_paragraph_body'>" +
    "<div id='order_description_content_autocomplete_timer' class='order_description_content_paragraph'></div>" +
    "</div>" +
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>You can also press 'Complete Order' if you believe that the order has been fully fulfilled.</div>" +
    "</div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
  // POPULATE CONTENTS
  // Print Timer
  orderProgressionOrderPickedUpAutocompleteTime(order);
  const timer = setInterval(() => {
    orderProgressionOrderPickedUpAutocompleteTime(order);
  }, 1000);
  // Delete Interval Upon Closure
  document.querySelector("#order_backdrop").addEventListener("click", () => {
    clearInterval(timer);
  });
  // EVENT LISTENER
  orderProgressionOrderPickedUpEventListener(order, timer);
  // REQUEST REFUND
  orderRequestRefundInit(order);
};

/* ===================================== AUTOCOMPLETE TIMER ===================================== */

const orderProgressionOrderPickedUpAutocompleteTime = order => {
  // SET CURRENT DATE
  const currentDate = moment();
  // SET DEADLINE
  const deadline = moment(order.orderDeliveryDate).add(5, "d");
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

const orderProgressionOrderPickedUpEventListener = (order, timer) => {
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
      orderPickedUpCompleteOrderConfirm(order, timer);
    });
};

/* ======================================= COMPLETE ORDER ======================================= */

const orderPickedUpCompleteOrderButton = () => {
  // Set new CSS
  document
    .querySelector("#order_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#order_footer_confirm_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

const orderPickedUpCompleteOrderConfirm = (orderDetails, timer) => {
  loadLoader(document.querySelector("#order_modal_body")).then(() => {
    clearInterval(timer);

    $.ajax({
      type: "POST",
      url: "/order/update-order-status",
      contentType: "application/json",
      data: JSON.stringify({ orderDetails }),
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
