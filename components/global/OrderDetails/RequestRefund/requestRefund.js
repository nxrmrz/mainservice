/* ======================================= INITIALISATION ======================================= */

const orderRequestRefundInit = order => {
  const orderNumber = order.orderNumber;
  const orderStatus = order.orderStatus;
  const orderStatusId = orderStatus.toLowerCase().replace(/ /g, "_");
  requestRefundToggled = false;
  addOrderDetailsRequestRefundFooter();
  addOrderDetailsRequestRefundButtonClickListener(orderNumber, orderStatusId);
};

/* ================================= ADD REQUEST REFUND FOOTER ================================== */

const addOrderDetailsRequestRefundFooter = () => {
  // Element
  const footerContentElement = document.querySelector(
    "#order_modal_footer_contents"
  );

  const requestRefundFooter =
    "<div id='request_refund_footer_buttons_body' class='order_details_footer_buttons_body request_refund_footer_buttons_body_close'>" +
    "<div id='order_details_request_refund_form_body'></div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='request_refund_send_request_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Send Request</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='request_refund_cancel_request_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Request</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  footerContentElement.insertAdjacentHTML("beforeend", requestRefundFooter);

  orderDetailsRequestRefundForm();
};

/* ============================== ADD REQUEST REFUND BUTTON FOOTER ============================== */

const addOrderDetailsRequestRefundButtonClickListener = (
  orderNumber,
  orderStatusId
) => {
  // Elements
  const modalElement = document.querySelector("#order_modal");
  const footerElement = document.querySelector("#order_modal_footer");
  const footerButtonsBodyElement = document.querySelector(
    "#order_footer_buttons_body"
  );

  // Request Refund Button
  document
    .querySelector("#order_request_refund_footer_button")
    .addEventListener("click", () => {
      toggleRequestRefundButton(
        modalElement,
        footerElement,
        footerButtonsBodyElement
      );
    });

  // Cancel Refund Request Button
  document
    .querySelector("#request_refund_cancel_request_footer_button")
    .addEventListener("click", () => {
      toggleRequestRefundButton(
        modalElement,
        footerElement,
        footerButtonsBodyElement
      );
    });

  // Send Refund Request Button
  document
    .querySelector("#request_refund_send_request_footer_button")
    .addEventListener("click", () => {
      submitRefundRequest(orderStatusId, orderNumber);
    });
};

/* ======================================== REFUND FORM ========================================= */

const orderDetailsRequestRefundForm = () => {
  // HTML Request Refund Form
  const requestRefundForm =
    "<div class='order_details_request_refund_form'>" +
    "<div class='order_details_request_refund_input_field'>" +
    "<div class='order_details_request_refund_input_header_body'>" +
    "<div class='order_details_request_refund_input_header'>Reason:</div>" +
    "</div>" +
    "<div class='order_details_request_refund_input_body'>" +
    "<textarea id='order_details_request_refund_reason_input' class='order_details_request_refund_input_textarea'></textarea>" +
    "</div>" +
    "<div class='order_details_request_refund_error_body'>" +
    "<div id='order_details_request_refund_reason_error' class='order_details_request_refund_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_request_refund_input_field'>" +
    "<div class='order_details_request_refund_input_header_body'>" +
    "<div class='order_details_request_refund_input_header'>Bank Number:</div>" +
    "</div>" +
    "<div class='order_details_request_refund_input_body'>" +
    "<input type='text' id='order_details_request_refund_bank_number_input' class='order_details_request_refund_input_text' maxlength='2'>" +
    "<div class='order_details_request_refund_bank_number_separator_input'>-</div>" +
    "<input type='text' id='order_details_request_refund_branch_number_input' class='order_details_request_refund_input_text' maxlength='4'>" +
    "<div class='order_details_request_refund_bank_number_separator_input'>-</div>" +
    "<input type='text' id='order_details_request_refund_account_number_input' class='order_details_request_refund_input_text' maxlength='7'>" +
    "<div class='order_details_request_refund_bank_number_separator_input'>-</div>" +
    "<input type='text' id='order_details_request_refund_suffix_number_input' class='order_details_request_refund_input_text' maxlength='3'>" +
    "</div>" +
    "<div class='order_details_request_refund_error_body'>" +
    "<div id='order_details_request_refund_bank_number_error' class='order_details_request_refund_error'></div>" +
    "<div id='order_details_request_refund_branch_number_error' class='order_details_request_refund_error'></div>" +
    "<div id='order_details_request_refund_account_number_error' class='order_details_request_refund_error'></div>" +
    "<div id='order_details_request_refund_suffix_number_error' class='order_details_request_refund_error'></div>" +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert HTML
  document.querySelector(
    "#order_details_request_refund_form_body"
  ).innerHTML = requestRefundForm;
};

/* ========================== TOGGLE REQUEST REFUND OR CANCEL REQUEST =========================== */

let requestRefundToggled;

