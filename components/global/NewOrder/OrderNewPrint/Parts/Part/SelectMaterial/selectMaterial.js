/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintPartSelectMaterial = partNumber => {
  document.querySelector(
    "#order_new_print_parts_part_" + partNumber + "_select_material_form_body"
  ).innerHTML = "";
  addOrderNewPrintPartSelectMaterialHeader(partNumber);
  addOrderNewPrintPartSelectMaterialStructure(partNumber);
  constructOrderNewPrintSelectMaterialObjectArray();
  addOrderNewPrintPartSelectMaterialMaterialGroupSelection(
    partNumber,
    orderNewPrintSelectMaterialObjectArray
  );
};

/* ================================== SELECT MATERIAL HEADER =================================== */

const addOrderNewPrintPartSelectMaterialHeader = partNumber => {
  orderNewPrintPartSelectMaterialHeaderHTML =
    "<div class='order_new_print_form_header_body order_new_print_parts_part_select_material_form_header_body'>" +
    "<div class='order_new_print_form_header_text order_new_print_parts_part_select_material_form_header_text'>" +
    "Select Material" +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_select_material_form_body"
    )
    .insertAdjacentHTML("beforeend", orderNewPrintPartSelectMaterialHeaderHTML);
};

/* ========================== CONSTRUCT THE SELECT MATERIAL STRUCTURE ========================== */

const addOrderNewPrintPartSelectMaterialStructure = partNumber => {
  const orderNewPrintPartSelectMaterialStructureHTML =
    "<div class='order_new_print_parts_part_select_material_input_field order_new_print_parts_part_select_material_material_group_input_field'>" +
    "<div class='order_new_print_parts_part_select_material_input_field_header_body order_new_print_parts_part_select_material_material_group_input_field_header_body'>" +
    "<div class='order_new_print_parts_part_select_material_input_field_header_text order_new_print_parts_part_select_material_material_group_input_field_header_text'>" +
    "Material Group" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_select_material_material_group_input_body' class='order_new_print_parts_part_select_material_input_body order_new_print_parts_part_select_material_material_group_input_body'></div>" +
    "</div>" +
    "<div class='order_new_print_parts_part_select_material_input_field order_new_print_parts_part_select_material_process_input_field'>" +
    "<div class='order_new_print_parts_part_select_material_input_field_header_body order_new_print_parts_part_select_material_process_input_field_header_body'>" +
    "<div class='order_new_print_parts_part_select_material_input_field_header_text order_new_print_parts_part_select_material_process_input_field_header_text'>" +
    "Process" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_select_material_process_input_body' class='order_new_print_parts_part_select_material_input_body order_new_print_parts_part_select_material_process_input_body'></div>" +
    "</div>" +
    "<div class='order_new_print_parts_part_select_material_input_field order_new_print_parts_part_select_material_material_input_field'>" +
    "<div class='order_new_print_parts_part_select_material_input_field_header_body order_new_print_parts_part_select_material_material_input_field_header_body'>" +
    "<div class='order_new_print_parts_part_select_material_input_field_header_text order_new_print_parts_part_select_material_material_input_field_header_text'>" +
    "Material" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_select_material_material_input_body' class='order_new_print_parts_part_select_material_input_body order_new_print_parts_part_select_material_material_input_body'></div>" +
    "</div>";

  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_select_material_form_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      orderNewPrintPartSelectMaterialStructureHTML
    );
};

/* =========================== CONSTRUCT MATERIAL GROUP OBJECT ARRAY =========================== */

let orderNewPrintSelectMaterialObjectArray;

const constructOrderNewPrintSelectMaterialObjectArray = () => {
  constructOrderNewPrintPlasticObject();
  constructOrderNewPrintMetalObject();

  orderNewPrintSelectMaterialObjectArray = [
    orderNewPrintPlasticObject,
    orderNewPrintMetalObject
  ];
};
