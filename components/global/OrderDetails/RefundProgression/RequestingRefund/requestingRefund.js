/* ======================================= INITIALISATION ======================================= */

const requestingRefundInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsRequestingRefundModal(orderStatusId);
  constructHTMLStructure(orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  addOrderDetailsRefundDescription(order, orderStatusId);
  addOrderDetailsRequestingRefundButtonClickListener(order, orderStatusId);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsRequestingRefundModal = orderStatusId => {
  // ELEMENTS
  const orderDetailsRequestingRefundModalHeader = orderDetailsModalHeader;
  const orderDetailsRequestingRefundModalFooter =
    "<div id='requesting_refund_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='cancel_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='cancel_refund_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='cancel_refund_confirm_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='cancel_refund_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  const orderDetailsRequestingRefundModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsRequestingRefundModalHeader,
    orderDetailsRequestingRefundModalFooter
  );
  // CSS
  const orderDetailsRequestingRefundModalMobileHeight = 90;
  const orderDetailsRequestingRefundModalMobileWidth = 90;
  const orderDetailsRequestingRefundModalDesktopHeight = 90;
  const orderDetailsRequestingRefundModalDesktopWidth = 60;
  const orderDetailsRequestingRefundModalFooterHeight = 14;
  const orderDetailsRequestingRefundModalCSSObject = new modalCSSObject(
    orderDetailsRequestingRefundModalMobileHeight,
    orderDetailsRequestingRefundModalMobileWidth,
    orderDetailsRequestingRefundModalDesktopHeight,
    orderDetailsRequestingRefundModalDesktopWidth,
    orderDetailsRequestingRefundModalFooterHeight
  );

  addModal(
    orderDetailsRequestingRefundModalElementObject,
    orderDetailsRequestingRefundModalCSSObject
  );
};

/* ======================================= MODAL CONTENTS ======================================= */

/* -------------------------------------- DESCRIPTION BODY -------------------------------------- */

const addOrderDetailsRefundDescription = (order, orderStatusId) => {
  addOrderDetailsRefundTimelineTabs(order, orderStatusId);
  addOrderDetailsRefundHeader(orderStatusId);
  addOrderDetailsRefundReason(order, orderStatusId);
  addOrderDetailsRefundDetails(order, orderStatusId);
};

/* ------------------------------------ REFUND TIMELINE TABS ------------------------------------ */

const addOrderDetailsRefundTimelineTabs = (order, orderStatusId) => {
  const refundStatus = order.requestRefundInformation.refundStatus;

  // Create the Timeline Tab HTMLs
  const refundTimelineTabOneHTML =
    "<div id='requesting_refund_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='requesting_refund_order_status_tab_text' class='order_status_tab_text'>" +
    "Requesting Refund" +
    "</div>" +
    "</div>";

  const refundTimelineTabThreeHTML =
    "<div id='refund_processed_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='refund_processed_order_status_tab_text' class='order_status_tab_text'>" +
    "Refund Processed" +
    "</div>" +
    "</div>";

  let refundTimelineTabTwoHTML;

  if (refundStatus === "approved") {
    refundTimelineTabTwoHTML =
      "<div id='refund_approved_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='refund_approved_order_status_tab_text' class='order_status_tab_text'>" +
      "Refund Approved" +
      "</div>" +
      "</div>";
  } else if (refundStatus === "declined") {
    refundTimelineTabTwoHTML =
      "<div id='refund_declined_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='refund_declined_order_status_tab_text' class='order_status_tab_text'>" +
      "Refund Declined" +
      "</div>" +
      "</div>";
  } else {
    refundTimelineTabTwoHTML =
      "<div id='refund_approved_declined_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='refund_approved_declined_order_status_tab_text' class='order_status_tab_text'>" +
      "Refund Approved / Declined" +
      "</div>" +
      "</div>";
  }

  // Compile all Tab HTMLs into a single HTML
  const refundTimelineTabsHTML =
    "<div id='order_status_tabs_body'>" +
    refundTimelineTabOneHTML +
    refundTimelineTabTwoHTML +
    refundTimelineTabThreeHTML +
    "</div>";

  // Insert Tabs into Description Body
  document
    .querySelector("#" + orderStatusId + "_order_status_description_body")
    .insertAdjacentHTML("beforeend", refundTimelineTabsHTML);

  // Highlight the Current Tab
  document
    .querySelector("#" + orderStatusId + "_order_status_tab_body")
    .classList.add("order_status_tab_body_selected");
  document
    .querySelector("#" + orderStatusId + "_order_status_tab_text")
    .classList.add("order_status_tab_text_selected");
};

/* ------------------------------------- DESCRIPTION HEADER ------------------------------------- */

const addOrderDetailsRefundHeader = orderStatusId => {
  let header;

  if (orderStatusId === "requesting_refund") {
    header = "Analysing Your Refund Request";
  } else if (orderStatusId === "refund_approved") {
    header = "Your Refund Request has been Approved";
  } else if (orderStatusId === "refund_declined") {
    header = "Your Refund Request has been Declined";
  } else if (orderStatusId === "refund_processed") {
    header = "Your Refund Request has been Processed";
  }

  const refundHeaderHTML =
    "<div id='order_status_description_heading_body'>" +
    "<div id='order_status_description_heading_text'>" +
    header +
    "</div>" +
    "</div>";

  document
    .querySelector("#" + orderStatusId + "_order_status_description_body")
    .insertAdjacentHTML("beforeend", refundHeaderHTML);
};

