/* ======================================= INITIALISATION ======================================= */

const awaitingQuoteInit = order => {
  const orderStatusId = constructOrderStatusId(order.orderStatus);
  constructOrderDetailsAwaitingQuoteModal(orderStatusId);
  constructHTMLStructure(orderStatusId);
  awaitingQuoteOrderStatusDescriptionBody(order, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsAwaitingQuoteModal = orderStatusId => {
  // ELEMENTS
  const orderDetailsAwaitingQuoteModalHeader = orderDetailsModalHeader;
  const orderDetailsAwaitingQuoteModalFooter =
    "<div class='order_details_footer_buttons_body'>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Order</div>" +
    "</div>" +
    "</div>";
  const orderDetailsAwaitingQuoteModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsAwaitingQuoteModalHeader,
    orderDetailsAwaitingQuoteModalFooter
  );
  // CSS
  const orderDetailsAwaitingQuoteModalMobileHeight = 90;
  const orderDetailsAwaitingQuoteModalMobileWidth = 90;
  const orderDetailsAwaitingQuoteModalDesktopHeight = 90;
  const orderDetailsAwaitingQuoteModalDesktopWidth = 60;
  const orderDetailsAwaitingQuoteModalFooterHeight = 14;
  const orderDetailsAwaitingQuoteModalCSSObject = new modalCSSObject(
    orderDetailsAwaitingQuoteModalMobileHeight,
    orderDetailsAwaitingQuoteModalMobileWidth,
    orderDetailsAwaitingQuoteModalDesktopHeight,
    orderDetailsAwaitingQuoteModalDesktopWidth,
    orderDetailsAwaitingQuoteModalFooterHeight
  );

  addModal(
    orderDetailsAwaitingQuoteModalElementObject,
    orderDetailsAwaitingQuoteModalCSSObject
  );
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const awaitingQuoteOrderStatusDescriptionBody = (order, orderStatusId) => {
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  awaitingQuoteDescriptionBodyDetails();
};

const awaitingQuoteDescriptionBodyDetails = () => {
  const details =
    "Please wait while we analyse and generate a quote for your order.";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    details +
    "</div>" +
    "</div>";

  document
    .querySelector("#awaiting_quote_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
};

/* ============================================================================================== */
