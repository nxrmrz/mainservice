/* ======================================= INITIALISATION ======================================= */

const adminAwaitingPaymentConfirmationInit = order => {
  const orderStatusId = "admin_" + constructOrderStatusId(order.orderStatus);
  constructAdminOrderDetailsAwaitingPaymentConfirmationModal(
    order,
    orderStatusId
  );
  constructAdminAwaitingPaymentConfirmationDescriptionBodyDetails();
  setAdminAwaitingPaymentConfirmationVariables(order);
  adminAwaitingPaymentConfirmationOrderPriceCalculation(
    adminAwaitingPaymentConfirmationOrderPartFileDetailsArray,
    order
  );
  adminAwaitingPaymentConfirmationOrderSummary(order);
};

/* =========================================== MODAL ============================================ */

const constructAdminOrderDetailsAwaitingPaymentConfirmationModal = (
  order,
  orderStatusId
) => {
  // ELEMENTS
  const adminOrderDetailsAwaitingPaymentConfirmationModalHeader = adminOrderDetailsModalHeader;
  const adminOrderDetailsAwaitingPaymentConfirmationModalFooter =
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
  const adminOrderDetailsAwaitingPaymentConfirmationModalElementObject = new modalElementObject(
    orderStatusId,
    adminOrderDetailsAwaitingPaymentConfirmationModalHeader,
    adminOrderDetailsAwaitingPaymentConfirmationModalFooter
  );
  // CSS
  const adminOrderDetailsAwaitingPaymentConfirmationModalMobileHeight = 90;
  const adminOrderDetailsAwaitingPaymentConfirmationModalMobileWidth = 90;
  const adminOrderDetailsAwaitingPaymentConfirmationModalDesktopHeight = 90;
  const adminOrderDetailsAwaitingPaymentConfirmationModalDesktopWidth = 60;
  const adminOrderDetailsAwaitingPaymentConfirmationModalFooterHeight = 14;
  const adminOrderDetailsAwaitingPaymentConfirmationModalCSSObject = new modalCSSObject(
    adminOrderDetailsAwaitingPaymentConfirmationModalMobileHeight,
    adminOrderDetailsAwaitingPaymentConfirmationModalMobileWidth,
    adminOrderDetailsAwaitingPaymentConfirmationModalDesktopHeight,
    adminOrderDetailsAwaitingPaymentConfirmationModalDesktopWidth,
    adminOrderDetailsAwaitingPaymentConfirmationModalFooterHeight
  );

  addModal(
    adminOrderDetailsAwaitingPaymentConfirmationModalElementObject,
    adminOrderDetailsAwaitingPaymentConfirmationModalCSSObject
  );

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

let adminAwaitingPaymentConfirmationOrderOwnerDetails;
let adminAwaitingPaymentConfirmationOrderPartFileDetailsArray;
let adminAwaitingPaymentConfirmationTotalOrderPrice;

const setAdminAwaitingPaymentConfirmationVariables = order => {
  adminAwaitingPaymentConfirmationOrderOwnerDetails = getOrderOwnerDetails(
    order
  );
  adminAwaitingPaymentConfirmationOrderPartFileDetailsArray = [];

  for (i = 0; i < order.parts.length; i++) {
    fileDetails = getOrderPartFileDetails(order.parts[i]);

    fileDetailsObject = new PartDetailsObject(
      adminOrderDetailsPartFileNameFormatter(order.parts[i].fileName),
      order.parts[i].orderQuantity,
      Number(fileDetails.metadata.price)
    );

    adminAwaitingPaymentConfirmationOrderPartFileDetailsArray.push(
      fileDetailsObject
    );
  }
};

/* ----------------------------------------- BASE HTML ------------------------------------------ */

const constructAdminAwaitingPaymentConfirmationDescriptionBodyDetails = () => {
  const adminAwaitingPaymentConfirmationDescriptionBodyDetailsHTML =
    "<div class='admin_order_details_modal_body'>" +
    "<div id='admin_awaiting_payment_confirmation_order_summary_body'></div>" +
    "<div id='admin_awaiting_payment_confirmation_order_price_calculation_body'></div>" +
    "</div>";

  document.querySelector(
    "#admin_awaiting_payment_confirmation_modal_body"
  ).innerHTML = adminAwaitingPaymentConfirmationDescriptionBodyDetailsHTML;
};

/* ------------------------------------------ SUMMARY ------------------------------------------- */

const adminAwaitingPaymentConfirmationOrderSummary = order => {
  const initials =
    adminAwaitingPaymentConfirmationOrderOwnerDetails.firstName[0].toUpperCase() +
    adminAwaitingPaymentConfirmationOrderOwnerDetails.lastName[0].toUpperCase();

  const adminAwaitingPaymentConfirmationOrderSummaryHTML =
    "<div class='admin_awaiting_payment_confirmation_order_summary'>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_row_header'>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Order No.</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Initials</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Total Price</div>" +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_row'>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column'>" +
    order.orderNumber +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column'>" +
    initials +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column'>$" +
    adminAwaitingPaymentConfirmationTotalOrderPrice +
    "</div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#admin_awaiting_payment_confirmation_order_summary_body"
  ).innerHTML = adminAwaitingPaymentConfirmationOrderSummaryHTML;
};

