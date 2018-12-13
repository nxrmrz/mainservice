/* ====================================== INITIALISATION ======================================= */

/* ========================= CREATE CLASS OBJECT FOR A MATERIAL GROUP ========================== */

class OrderNewPrintMaterialGroupObject {
  constructor(id, name, processObjectArray) {
    this.id = id;
    this.name = name;
    this.processObjectArray = processObjectArray;
  }
}

/* ============================= ADD THE MATERIAL GROUP SELECTIONS ============================= */

const addOrderNewPrintPartSelectMaterialMaterialGroupSelection = (
  partNumber,
  objArr
) => {
  orderNewPrintPartSelectedMaterialGroupArrayId[partNumber] = undefined;
  orderNewPrintPartSelectedMaterialGroupArrayName[partNumber] = undefined;
  objArr.forEach(obj => {
    // Create the HTML
    const materialGroupSelectionHTML =
      "<div id='order_new_print_parts_part_" +
      partNumber +
      "_" +
      obj.id +
      "_material_group_selection_body' class='order_new_print_parts_part_material_group_selection_body'>" +
      "<div id='order_new_print_parts_part_" +
      partNumber +
      "_" +
      obj.id +
      "_material_group_selection_text' class='order_new_print_parts_part_material_group_selection_text'>" +
      obj.name +
      "</div>" +
      "</div>";
    // Insert the HTML
    document
      .querySelector(
        "#order_new_print_parts_part_" +
          partNumber +
          "_select_material_material_group_input_body"
      )
      .insertAdjacentHTML("beforeend", materialGroupSelectionHTML);
    // Add the Click Event Listener
    document
      .querySelector(
        "#order_new_print_parts_part_" +
          partNumber +
          "_" +
          obj.id +
          "_material_group_selection_body"
      )
      .addEventListener("click", () => {
        addOrderNewPrintPartSelectMaterialSelectMaterialGroup(partNumber, obj);
      });
  });
  // Preselect Plastic
  addOrderNewPrintPartSelectMaterialSelectMaterialGroup(partNumber, objArr[0]);
};

/* ============================ SELECT AND DESELECT MATERIAL GROUP ============================= */
// Select Material Group
const addOrderNewPrintPartSelectMaterialSelectMaterialGroup = (
  partNumber,
  obj
) => {
  if (orderNewPrintPartSelectedMaterialGroupArrayId[partNumber] === obj.id) {
    return;
  }

  addOrderNewPrintPartSelectMaterialDeselectMaterialGroup(partNumber, obj);

  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        obj.id +
        "_material_group_selection_body"
    )
    .classList.add(
      "order_new_print_parts_part_material_group_selection_body_selected"
    );
  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        obj.id +
        "_material_group_selection_text"
    )
    .classList.add(
      "order_new_print_parts_part_material_group_selection_text_selected"
    );

  // Add the Process Selections
  addOrderNewPrintPartSelectMaterialProcessSelection(
    partNumber,
    obj.processObjectArray
  );

  orderNewPrintPartSelectedMaterialGroupArrayId[partNumber] = obj.id;
  orderNewPrintPartSelectedMaterialGroupArrayName[partNumber] = obj.name;
};

// Deselect Material Group
const addOrderNewPrintPartSelectMaterialDeselectMaterialGroup = partNumber => {
  if (!orderNewPrintPartSelectedMaterialGroupArrayId[partNumber]) {
    return;
  }

  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        orderNewPrintPartSelectedMaterialGroupArrayId[partNumber] +
        "_material_group_selection_body"
    )
    .classList.remove(
      "order_new_print_parts_part_material_group_selection_body_selected"
    );
  document
    .querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_" +
        orderNewPrintPartSelectedMaterialGroupArrayId[partNumber] +
        "_material_group_selection_text"
    )
    .classList.remove(
      "order_new_print_parts_part_material_group_selection_text_selected"
    );
};

/* ============================================================================================= */
