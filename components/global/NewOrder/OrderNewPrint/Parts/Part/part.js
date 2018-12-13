/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintPart = () => {
  if (orderNewPrintSelectedPart != null) {
    if (!validateUploadModelInput(orderNewPrintSelectedPart)) {
      return;
    } else {
      addOrderNewPrintPartDeselect();
    }
  }
  orderNewPrintPartNumber++;
  if (orderNewPrintDeletedPart.length == orderNewPrintPartNumber + 1) {
    document.querySelector("#order_new_print_parts_error_handler").innerHTML =
      "Must upload at least one file";
  } else {
    document.querySelector("#order_new_print_parts_error_handler").innerHTML =
      "";
  }
  orderNewPrintSelectedPart = orderNewPrintPartNumber;
  addOrderNewPrintPartStructure(orderNewPrintPartNumber);
};

/* ====================================== CREATE THE HTML ====================================== */

const addOrderNewPrintPartStructure = partNumber => {
  // Create the HTML Structure
  const orderNewPrintPartStructureHTML =
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_body' class='order_new_print_parts_part_body'>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_toggle_bar' class='order_new_print_parts_part_toggle_bar'>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_toggle_header_body' class='order_new_print_parts_part_toggle_header_body'>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_toggle_status' class='order_new_print_parts_part_toggle_status'></div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_toggle_header_text' class='order_new_print_parts_part_toggle_header_text'></div>" +
    "</div>" +
    "<div id='order_new_print_parts_delete_part_" +
    partNumber +
    "_body' class='order_new_print_parts_delete_part_body'></div>" +
    "</div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_form_body' class='order_new_print_parts_part_form_body'>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_upload_model_form_body' class='order_new_print_parts_part_upload_model_form_body'></div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_select_material_form_body' class='order_new_print_parts_part_select_material_form_body'></div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_choose_options_form_body' class='order_new_print_parts_part_choose_options_form_body'></div>" +
    "</div>" +
    "</div>";
  // Insert the HTML
  document
    .querySelector("#order_new_print_parts_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintPartStructureHTML);
  // Add Toggle Bar Click Listener
  addOrderNewPrintPartsPartToggleBarClickListener(partNumber);
  // Add the Delete Button
  addOrderNewPrintPartsDeletePartButton(partNumber);
  // Add the Upload Model
  addOrderNewPrintPartUploadModel(partNumber);
};

/* ======================================== TOGGLE BAR ========================================= */

const addOrderNewPrintPartsPartToggleBarClickListener = partNumber => {
  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_toggle_header_body"
    )
    .addEventListener("click", () => {
      addOrderNewPrintPartSelect(partNumber);
    });
};

/* --------------------------------------- DELETE BUTTON --------------------------------------- */

const addOrderNewPrintPartsDeletePartButton = partNumber => {
  // Create the HTML
  const orderNewPrintPartsDeletePartButtonHTML =
    "<div id='order_new_print_parts_delete_part_" +
    partNumber +
    "_button' class='order_new_print_parts_delete_part_button'>" +
    "<div class='order_new_print_parts_delete_part_button_text'>Delete Part</div>" +
    "</div>";
  // Insert the HTML
  document
    .querySelector("#order_new_print_parts_delete_part_" + partNumber + "_body")
    .insertAdjacentHTML("beforeend", orderNewPrintPartsDeletePartButtonHTML);
  // Add Click Event Listener
  document
    .querySelector(
      "#order_new_print_parts_delete_part_" + partNumber + "_button"
    )
    .addEventListener("click", () => {
      if (orderNewPrintSelectedPart == partNumber) {
        orderNewPrintSelectedPart = null;
      }
      // Remove/Delete Part
      const parent = document.querySelector("#order_new_print_parts_form_body");
      const child = document.querySelector(
        "#order_new_print_parts_part_" + partNumber + "_body"
      );
      parent.removeChild(child);
      // Record Deleted Part Number
      orderNewPrintDeletedPart.push(partNumber);
    });
};

/* ================================= SELECT AND DESELECT PART ================================== */

const addOrderNewPrintPartSelect = partNumber => {
  if (orderNewPrintSelectedPart != null) {
    if (!validateUploadModelInput(orderNewPrintSelectedPart)) {
      return;
    }
  }

  if (orderNewPrintSelectedPart == partNumber) {
    document
      .querySelector("#order_new_print_parts_part_" + partNumber + "_form_body")
      .classList.toggle("order_new_print_parts_part_body_close");
    orderNewPrintSelectedPart = null;
    return;
  }

  addOrderNewPrintPartDeselect();

  document
    .querySelector("#order_new_print_parts_part_" + partNumber + "_form_body")
    .classList.remove("order_new_print_parts_part_body_close");

  orderNewPrintSelectedPart = partNumber;
};

const addOrderNewPrintPartDeselect = () => {
  if (orderNewPrintSelectedPart == null) {
    return;
  }

  document
    .querySelector(
      "#order_new_print_parts_part_" + orderNewPrintSelectedPart + "_form_body"
    )
    .classList.add("order_new_print_parts_part_body_close");
};

/* ============================================================================================= */
