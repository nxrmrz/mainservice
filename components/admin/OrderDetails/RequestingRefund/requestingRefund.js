/* ======================================= INITIALISATION ======================================= */

const adminRequestingRefundInit = order => {
  const orderStatusId = "admin_" + constructOrderStatusId(order.orderStatus);
  constructAdminOrderDetailsRequestingRefundModal(order, orderStatusId);
  constructAdminRequestingRefundDescriptionBodyDetails();
  setAdminAwaitingPaymentConfirmationVariables(order);
  adminAwaitingPaymentConfirmationOrderPriceCalculation(
    adminAwaitingPaymentConfirmationOrderPartFileDetailsArray,
    order
  );
  adminRequestingRefundSummary(
    order.orderNumber,
    order.requestRefundInformation.bankDetails,
    adminAwaitingPaymentConfirmationTotalOrderPrice
  );
  addAdminOrderDetailsRequestingRefundButtonClickListener(order);
};

/* =========================================== MODAL ============================================ */

const constructAdminOrderDetailsRequestingRefundModal = (
  order,
  orderStatusId
) => {
  // ELEMENTS
  const adminOrderDetailsRequestingRefundModalHeader = adminOrderDetailsModalHeader;
  const adminOrderDetailsRequestingRefundModalFooter =
    "<div id='admin_order_details_requesting_refund_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close admin_order_details_footer_buttons_body_open'>" +
    "<div class='admin_order_details_footer_button_body'>" +
    "<div id='admin_order_details_approve_refund_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Approve Refund</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_order_details_footer_button_body'>" +
    "<div id='admin_order_details_decline_refund_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Decline Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_order_details_requesting_refund_approve_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close'>" +
    "<div class='admin_order_details_footer_button_body'>" +
    "<div id='admin_order_details_approve_refund_confirm_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_order_details_footer_button_body'>" +
    "<div id='admin_order_details_approve_refund_cancel_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_order_details_requesting_refund_decline_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close'>" +
    "<div class='admin_order_details_footer_button_body'>" +
    "<div id='admin_order_details_decline_refund_confirm_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_order_details_footer_button_body'>" +
    "<div id='admin_order_details_decline_refund_cancel_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  const adminOrderDetailsRequestingRefundModalElementObject = new modalElementObject(
    orderStatusId,
    adminOrderDetailsRequestingRefundModalHeader,
    adminOrderDetailsRequestingRefundModalFooter
  );
  // CSS
  const adminOrderDetailsRequestingRefundModalMobileHeight = 90;
  const adminOrderDetailsRequestingRefundModalMobileWidth = 90;
  const adminOrderDetailsRequestingRefundModalDesktopHeight = 90;
  const adminOrderDetailsRequestingRefundModalDesktopWidth = 60;
  const adminOrderDetailsRequestingRefundModalFooterHeight = 14;
  const adminOrderDetailsRequestingRefundModalCSSObject = new modalCSSObject(
    adminOrderDetailsRequestingRefundModalMobileHeight,
    adminOrderDetailsRequestingRefundModalMobileWidth,
    adminOrderDetailsRequestingRefundModalDesktopHeight,
    adminOrderDetailsRequestingRefundModalDesktopWidth,
    adminOrderDetailsRequestingRefundModalFooterHeight
  );

  addModal(
    adminOrderDetailsRequestingRefundModalElementObject,
    adminOrderDetailsRequestingRefundModalCSSObject
  );
};

/* ========================================== CONTENTS ========================================== */

/* -------------------------------------------- BASE -------------------------------------------- */

const constructAdminRequestingRefundDescriptionBodyDetails = () => {
  const adminRequestingRefundDescriptionBodyDetailsHTML =
    "<div id='admin_requesting_refund_summary_body'></div>" +
    "<div id='admin_awaiting_payment_confirmation_order_price_calculation_body'></div>" +
    "<div class='admin_requesting_refund_decline_message_body'>" +
    "<div class='admin_requesting_refund_decline_header_body'>" +
    "<div class='admin_requesting_refund_decline_header'>Reason for Decline</div>" +
    "</div>" +
    "<div class='admin_requesting_refund_decline_input_body'>" +
    "<textarea id='admin_requesting_refund_reason_for_decline_input' class='admin_requesting_refund_decline_input'></textarea>" +
    "</div>" +
    "<div class='admin_requesting_refund_decline_error_body'>" +
    "<div id='admin_requesting_refund_reason_for_decline_error' class='admin_requesting_refund_decline_error'></div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#admin_requesting_refund_modal_body"
  ).innerHTML = adminRequestingRefundDescriptionBodyDetailsHTML;
};

/* ------------------------------------------ SUMMARY ------------------------------------------- */

const adminRequestingRefundSummary = (orderNumber, bankDetails, orderPrice) => {
  const bankNumber = bankDetails.bankNumber;
  const branchNumber = bankDetails.branchNumber;
  const accountNumber = bankDetails.accountNumber;
  const suffixNumber = bankDetails.suffixNumber;

  const adminRequestingRefundSummaryHTML =
    "<div class='admin_awaiting_payment_confirmation_order_summary'>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_row_header'>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Order No.</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column_header admin_awaiting_payment_confirmation_order_summary_bank_details_column'>Bank Details</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column_header'>Refund Value</div>" +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_row'>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column'>" +
    orderNumber +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column admin_awaiting_payment_confirmation_order_summary_bank_details_column'>" +
    bankNumber +
    "-" +
    branchNumber +
    "-" +
    accountNumber +
    "-" +
    suffixNumber +
    "</div>" +
    "<div class='admin_awaiting_payment_confirmation_order_summary_column'>$" +
    orderPrice +
    "</div>" +
    "</div>" +
    "</div>";

  document
    .querySelector("#admin_requesting_refund_summary_body")
    .insertAdjacentHTML("beforeend", adminRequestingRefundSummaryHTML);
};

