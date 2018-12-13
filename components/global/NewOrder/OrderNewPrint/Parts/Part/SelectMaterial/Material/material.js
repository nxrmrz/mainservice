/* ====================================== INITIALISATION ======================================= */

/* ============================ CREATE CLASS OBJECT FOR A MATERIAL ============================= */

class OrderNewPrintMaterialObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

/* ================================ ADD THE MATERIAL SELECTIONS ================================ */

const addOrderNewPrintPartSelectMaterialMaterialSelection = (
  partNumber,
  objArr
) => {
  // Reset Values
  orderNewPrintPartSelectedMaterialArrayId[partNumber] = undefined;
  orderNewPrintPartSelectedMaterialArrayName[partNumber] = undefined;
  document.querySelector(
    "#order_new_print_parts_part_" +
      partNumber +
      "_select_material_material_input_body"
  ).innerHTML = "";
  // Check if Process Exist
  if (objArr.length == 0) {
    return;
  }
  objArr.forEach(obj => {
    // Create the HTML
    const materialSelectionHTML =
      "<div id='order_new_print_parts_part_" +
      partNumber +
      "_" +
      obj.id +
      "_material_selection_body' class='order_new_print_parts_part_material_selection_body'>" +
      "<div id='order_new_print_parts_part_" +
      partNumber +
      "_" +
      obj.id +
      "_material_selection_text' class='order_new_print_parts_part_material_selection_text'>" +
      obj.name +
      "</div>" +
      "</div>";
    // Insert the HTML
    document
      .querySelector(
        "#order_new_print_parts_part_" +
          partNumber +
          "_select_material_material_input_body"
      )
      .insertAdjacentHTML("beforeend", materialSelectionHTML);
    // Add the Click Event Listener
    document
      .querySelector(
        "#order_new_print_parts_part_" +
          partNumber +
          "_" +
          obj.id +
          "_material_selection_body"
      )
      .addEventListener("click", () => {
        addOrderNewPrintPartSelectMaterialSelectMaterial(partNumber, obj);
      });
  });
  // Preselect Material
  addOrderNewPrintPartSelectMaterialSelectMaterial(partNumber, objArr[0]);
};

/* =============================== SELECT AND DESELECT MATERIAL ================================ */

// Select Material
const addOrderNewPrintPartSelectMaterialSelectMaterial = (partNumber, obj) => {
  if (orderNewPrintPartSelectedMaterialArrayId[partNumber] === obj.id) {
    return;
  }

  addOrderNewPrintPartSelectMaterialDeselectMaterial(partNumber, obj);

  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        obj.id +
        "_material_selection_body"
    )
    .classList.add(
      "order_new_print_parts_part_material_selection_body_selected"
    );
  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        obj.id +
        "_material_selection_text"
    )
    .classList.add(
      "order_new_print_parts_part_material_selection_text_selected"
    );

  obj.method(partNumber);

  orderNewPrintPartSelectedMaterialArrayId[partNumber] = obj.id;
  orderNewPrintPartSelectedMaterialArrayName[partNumber] = obj.name;
};

// Deselect Material
const addOrderNewPrintPartSelectMaterialDeselectMaterial = partNumber => {
  if (!orderNewPrintPartSelectedMaterialArrayId[partNumber]) {
    return;
  }

  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        orderNewPrintPartSelectedMaterialArrayId[partNumber] +
        "_material_selection_body"
    )
    .classList.remove(
      "order_new_print_parts_part_material_selection_body_selected"
    );
  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        orderNewPrintPartSelectedMaterialArrayId[partNumber] +
        "_material_selection_text"
    )
    .classList.remove(
      "order_new_print_parts_part_material_selection_text_selected"
    );
};

/* ============================================================================================= */
