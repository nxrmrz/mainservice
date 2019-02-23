/* ======================================= INITIALISATION ======================================= */

const readyForPickupInit = order => {
  orderProgressionReadyForPickupModal(order);
  orderProgressionReadyForPickupStructure(order);
};

/* =========================================== MODAL ============================================ */

const orderProgressionReadyForPickupModal = order => {
  const modalFooter =
    "<div id='order_footer_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close order_details_footer_buttons_body_open'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='ready_for_pickup_complete_order_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Picked Up</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_request_refund_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='order_footer_confirm_buttons_body' class='order_details_footer_buttons_body order_details_footer_buttons_body_close'>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='order_details_order_picked_up_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='ready_for_pickup_cancel_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  orderModal(modalFooter, order);
};

/* ========================================= STRUCTURE ========================================== */

const orderProgressionReadyForPickupStructure = order => {
  // CREATE THE HTML
  const html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>We have finished printing your order! You can now pickup your 3D prints at <strong>16 Dapple Place, Flat Bush, Auckland, 2019, New Zealand</strong>.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_body'>" +
    "<div class='order_description_content_instruction_heading_body'>" +
    "<div class='order_description_content_instruction_heading'>Please follow this instruction.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_body'>" +
    "<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_number_label_body'>" +
    "<div class='order_description_content_instruction_list_label'>1.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_content_body'>" +
    "<div class='order_description_content_instruction_list_content'>Book a pickup time using the form below</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_body'>" +
    "<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_number_label_body'>" +
    "<div class='order_description_content_instruction_list_label'>2.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_content_body'>" +
    "<div class='order_description_content_instruction_list_content'>Send a text to <strong>+64 211 543 805</strong> before heading to the pickup destination (before you leave your place)</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_body'>" +
    "<div class='order_description_content_instruction_list_label_body order_description_content_instruction_list_number_label_body'>" +
    "<div class='order_description_content_instruction_list_label'>3.</div>" +
    "</div>" +
    "<div class='order_description_content_instruction_list_content_body'>" +
    "<div class='order_description_content_instruction_list_content'>Send a text upon arrival on the pickup destination, and enter through the garage upon opening</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_sub_heading_body'>" +
    "<div class='order_description_sub_heading'>Booking Form</div>" +
    "</div>" +
    "<div id='order_description_content_pickup_booking_form'></div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
  // BOOKING FORM
  orderProgressionReadyForPickupBookingForm();
  // Populate Booking Form
  orderProgressionReadyForPickupPopulateBookingForm(
    order.pickupBookingSchedule
  );
  // EVENT LISTENER
  orderProgressionReadyForPickupEventListener(order);
  // REQUEST REFUND
  orderRequestRefundInit(order);
};

/* ======================================== BOOKING FORM ======================================== */

/* ----------------------------------------- HTML FORM ------------------------------------------ */

const orderProgressionReadyForPickupBookingForm = () => {
  // CREATE BOOKING FORM HTML
  const html =
    "<div class='order_description_content_pickup_booking_input_field'>" +
    "<div class='order_description_content_pickup_booking_heading_body'>" +
    "<div class='order_description_content_pickup_booking_heading'>Time:</div>" +
    "</div>" +
    "<div class='order_description_content_pickup_booking_heading_inputs'>" +
    "<select id='order_description_content_pickup_booking_hour_input' class='order_description_content_pickup_booking_heading_input_select'>" +
    "<option value='empty'>hour</div>" +
    "</select>" +
    "<select id='order_description_content_pickup_booking_minute_input' class='order_description_content_pickup_booking_heading_input_select'>" +
    "<option value='empty'>minute</div>" +
    "</select>" +
    "<select id='order_description_content_pickup_booking_period_input' class='order_description_content_pickup_booking_heading_input_select'>" +
    "<option value='empty'>period</div>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_pickup_booking_input_field'>" +
    "<div class='order_description_content_pickup_booking_heading_body'>" +
    "<div class='order_description_content_pickup_booking_heading'>Date:</div>" +
    "</div>" +
    "<div class='order_description_content_pickup_booking_heading_inputs'>" +
    "<select id='order_description_content_pickup_booking_date_input' class='order_description_content_pickup_booking_heading_input_select'>" +
    "<option value='empty'>date</div>" +
    "</select>" +
    "<select id='order_description_content_pickup_booking_month_input' class='order_description_content_pickup_booking_heading_input_select'>" +
    "<option value='empty'>month</div>" +
    "</select>" +
    "<select id='order_description_content_pickup_booking_year_input' class='order_description_content_pickup_booking_heading_input_select'>" +
    "<option value='empty'>year</div>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "<div class='order_description_content_pickup_booking_error_body'>" +
    "<div id='order_description_content_pickup_booking_error'></div>" +
    "</div>" +
    "<div class='order_description_content_button_body'>" +
    "<div id='order_description_content_book_button' class='order_description_content_button'>" +
    "<div class='order_description_content_button_label'>Book</div>" +
    "</div>" +
    "</div>";
  // INSERT BOOKING FORM HTML
  document.querySelector(
    "#order_description_content_pickup_booking_form"
  ).innerHTML = html;
  // POPULATE TIME AND DATE SELECT FIELDS
  // Time
  populateTimeSelectInputs(
    "order_description_content_pickup_booking_hour_input",
    "order_description_content_pickup_booking_minute_input",
    "order_description_content_pickup_booking_period_input",
    5
  );
  // Date
  populateDateSelectInputs(
    "order_description_content_pickup_booking_date_input",
    "order_description_content_pickup_booking_month_input",
    "order_description_content_pickup_booking_year_input",
    0,
    1
  );
};

