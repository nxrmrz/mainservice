/* ======================================= INITIALISATION ======================================= */

const printingOrderInit = order => {
  orderProgressionPrintingOrderModal(order);
  orderProgressionPrintingOrderStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionPrintingOrderModal = order => {
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

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

/* ------------------------------------------ STRUCTURE ----------------------------------------- */

const orderProgressionPrintingOrderStructure = order => {
  // CREATE HTML
  const html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>We are now printing your order! The estimated printing time is:</div>" +
    "</div>" +
    "<div class='order_description_content_paragraph_body'>" +
    "<div id='order_description_content_print_time' class='order_description_content_paragraph'></div>" +
    "</div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
  // POPULATE CONTENTS
  // Print Timer
  orderOrderProgressionAwaitingPaymentPrintTime(order);
  const timer = setInterval(() => {
    orderOrderProgressionAwaitingPaymentPrintTime(order);
  }, 1000);
  // Delete Interval Upon Closure
  document.querySelector("#order_backdrop").addEventListener("click", () => {
    clearInterval(timer);
  });
  // REQUEST REFUND
  orderRequestRefundInit(order);
};

/* ------------------------------------------ CONTENTS ------------------------------------------ */

const orderOrderProgressionAwaitingPaymentPrintTime = order => {
  // SET CURRENT DATE
  const currentDate = moment();
  // SET NUMBER OF PRINTING DAYS
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
  // SET DEADLINE
  const deadline = moment(order.paymentConfirmationDate).add(numberOfDays, "d");
  // GET DATE DIFFERENCE OBJECT
  const dateDifference = momentDateDifference(currentDate, deadline);
  // CREATE TIMER TEXT
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
    "#order_description_content_print_time"
  ).innerHTML = timer;
};

/* ============================================================================================== */
