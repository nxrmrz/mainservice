/* ======================================= INITIALISATION ======================================= */

const refundProcessedInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsRefundProcessedModal(orderStatusId);
  constructHTMLStructure(orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  addOrderDetailsRefundDescription(order, orderStatusId);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsRefundProcessedModal = orderStatusId => {
  // ELEMENTS
  const orderDetailsRefundProcessedModalHeader = orderDetailsModalHeader;
  const orderDetailsRefundProcessedModalFooter = "";

  const orderDetailsRefundProcessedModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsRefundProcessedModalHeader,
    orderDetailsRefundProcessedModalFooter
  );
  // CSS
  const orderDetailsRefundProcessedModalMobileHeight = 90;
  const orderDetailsRefundProcessedModalMobileWidth = 90;
  const orderDetailsRefundProcessedModalDesktopHeight = 90;
  const orderDetailsRefundProcessedModalDesktopWidth = 60;
  const orderDetailsRefundProcessedModalFooterHeight = 0;
  const orderDetailsRefundProcessedModalCSSObject = new modalCSSObject(
    orderDetailsRefundProcessedModalMobileHeight,
    orderDetailsRefundProcessedModalMobileWidth,
    orderDetailsRefundProcessedModalDesktopHeight,
    orderDetailsRefundProcessedModalDesktopWidth,
    orderDetailsRefundProcessedModalFooterHeight
  );

  addModal(
    orderDetailsRefundProcessedModalElementObject,
    orderDetailsRefundProcessedModalCSSObject
  );
};

/* ============================================================================================== */
