/* ====================================== INITIALISATION ======================================= */

/* ============================= CREATE CLASS OBJECT FOR A PROCESS ============================= */

class OrderNewPrintProcessObject {
  constructor(id, name, materialObjectArray) {
    this.id = id;
    this.name = name;
    this.materialObjectArray = materialObjectArray;
  }
}

/* ================================ ADD THE PROCESS SELECTIONS ================================= */

const addOrderNewPrintPartSelectMaterialProcessSelection = (
  partNumber,
  objArr
) => {
  // Reset Values
  // Process
  orderNewPrintPartSelectedProcessArrayId[partNumber] = undefined;
  orderNewPrintPartSelectedProcessArrayName[partNumber] = undefined;
  document.querySelector(
    "#order_new_print_parts_part_" +
      partNumber +
      "_select_material_process_input_body"
  ).innerHTML = "";
  // Material
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
  // Create the Selection
  objArr.forEach(obj => {
    // Create the HTML
    const processSelectionHTML =
      "<div id='order_new_print_parts_part_" +
      partNumber +
      "_" +
      obj.id +
      "_process_selection_body' class='order_new_print_parts_part_process_selection_body'>" +
      "<div id='order_new_print_parts_part_" +
      partNumber +
      "_" +
      obj.id +
      "_process_selection_text' class='order_new_print_parts_part_process_selection_text'>" +
      obj.name +
      "</div>" +
      "</div>";
    // Insert the HTML
    document
      .querySelector(
        "#order_new_print_parts_part_" +
          partNumber +
          "_select_material_process_input_body"
      )
      .insertAdjacentHTML("beforeend", processSelectionHTML);
    // Add the Click Event Listener
    document
      .querySelector(
        "#order_new_print_parts_part_" +
          partNumber +
          "_" +
          obj.id +
          "_process_selection_body"
      )
      .addEventListener("click", () => {
        addOrderNewPrintPartSelectMaterialSelectProcess(partNumber, obj);
      });
  });
  // Preselect Process
  addOrderNewPrintPartSelectMaterialSelectProcess(partNumber, objArr[0]);
};

/* ================================ SELECT AND DESELECT PROCESS ================================ */

// Select Process
const addOrderNewPrintPartSelectMaterialSelectProcess = (partNumber, obj) => {
  if (orderNewPrintPartSelectedProcessArrayId[partNumber] === obj.id) {
    return;
  }

  addOrderNewPrintPartSelectMaterialDeselectProcess(partNumber, obj);

  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        obj.id +
        "_process_selection_body"
    )
    .classList.add(
      "order_new_print_parts_part_process_selection_body_selected"
    );
  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        obj.id +
        "_process_selection_text"
    )
    .classList.add(
      "order_new_print_parts_part_process_selection_text_selected"
    );

  addOrderNewPrintPartSelectMaterialMaterialSelection(
    partNumber,
    obj.materialObjectArray
  );

  orderNewPrintPartSelectedProcessArrayId[partNumber] = obj.id;
  orderNewPrintPartSelectedProcessArrayName[partNumber] = obj.name;
};

// Deselect Process
const addOrderNewPrintPartSelectMaterialDeselectProcess = partNumber => {
  if (!orderNewPrintPartSelectedProcessArrayId[partNumber]) {
    return;
  }

  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        orderNewPrintPartSelectedProcessArrayId[partNumber] +
        "_process_selection_body"
    )
    .classList.remove(
      "order_new_print_parts_part_process_selection_body_selected"
    );
  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        orderNewPrintPartSelectedProcessArrayId[partNumber] +
        "_process_selection_text"
    )
    .classList.remove(
      "order_new_print_parts_part_process_selection_text_selected"
    );
};

/* ============================================================================================= */
