/* ======================================= INITIALISATION ======================================= */

const adminAwaitingPaymentConfirmationInit = order => {
  const orderStatusId = "admin_" + constructOrderStatusId(order.orderStatus);
  constructAdminOrderDetailsAwaitingPaymentConfirmationModal(
    order,
    orderStatusId
  );
  constructAdminAwaitingPaymentConfirmationDescriptionBodyDetails(order);
};

/* =========================================== MODAL ============================================ */

const constructAdminOrderDetailsAwaitingPaymentConfirmationModal = (
  order,
  orderStatusId
) => {
  // ELEMENTS
  const modalHeader = adminOrderDetailsModalHeader;
  const modalFooter =
    "<div id='admin_order_details_awaiting_payment_confirmation_buttons_body' class='admin_order_details_footer_buttons_body'>" +
    "<div id='admin_order_details_payment_confirmed_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Payment Confirmed</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_order_details_awaiting_payment_confirmation_order_status_update_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close'>" +
    "<div id='admin_order_details_payment_confirmed_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "<div id='admin_order_details_payment_confirmed_cancel_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>";
  const modalElementObject = new ModalElementObject(
    orderStatusId,
    modalHeader,
    modalFooter
  );
  // CSS
  const modalMobileHeight = 90;
  const modalMobileWidth = 90;
  const modalDesktopHeight = 90;
  const modalDesktopWidth = 60;
  const modalFooterHeight = 14;
  const modalCSSObject = new ModalCSSObject(
    modalMobileHeight,
    modalMobileWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );

  addModal(modalElementObject, modalCSSObject);

  document
    .querySelector("#admin_order_details_payment_confirmed_button")
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingPaymentConfirmationToggleFooterButtons();
    });

  document
    .querySelector(
      "#admin_order_details_payment_confirmed_cancel_confirm_button"
    )
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingPaymentConfirmationToggleFooterButtons();
    });

  document
    .querySelector("#admin_order_details_payment_confirmed_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingPaymentConfirmationUpdateOrderStatus(
        order,
        orderStatusId
      );
    });
};

/* ================ ADMIN: ORDER DETAILS: AWAITING PAYMENT CONFIRMATION CONTENTS ================ */

/* ----------------------------------------- BASE HTML ------------------------------------------ */

const constructAdminAwaitingPaymentConfirmationDescriptionBodyDetails = order => {
  const adminAwaitingPaymentConfirmationDescriptionBodyDetailsHTML =
    "<div class='admin_order_details_modal_body'>" +
    "<div id='admin_awaiting_payment_confirmation_order_summary_body'></div>" +
    "<div id='admin_awaiting_payment_confirmation_order_price_calculation_body'></div>" +
    "</div>";

  document.querySelector(
    "#admin_awaiting_payment_confirmation_modal_body"
  ).innerHTML = adminAwaitingPaymentConfirmationDescriptionBodyDetailsHTML;
  // CONTENTS
  partPriceCalculation(order).then(partsPriceObject => {
    pricingPriceCalculation(order).then(pricingPriceObject => {
      discountPriceCalculation(order).then(discountsPriceObject => {
        orderPriceCalculation(order).then(orderPriceObject => {
          deliveryPriceObject = deliveryPriceCalculation(order);
          // Summary
          adminAwaitingPaymentConfirmationSummary(
            order,
            orderPriceObject.orderPrice
          );
          adminAwaitingPaymentConfirmationCalculation(
            partsPriceObject,
            pricingPriceObject,
            discountsPriceObject,
            deliveryPriceObject,
            orderPriceObject
          );
        });
      });
    });
  });
};

/* ------------------------------------------ SUMMARY ------------------------------------------- */

const adminAwaitingPaymentConfirmationSummary = (order, orderPrice) => {
  getOrderOwnerDetails(true, order).then(owner => {
    const initials =
      owner.firstName[0].toUpperCase() + owner.lastName[0].toUpperCase();

    const adminAwaitingPaymentConfirmationOrderSummaryHTML =
      `<div class='admin_awaiting_payment_confirmation_order_summary'>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_row_header'>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Order No.</div>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Initials</div>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Total Price</div>` +
      `</div>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_row'>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_column'>${
        order.orderNumber
      }</div>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_column'>` +
      initials +
      `</div>` +
      `<div class='admin_awaiting_payment_confirmation_order_summary_column'>$${orderPrice}</div>` +
      `</div>` +
      `</div>`;

    document.querySelector(
      "#admin_awaiting_payment_confirmation_order_summary_body"
    ).innerHTML = adminAwaitingPaymentConfirmationOrderSummaryHTML;
  });
};