/* ----------------------------------- POPULATE BOOKING FORM ------------------------------------ */

const orderProgressionReadyForPickupPopulateBookingForm = pickupBookingSchedule => {
  if (pickupBookingSchedule) {
    document.querySelector(
      "#order_description_content_pickup_booking_hour_input"
    ).value = pickupBookingSchedule.hour;
    document.querySelector(
      "#order_description_content_pickup_booking_minute_input"
    ).value = pickupBookingSchedule.minute;
    document.querySelector(
      "#order_description_content_pickup_booking_period_input"
    ).value = pickupBookingSchedule.period;
    document.querySelector(
      "#order_description_content_pickup_booking_date_input"
    ).value = pickupBookingSchedule.date;
    document.querySelector(
      "#order_description_content_pickup_booking_month_input"
    ).value = pickupBookingSchedule.month;
    document.querySelector(
      "#order_description_content_pickup_booking_year_input"
    ).value = pickupBookingSchedule.year;
  }
};

/* ------------------------------------- SUBMIT BOOKING FORM ------------------------------------ */

const orderProgressionReadyForPickupBook = orderNumber => {
  // COLECT INPUT
  bookingFormInputs = {
    hour: document.querySelector(
      "#order_description_content_pickup_booking_hour_input"
    ).value,
    minute: document.querySelector(
      "#order_description_content_pickup_booking_minute_input"
    ).value,
    period: document.querySelector(
      "#order_description_content_pickup_booking_period_input"
    ).value,
    date: document.querySelector(
      "#order_description_content_pickup_booking_date_input"
    ).value,
    month: document.querySelector(
      "#order_description_content_pickup_booking_month_input"
    ).value,
    year: document.querySelector(
      "#order_description_content_pickup_booking_year_input"
    ).value
  };
  // VALIDATE INPUT
  let validity = true;
  let error = "requires ";
  for (component in bookingFormInputs) {
    if (bookingFormInputs[component] == "empty") {
      if (validity) {
        error = error + component;
      } else {
        error = error + ", " + component;
      }
      validity = false;
    }
  }
  if (!validity) {
    document.querySelector(
      "#order_description_content_pickup_booking_error"
    ).innerHTML = error;

    return;
  } else {
    document.querySelector(
      "#order_description_content_pickup_booking_error"
    ).innerHTML = "";
  }
  // SUBMIT BOOKING
  $.ajax({
    type: "POST",
    url: "/order/book-pickup",
    contentType: "application/json",
    data: JSON.stringify({
      orderNumber,
      bookingFormInputs
    }),
    success: data => {
      console.log(data);
    }
  });

  return;
};

/* ======================================= EVENT LISTENER ======================================= */

const orderProgressionReadyForPickupEventListener = order => {
  document
    .querySelector("#order_description_content_book_button")
    .addEventListener("click", () => {
      orderProgressionReadyForPickupBook(order.orderNumber);
    });
  document
    .querySelector("#ready_for_pickup_complete_order_footer_button")
    .addEventListener("click", () => {
      readyForPickupCompleteOrderButton();
    });
  document
    .querySelector("#ready_for_pickup_cancel_footer_button")
    .addEventListener("click", () => {
      readyForPickupCompleteOrderButton();
    });
  document
    .querySelector("#order_details_order_picked_up_confirm_button")
    .addEventListener("click", () => {
      readyForPickupCompleteOrderConfirm(order);
    });
};

/* ================================== ORDER HAS BEEN PICKED UP ================================== */

const readyForPickupCompleteOrderButton = () => {
  // Set new CSS
  document
    .querySelector("#order_footer_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");

  document
    .querySelector("#order_footer_confirm_buttons_body")
    .classList.toggle("order_details_footer_buttons_body_open");
};

const readyForPickupCompleteOrderConfirm = orderDetails => {
  loadLoader(document.querySelector("#order_modal_body")).then(() => {
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
