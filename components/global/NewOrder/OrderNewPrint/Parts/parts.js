/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintParts = () => {
  addOrderNewPrintPartsBaseStructure();
  addOrderNewPrintPart();
  addOrderNewPrintPartsAddPartButton();
};

/* ====================================== BASE STRUCTURE ======================================= */

const addOrderNewPrintPartsBaseStructure = () => {
  // Create the Parts Base Structure HTML
  const orderNewPrintPartsBaseStructureHTML =
    "<div id='order_new_print_parts_form_body'></div>" +
    "<div id='order_new_print_parts_error_handler'></div>" +
    "<div id='order_new_print_parts_add_part_body'></div>";
  // Insert the Parts Base Structure HTML
  document
    .querySelector("#order_new_print_parts_body")
    .insertAdjacentHTML("beforeend", orderNewPrintPartsBaseStructureHTML);
};

/* ========================================= ADD PART ========================================== */

const addOrderNewPrintPartsAddPartButton = () => {
  // Create the HTML
  const orderNewPrintPartsAddPartButtonHTML =
    "<div id='order_new_print_parts_add_part_button'>" +
    "<div id='order_new_print_parts_add_part_button_text'>Add a Part</div>" +
    "</div>";
  // Insert the HTML
  document
    .querySelector("#order_new_print_parts_add_part_body")
    .insertAdjacentHTML("beforeend", orderNewPrintPartsAddPartButtonHTML);
  // Add Click Event Listener
  document
    .querySelector("#order_new_print_parts_add_part_button")
    .addEventListener("click", () => {
      addOrderNewPrintPart();
    });
};

/* ============================================================================================= */