const toggleRequestRefundButton = (
  modalElement,
  footerElement,
  footerButtonsBodyElement
) => {
  // Set new CSS
  footerButtonsBodyElement.classList.toggle(
    "order_details_footer_buttons_body_open"
  );

  document
    .querySelector("#request_refund_footer_buttons_body")
    .classList.toggle("request_refund_footer_buttons_body_open");

  // Screensize
  const screensize = window.matchMedia("(min-width: 600px)");

  screensize.addListener(() => {
    if (screensize.matches) {
      if (!requestRefundToggled) {
        footerElement.style.height = "7vmin";
        footerElement.style.top = "calc(95vh - 7vmin)";
        modalElement.style.paddingBottom = "7vmin";
      } else {
        footerElement.style.height = "40vmin";
        footerElement.style.top = "calc(95vh - 40vmin)";
        modalElement.style.paddingBottom = "40vmin";
      }
    } else {
      if (!requestRefundToggled) {
        footerElement.style.height = "14vmin";
        footerElement.style.top = "calc(95vh - 14vmin)";
        modalElement.style.paddingBottom = "14vmin";
      } else {
        footerElement.style.height = "80vmin";
        footerElement.style.top = "calc(95vh - 80vmin)";
        modalElement.style.paddingBottom = "80vmin";
      }
    }
  });

  if (screensize.matches) {
    if (requestRefundToggled) {
      requestRefundToggled = false;
      footerElement.style.height = "7vmin";
      footerElement.style.top = "calc(95vh - 7vmin)";
      modalElement.style.paddingBottom = "7vmin";
    } else {
      requestRefundToggled = true;
      footerElement.style.height = "40vmin";
      footerElement.style.top = "calc(95vh - 40vmin)";
      modalElement.style.paddingBottom = "40vmin";
    }
  } else {
    if (requestRefundToggled) {
      requestRefundToggled = false;
      footerElement.style.height = "14vmin";
      footerElement.style.top = "calc(95vh - 14vmin)";
      modalElement.style.paddingBottom = "14vmin";
    } else {
      requestRefundToggled = true;
      footerElement.style.height = "80vmin";
      footerElement.style.top = "calc(95vh - 80vmin)";
      modalElement.style.paddingBottom = "80vmin";
    }
  }
};

/* =================================== SUBMIT REFUND REQUEST ==================================== */

const submitRefundRequest = (orderStatusId, orderNumber) => {
  // Validate Input
  validateRefundRequestInputs()
    .then(() => {
      // Validate if Request is Coming from Owner
      validateOrderOwnership(orderNumber)
        .then(() => {
          collectRefundRequestInformation().then(refundRequestInformation => {
            submitRefundRequestInformation(
              orderStatusId,
              orderNumber,
              refundRequestInformation
            ).then(orderNumber => {
              viewOrderDetails(orderNumber);
            });
          });
        })
        .catch(() => {
          return console.log("not owner");
        });
    })
    .catch(() => {
      return console.log("invalid input(s)");
    });
};

/* =============================== VALIDATE REFUND REQUEST INPUTS =============================== */

