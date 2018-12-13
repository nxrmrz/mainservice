/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  globalInit();
  addPricingTabsClickListener(pricingMaterialObjectArray);
  // Pre-Select a Material Type Tab
  selectPricingSelectionTab(pricingMaterialObjectArray[0], "materialType");
};

/* =========================================== CLASS ============================================ */

class PricingMaterialTypeObject {
  constructor(materialType, processObjectArray) {
    this.materialType = materialType;
    this.processObjectArray = processObjectArray;
  }
}

class PricingProcessObject {
  constructor(process, materialArray) {
    this.process = process;
    this.materialArray = materialArray;
  }
}

/* ========================================== PLASTIC =========================================== */

/* ----------------------------------------- MATERIALS ------------------------------------------ */

const plasticFDMMaterialArray = ["pla", "abs", "petg", "flex"];

/* ----------------------------------------- PROCESSES ------------------------------------------ */

const plasticFDMObject = new PricingProcessObject(
  "fdm",
  plasticFDMMaterialArray
);

const plasticProcessObjectArray = [plasticFDMObject];

/* ------------------------------------------- OBJECT ------------------------------------------- */

const plasticPricingMaterialObject = new PricingMaterialTypeObject(
  "plastic",
  plasticProcessObjectArray
);

/* ======================================== OBJECT ARRAY ======================================== */

const pricingMaterialObjectArray = [plasticPricingMaterialObject];

/* ==================================== ADD CLICK LISTENERS ===================================== */

const addPricingTabsClickListener = objectArray => {
  objectArray.forEach(object => {
    document
      .querySelector("#pricing_selection_column_" + object.materialType)
      .addEventListener("click", () => {
        selectPricingSelectionTab(object, "materialType");
      });

    object.processObjectArray.forEach(object => {
      document
        .querySelector("#pricing_selection_column_" + object.process)
        .addEventListener("click", () => {
          selectPricingSelectionTab(object, "process");
        });

      object.materialArray.forEach(element => {
        document
          .querySelector("#pricing_selection_column_" + element)
          .addEventListener("click", () => {
            selectPricingSelectionTab(element, "material");
          });
      });
    });
  });
};

/* ========================= SELECT AND DESELECT PRICING SELECTION TAB ========================== */

/* ----------------------------------------- VARIABLES ------------------------------------------ */

let selectedPricingMaterialType;
let selectedPricingProcess;
let selectedPricingMaterial;

/* ------------------------------------------- SELECT ------------------------------------------- */

const selectPricingSelectionTab = (object, type) => {
  // MATERIAL TYPE
  if (type === "materialType") {
    // Check if toggled tab is already selected
    if (selectedPricingMaterialType === object.materialType) return;

    // Deselect currently selected tab
    deselectPricingSelectionTab("materialType");

    // Update CSS
    // Material Type Tab CSS
    document
      .querySelector("#pricing_selection_column_" + object.materialType)
      .classList.toggle("pricing_selection_column_selected");
    // Process Tab Opacity
    document
      .querySelector("#pricing_selection_row_" + object.materialType)
      .classList.toggle("pricing_selection_row_selected");
    // Process Tab Height
    document
      .querySelector("#pricing_process_row_body")
      .classList.toggle("pricing_" + object.materialType + "_process_row_body");
    // Process CSS
    selectPricingSelectionTab(object.processObjectArray[0], "process");

    // Update selected tab
    selectedPricingMaterialType = object.materialType;

    // PROCESS
  } else if (type === "process") {
    // Check if toggled tab is already selected
    if (selectedPricingProcess === object.process) return;

    // Deselect currently selected tab
    deselectPricingSelectionTab("process");

    // Update CSS
    // Process Tab CSS
    document
      .querySelector("#pricing_selection_column_" + object.process)
      .classList.toggle("pricing_selection_column_selected");
    // Material Tab Opacity
    document
      .querySelector("#pricing_selection_row_" + object.process)
      .classList.toggle("pricing_selection_row_selected");
    // Material Tab Height
    document
      .querySelector("#pricing_material_row_body")
      .classList.toggle("pricing_" + object.process + "_material_row_body");
    // Material CSS
    selectPricingSelectionTab(object.materialArray[0], "material");

    // Update selected tab
    selectedPricingProcess = object.process;

    // MATERIAL
  } else if (type === "material") {
    // Check if toggled tab is already selected
    if (selectedPricingMaterial === object) return;

    // Deselect currently selected tab
    deselectPricingSelectionTab("material");

    // Update CSS
    // Material Tab CSS
    document
      .querySelector("#pricing_selection_column_" + object)
      .classList.toggle("pricing_selection_column_selected");
    // Table CSS
    document
      .querySelector("#pricing_table_" + object)
      .classList.toggle("pricing_table_selected");

    // Update selected tab
    selectedPricingMaterial = object;
  }
};

/* ------------------------------------------ DESELECT ------------------------------------------ */

const deselectPricingSelectionTab = type => {
  // MATERIAL TYPE
  if (type === "materialType") {
    if (!selectedPricingMaterialType) return;

    // Update CSS
    // Material Type Tab CSS
    document
      .querySelector("#pricing_selection_column_" + selectedPricingMaterialType)
      .classList.toggle("pricing_selection_column_selected");
    // Process Tab Opacity
    document
      .querySelector("#pricing_selection_row_" + selectedPricingMaterialType)
      .classList.toggle("pricing_selection_row_selected");
    // Process Tab Height
    document
      .querySelector("#pricing_process_row_body")
      .classList.toggle(
        "pricing_" + selectedPricingMaterialType + "_process_row_body"
      );
    // Process CSS
    deselectPricingSelectionTab("process");

    // Update selected tab
    selectedPricingMaterialType = null;

    // PROCESS
  } else if (type === "process") {
    if (!selectedPricingProcess) return;

    // Update CSS
    // Process Tab CSS
    document
      .querySelector("#pricing_selection_column_" + selectedPricingProcess)
      .classList.toggle("pricing_selection_column_selected");
    // Material Tab Opacity
    document
      .querySelector("#pricing_selection_row_" + selectedPricingProcess)
      .classList.toggle("pricing_selection_row_selected");
    // Material Tab Height
    document
      .querySelector("#pricing_material_row_body")
      .classList.toggle(
        "pricing_" + selectedPricingProcess + "_material_row_body"
      );
    // Material CSS
    document
      .querySelector("#pricing_selection_column_" + selectedPricingProcess)
      .classList.toggle("pricing_selection_column_selected");

    deselectPricingSelectionTab("material");

    // Update selected tab
    selectedPricingProcess = null;

    // MATERIAL
  } else if (type === "material") {
    if (!selectedPricingMaterial) return;

    // Update CSS
    // Material Tab CSS
    document
      .querySelector("#pricing_selection_column_" + selectedPricingMaterial)
      .classList.toggle("pricing_selection_column_selected");
    // Table CSS
    document
      .querySelector("#pricing_table_" + selectedPricingMaterial)
      .classList.toggle("pricing_table_selected");

    // Update selected tab
    selectedPricingMaterial = null;
  }
};

/* ============================================================================================== */
