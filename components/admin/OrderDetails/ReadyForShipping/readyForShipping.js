/* ======================================= INITIALISATION ======================================= */

const adminReadyForShippingInit = order => {
  const orderStatusId = "admin_" + constructOrderStatusId(order.orderStatus);
  constructAdminOrderDetailsReadyForShippingModal(order, orderStatusId);
  constructAdminOrderDetailsReadyForShippingBase(order);
};

/* =========================================== MODAL ============================================ */

const constructAdminOrderDetailsReadyForShippingModal = (
  order,
  orderStatusId
) => {
  // ELEMENTS
  const adminOrderDetailsReadyForShippingModalHeader = adminOrderDetailsModalHeader;
  const adminOrderDetailsReadyForShippingModalFooter =
    "<div id='admin_order_details_ready_for_shipping_buttons_body' class='admin_order_details_footer_buttons_body'>" +
    "<div id='admin_order_details_order_shipped_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Order Shipped</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_order_details_ready_for_shipping_order_status_update_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close'>" +
    "<div id='admin_order_details_order_shipped_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "<div id='admin_order_details_order_shipped_cancel_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>";
  const adminOrderDetailsReadyForShippingModalElementObject = new modalElementObject(
    orderStatusId,
    adminOrderDetailsReadyForShippingModalHeader,
    adminOrderDetailsReadyForShippingModalFooter
  );
  // CSS
  const adminOrderDetailsReadyForShippingModalMobileHeight = 90;
  const adminOrderDetailsReadyForShippingModalMobileWidth = 90;
  const adminOrderDetailsReadyForShippingModalDesktopHeight = 90;
  const adminOrderDetailsReadyForShippingModalDesktopWidth = 60;
  const adminOrderDetailsReadyForShippingModalFooterHeight = 14;
  const adminOrderDetailsReadyForShippingModalCSSObject = new modalCSSObject(
    adminOrderDetailsReadyForShippingModalMobileHeight,
    adminOrderDetailsReadyForShippingModalMobileWidth,
    adminOrderDetailsReadyForShippingModalDesktopHeight,
    adminOrderDetailsReadyForShippingModalDesktopWidth,
    adminOrderDetailsReadyForShippingModalFooterHeight
  );

  addModal(
    adminOrderDetailsReadyForShippingModalElementObject,
    adminOrderDetailsReadyForShippingModalCSSObject
  );

  document
    .querySelector("#admin_order_details_order_shipped_button")
    .addEventListener("click", () => {
      adminOrderDetailsReadyForShippingToggleFooterButtons();
    });

  document
    .querySelector("#admin_order_details_order_shipped_cancel_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsReadyForShippingToggleFooterButtons();
    });

  document
    .querySelector("#admin_order_details_order_shipped_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsReadyForShippingUpdateOrderStatus(order, orderStatusId);
    });
};

/* ================================ READY FOR SHIPPING CONTENTS ================================= */

/* -------------------------------------------- BASE -------------------------------------------- */

const constructAdminOrderDetailsReadyForShippingBase = order => {
  const adminPrintingOrderBaseHTML =
    "<div class='admin_order_details_modal_body'>" +
    "<div id='admin_order_details_ready_for_shipping_tracking_number_body'></div>" +
    "<div class='admin_order_details_button_body'>" +
    "<div id='admin_order_details_add_tracking_number_button' class='admin_order_details_button'>" +
    "<div class='admin_order_details_button_text'>Add Tracking Number</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_order_details_button_body'>" +
    "<div id='admin_order_details_update_produced_quantity_button' class='admin_order_details_button'>" +
    "<div class='admin_order_details_button_text'>Save</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#admin_ready_for_shipping_modal_body"
  ).innerHTML = adminPrintingOrderBaseHTML;

  adminOrderDetailsReadyForShippingPopulateTrackingNumber(order.trackingNumber);

  document
    .querySelector("#admin_order_details_add_tracking_number_button")
    .addEventListener("click", () => {
      adminOrderDetailsReadyForShippingAddTrackingNumber();
    });

  document
    .querySelector("#admin_order_details_update_produced_quantity_button")
    .addEventListener("click", () => {
      adminOrderDetailsReadyForShippingSaveTrackingNumber(order._id);
    });
};

/* ------------------------------------ ADD TRACKING NUMBER ------------------------------------- */

let adminOrderDetailsReadyForShippingNumberOfTrackingNumber = 0;

