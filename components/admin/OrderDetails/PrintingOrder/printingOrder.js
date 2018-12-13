/* ======================================= INITIALISATION ======================================= */

const adminPrintingOrderInit = order => {
  const orderStatusId = "admin_" + constructOrderStatusId(order.orderStatus);
  constructAdminOrderDetailsPrintingOrderModal(order, orderStatusId);
  constructAdminOrderDetailsPrintingOrderBase(order);
  addAdminOrderDetailsPrintingOrderOrderList(order);
};

/* =========================================== MODAL ============================================ */

const constructAdminOrderDetailsPrintingOrderModal = (order, orderStatusId) => {
  // ELEMENTS
  const adminOrderDetailsPrintingOrderModalHeader = adminOrderDetailsModalHeader;
  const adminOrderDetailsPrintingOrderModalFooter =
    "<div id='admin_order_details_printing_order_buttons_body' class='admin_order_details_footer_buttons_body'>" +
    "<div id='admin_order_details_printing_complete_button' class='admin_order_details_footer_button'>" +
    "<div class='admin_order_details_footer_button_text'>Printing Complete</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_order_details_printing_order_order_status_update_buttons_body' class='admin_order_details_footer_buttons_body admin_order_details_footer_buttons_body_close'>" +
    "<div id='admin_order_details_printing_complete_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Confirm</div>" +
    "</div>" +
    "<div id='admin_order_details_printing_complete_cancel_confirm_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel</div>" +
    "</div>" +
    "</div>";
  const adminOrderDetailsPrintingOrderModalElementObject = new modalElementObject(
    orderStatusId,
    adminOrderDetailsPrintingOrderModalHeader,
    adminOrderDetailsPrintingOrderModalFooter
  );
  // CSS
  const adminOrderDetailsPrintingOrderModalMobileHeight = 90;
  const adminOrderDetailsPrintingOrderModalMobileWidth = 90;
  const adminOrderDetailsPrintingOrderModalDesktopHeight = 90;
  const adminOrderDetailsPrintingOrderModalDesktopWidth = 60;
  const adminOrderDetailsPrintingOrderModalFooterHeight = 14;
  const adminOrderDetailsPrintingOrderModalCSSObject = new modalCSSObject(
    adminOrderDetailsPrintingOrderModalMobileHeight,
    adminOrderDetailsPrintingOrderModalMobileWidth,
    adminOrderDetailsPrintingOrderModalDesktopHeight,
    adminOrderDetailsPrintingOrderModalDesktopWidth,
    adminOrderDetailsPrintingOrderModalFooterHeight
  );

  addModal(
    adminOrderDetailsPrintingOrderModalElementObject,
    adminOrderDetailsPrintingOrderModalCSSObject
  );

  document
    .querySelector("#admin_order_details_printing_complete_button")
    .addEventListener("click", () => {
      adminOrderDetailsPrintingOrderToggleFooterButtons();
    });

  document
    .querySelector(
      "#admin_order_details_printing_complete_cancel_confirm_button"
    )
    .addEventListener("click", () => {
      adminOrderDetailsPrintingOrderToggleFooterButtons();
    });

  document
    .querySelector("#admin_order_details_printing_complete_confirm_button")
    .addEventListener("click", () => {
      adminOrderDetailsPrintingOrderUpdateOrderStatus(order, orderStatusId);
    });
};

/* ================================== PRINTING ORDER CONTENTS =================================== */

/* -------------------------------------------- BASE -------------------------------------------- */

const constructAdminOrderDetailsPrintingOrderBase = order => {
  const adminPrintingOrderBaseHTML =
    "<div class='admin_order_details_modal_body'>" +
    "<div id='admin_order_details_printing_order_order_list_table'></div>" +
    "<div class='admin_order_details_button_body'>" +
    "<div id='admin_order_details_update_produced_quantity_button' class='admin_order_details_button'>" +
    "<div class='admin_order_details_button_text'>Save</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#admin_printing_order_modal_body"
  ).innerHTML = adminPrintingOrderBaseHTML;

  document
    .querySelector("#admin_order_details_update_produced_quantity_button")
    .addEventListener("click", () => {
      updateAdminOrderDetailsPrintingOrderProducedQuantity(
        order.parts,
        order._id
      );
    });
};

/* --------------------------------------- ORDER QUANTITY --------------------------------------- */

let adminPrintingOrderOrderListPartIdsArray;

const addAdminOrderDetailsPrintingOrderOrderList = order => {
  adminPrintingOrderOrderListPartIdsArray = [];

  const adminPrintingOrderOrderListHeaderHTML =
    "<div class='admin_order_details_printing_order_order_list_table_row_header'>" +
    "<div class='admin_order_details_printing_order_order_list_table_column_header_1'>Part Name</div>" +
    "<div class='admin_order_details_printing_order_order_list_table_column_header_2'>Quantity Produced</div>" +
    "<div class='admin_order_details_printing_order_order_list_table_column_header_2'>Quantity Ordered</div>" +
    "</div>";

  document.querySelector(
    "#admin_order_details_printing_order_order_list_table"
  ).innerHTML = adminPrintingOrderOrderListHeaderHTML;

  order.parts.forEach(part => {
    adminPrintingOrderOrderListPartIdsArray.push(part._id);

    const fileName = adminOrderDetailsPartFileNameFormatter(part.fileName, 20);

    const adminPrintingOrderOrderListHTML =
      "<div class='admin_order_details_printing_order_order_list_table'>" +
      "<div class='admin_order_details_printing_order_order_list_table_row'>" +
      "<a href='/orders/" +
      part.fileId +
      "' class='admin_order_details_printing_order_order_list_table_column_1'>" +
      fileName +
      "</a>" +
      "<input type='Number' id='admin_order_details_printing_order_" +
      part._id +
      "_input' class='admin_order_details_printing_order_order_list_table_column_2' value='" +
      Number(part.producedQuantity) +
      "'>" +
      "<div class='admin_order_details_printing_order_order_list_table_column_2'>" +
      part.orderQuantity +
      "</div>" +
      "</div>" +
      "</div>";

    document
      .querySelector("#admin_order_details_printing_order_order_list_table")
      .insertAdjacentHTML("beforeend", adminPrintingOrderOrderListHTML);
  });
};

/* ---------------------------------------- SAVE CHANGES ---------------------------------------- */

const updateAdminOrderDetailsPrintingOrderProducedQuantity = (
  parts,
  orderId
) => {
  for (i = 0; i < parts.length; i++) {
    const input = document.querySelector(
      "#admin_order_details_printing_order_" + parts[i]._id + "_input"
    ).value;

    $.ajax({
      type: "POST",
      url: "/admin/part/update-produced-quantity",
      data: { producedQuantity: input, orderId: orderId, partId: parts[i]._id },
      success: data => {
        console.log(data);
      }
    });
  }
};

/* ==================================== FOOTER BUTTON TOGGLE ==================================== */

const adminOrderDetailsPrintingOrderToggleFooterButtons = () => {
  document
    .querySelector("#admin_order_details_printing_order_buttons_body")
    .classList.toggle("admin_order_details_footer_buttons_body_close");

  document
    .querySelector(
      "#admin_order_details_printing_order_order_status_update_buttons_body"
    )
    .classList.toggle("admin_order_details_footer_buttons_body_close");
};

/* ==================================== UPDATE ORDER STATUS ===================================== */

const adminOrderDetailsPrintingOrderUpdateOrderStatus = (order, modalId) => {
  loadLoader(document.querySelector("#admin_printing_order_modal_body")).then(
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