/* =================================== BUTTON CLICK LISTENER ==================================== */

const addAdminOrderDetailsRequestingRefundButtonClickListener = order => {
  /* -------------------------------------- APPROVE REFUND -------------------------------------- */

  document
    .querySelector("#admin_order_details_approve_refund_button")
    .addEventListener("click", () => {
      toggleAdminOrderDetailsApproveRefund();
    });
  // Aprove Refund: Cancel
  document
    .querySelector("#admin_order_details_approve_refund_cancel_button")
    .addEventListener("click", () => {
      toggleAdminOrderDetailsApproveRefund();
    });
  // Approve Refund: Confirm
  document
    .querySelector("#admin_order_details_approve_refund_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsApproveRefundRequest(order);
    });

  /* -------------------------------------- DECLINE REFUND -------------------------------------- */

  document
    .querySelector("#admin_order_details_decline_refund_button")
    .addEventListener("click", () => {
      toggleAdminOrderDetailsDeclineRefund();
    });
  // Decline Refund: Cancel
  document
    .querySelector("#admin_order_details_decline_refund_cancel_button")
    .addEventListener("click", () => {
      toggleAdminOrderDetailsDeclineRefund();
    });
  // Decline Refund: Confirm
  document
    .querySelector("#admin_order_details_decline_refund_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsDeclineRefundRequest(order);
    });
};

/* ----------------------------------- TOGGLE APPROVE REFUND ------------------------------------ */

const toggleAdminOrderDetailsApproveRefund = () => {
  document
    .querySelector("#admin_order_details_requesting_refund_buttons_body")
    .classList.toggle("admin_order_details_footer_buttons_body_open");

  document
    .querySelector(
      "#admin_order_details_requesting_refund_approve_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_open");
};

/* ----------------------------------- TOGGLE DECLINE REFUND ------------------------------------ */

const toggleAdminOrderDetailsDeclineRefund = () => {
  document
    .querySelector("#admin_order_details_requesting_refund_buttons_body")
    .classList.toggle("admin_order_details_footer_buttons_body_open");

  document
    .querySelector(
      "#admin_order_details_requesting_refund_decline_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_open");
};

/* ======================================= APPROVE REFUND ======================================= */

const adminOrderDetailsApproveRefundRequest = order => {
  $.ajax({
    type: "POST",
    url: "/admin/order/approve-refund",
    contentType: "application/json",
    data: JSON.stringify({ order }),
    success: data => {
      console.log(data);
    }
  });
};

/* ------------------------------------ UPDATE ORDER STATUS ------------------------------------- */

/* ======================================= DECLINE REFUND ======================================= */

const adminOrderDetailsDeclineRefundRequest = order => {
  adminOrderDetailsValidateDeclineRefundInput()
    .then(() => {
      adminOrderDetailsCollectDeclineRefundInput().then(declineInput => {
        $.ajax({
          type: "POST",
          url: "/admin/order/decline-refund",
          contentType: "application/json",
          data: JSON.stringify({ declineInput, order }),
          success: data => {
            console.log(data);
          }
        });
      });
    })
    .catch(() => {
      console.log("Invalid Input(s)");
    });
};

/* --------------------------------------- VALIDATE INPUT --------------------------------------- */

const adminOrderDetailsValidateDeclineRefundInput = () => {
  return new Promise((resolve, reject) => {
    // VALIDITY VARIABLE;
    let validity = true;
    let errorObjectArray = [];

    // REASON FOR DECLINE
    // Input
    const reasonForDeclineInput = document.querySelector(
      "#admin_requesting_refund_reason_for_decline_input"
    ).value;
    // Error Element Id
    const reasonForDeclineErrorElementId =
      "admin_requesting_refund_reason_for_decline_error";
    // Error Message
    let reasonForDeclineErrorMessage;
    // Validation
    if (!reasonForDeclineInput) {
      // Check if there's no input
      reasonForDeclineErrorMessage =
        "please give a reason for declining the refund request";

      // Change validity status
      validity = false;
    } else {
      // If there's no error
      reasonForDeclineErrorMessage = "";
    }

    // Update the error object array
    errorObjectArray.push(
      new MessageObject(
        reasonForDeclineErrorElementId,
        reasonForDeclineErrorMessage
      )
    );

    // DISPLAY OR CLEAR ANY ERROR MESSAGE
    displayMessage(errorObjectArray);

    // COMPLETE PROMISE
    if (validity) {
      resolve();
    } else {
      reject();
    }
  });
};

/* --------------------------------------- COLLECT INPUT ---------------------------------------- */

const adminOrderDetailsCollectDeclineRefundInput = () => {
  return new Promise((resolve, reject) => {
    // REASON FOR DECLINE
    // Input
    const reasonForDeclineInput = document.querySelector(
      "#admin_requesting_refund_reason_for_decline_input"
    ).value;

    resolve({ reasonForDecline: reasonForDeclineInput });
  });
};

/* ============================================================================================== */
