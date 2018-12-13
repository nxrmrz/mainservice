/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintPartUploadModel = partNumber => {
  addOrderNewPrintPartUploadModelHeader(partNumber);
  addOrderNewPrintPartUploadModelInputField(partNumber);
};

/* ==================================== UPLOAD MODEL HEADER ==================================== */

const addOrderNewPrintPartUploadModelHeader = partNumber => {
  orderNewPrintPartUploadModelHeaderHTML =
    "<div class='order_new_print_form_header_body order_new_print_parts_part_upload_model_form_header_body'>" +
    "<div class='order_new_print_form_header_text order_new_print_parts_part_upload_model_form_header_text'>" +
    "Upload 3D Model" +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_upload_model_form_body"
    )
    .insertAdjacentHTML("beforeend", orderNewPrintPartUploadModelHeaderHTML);
};

/* =============================== ADD UPLOAD MODEL INPUT FIELD ================================ */

const addOrderNewPrintPartUploadModelInputField = partNumber => {
  const orderNewPrintPartUploadModelInputFieldHTML =
    "<div class='order_new_print_parts_part_input_field'>" +
    "<form id='order_new_print_parts_part_" +
    partNumber +
    "_upload_model_input_body' class='order_new_print_parts_part_upload_model_input_body'>" +
    "<input type='file' name='uploadModel' id='order_new_print_parts_part_" +
    partNumber +
    "_upload_model_option_input_file' class='order_new_print_parts_part_upload_model_input_file' onchange='addOrderNewPrintPartUploadModelInputChange(" +
    partNumber +
    ")'>" +
    "</form>" +
    "<div id='order_new_print_parts_part_" +
    partNumber +
    "_upload_model_input_error_handler' class='order_new_print_parts_part_input_error_handler'><div>" +
    "</div>";

  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_upload_model_form_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      orderNewPrintPartUploadModelInputFieldHTML
    );
};

/* LISTEN TO CHANGES IN UPLOAD CHANGES */
const addOrderNewPrintPartUploadModelInputChange = partNumber => {
  if (!validateUploadModelInput(partNumber)) {
    return;
  }

  // Add the Choose Options
  addOrderNewPrintPartChooseOptions(partNumber);
  // Add the Select Material
  addOrderNewPrintPartSelectMaterial(partNumber);

  let fileName = document.querySelector(
    "#order_new_print_parts_part_" +
      partNumber +
      "_upload_model_option_input_file"
  ).files[0].name;

  const extensionIndex = fileName.indexOf(".");

  if (extensionIndex + 1 > 25) {
    fileName =
      fileName.substring(0, 12) +
      "..." +
      fileName.substring(extensionIndex - 10, extensionIndex);
  } else {
    fileName = fileName.substring(0, extensionIndex);
  }

  document.querySelector(
    "#order_new_print_parts_part_" + partNumber + "_toggle_header_text"
  ).innerHTML = fileName;
};

/* ================================ VALIDATE UPLOAD MODEL INPUT ================================ */

const validateUploadModelInput = partNumber => {
  const uploadedFile = document.querySelector(
    "#order_new_print_parts_part_" +
      partNumber +
      "_upload_model_option_input_file"
  ).files[0];
  let uploadedFileExtension;

  if (uploadedFile) {
    const fileExtensionStartIndex = uploadedFile.name.indexOf(".") + 1;
    uploadedFileExtension = uploadedFile.name.substring(
      fileExtensionStartIndex,
      uploadedFile.name.length
    );
  }

  if (!uploadedFile) {
    document.querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_upload_model_input_error_handler"
    ).innerHTML = "Please upload a file";

    return false;
  } else if (
    uploadedFileExtension.toUpperCase() != "STL" &&
    uploadedFileExtension.toUpperCase() != "OBJ" &&
    uploadedFileExtension.toUpperCase() != "3MF"
  ) {
    document.querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_upload_model_input_error_handler"
    ).innerHTML = "Invalid file: upload an STL, OBJ or 3MF type file";

    return false;
  } else {
    document.querySelector(
      "#order_new_print_parts_part_" +
        partNumber +
        "_upload_model_input_error_handler"
    ).innerHTML = "";

    return true;
  }
};

/* ============================================================================================= */
