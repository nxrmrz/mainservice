/* ======================================= INITIALISATION ======================================= */

const adminAwaitingQuoteInit = order => {
  const orderStatusId = "admin_" + constructOrderStatusId(order.orderStatus);
  constructAdminOrderDetailsAwaitingQuoteModal(order, orderStatusId);
  adminOrderDetailsAwaitingQuoteParts(order);
};

/* =========================================== MODAL ============================================ */

const constructAdminOrderDetailsAwaitingQuoteModal = (order, orderStatusId) => {
  // ELEMENTS
  const adminOrderDetailsAwaitingQuoteModalHeader = adminOrderDetailsModalHeader;
  const adminOrderDetailsAwaitingQuoteModalFooter =
    "<div id='admin_order_details_awaiting_quote_buttons_body' class='admin_order_details_footer_buttons_body'>" +
    "<div id='admin_order_details_quote_completed_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Quote Completed</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_order_details_awaiting_quote_order_status_update_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close'>" +
    "<div id='admin_order_details_quote_completed_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "<div id='admin_order_details_quote_completed_cancel_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>";
  const adminOrderDetailsAwaitingQuoteModalElementObject = new modalElementObject(
    orderStatusId,
    adminOrderDetailsAwaitingQuoteModalHeader,
    adminOrderDetailsAwaitingQuoteModalFooter
  );
  // CSS
  const adminOrderDetailsAwaitingQuoteModalMobileHeight = 90;
  const adminOrderDetailsAwaitingQuoteModalMobileWidth = 90;
  const adminOrderDetailsAwaitingQuoteModalDesktopHeight = 90;
  const adminOrderDetailsAwaitingQuoteModalDesktopWidth = 60;
  const adminOrderDetailsAwaitingQuoteModalFooterHeight = 14;
  const adminOrderDetailsAwaitingQuoteModalCSSObject = new modalCSSObject(
    adminOrderDetailsAwaitingQuoteModalMobileHeight,
    adminOrderDetailsAwaitingQuoteModalMobileWidth,
    adminOrderDetailsAwaitingQuoteModalDesktopHeight,
    adminOrderDetailsAwaitingQuoteModalDesktopWidth,
    adminOrderDetailsAwaitingQuoteModalFooterHeight
  );

  addModal(
    adminOrderDetailsAwaitingQuoteModalElementObject,
    adminOrderDetailsAwaitingQuoteModalCSSObject
  );

  document
    .querySelector("#admin_order_details_quote_completed_button")
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingQuoteToggleFooterButtons();
    });

  document
    .querySelector("#admin_order_details_quote_completed_cancel_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingQuoteToggleFooterButtons();
    });

  document
    .querySelector("#admin_order_details_quote_completed_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingQuoteUpdateOrderStatus(order, orderStatusId);
    });
};

/* ======================================= LIST ALL PARTS ======================================= */

let adminOrderDetailsAwaitingQuotePartIdsArray;

