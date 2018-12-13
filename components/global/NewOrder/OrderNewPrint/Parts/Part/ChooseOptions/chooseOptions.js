/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintPartChooseOptions = partNumber => {
  document.querySelector(
    "#order_new_print_parts_part_" + partNumber + "_choose_options_form_body"
  ).innerHTML = "";
  addOrderNewPrintPartChooseOptionsHeader(partNumber);
  addOrderNewPrintPartChooseOptionsQuantityOption(partNumber);
  addOrderNewPrintPartChooseOptionsQualityOption(partNumber);
  addOrderNewPrintPartChooseOptionsStrengthOption(partNumber);
  addOrderNewPrintPartChooseOptionsColorOption(partNumber);
};

/* =================================== CHOOSE OPTIONS HEADER =================================== */

const addOrderNewPrintPartChooseOptionsHeader = partNumber => {
  orderNewPrintPartChooseOptionsHeaderHTML =
    "<div class='order_new_print_form_header_body order_new_print_parts_part_choose_options_form_header_body'>" +
    "<div class='order_new_print_form_header_text order_new_print_parts_part_choose_options_form_header_text'>" +
    "Choose Options" +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_choose_options_form_body"
    )
    .insertAdjacentHTML("beforeend", orderNewPrintPartChooseOptionsHeaderHTML);
};

/* ====================================== QUANTITY OPTION ====================================== */

const addOrderNewPrintPartChooseOptionsQuantityOption = partNumber => {
  // Create the Quantity Option Input Field
  const addOrderNewPrintPartChooseOptionsQuantityOptionHTML =
    "<div class='order_new_print_option_input_field order_new_print_parts_part_quantity_option_input_field'>" +
    "<div class='order_new_print_option_input_field_header_body order_new_print_parts_part_quantity_option_input_field_header_body'>" +
    "<div class='order_new_print_option_input_field_header_text order_new_print_parts_part_quantity_option_input_field_header_text'>" +
    "Quantity" +
    "</div>" +
    "</div>" +
    "<div class='order_new_print_option_input_body order_new_print_parts_part_quantity_option_input_body'>" +
    "<input type='number' id='order_new_print_parts_part_" +
    partNumber +
    "_quantity_option_input' class='order_new_print_option_input_number order_new_print_parts_part_quantity_option_input' min=1 value=1>" +
    "</div>" +
    "</div>";
  // Insert the Quantity Option Input Field
  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_choose_options_form_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      addOrderNewPrintPartChooseOptionsQuantityOptionHTML
    );
};

/* ====================================== QUALITY OPTION ======================================= */

const addOrderNewPrintPartChooseOptionsQualityOption = partNumber => {
  // Create the Quality Option Input Field
  const addOrderNewPrintPartChooseOptionsQualityOptionHTML =
    "<div class='order_new_print_option_input_field order_new_print_parts_part_quality_option_input_field'>" +
    "<div class='order_new_print_option_input_field_header_body order_new_print_parts_part_quality_option_input_field_header_body'>" +
    "<div class='order_new_print_option_input_field_header_text order_new_print_parts_part_quality_option_input_field_header_text'>" +
    "Quality" +
    "</div>" +
    "</div>" +
    "<div class='order_new_print_option_input_body order_new_print_parts_part_quality_option_input_body'>" +
    "<select id='order_new_print_parts_part_" +
    partNumber +
    "_quality_option_input' class='order_new_print_option_input_select order_new_print_parts_part_quality_option_input'></select>" +
    "</div>" +
    "</div>";
  // Insert the Quality Option Input Field
  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_choose_options_form_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      addOrderNewPrintPartChooseOptionsQualityOptionHTML
    );
};

const addOrderNewPrintPartChooseOptionsPopulateQualityOption = (
  partNumber,
  obj
) => {
  // Construct the Quality Selection
  document.querySelector(
    "#order_new_print_parts_part_" + partNumber + "_quality_option_input"
  ).innerHTML = "";

  obj.qualityDefaultValuesArray.forEach(ele => {
    let selected = "";
    if (ele.qualityName === obj.defaultQualityValue) selected = "selected";
    const chooseOptionsQualitySelectFieldOptions =
      "<option value='" +
      ele.qualityName +
      "' class='order_new_prints_option_input_select_option' " +
      selected +
      ">" +
      ele.qualityName +
      "</option>";

    document
      .querySelector(
        "#order_new_print_parts_part_" + partNumber + "_quality_option_input"
      )
      .insertAdjacentHTML("beforeend", chooseOptionsQualitySelectFieldOptions);
  });
};