const adminOrderDetailsReadyForShippingAddTrackingNumber = input => {
  adminOrderDetailsReadyForShippingNumberOfTrackingNumber++;

  let inputValue;

  if (input) {
    inputValue = input;
  } else {
    inputValue = "";
  }

  const trackingNumber = adminOrderDetailsReadyForShippingNumberOfTrackingNumber;

  const trackingNumberHTML =
    "<div id='admin_order_details_ready_for_shipping_tracking_number_" +
    trackingNumber +
    "_body' class='admin_order_details_ready_for_shipping_tracking_number_body'>" +
    "<input type='text' id='admin_order_details_ready_for_shipping_tracking_number_" +
    trackingNumber +
    "' class='admin_order_details_ready_for_shipping_tracking_number' value='" +
    inputValue +
    "'>" +
    "<div id='admin_order_details_ready_for_shipping_delete_tracking_number_" +
    trackingNumber +
    "' class='admin_order_details_ready_for_shipping_delete_tracking_number'>Delete</div>" +
    "</div>";

  document
    .querySelector(
      "#admin_order_details_ready_for_shipping_tracking_number_body"
    )
    .insertAdjacentHTML("beforeend", trackingNumberHTML);

  document
    .querySelector(
      "#admin_order_details_ready_for_shipping_delete_tracking_number_" +
        trackingNumber
    )
    .addEventListener("click", () => {
      adminOrderDetailsReadyForShippingDeleteTrackingNumber(trackingNumber);
    });
};

/* ----------------------------------- DELETE TRACKING NUMBER ----------------------------------- */

let adminOrderDetailsReadyForShippingDeletedTrackingNumberArray = [];

const adminOrderDetailsReadyForShippingDeleteTrackingNumber = trackingNumber => {
  $(
    "#admin_order_details_ready_for_shipping_tracking_number_" +
      trackingNumber +
      "_body"
  ).remove();

  adminOrderDetailsReadyForShippingDeletedTrackingNumberArray.push(
    trackingNumber
  );
};

/* ------------------------------------ SAVE TRACKING NUMBER ------------------------------------ */

let adminOrderDetailsReadyForShippingTrackingNumberArray;

const adminOrderDetailsReadyForShippingSaveTrackingNumber = orderId => {
  adminOrderDetailsReadyForShippingTrackingNumberArray = [];

  for (
    i = 1;
    i <= adminOrderDetailsReadyForShippingNumberOfTrackingNumber;
    i++
  ) {
    if (
      adminOrderDetailsReadyForShippingDeletedTrackingNumberArray.indexOf(i) ==
      -1
    ) {
      const input = document.querySelector(
        "#admin_order_details_ready_for_shipping_tracking_number_" + i
      ).value;

      adminOrderDetailsReadyForShippingTrackingNumberArray.push(input);
    }
  }

  $.ajax({
    type: "POST",
    url: "/admin/order/update-tracking-number",
    data: JSON.stringify({
      orderId: orderId,
      trackingNumber: adminOrderDetailsReadyForShippingTrackingNumberArray
    }),
    contentType: "application/json",
    success: data => {
      console.log(data);
    }
  });
};

/* ---------------------------------- POPULATE TRACKING NUMBER ---------------------------------- */

const adminOrderDetailsReadyForShippingPopulateTrackingNumber = trackingNumberArray => {
  if (!trackingNumberArray) {
    adminOrderDetailsReadyForShippingAddTrackingNumber();
    return;
  }
  for (i = 0; i < trackingNumberArray.length; i++) {
    adminOrderDetailsReadyForShippingAddTrackingNumber(trackingNumberArray[i]);
  }
};

/* ==================================== FOOTER BUTTON TOGGLE ==================================== */

const adminOrderDetailsReadyForShippingToggleFooterButtons = () => {
  document
    .querySelector("#admin_order_details_ready_for_shipping_buttons_body")
    .classList.toggle("admin_order_details_footer_buttons_body_close");

  document
    .querySelector(
      "#admin_order_details_ready_for_shipping_order_status_update_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_close");
};

/* ==================================== UPDATE ORDER STATUS ===================================== */

const adminOrderDetailsReadyForShippingUpdateOrderStatus = (
  orderDetails,
  modalId
) => {
  adminOrderDetailsReadyForShippingSaveTrackingNumber(orderDetails._id);

  loadLoader(
    document.querySelector("#admin_ready_for_shipping_modal_body")
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
