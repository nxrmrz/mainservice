/* ======================================= INITIALISATION ======================================= */

const viewOrderDetails = orderNumber => {
  $.ajax({
    type: "POST",
    url: "/order/get-order-details-by-order-number",
    data: { orderNumber },
    success: data => {
      if (data.content.orderStatus == "Awaiting Quote") {
        awaitingQuoteInit(data.content);
      } else if (data.content.orderStatus == "Awaiting Payment") {
        awaitingPaymentInit(data.content);
      } else if (data.content.orderStatus == "Awaiting Payment Confirmation") {
        awaitingPaymentConfirmationInit(data.content);
      } else if (data.content.orderStatus == "Printing Order") {
        printingOrderInit(data.content);
      } else if (data.content.orderStatus == "Ready for Pickup") {
        readyForPickupInit(data.content);
      } else if (data.content.orderStatus == "Order Picked Up") {
        orderPickedUpInit(data.content);
      } else if (data.content.orderStatus == "Ready for Shipping") {
        readyForShippingInit(data.content);
      } else if (data.content.orderStatus == "Order Shipped") {
        orderShippedInit(data.content);
      } else if (data.content.orderStatus == "Order Completed") {
        orderCompletedInit(data.content);
      } else if (data.content.orderStatus == "Requesting Refund") {
        requestingRefundInit(data.content);
      } else if (data.content.orderStatus == "Refund Approved") {
        refundApprovedInit(data.content);
      } else if (data.content.orderStatus == "Refund Declined") {
        refundDeclinedInit(data.content);
      } else if (data.content.orderStatus == "Refund Processed") {
        refundProcessedInit(data.content);
      } else {
        console.log("Couldn't Determine Order Status");
      }
    }
  });
};

const constructOrderStatusId = orderStatus => {
  return orderStatus.toLowerCase().replace(/ /g, "_");
};

/* ======================================== ORDER MODAL ========================================= */

const orderModal = (modalFooter, order) => {
  // ELEMENTS
  const modalId = "order";
  const modalHeader = "Order";
  const modalElementObject = new ModalElementObject(
    modalId,
    modalHeader,
    modalFooter
  );
  // CSS
  const modalHeight = 90;
  const modalWidth = 90;
  const modalDesktopHeight = 90;
  const modalDesktopWidth = 60;
  let modalFooterHeight;
  if (modalFooter) {
    modalFooterHeight = 14;
  } else {
    modalFooterHeight = 0;
  }
  const modalCSSObject = new ModalCSSObject(
    modalHeight,
    modalWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );

  addModal(modalElementObject, modalCSSObject);

  orderModalStructure(order);
};

/* ========================================= STRUCTURE ========================================== */

const orderModalStructure = order => {
  const html =
    "<div id='order_body' class='order_details_main_body'>" +
    "<div class='order_component_body'>" +
    "<div id='order_description_order_status_tabs_body'></div>" +
    "<div id='order_description_heading_body'></div>" +
    "<div id='order_description_contents_body'></div>" +
    "</div>" +
    "<div id='order_details_body' class='order_component_body'></div>" +
    "<div id='order_attachments_body' class='order_component_body'></div>" +
    "<div id='order_comments_body' class='order_component_body'></div>" +
    "</div>";

  document.querySelector("#order_modal_body").innerHTML = html;

  orderDescription(order);
  orderDetailsInit(order);
  orderAttachments(order);
  orderCommentsInit(order);
};

/* ===================================== ORDER DESCRIPTION ====================================== */

const orderDescription = order => {
  const orderStatus = order.orderStatus;
  const delivery = order.delivery;
  const orderStatusId = orderStatus.toLowerCase().replace(/ /g, "_");
  orderStatusDescriptionBodyTabs(orderStatusId, delivery);
  orderStatusDescriptionBodyHeader(orderStatus, orderStatusId);
};

const orderStatusDescriptionBodyTabs = (orderStatusId, delivery) => {
  const html =
    "<div id='awaiting_quote_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='awaiting_quote_order_status_tab_text' class='order_status_tab_text'>" +
    "Awaiting Quote" +
    "</div>" +
    "</div>" +
    "<div id='awaiting_payment_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='awaiting_payment_order_status_tab_text' class='order_status_tab_text'>" +
    "Awaiting Payment" +
    "</div>" +
    "</div>" +
    "<div id='awaiting_payment_confirmation_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='awaiting_payment_confirmation_order_status_tab_text' class='order_status_tab_text'>" +
    "Awaiting Payment Confirmation" +
    "</div>" +
    "</div>" +
    "<div id='printing_order_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='printing_order_order_status_tab_text' class='order_status_tab_text'>" +
    "Printing Order" +
    "</div>" +
    "</div>";

  let deliveryHTML;

  if (delivery == "Pickup") {
    deliveryHTML =
      "<div id='ready_for_pickup_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='ready_for_pickup_order_status_tab_text' class='order_status_tab_text'>" +
      "Ready for Pickup" +
      "</div>" +
      "</div>" +
      "<div id='order_picked_up_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_picked_up_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Picked-Up" +
      "</div>" +
      "</div>" +
      "<div id='order_completed_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_completed_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Completed" +
      "</div>" +
      "</div>";
  } else {
    deliveryHTML =
      "<div id='ready_for_shipping_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='ready_for_shipping_order_status_tab_text' class='order_status_tab_text'>" +
      "Ready for Shipping" +
      "</div>" +
      "</div>" +
      "<div id='order_shipped_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_shipped_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Shipped" +
      "</div>" +
      "</div>" +
      "<div id='order_completed_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_completed_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Completed" +
      "</div>" +
      "</div>";
  }

  document.querySelector(
    "#order_description_order_status_tabs_body"
  ).innerHTML = html + deliveryHTML;

  document
    .querySelector("#" + orderStatusId + "_order_status_tab_body")
    .classList.add("order_status_tab_body_selected");
  document
    .querySelector("#" + orderStatusId + "_order_status_tab_text")
    .classList.add("order_status_tab_text_selected");
};

const orderStatusDescriptionBodyHeader = orderStatus => {
  let heading;

  if (orderStatus == "Awaiting Quote") {
    heading = "Waiting for Quotation";
  } else if (orderStatus == "Awaiting Payment") {
    heading = "Proceed with Payment";
  } else if (orderStatus == "Awaiting Payment Confirmation") {
    heading = "Processing Your Payment";
  } else if (orderStatus == "Printing Order") {
    heading = "3D Printing Your Order";
  } else if (orderStatus == "Ready for Pickup") {
    heading = "Your 3D Prints are Available for Pickup";
  } else if (orderStatus == "Order Picked Up") {
    heading = "Your 3D Prints have been Picked-Up";
  } else if (orderStatus == "Ready for Shipping") {
    heading = "Preparing Your 3D Prints for Shipping";
  } else if (orderStatus == "Order Shipped") {
    heading = "Your 3D Prints have been Sent for Shipping";
  } else if (orderStatus == "Order Completed") {
    heading = "Your Order has been Completed";
  }

  const html =
    "<div id='orders_description_heading_body'>" +
    "<div id='order_description_heading'>" +
    heading +
    "</div>" +
    "</div>";

  document.querySelector("#order_description_heading_body").innerHTML = html;
};

/* ================================ ORDER DETAILS ATTACHED FILES ================================ */

const orderAttachments = order => {
  const html =
    "<div class='order_details_attachments_header'>Attachments:</div>" +
    "<div id='order_details_add_attachment_body'></div>" +
    "<div id='order_details_attachments_body'></div>";
  document.querySelector("#order_attachments_body").innerHTML = html;
};

/* ============================================================================================== */