const adminOrderDetailsAwaitingQuoteParts = order => {
  adminOrderDetailsAwaitingQuotePartIdsArray = [];

  const adminOrderDetailsAwaitingQuotePartsHTML =
    "<div class='admin_order_details_modal_body'>" +
    "<div id='admin_order_details_awaiting_quote_parts_list'></div>" +
    "<div class='admin_order_details_button_body'>" +
    "<div id='admin_order_details_awaiting_quote_parts_save_changes_button' class='admin_order_details_button'>" +
    "<div class='admin_order_details_button_text'>Save</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  document.querySelector(
    "#admin_awaiting_quote_modal_body"
  ).innerHTML = adminOrderDetailsAwaitingQuotePartsHTML;
  order.parts.forEach(element => {
    adminOrderDetailsAwaitingQuotePartIdsArray.push(element.fileId);
    let partPrice;
    let totalPrice;
    $.ajax({
      type: "POST",
      async: false,
      url: "/admin/file-details",
      data: { fileId: element.fileId },
      success: data => {
        if (data.metadata.price == "pending") {
          partPrice = "";
          totalPrice = "Pending";
        } else {
          partPrice = data.metadata.price;
          totalPrice = "$" + partPrice * element.orderQuantity;
        }
      }
    });

    const fileName = adminOrderDetailsPartFileNameFormatter(
      element.fileName,
      20
    );

    const adminOrderDetailsAwaitingQuotePartHTML =
      "<div class='admin_order_details_awaiting_quote_part_body'>" +
      "<div class='admin_order_details_awaiting_quote_part_file_name_body'>" +
      "<a href='/orders/" +
      element.fileId +
      "' class='admin_order_details_awaiting_quote_part_file_name_text'>" +
      fileName +
      "</a>" +
      "</div>" +
      "<div class='admin_order_details_awaiting_quote_part_quantity_body'>" +
      "<div class='admin_order_details_awaiting_quote_part_quantity_text'>" +
      element.orderQuantity +
      "</div>" +
      "</div>" +
      "<div class='admin_order_details_awaiting_quote_part_price_per_unit_body'>" +
      "<div>$</div>" +
      "<input type='Number' id='admin_order_details_awaiting_quote_" +
      element.fileId +
      "_price_per_unit_input' class='admin_order_details_awaiting_quote_part_price_per_unit_input' value='" +
      partPrice +
      "'>" +
      "<div>per unit</div>" +
      "</div>" +
      "<div class='admin_order_details_awaiting_quote_part_total_price_body'>" +
      "<div class='admin_order_details_awaiting_quote_part_total_price_text'>" +
      totalPrice +
      "</div>" +
      "</div>" +
      "<div class='admin_order_details_awaiting_quote_part_error_body'>" +
      "<div id='admin_order_details_awaiting_quote_" +
      element.fileId +
      "_error_text' class='admin_order_details_awaiting_quote_part_error_text'></div>" +
      "</div>" +
      "</div>";

    document
      .querySelector("#admin_order_details_awaiting_quote_parts_list")
      .insertAdjacentHTML("beforeend", adminOrderDetailsAwaitingQuotePartHTML);
  });

  document
    .querySelector(
      "#admin_order_details_awaiting_quote_parts_save_changes_button"
    )
    .addEventListener("click", () => {
      adminOrderDetailsAwaitingQuoteSavePrices();
    });
};

/* =================================== VALIDATE PRICE INPUTS ==================================== */

const validateAdminOrderDetailsAwaitingQuotePartPrices = () => {
  return new Promise((resolve, reject) => {
    let adminOrderDetailsAwaitingQuoteInputsValidity = true;

    adminOrderDetailsAwaitingQuotePartIdsArray.forEach(element => {
      if (
        !document.querySelector(
          "#admin_order_details_awaiting_quote_" +
            element +
            "_price_per_unit_input"
        ).value
      ) {
        document.querySelector(
          "#admin_order_details_awaiting_quote_" + element + "_error_text"
        ).innerHTML = "Please provide a price";

        adminOrderDetailsAwaitingQuoteInputsValidity = false;
      }
    });

    resolve(adminOrderDetailsAwaitingQuoteInputsValidity);
  });
};

/* ======================================== SAVE PRICES ========================================= */

const adminOrderDetailsAwaitingQuoteSavePrices = () => {
  adminOrderDetailsAwaitingQuotePartIdsArray.forEach(element => {
    let partPrice = document.querySelector(
      "#admin_order_details_awaiting_quote_" + element + "_price_per_unit_input"
    ).value;

    if (!partPrice) {
      partPrice = "pending";
    }

    $.ajax({
      type: "POST",
      async: false,
      url: "/admin/part/set-price",
      data: { fileId: element, partPrice: partPrice },
      success: data => {}
    });
  });
};

/* ==================================== FOOTER BUTTON TOGGLE ==================================== */

const adminOrderDetailsAwaitingQuoteToggleFooterButtons = () => {
  document
    .querySelector("#admin_order_details_awaiting_quote_buttons_body")
    .classList.toggle("admin_order_details_footer_buttons_body_close");

  document
    .querySelector(
      "#admin_order_details_awaiting_quote_order_status_update_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_close");
};

/* ==================================== UPDATE ORDER STATUS ===================================== */

const adminOrderDetailsAwaitingQuoteUpdateOrderStatus = (order, modalId) => {
  console.log(order);

  adminOrderDetailsAwaitingQuoteToggleFooterButtons();

  validateAdminOrderDetailsAwaitingQuotePartPrices().then(validity => {
    if (!validity) {
      return;
    }
  });

  adminOrderDetailsAwaitingQuoteSavePrices();
  loadAdminProfileOrdersPrintsOrderList();

  loadLoader(document.querySelector("#admin_awaiting_quote_modal_body")).then(
    () => {
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
    }
  );
};

/* ============================================================================================== */
