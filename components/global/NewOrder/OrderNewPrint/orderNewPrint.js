/* ===================================== GLOBAL VARIABLES ====================================== */

let orderNewPrintPartNumber;
let orderNewPrintDeletedPart;
let orderNewPrintSelectedPart;
let orderNewPrintPartSelectedMaterialGroupArrayId;
let orderNewPrintPartSelectedMaterialGroupArrayName;
let orderNewPrintPartSelectedProcessArrayId;
let orderNewPrintPartSelectedProcessArrayName;
let orderNewPrintPartSelectedMaterialArrayId;
let orderNewPrintPartSelectedMaterialArrayName;

/* ====================================== INITIALISATION ======================================= */

const orderNewPrint = () => {
  orderNewPrintPartNumber = -1;
  orderNewPrintDeletedPart = [];
  orderNewPrintSelectedPart = null;
  orderNewPrintPartSelectedMaterialGroupArrayId = [];
  orderNewPrintPartSelectedMaterialGroupArrayName = [];
  orderNewPrintPartSelectedProcessArrayId = [];
  orderNewPrintPartSelectedProcessArrayName = [];
  orderNewPrintPartSelectedMaterialArrayId = [];
  orderNewPrintPartSelectedMaterialArrayName = [];
  addOrderNewPrintModal();
  addOrderNewPrintForm();
  addOrderNewPrintParts();
  addOrderNewPrintGlobalOptionsForm();
};

/* =========================================== MODAL =========================================== */

// ELEMENTS
const orderNewPrintModalId = "order_new_print";
const orderNewPrintModalHeader = "Order New Print";
const orderNewPrintModalFooter =
  "<div id='order_new_print_order_button' class='order_new_print_footer_button'>" +
  "<div id='order_new_print_order_button_text' class='order_new_print_footer_button_text'>" +
  "Order" +
  "</div>" +
  "</div>" +
  "<div id='order_new_print_cancel_button' class='order_new_print_footer_button'>" +
  "<div id='order_new_print_cancel_button_text' class='order_new_print_footer_button_text'>" +
  "Cancel" +
  "</div>" +
  "</div>";
let orderNewPrintModalElementObject;
// CSS
const orderNewPrintModalMobileHeight = 90;
const orderNewPrintModalMobileWidth = 90;
const orderNewPrintModalDesktopHeight = 90;
const orderNewPrintModalDesktopWidth = 50;
const orderNewPrintModalFooterHeight = 14;
let orderNewPrintModalCSSObject;

const addOrderNewPrintModal = () => {
  orderNewPrintModalElementObject = new modalElementObject(
    orderNewPrintModalId,
    orderNewPrintModalHeader,
    orderNewPrintModalFooter
  );

  orderNewPrintModalCSSObject = new modalCSSObject(
    orderNewPrintModalMobileHeight,
    orderNewPrintModalMobileWidth,
    orderNewPrintModalDesktopHeight,
    orderNewPrintModalDesktopWidth,
    orderNewPrintModalFooterHeight
  );

  // Create the Modal
  addModal(orderNewPrintModalElementObject, orderNewPrintModalCSSObject);
  // Add the Footer Buttons Event Listeners
  // Submit Order
  document
    .querySelector("#order_new_print_order_button")
    .addEventListener("click", () => {
      submitNewPrintOrder();
    });
  // Close Order
  document
    .querySelector("#order_new_print_cancel_button")
    .addEventListener("click", () => {
      removeModal(orderNewPrintModalId);
      removeBackdrop(orderNewPrintModalId);
    });
};

/* ============================== CREATE THE ORDER NEW PRINT FORM ============================== */

const addOrderNewPrintForm = () => {
  // Create Order New Print Form base HTML
  const orderNewPrintBaseFormHTML =
    "<div id='order_new_print_form_body'>" +
    "<div id='order_new_print_parts_body'></div>" +
    "<div id='order_new_print_global_options_form_body'></div>" +
    "</div>";
  // Insert Order New Print Form base HTML
  document.querySelector(
    "#order_new_print_modal_body"
  ).innerHTML = orderNewPrintBaseFormHTML;
};

/* ============================================================================================= */