/* ---------------------------------------- CALCULATION ----------------------------------------- */

const adminAwaitingPaymentConfirmationCalculation = (
  partsPriceObject,
  pricingPriceObject,
  discountsPriceObject,
  deliveryPriceObject,
  orderPriceObject
) => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  let html = ``;
  // PARTS
  const totalPartsPrice = partsPriceObject.totalPrice;
  for (let i = 0; i < partsPriceObject.partPriceObjectArray.length; i++) {
    const partPriceObject = partsPriceObject.partPriceObjectArray[i];
    const quantity = partPriceObject.quantity;
    const name = partPriceObject.name;
    const totalPartPrice = partPriceObject.totalPrice;
    html +=
      `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
      `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>x${quantity} ${name} (@ $ per unit)</div>` +
      `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$${totalPartPrice}</div>` +
      `</div>`;
  }
  html +=
    `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>Parts Total</div>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$${totalPartsPrice}</div>` +
    `</div>`;
  // PRICING
  const pricingDetails = `Pricing: ${pricingPriceObject.pricing} (${
    pricingPriceObject.calculation
  })`;
  html +=
    `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>${pricingDetails}</div>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$${
      pricingPriceObject.pricingPrice
    }</div>` +
    `</div>`;
  // DISCOUNTS
  const totalDiscountsPrice = discountsPriceObject.totalDiscount;
  for (
    let i = 0;
    i < discountsPriceObject.discountPriceObjectArray.length;
    i++
  ) {
    const discountPriceObject =
      discountsPriceObject.discountPriceObjectArray[i];
    const name = discountPriceObject.name;
    const calculation = discountPriceObject.calculation;
    const discount = discountPriceObject.discount;
    html +=
      `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
      `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>${name} (${calculation})</div>` +
      `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>-$${discount}</div>` +
      `</div>`;
  }
  html +=
    `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>Discounts Total</div>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>-$${totalDiscountsPrice}</div>` +
    `</div>`;
  // DELIVERY
  html +=
    `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>Delivery: ${
      deliveryPriceObject.delivery
    }</div>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$${
      deliveryPriceObject.price
    }</div>` +
    `</div>`;
  // TOTAL
  html +=
    `<div class='admin_awaiting_payment_confirmation_price_calculation_row'>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>Order Total</div>` +
    `<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$${
      orderPriceObject.orderPrice
    }</div>` +
    `</div>`;
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#admin_awaiting_payment_confirmation_order_price_calculation_body"
  ).innerHTML = html;
};

/* =========================================== TOOLS ============================================ */

const getOrderOwnerDetails = (promise, order) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/order/owner-details",
        data: JSON.stringify(order),
        contentType: "application/json",
        success: data => {
          resolve(data);
        }
      });
    });
  } else {
    let orderDetails;

    $.ajax({
      type: "POST",
      async: false,
      url: "/order/owner-details",
      data: JSON.stringify(order),
      contentType: "application/json",
      success: data => {
        orderDetails = data;
      }
    });

    return orderDetails;
  }
};

/* ==================================== FOOTER BUTTON TOGGLE ==================================== */

const adminOrderDetailsAwaitingPaymentConfirmationToggleFooterButtons = () => {
  document
    .querySelector(
      "#admin_order_details_awaiting_payment_confirmation_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_close");

  document
    .querySelector(
      "#admin_order_details_awaiting_payment_confirmation_order_status_update_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_close");
};

/* ==================================== UPDATE ORDER STATUS ===================================== */

const adminOrderDetailsAwaitingPaymentConfirmationUpdateOrderStatus = (
  orderDetails,
  modalId
) => {
  loadLoader(
    document.querySelector("#admin_awaiting_payment_confirmation_modal_body")
  ).then(() => {
    $.ajax({
      type: "POST",
      url: "/order/update-order-status",
      data: JSON.stringify({ orderDetails }),
      contentType: "application/json",
      success: data => {
        removeModal(modalId);
        removeBackdrop(modalId);
        setTimeout(() => {
          viewAdminProfileOrdersPrintsOrderDetails(data.content.orderNumber);
        }, 500);
      }
    });
  });
};

/* ============================================================================================== */