/* ---------------------------------------- CALCULATION ----------------------------------------- */

const adminAwaitingPaymentConfirmationOrderPriceCalculation = (
  partFileDetailsArray,
  order
) => {
  let totalPartsPrice = 0;
  for (i = 0; i < partFileDetailsArray.length; i++) {
    const totalPartPrice =
      partFileDetailsArray[i].pricePerUnit *
      partFileDetailsArray[i].orderQuantity;
    const adminAwaitingPaymentConfirmationOrderPartFileDetailsHTML =
      "<div class='admin_awaiting_payment_confirmation_price_calculation_row'>" +
      "<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>x" +
      partFileDetailsArray[i].orderQuantity +
      " " +
      partFileDetailsArray[i].fileName +
      " (@ $" +
      partFileDetailsArray[i].pricePerUnit +
      " per unit)</div>" +
      "<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$" +
      totalPartPrice +
      "</div>" +
      "</div>";

    totalPartsPrice = totalPartsPrice + totalPartPrice;

    document
      .querySelector(
        "#admin_awaiting_payment_confirmation_order_price_calculation_body"
      )
      .insertAdjacentHTML(
        "beforeend",
        adminAwaitingPaymentConfirmationOrderPartFileDetailsHTML
      );
  }

  const adminAwaitingPaymentConfirmationOrderTotalPartsPriceHTML =
    "<div class='admin_awaiting_payment_confirmation_price_calculation_row'>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>Parts Total</div>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$" +
    totalPartsPrice +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#admin_awaiting_payment_confirmation_order_price_calculation_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      adminAwaitingPaymentConfirmationOrderTotalPartsPriceHTML
    );

  let pricingDetails;
  let pricingPrice;

  if (order.pricing == "Basic") {
    pricingDetails = "Pricing: Basic (0% x $" + totalPartsPrice + ")";
    pricingPrice = totalPartsPrice * 0;
  } else if (order.pricing == "Priority") {
    pricingDetails = "Pricing: Priority (25% x $" + totalPartsPrice + ")";
    pricingPrice = totalPartsPrice * 0.25;
  } else if (order.pricing == "Urgent") {
    pricingDetails = "Pricing: Urgent (50% x $" + totalPartsPrice + ")";
    pricingPrice = totalPartsPrice * 0.5;
  }

  const adminAwaitingPaymentConfirmationOrderPricingHTML =
    "<div class='admin_awaiting_payment_confirmation_price_calculation_row'>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>" +
    pricingDetails +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$" +
    pricingPrice +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#admin_awaiting_payment_confirmation_order_price_calculation_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      adminAwaitingPaymentConfirmationOrderPricingHTML
    );

  let deliveryDetails;
  let deliveryPrice;

  if (order.delivery == "Pickup") {
    deliveryDetails = "Delivery: Pickup";
    deliveryPrice = 0;
  } else if (order.delivery == "Tracking") {
    deliveryDetails = "Delivery: Tracking";
    deliveryPrice = 7.0;
  } else if (order.delivery == "Courier") {
    deliveryDetails = "Delivery: Courier";
    deliveryPrice = 8.5;
  }

  const adminAwaitingPaymentConfirmationOrderDeliveryHTML =
    "<div class='admin_awaiting_payment_confirmation_price_calculation_row'>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>" +
    deliveryDetails +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$" +
    deliveryPrice +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#admin_awaiting_payment_confirmation_order_price_calculation_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      adminAwaitingPaymentConfirmationOrderDeliveryHTML
    );

  adminAwaitingPaymentConfirmationTotalOrderPrice =
    totalPartsPrice + pricingPrice + deliveryPrice;

  const adminAwaitingPaymentConfirmationTotalOrderPriceHTML =
    "<div class='admin_awaiting_payment_confirmation_price_calculation_row'>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_one'>Order Total</div>" +
    "<div class='admin_awaiting_payment_confirmation_price_calculation_column_two'>$" +
    adminAwaitingPaymentConfirmationTotalOrderPrice +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#admin_awaiting_payment_confirmation_order_price_calculation_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      adminAwaitingPaymentConfirmationTotalOrderPriceHTML
    );
};

/* =========================================== TOOLS ============================================ */

class PartDetailsObject {
  constructor(fileName, orderQuantity, pricePerUnit) {
    this.fileName = fileName;
    this.orderQuantity = orderQuantity;
    this.pricePerUnit = pricePerUnit;
  }
}

const getOrderOwnerDetails = order => {
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
};

const getOrderPartFileDetails = part => {
  let fileDetails;

  $.ajax({
    type: "POST",
    async: false,
    url: "/order/part/file-details",
    data: JSON.stringify(part),
    contentType: "application/json",
    success: data => {
      fileDetails = data;
    }
  });

  return fileDetails;
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
  order,
  modalId
) => {
  loadLoader(
    document.querySelector("#admin_awaiting_payment_confirmation_modal_body")
  ).then(() => {
    $.ajax({
      type: "POST",
      url: "/admin/order/update-order-status",
      data: JSON.stringify(order),
      contentType: "application/json",
      success: data => {
        removeModal(modalId);
        removeBackdrop(modalId);
        setTimeout(() => {
          viewAdminProfileOrdersPrintsOrderDetails(data);
        }, 500);
      }
    });
  });
};

/* ============================================================================================== */
