/* ======================================= INITIALISATION ======================================= */

const readyForShippingInit = order => {
  orderProgressionReadyForShippingModal(order);
  orderProgressionReadyForShippingStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionReadyForShippingModal = order => {
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

const orderProgressionReadyForShippingStructure = order => {
  // CREATE HTML
  html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>We have finished printing your order! We are now getting your 3D prints ready for shipping, we appreciate your patience.</div>" +
    "</div>" +
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>You'll receive an update with the tracking number after we send your order for shipping.</div>" +
    "</div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
  // REQUEST REFUND
  orderRequestRefundInit(order);
};

/* ============================================================================================== */
