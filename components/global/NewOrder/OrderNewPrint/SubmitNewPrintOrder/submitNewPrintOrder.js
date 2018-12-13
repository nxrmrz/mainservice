/* ====================================== INITIALISATION ======================================= */

const submitNewPrintOrder = () => {
  // Validate Inputs
  if (!orderNewPrintInputValidation) {
    return;
  }
  // Collect Inputs
  orderNewPrintCollectInput();
  // Pre Submit
  loadLoader(document.querySelector("#order_new_print_modal_body")).then(() => {
    orderNewPrintSubmitLoadingHandler();
  });
  // Submit
  orderNewPrintSubmitOrder();
};

/* ================================= CLASS OBJECT CONSTRUCTOR ================================== */

class OrderNewPrintPartObject {
  constructor(
    fileId,
    fileName,
    materialGroup,
    process,
    material,
    orderQuantity,
    producedQuantity,
    quality,
    strength,
    color
  ) {
    this.fileId = fileId;
    this.fileName = fileName;
    this.materialGroup = materialGroup;
    this.process = process;
    this.material = material;
    this.orderQuantity = orderQuantity;
    this.producedQuantity = producedQuantity;
    this.quality = quality;
    this.strength = strength;
    this.color = color;
  }
}

/* ======================================= COLLECT INPUT ======================================= */

let orderNewPrintPartObjectArray;
let orderNewPrintFormDataArray;
let orderNewPrintOrderObject;

const orderNewPrintCollectInput = () => {
  orderNewPrintPartObjectArray = [];
  orderNewPrintFormDataArray = [];
  orderNewPrintOrderObject = {};

  for (i = 0; i <= orderNewPrintPartNumber; i++) {
    if (orderNewPrintDeletedPart.indexOf(i) == -1) {
      // Collect File Input
      const formElement = document.querySelector(
        "#order_new_print_parts_part_" + i + "_upload_model_input_body"
      );
      orderNewPrintFormDataArray.push(new FormData(formElement));
      // Order Attribute Input
      const fileId = undefined;
      const fileName = document.querySelector(
        "#order_new_print_parts_part_" + i + "_upload_model_option_input_file"
      ).files[0].name;
      const materialGroup = orderNewPrintPartSelectedMaterialGroupArrayName[i];
      const process = orderNewPrintPartSelectedProcessArrayName[i];
      const material = orderNewPrintPartSelectedMaterialArrayName[i];
      const orderQuantity = document.querySelector(
        "#order_new_print_parts_part_" + i + "_quantity_option_input"
      ).value;
      const producedQuantity = 0;
      const quality = document.querySelector(
        "#order_new_print_parts_part_" + i + "_quality_option_input"
      ).value;
      const strength = document.querySelector(
        "#order_new_print_parts_part_" + i + "_strength_option_input"
      ).value;
      const color = document.querySelector(
        "#order_new_print_parts_part_" + i + "_color_option_input"
      ).value;
      orderNewPrintPartObjectArray.push(
        new OrderNewPrintPartObject(
          fileId,
          fileName,
          materialGroup,
          process,
          material,
          orderQuantity,
          producedQuantity,
          quality,
          strength,
          color
        )
      );
    }
  }

  orderNewPrintOrderObject = {
    partObjectArray: orderNewPrintPartObjectArray,
    discountObjectArray: discountObjectArray,
    pricing: document.querySelector(
      "#order_new_print_pricing_option_input_select"
    ).value,
    delivery: document.querySelector("#order_new_print_delivery_option_input")
      .value,
    additionalNote: document.querySelector(
      "#order_new_print_additional_note_option_input"
    ).value
  };
};

/* ================================ PRE-SUBMIT INPUT VALIDATION ================================ */

const orderNewPrintInputValidation = () => {
  // Check if At least one file is Uploaded
  if (orderNewPrintDeletedPart.length == orderNewPrintPartNumber + 1) {
    document.querySelector("#order_new_print_parts_error_handler").innerHTML =
      "Must upload at least one file";
    return false;
  } else {
    document.querySelector("#order_new_print_parts_error_handler").innerHTML =
      "";
  }

  if (orderNewPrintSelectedPart != null) {
    if (!validateUploadModelInput(orderNewPrintSelectedPart)) {
      return false;
    }
  }
};

/* ================================== SUBMIT LOADING HANDLER =================================== */

