/* ======================================= INITIALISATION ======================================= */

const awaitingPaymentInit = order => {
  orderProgressionAwaitingPaymentModal(order);
  orderProgressionAwaitingPaymentStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionAwaitingPaymentModal = order => {
  const modalFooter =
    "<div id='awaiting_payment_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div id='order_details_payed_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Payed</div>" +
    "</div>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Order</div>" +
    "</div>" +
    "</div>" +
    "<div id='awaiting_payment_pre_submit_contents_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div id='order_details_payed_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "<div id='order_details_payed_cancel_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>";

  orderModal(modalFooter, order);
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

/* ------------------------------------------ STRUCTURE ----------------------------------------- */

const orderProgressionAwaitingPaymentStructure = order => {
  // CREATE HTML
  html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>Please proceed with the payment. We'll begin 3D printing your order once the payment has been confirmed.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_body'>" +
    "<div class='order_description_content_instruction_heading_body'>" +
    "<div class='order_description_content_instruction_heading'>Using the details below, make the payment via online banking.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_body'>" +
    "<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_text_label_body'>" +
    "<div class='order_description_content_instruction_list_label'>Bank Number:</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_content_body'>" +
    "<div class='order_description_content_instruction_list_content'>12-3287-0320549-00</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_body'>" +
    "<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_text_label_body'>" +
    "<div class='order_description_content_instruction_list_label'>Amount:</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_content_body'>" +
    "<div id='order_description_content_payment_amount' class='order_description_content_instruction_list_content'></div>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_body'>" +
    "<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_text_label_body'>" +
    "<div class='order_description_content_instruction_list_label'>Reference:</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_content_body'>" +
    "<div id='order_description_content_payment_reference' class='order_description_content_instruction_list_content'></div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>After making the payment, let us now by pressing 'Payed' and then 'Confirm'.</div>" +
    "</div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
  // POPULATE CONTENTS
  orderOrderProgressionAwaitingPaymentPaymentAmount(order);
  orderOrderProgressionAwaitingPaymentPaymentReference(order);
  // FOOTER BUTTON CLICK LISTENER
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
      awaitingPaymentPayedConfirm(order);
    });
};

/* ------------------------------------------ CONTENTS ------------------------------------------ */

const orderOrderProgressionAwaitingPaymentPaymentAmount = order => {
  orderPriceCalculation(order)
    .then(deliveryPriceObject => {
      // CREATE TEXT
      const text =
        "$" + numberToTwoDecimalStringConverter(deliveryPriceObject.orderPrice);
      // INSERT TEXT
      document.querySelector(
        "#order_description_content_payment_amount"
      ).innerHTML = text;
    })
    .catch(error => console.log(error));
};

const orderOrderProgressionAwaitingPaymentPaymentReference = order => {
  getMyProfileDetails()
    .then(profile => {
      const initials =
        profile.firstName[0].toUpperCase() + profile.lastName[0].toUpperCase();
      const orderNumber = order.orderNumber;
      // CREATE TEXT
      const text = "3D Print " + initials + orderNumber;
      // INSERT TEXT
      document.querySelector(
        "#order_description_content_payment_reference"
      ).innerHTML = text;
    })
    .catch(error => console.log(error));
};

/* ======================================== PAYED BUTTON ======================================== */

const awaitingPaymentPayed = () => {
  // Set new CSS
  document
    .querySelector("#awaiting_payment_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#awaiting_payment_pre_submit_contents_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

const awaitingPaymentPayedConfirm = orderDetails => {
  const element = document.querySelector("#order_modal_body");
  const elements = [element];
  loadLoader(elements).then(() => {
    $.ajax({
      type: "POST",
      url: "/order/update-order-status",
      data: JSON.stringify({ orderDetails }),
      contentType: "application/json",
      success: data => {
        removeModal("order");
        removeBackdrop("order");
        profileOrdersPrintsOrdersSummaryFilterUpdateOrderList(
          profileOrdersPrintsOrdersSummaryFilterSelected
        );
        setTimeout(() => {
          viewOrderDetails(data.content.orderNumber);
        }, 500);
      }
    });
  });
};

/* ============================================================================================== */
