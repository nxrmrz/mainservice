/* ======================================= INITIALISATION ======================================= */

const orderCompletedInit = order => {
  const orderStatusId = constructOrderStatusId(order.orderStatus);
  constructOrderDetailsOrderCompletedModal(orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  orderCompletedDescriptionBodyDetails();
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsOrderCompletedModal = orderStatusId => {
  // ELEMENTS
  const orderDetailsOrderCompletedModalHeader = orderDetailsModalHeader;
  const orderDetailsOrderCompletedModalFooter = "";
  const orderDetailsOrderCompletedModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsOrderCompletedModalHeader,
    orderDetailsOrderCompletedModalFooter
  );
  // CSS
  const orderDetailsOrderCompletedModalMobileHeight = 90;
  const orderDetailsOrderCompletedModalMobileWidth = 90;
  const orderDetailsOrderCompletedModalDesktopHeight = 90;
  const orderDetailsOrderCompletedModalDesktopWidth = 60;
  const orderDetailsOrderCompletedModalFooterHeight = 0;
  const orderDetailsOrderCompletedModalCSSObject = new modalCSSObject(
    orderDetailsOrderCompletedModalMobileHeight,
    orderDetailsOrderCompletedModalMobileWidth,
    orderDetailsOrderCompletedModalDesktopHeight,
    orderDetailsOrderCompletedModalDesktopWidth,
    orderDetailsOrderCompletedModalFooterHeight
  );

  addModal(
    orderDetailsOrderCompletedModalElementObject,
    orderDetailsOrderCompletedModalCSSObject
  );
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const orderCompletedDescriptionBodyDetails = () => {
  const details = "";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    details +
    "</div>" +
    "</div>";

  document
    .querySelector("#order_completed_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
};

/* ============================================================================================== */