const orderNewPrintSubmitLoadingHandler = () => {
  /* Modal Main */
  document.querySelector("#order_new_print_modal").style.height = "40vh";
  document.querySelector("#order_new_print_modal").style.top = "30vh";
  /* Modal Header */
  document.querySelector("#order_new_print_modal_header").style.top = "30vh";
  document.querySelector("#order_new_print_modal_header_text").innerHTML =
    "Please wait...";
  /* Modal Footer */
  document.querySelector("#order_new_print_modal_footer_contents").innerHTML =
    "";

  // Screensize
  const screensize = window.matchMedia("(min-width: 600px)");

  if (screensize.matches) {
    document.querySelector("#order_new_print_modal_footer").style.top =
      "calc(70vh - 7vmin)";
  } else {
    document.querySelector("#order_new_print_modal_footer").style.top =
      "calc(70vh - 14vmin)";
  }

  screensize.addListener(() => {
    /* Modal Main */
    document.querySelector("#order_new_print_modal").style.height = "40vh";
    document.querySelector("#order_new_print_modal").style.top = "30vh";
    /* Modal Header */
    document.querySelector("#order_new_print_modal_header").style.top = "30vh";

    if (screensize.matches) {
      document.querySelector("#order_new_print_modal_footer").style.top =
        "calc(70vh - 7vmin)";
    } else {
      document.querySelector("#order_new_print_modal_footer").style.top =
        "calc(70vh - 14vmin)";
    }
  });

  return;
};

/* ======================================= SUBMIT ORDER ======================================== */

const orderNewPrintSubmitOrder = () => {
  setTimeout(() => {
    // Submit
    for (i = 0; i <= orderNewPrintPartNumber; i++) {
      if (orderNewPrintDeletedPart.indexOf(i) == -1) {
        $.ajax({
          type: "POST",
          url: "/orderNewPrint/saveFile",
          async: false,
          processData: false,
          contentType: false,
          data: orderNewPrintFormDataArray[i],
          success: data => {
            orderNewPrintOrderObject.partObjectArray[i].fileId = data;
          }
        });
      }
    }

    $.ajax({
      type: "POST",
      url: "/orderNewPrint/createNewOrder",
      async: false,
      contentType: "application/json",
      data: JSON.stringify(orderNewPrintOrderObject),
      success: data => {
        // Post Submit
        orderNewPrintSubmitSuccessHandler();
        loadProfileOrdersPrintsOrdersListTableContents();
      }
    });
  }, 0);
};

/* ================================== SUBMIT SUCCESS HANDLER =================================== */

const orderNewPrintSubmitSuccessHandler = () => {
  /* ------------------------------------- INSERT ELEMENTS ------------------------------------- */

  // Modal Header

  document.querySelector("#order_new_print_modal_header_text").innerHTML =
    "Submitted";

  // Modal Body

  const orderNewPrintSubmitSuccessHandlerBodyHTML =
    "<div id='order_new_print_success_modal_body'>" +
    "<div class='order_new_print_success_message'>" +
    "<div id='order_new_print_success_message_1_text' class='order_new_print_success_message_text'>" +
    "Successfully Submitted a New Order" +
    "</div>" +
    "</div>" +
    "<div class='order_new_print_success_message'>" +
    "<div class='order_new_print_success_message_text'>" +
    "View your orders at: Profile > Orders > Prints" +
    "</div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#order_new_print_modal_body"
  ).innerHTML = orderNewPrintSubmitSuccessHandlerBodyHTML;

  // Modal Footer

  const orderNewPrintSubmitSuccessHandlerFooterHTML =
    "<div id='order_new_print_new_order_body' class='order_new_print_footer_button'>" +
    "<div id='order_new_print_new_order_text' class='order_new_print_footer_button_text'>New Order</div>" +
    "</div>" +
    "<div id='order_new_print_close_body' class='order_new_print_footer_button'>" +
    "<div id='order_new_print_close_text' class='order_new_print_footer_button_text'>Close</div>" +
    "</div>";

  document.querySelector(
    "#order_new_print_modal_footer_contents"
  ).innerHTML = orderNewPrintSubmitSuccessHandlerFooterHTML;

  /* --------------------------------- BUTTON CLICK LISTENERS ---------------------------------- */

  // New Order Button

  document
    .querySelector("#order_new_print_new_order_body")
    .addEventListener("click", () => {
      removeModal("order_new_print");
      removeBackdrop("order_new_print");
      setTimeout(() => {
        orderNewPrint();
      }, 500);
    });

  // Close Button

  document
    .querySelector("#order_new_print_close_body")
    .addEventListener("click", () => {
      removeModal("order_new_print");
      removeBackdrop("order_new_print");
    });
};

/* ============================================================================================= */