/* --------------------------------------- REFUND REASON ---------------------------------------- */

const addOrderDetailsRefundReason = (order, orderStatusId) => {
  const reason = order.requestRefundInformation.reason;

  const refundReasonHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Reason:" +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body order_status_description_sub_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    reason +
    "</div>" +
    "</div>";

  document
    .querySelector("#" + orderStatusId + "_order_status_description_body")
    .insertAdjacentHTML("beforeend", refundReasonHTML);
};

/* --------------------------------------- REFUND DETAILS --------------------------------------- */

const addOrderDetailsRefundDetails = (order, orderStatusId) => {
  const bankNumber = order.requestRefundInformation.bankDetails.bankNumber;
  const branchNumber = order.requestRefundInformation.bankDetails.branchNumber;
  const accountNumber =
    order.requestRefundInformation.bankDetails.accountNumber;
  const suffixNumber = order.requestRefundInformation.bankDetails.suffixNumber;

  const refundDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Refund Details:" +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body order_status_description_sub_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Refund Value - $" +
    orderDetailsTotalOrderPrice +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body order_status_description_sub_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Bank Number - " +
    bankNumber +
    "-" +
    branchNumber +
    "-" +
    accountNumber +
    "-" +
    suffixNumber +
    "</div>" +
    "</div>";

  document
    .querySelector("#" + orderStatusId + "_order_status_description_body")
    .insertAdjacentHTML("beforeend", refundDetailsHTML);
};

/* =================================== BUTTON CLICK LISTENER ==================================== */

const addOrderDetailsRequestingRefundButtonClickListener = (
  order,
  orderStatusId
) => {
  const orderNumber = order.orderNumber;

  // Cancel Refund Request
  document
    .querySelector("#cancel_refund_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsCancelRefund();
    });
  // Confirm "Cancel Refund Request"
  document
    .querySelector("#cancel_refund_confirm_footer_button")
    .addEventListener("click", () => {
      orderDetailsCancelRefundRequest(orderNumber, orderStatusId);
    });
  // Cancel "Cancel Refund Request"
  document
    .querySelector("#cancel_refund_cancel_footer_button")
    .addEventListener("click", () => {
      toggleOrderDetailsCancelRefund();
    });
};

/* =================================== FOOTER CONTENT CHANGE ==================================== */

/* ----------------------------------- CANCEL REFUND REQUEST ------------------------------------ */

const toggleOrderDetailsCancelRefund = () => {
  document
    .querySelector("#requesting_refund_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#cancel_refund_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

/* ======================================== CANCEL ORDER ======================================== */

const orderDetailsCancelRefundRequest = (orderNumber, orderStatusId) => {
  validateOrderOwnership(orderNumber)
    .then(() => {
      cancelRefundRequest(orderNumber, orderStatusId);
    })
    .catch(() => {
      return console.log("not owner");
    });
};

const cancelRefundRequest = (orderNumber, orderStatusId) => {
  $.ajax({
    type: "POST",
    url: "/order/cancel-refund",
    data: { orderNumber },
    success: data => {
      if (data === "failed") {
        return console.log("failed");
      } else {
        removeBackdrop(orderStatusId);
        removeModal(orderStatusId);
        setTimeout(() => {
          viewOrderDetails(data);
        }, 500);
      }
    }
  });
};

/* ================================= REFUND AUTOCOMPLETE TIMER ================================== */

const orderDetailsRefundProcessedAutoCompleteTimer = order => {
  const dateOfAutoComplete = moment(
    order.requestRefundInformation.processDate
  ).add(5, "days");
  const currentDate = moment();
  const totalRemainingSeconds = dateOfAutoComplete.diff(currentDate, "seconds");
  const remainingDays = Math.floor(totalRemainingSeconds / (24 * 60 * 60));
  const remainingHours = Math.floor(
    (totalRemainingSeconds % (24 * 60 * 60)) / (60 * 60)
  );
  const remainingMinutes = Math.floor(
    ((totalRemainingSeconds % (24 * 60 * 60)) % (60 * 60)) / 60
  );
  const remainingSeconds =
    ((totalRemainingSeconds % (24 * 60 * 60)) % (60 * 60)) % 60;
  const timerMessage =
    remainingDays +
    "D : " +
    remainingHours +
    "H : " +
    remainingMinutes +
    "M : " +
    remainingSeconds +
    "S";
  document.querySelector(
    "#order_details_refund_approved_declined_auto_complete_timer"
  ).innerHTML = timerMessage;
};

/* =================================== UPDATE REFUND REQUEST ==================================== */

const orderDetailsUpdateRefundApprovedDeclined = orderNumber => {
  validateOrderOwnership(orderNumber)
    .then(() => {
      $.ajax({
        type: "POST",
        url: "/order/process-refund",
        data: { orderNumber },
        success: data => {
          if (data === "failed") {
            return console.log("failed");
          } else {
            removeBackdrop(orderStatusId);
            removeModal(orderStatusId);
            setTimeout(() => {
              viewOrderDetails(data);
            }, 500);
          }
        }
      });
    })
    .catch(() => {
      return console.log("not owner");
    });
};

/* ============================================================================================== */
