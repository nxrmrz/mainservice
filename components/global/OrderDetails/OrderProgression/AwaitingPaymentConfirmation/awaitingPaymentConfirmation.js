/* ======================================= INITIALISATION ======================================= */

const awaitingPaymentConfirmationInit = order => {
  orderProgressionAwaitingPaymentConfirmationModal(order);
  orderProgressionAwaitingPaymentConfirmationStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionAwaitingPaymentConfirmationModal = order => {
  const modalFooter =
    "<div id='order_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  orderModal(modalFooter, order);
};

/* ========================================== STRUCTURE ========================================= */

const orderProgressionAwaitingPaymentConfirmationStructure = order => {
  // CREATE HTML
  html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>Please wait while we verify your payment. We appreciate your patience!</div>" +
    "</div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;

  orderRequestRefundInit(order);
};

/* ============================================================================================== */
