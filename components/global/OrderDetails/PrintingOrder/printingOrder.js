/* ======================================= INITIALISATION ======================================= */

const printingOrderInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsPrintingOrderModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  printingOrderDescriptionBodyDetails(order);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsPrintingOrderModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsPrintingOrderModalHeader = orderDetailsModalHeader;
  const orderDetailsPrintingOrderModalFooter =
    "<div id='printing_order_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='printing_order_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  const orderDetailsPrintingOrderModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsPrintingOrderModalHeader,
    orderDetailsPrintingOrderModalFooter
  );
  // CSS
  const orderDetailsPrintingOrderModalMobileHeight = 90;
  const orderDetailsPrintingOrderModalMobileWidth = 90;
  const orderDetailsPrintingOrderModalDesktopHeight = 90;
  const orderDetailsPrintingOrderModalDesktopWidth = 60;
  const orderDetailsPrintingOrderModalFooterHeight = 14;
  const orderDetailsPrintingOrderModalCSSObject = new modalCSSObject(
    orderDetailsPrintingOrderModalMobileHeight,
    orderDetailsPrintingOrderModalMobileWidth,
    orderDetailsPrintingOrderModalDesktopHeight,
    orderDetailsPrintingOrderModalDesktopWidth,
    orderDetailsPrintingOrderModalFooterHeight
  );

  addModal(
    orderDetailsPrintingOrderModalElementObject,
    orderDetailsPrintingOrderModalCSSObject
  );

  /* ------------------------------------ ADD REQUEST REFUND ------------------------------------ */

  const orderNumber = order.orderNumber;

  orderDetailsRequestRefundInit(orderNumber, orderStatusId);
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const printingOrderDescriptionBodyDetails = order => {
  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "We are now printing your order!" +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "The estimated printing time is: " +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div id='order_status_description_details_estimated_printing_time_text' class='order_status_description_details_text'></div>" +
    "</div>";

  document
    .querySelector("#printing_order_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);

  printingOrderEstimatedPrintingTime(order);

  const timer = setInterval(() => {
    printingOrderEstimatedPrintingTime(order);
  }, 60000);

  document
    .querySelector("#printing_order_backdrop")
    .addEventListener("click", () => {
      clearInterval(timer);
    });
};

/* ================================= ESTIMATED COMPLETION TIME ================================== */

const printingOrderEstimatedPrintingTime = order => {
  let deadline;
  const dateObject = dateFormatter(order.paymentConfirmationDate);
  let numberOfDays;
  switch (order.pricing) {
    case "Basic":
      numberOfDays = 5;
      break;
    case "Priority":
      numberOfDays = 3;
      break;
    case "Urgent":
      numberOfDays = 1;
      break;
  }
  deadline = moment(order.paymentConfirmationDate).add(numberOfDays, "d");
  const currentDate = new Date();
  const estimatedPrintingTimeDefault = moment(deadline).diff(
    currentDate,
    "minutes"
  );
  const estimatedPrintingTimeDays = Math.floor(
    estimatedPrintingTimeDefault / (24 * 60)
  );
  const estimatedPrintingTimeHours = Math.floor(
    (estimatedPrintingTimeDefault % (24 * 60)) / 60
  );
  const estimatedPrintingTimeMinutes = estimatedPrintingTimeDefault % 60;
  let estimatedPrintingTime;
  if (estimatedPrintingTimeDefault > 0) {
    if (estimatedPrintingTimeDays > 0) {
      estimatedPrintingTime =
        estimatedPrintingTimeDays +
        " day(s) " +
        estimatedPrintingTimeHours +
        " hour(s) " +
        estimatedPrintingTimeMinutes +
        "  minute(s)";
    } else if (estimatedPrintingTimeHours > 0) {
      estimatedPrintingTime =
        estimatedPrintingTimeHours +
        " hour(s) " +
        estimatedPrintingTimeMinutes +
        " minute(s) ";
    } else {
      estimatedPrintingTime = estimatedPrintingTimeMinutes + " minute(s) ";
    }
  }

  document.querySelector(
    "#order_status_description_details_estimated_printing_time_text"
  ).innerHTML = "<strong>" + estimatedPrintingTime + "</strong>";
};

/* ============================================================================================== */