/* ====================================== STRENGTH OPTION ====================================== */

const addOrderNewPrintPartChooseOptionsStrengthOption = partNumber => {
  // Create the Strength Option Input Field
  const addOrderNewPrintPartChooseOptionsStrengthOptionHTML =
    "<div class='order_new_print_option_input_field order_new_print_parts_part_strength_option_input_field'>" +
    "<div class='order_new_print_option_input_field_header_body order_new_print_parts_part_strength_option_input_field_header_body'>" +
    "<div class='order_new_print_option_input_field_header_text order_new_print_parts_part_strength_option_input_field_header_text'>" +
    "Strength" +
    "</div>" +
    "</div>" +
    "<div class='order_new_print_option_input_body order_new_print_parts_part_strength_option_input_body'>" +
    "<select id='order_new_print_parts_part_" +
    partNumber +
    "_strength_option_input' class='order_new_print_option_input_select order_new_print_parts_part_strength_option_input'></select>" +
    "</div>" +
    "</div>";
  // Insert the Strength Option Input Field
  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_choose_options_form_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      addOrderNewPrintPartChooseOptionsStrengthOptionHTML
    );
};

const addOrderNewPrintPartChooseOptionsPopulateStrengthOption = (
  partNumber,
  obj
) => {
  // Construct the Strength Selection
  document.querySelector(
    "#order_new_print_parts_part_" + partNumber + "_strength_option_input"
  ).innerHTML = "";

  obj.strengthDefaultValuesArray.forEach(ele => {
    let selected = "";
    if (ele.strengthName === obj.defaultStrengthValue) selected = "selected";
    const chooseOptionsStrengthSelectFieldOptions =
      "<option value='" +
      ele.strengthName +
      "' class='order_new_prints_option_input_select_option' " +
      selected +
      ">" +
      ele.strengthName +
      "</option>";

    document
      .querySelector(
        "#order_new_print_parts_part_" + partNumber + "_strength_option_input"
      )
      .insertAdjacentHTML("beforeend", chooseOptionsStrengthSelectFieldOptions);
  });
};

/* ======================================= COLOR OPTION ======================================== */

const addOrderNewPrintPartChooseOptionsColorOption = partNumber => {
  // Create the Color Option Input Field
  const addOrderNewPrintPartChooseOptionsColorOptionHTML =
    "<div class='order_new_print_option_input_field order_new_print_parts_part_color_option_input_field'>" +
    "<div class='order_new_print_option_input_field_header_body order_new_print_parts_part_color_option_input_field_header_body'>" +
    "<div class='order_new_print_option_input_field_header_text order_new_print_parts_part_color_option_input_field_header_text'>" +
    "Color" +
    "</div>" +
    "</div>" +
    "<div class='order_new_print_option_input_body order_new_print_parts_part_color_option_input_body'>" +
    "<select id='order_new_print_parts_part_" +
    partNumber +
    "_color_option_input' class='order_new_print_option_input_select order_new_print_parts_part_color_option_input'></select>" +
    "</div>" +
    "</div>";
  // Insert the Color Option Input Field
  document
    .querySelector(
      "#order_new_print_parts_part_" + partNumber + "_choose_options_form_body"
    )
    .insertAdjacentHTML(
      "beforeend",
      addOrderNewPrintPartChooseOptionsColorOptionHTML
    );
};

const addOrderNewPrintPartChooseOptionsPopulateColorOption = (
  partNumber,
  obj
) => {
  // Construct the Color Selection
  document.querySelector(
    "#order_new_print_parts_part_" + partNumber + "_color_option_input"
  ).innerHTML = "";

  obj.colorsArray.forEach(ele => {
    let selected = "";
    if (ele.colorName === obj.defaultColorValue) selected = "selected";
    const chooseOptionsColorSelectFieldOptions =
      "<option value='" +
      ele.colorName +
      "' class='order_new_prints_option_input_select_option' " +
      selected +
      ">" +
      ele.colorName +
      "</option>";

    document
      .querySelector(
        "#order_new_print_parts_part_" + partNumber + "_color_option_input"
      )
      .insertAdjacentHTML("beforeend", chooseOptionsColorSelectFieldOptions);
  });
};

/* ============================================================================================= */
