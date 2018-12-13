/* ======================================= INITIALISATION ======================================= */

const readyForShippingInit = order => {
  const orderStatusId = constructOrderStatusId(order.orderStatus);
  constructOrderDetailsReadyForShippingModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  readyForShippingDescriptionBodyDetails();
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsReadyForShippingModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsReadyForShippingModalHeader = orderDetailsModalHeader;
  const orderDetailsReadyForShippingModalFooter =
    "<div id='ready_for_shipping_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='ready_for_shipping_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  const orderDetailsReadyForShippingModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsReadyForShippingModalHeader,
    orderDetailsReadyForShippingModalFooter
  );
  // CSS
  const orderDetailsReadyForShippingModalMobileHeight = 90;
  const orderDetailsReadyForShippingModalMobileWidth = 90;
  const orderDetailsReadyForShippingModalDesktopHeight = 90;
  const orderDetailsReadyForShippingModalDesktopWidth = 60;
  const orderDetailsReadyForShippingModalFooterHeight = 14;
  const orderDetailsReadyForShippingModalCSSObject = new modalCSSObject(
    orderDetailsReadyForShippingModalMobileHeight,
    orderDetailsReadyForShippingModalMobileWidth,
    orderDetailsReadyForShippingModalDesktopHeight,
    orderDetailsReadyForShippingModalDesktopWidth,
    orderDetailsReadyForShippingModalFooterHeight
  );

  addModal(
    orderDetailsReadyForShippingModalElementObject,
    orderDetailsReadyForShippingModalCSSObject
  );

  /* ------------------------------------ ADD REQUEST REFUND ------------------------------------ */

  const orderNumber = order.orderNumber;

  orderDetailsRequestRefundInit(orderNumber, orderStatusId);
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const readyForShippingDescriptionBodyDetails = () => {
  const details =
    "We have finished printing your order! We are now getting your 3D prints ready for shipping, we appreciate your patience. You'll receive an update after we send your order for shipping.";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    details +
    "</div>" +
    "</div>";

  document
    .querySelector("#ready_for_shipping_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
};

/* ============================================================================================== */
