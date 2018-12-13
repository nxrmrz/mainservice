/* ======================================= INITIALISATION ======================================= */

const awaitingPaymentInit = order => {
  const orderStatusId = constructOrderStatusId(order.orderStatus);
  constructOrderDetailsAwaitingPaymentModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  awaitingPaymentDescriptionBodyDetails(order);
};

const constructOrderDetailsAwaitingPaymentModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsAwaitingPaymentModalHeader = orderDetailsModalHeader;
  const orderDetailsAwaitingPaymentModalFooter =
    "<div id='awaiting_payment_footer_buttons_body' class='order_details_footer_buttons_body awaiting_payment_footer_buttons_body_close awaiting_payment_footer_buttons_body_open'>" +
    "<div id='order_details_payed_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Payed</div>" +
    "</div>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Order</div>" +
    "</div>" +
    "</div>" +
    "<div id='awaiting_payment_pre_submit_contents_body' class='order_details_footer_buttons_body awaiting_payment_pre_submit_contents_body_close'>" +
    "<div id='order_details_payed_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "<div id='order_details_payed_cancel_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>";
  const orderDetailsAwaitingPaymentModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsAwaitingPaymentModalHeader,
    orderDetailsAwaitingPaymentModalFooter
  );
  // CSS
  const orderDetailsAwaitingPaymentModalMobileHeight = 90;
  const orderDetailsAwaitingPaymentModalMobileWidth = 90;
  const orderDetailsAwaitingPaymentModalDesktopHeight = 90;
  const orderDetailsAwaitingPaymentModalDesktopWidth = 60;
  const orderDetailsAwaitingPaymentModalFooterHeight = 14;
  const orderDetailsAwaitingPaymentModalCSSObject = new modalCSSObject(
    orderDetailsAwaitingPaymentModalMobileHeight,
    orderDetailsAwaitingPaymentModalMobileWidth,
    orderDetailsAwaitingPaymentModalDesktopHeight,
    orderDetailsAwaitingPaymentModalDesktopWidth,
    orderDetailsAwaitingPaymentModalFooterHeight
  );

  addModal(
    orderDetailsAwaitingPaymentModalElementObject,
    orderDetailsAwaitingPaymentModalCSSObject
  );

  /* FOOTER BUTTON CLICK LISTENER */
  document
    .querySelector("#order_details_payed_button")
    .addEventListener("click", () => {
      awaitingPaymentPayed();
    });
  document
    .querySelector("#order_details_payed_cancel_confirm_button")
    .addEventListener("click", () => {
      awaitingPaymentPayed();
    });
  document
    .querySelector("#order_details_payed_confirm_button")
    .addEventListener("click", () => {
      awaitingPaymentPayedConfirm(order, orderStatusId);
    });
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const awaitingPaymentDescriptionBodyDetails = order => {
  $.ajax({
    type: "GET",
    url: "/Profile/profile-details",
    async: false,
    data: JSON.stringify(order),
    contentType: "application/json",
    success: data => {
      const initials =
        data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase();

      const details =
        "Before we begin 3D printing, please proceed with the payment by following the instructions below:";
      const instructionOne =
        "Using bank transfer, pay the specified amount of <strong>$" +
        orderDetailsTotalOrderPrice +
        "</strong> to <strong>12-3287-0320549-00</strong>";
      const instructionTwo =
        "Include the order number (<strong>" +
        order.orderNumber +
        "</strong>) and your initials (<strong>" +
        initials +
        "</strong>) in the reference";
      const instructionThree =
        "After making the payment, press 'Payed' to update your order's status and notify us";

      const orderStatusDescriptionBodyDetailsHTML =
        "<div class='order_status_description_details_body'>" +
        "<div class='order_status_description_details_text'>" +
        details +
        "</div>" +
        "</div>" +
        "<div class='order_details_awaiting_payment_instruction_body'>" +
        "<div class='order_details_awaiting_payment_instruction_number'>" +
        "1." +
        "</div>" +
        "<div class='order_details_awaiting_payment_instruction_text'>" +
        instructionOne +
        "</div>" +
        "</div>" +
        "<div class='order_details_awaiting_payment_instruction_body'>" +
        "<div class='order_details_awaiting_payment_instruction_number'>" +
        "2." +
        "</div>" +
        "<div class='order_details_awaiting_payment_instruction_text'>" +
        instructionTwo +
        "</div>" +
        "</div>" +
        "<div class='order_details_awaiting_payment_instruction_body'>" +
        "<div class='order_details_awaiting_payment_instruction_number'>" +
        "3." +
        "</div>" +
        "<div class='order_details_awaiting_payment_instruction_text'>" +
        instructionThree +
        "</div>" +
        "</div>";

      document
        .querySelector("#awaiting_payment_order_status_description_body")
        .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
    }
  });
};

/* ======================================== PAYED BUTTON ======================================== */

const awaitingPaymentPayed = () => {
  // Set new CSS
  document
    .querySelector("#awaiting_payment_footer_buttons_body")
    .classList.toggle("awaiting_payment_footer_buttons_body_open");

  document
    .querySelector("#awaiting_payment_pre_submit_contents_body")
    .classList.toggle("awaiting_payment_pre_submit_contents_body_open");
};

const awaitingPaymentPayedConfirm = (order, modalId) => {
  loadLoader(document.querySelector("#awaiting_payment_modal_body")).then(
    () => {
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
    }
  );
};

/* ============================================================================================== */