const validateRefundRequestInputs = () => {
  return new Promise((resolve, reject) => {
    let messageObjectArray = [];
    let validity = true;

    /* ----------------------------------------- REASON ----------------------------------------- */

    // Input
    const reasonInput = document.querySelector(
      "#order_details_request_refund_reason_input"
    ).value;
    // Element ID
    const reasonErrorElementId = "order_details_request_refund_reason_error";
    // Error Message
    let reasonErrorMessage;

    if (!reasonInput) {
      // Check if any message is provided
      reasonErrorMessage = "please describe your reason";

      validity = false;
    } else {
      // If valid, proceed while removing any error message
      reasonErrorMessage = "";
    }

    messageObjectArray.push(
      new MessageObject(reasonErrorElementId, reasonErrorMessage)
    );

    /* ------------------------------- BANK DETAILS: BANK NUMBER -------------------------------- */

    // Input
    const bankNumberInput = document.querySelector(
      "#order_details_request_refund_bank_number_input"
    ).value;
    // Element ID
    const bankNumberErrorElementId =
      "order_details_request_refund_bank_number_error";
    // Error Message
    let bankNumberErrorMessage;

    if (!bankNumberInput) {
      // Check if any message is provided
      bankNumberErrorMessage = "please provide your 2 digit bank number";

      validity = false;
    } else if (!Number.isInteger(Number(bankNumberInput))) {
      bankNumberErrorMessage = "invalid bank number: only input numbers";

      validity = false;
    } else if (bankNumberInput.length < 2 && bankNumberInput.length > 0) {
      bankNumberErrorMessage = "invalid bank number: requires 2 digits";

      validity = false;
    } else {
      // If valid, proceed while removing any error message
      bankNumberErrorMessage = "";
    }

    messageObjectArray.push(
      new MessageObject(bankNumberErrorElementId, bankNumberErrorMessage)
    );

    /* ------------------------------ BANK DETAILS: BRANCH NUMBER ------------------------------- */

    // Input
    const branchNumberInput = document.querySelector(
      "#order_details_request_refund_branch_number_input"
    ).value;
    // Element ID
    const branchNumberErrorElementId =
      "order_details_request_refund_branch_number_error";
    // Error Message
    let branchNumberErrorMessage;

    if (!branchNumberInput) {
      // Check if any message is provided
      branchNumberErrorMessage = "please provide your 4 digit branch number";

      validity = false;
    } else if (!Number.isInteger(Number(branchNumberInput))) {
      branchNumberErrorMessage = "invalid branch number: only input numbers";

      validity = false;
    } else if (branchNumberInput.length < 4 && branchNumberInput.length > 0) {
      branchNumberErrorMessage = "invalid branch number: requires 4 digits";

      validity = false;
    } else {
      // If valid, proceed while removing any error message
      branchNumberErrorMessage = "";
    }

    messageObjectArray.push(
      new MessageObject(branchNumberErrorElementId, branchNumberErrorMessage)
    );

    /* ------------------------------ BANK DETAILS: ACCOUNT NUMBER ------------------------------ */

    // Input
    const accountNumberInput = document.querySelector(
      "#order_details_request_refund_account_number_input"
    ).value;
    // Element ID
    const accountNumberErrorElementId =
      "order_details_request_refund_account_number_error";
    // Error Message
    let accountNumberErrorMessage;

    if (!accountNumberInput) {
      // Check if any message is provided
      accountNumberErrorMessage = "please provide your 7 digit account number";

      validity = false;
    } else if (!Number.isInteger(Number(accountNumberInput))) {
      accountNumberErrorMessage = "invalid account number: only input numbers";

      validity = false;
    } else if (accountNumberInput.length < 7 && accountNumberInput.length > 0) {
      accountNumberErrorMessage = "invalid account number: requires 7 digits";

      validity = false;
    } else {
      // If valid, proceed while removing any error message
      accountNumberErrorMessage = "";
    }

    messageObjectArray.push(
      new MessageObject(accountNumberErrorElementId, accountNumberErrorMessage)
    );

    /* ------------------------------ BANK DETAILS: SUFFIX NUMBER ------------------------------- */

    // Input
    const suffixNumberInput = document.querySelector(
      "#order_details_request_refund_suffix_number_input"
    ).value;
    // Element ID
    const suffixNumberErrorElementId =
      "order_details_request_refund_suffix_number_error";
    // Error Message
    let suffixNumberErrorMessage;

    if (!suffixNumberInput) {
      // Check if any message is provided
      suffixNumberErrorMessage =
        "please provide your 2 or 3 digit suffix number";

      validity = false;
    } else if (!Number.isInteger(Number(suffixNumberInput))) {
      suffixNumberErrorMessage = "invalid suffix number: only input numbers";

      validity = false;
    } else if (suffixNumberInput.length < 2 && suffixNumberInput.length > 0) {
      suffixNumberErrorMessage =
        "invalid suffix number: requires 2 or 3 digits";

      validity = false;
    } else {
      // If valid, proceed while removing any error message
      suffixNumberErrorMessage = "";
    }

    messageObjectArray.push(
      new MessageObject(suffixNumberErrorElementId, suffixNumberErrorMessage)
    );

    /* ---------------------------- DISPLAY OR CLEAR ERROR MESSAGES ----------------------------- */

    displayMessage(messageObjectArray);

    if (validity) {
      resolve(true);
    } else {
      reject(false);
    }
  });
};

/* ===================================== VALIDATE OWNERSHIP ===================================== */

const validateOrderOwnership = orderNumber => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/order/check-ownership",
      data: { orderNumber },
      success: data => {
        if (data === "true") {
          resolve(true);
        } else {
          reject(false);
        }
      }
    });
  });
};

/* ============================= SUBMIT REFUND REQUEST INFORMATION ============================== */

const submitRefundRequestInformation = (
  orderStatusId,
  orderNumber,
  refundRequestInformation
) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/order/request-refund",
      contentType: "application/json",
      data: JSON.stringify({ orderNumber, refundRequestInformation }),
      success: data => {
        removeBackdrop(orderStatusId);
        removeModal(orderStatusId);
        setTimeout(() => {
          resolve(data);
        }, 500);
      }
    });
  });
};

/* ==================== COLLECT REFUND REQUEST INFORMATION AND CREATE OBJECT ==================== */

// Refund Request Information Object Constructor
class RefundRequestInformationObject {
  constructor(reason, bankDetails) {
    this.reason = reason;
    this.bankDetails = bankDetails;
  }
}

const collectRefundRequestInformation = () => {
  return new Promise((resolve, reject) => {
    const reason = document.querySelector(
      "#order_details_request_refund_reason_input"
    ).value;

    const bankDetails = {
      bankNumber: document.querySelector(
        "#order_details_request_refund_bank_number_input"
      ).value,
      branchNumber: document.querySelector(
        "#order_details_request_refund_branch_number_input"
      ).value,
      accountNumber: document.querySelector(
        "#order_details_request_refund_account_number_input"
      ).value,
      suffixNumber: document.querySelector(
        "#order_details_request_refund_suffix_number_input"
      ).value
    };

    resolve(new RefundRequestInformationObject(reason, bankDetails));
  });
};

/* ============================================================================================== */
