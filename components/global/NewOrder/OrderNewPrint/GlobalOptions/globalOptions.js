/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintGlobalOptionsForm = () => {
  addOrderNewPrintGlobalOptionsHeader();
  addOrderNewPrintDiscountOptionForm();
  addOrderNewPrintPricingOptionForm();
  addOrderNewPrintDeliveryOptionForm();
  addOrderNewPrintAdditionalNoteOptionForm();
};

/* =================================== GLOBAL OPTIONS HEADER =================================== */

const addOrderNewPrintGlobalOptionsHeader = () => {
  // Create the Global Options Header
  const orderNewPrintGlobalOptionsHeaderHTML =
    "<div id='order_new_print_global_options_form_header_body' class='order_new_print_form_header_body'>" +
    "<div id='order_new_print_global_options_form_header_text' class='order_new_print_form_header_text'>" +
    "Global Options" +
    "</div>" +
    "</div>";
  // Insert the Global Options Header
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintGlobalOptionsHeaderHTML);
};

/* ====================================== DISCOUNT OPTION ====================================== */

const addOrderNewPrintDiscountOptionForm = () => {
  // Create the Discount Option Input Field
  const orderNewPrintDiscountOptionFormHTML =
    "<div id='order_new_print_discount_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_discount_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_discount_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Discount" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_discount_option_input_body' class='order_new_print_option_input_body'>" +
    "<input type='text' id='order_new_print_discount_option_input_text' class='order_new_print_option_input_text'>" +
    "<div id='order_new_print_discounts_body'></div>" +
    "</div>" +
    "</div>";

  // Insert the Discount Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintDiscountOptionFormHTML);

  orderNewPrintGetDefaultDiscounts();
};

/* --------------------------------------- GET DISCOUNTS --------------------------------------- */

// Object Constructor
class DiscountObject {
  constructor(
    name,
    code,
    rate,
    minOrderValue,
    maxOrderValue,
    startDate,
    endDate
  ) {
    this.name = name;
    this.code = code;
    this.rate = rate;
    this.minOrderValue = minOrderValue;
    this.maxOrderValue = maxOrderValue;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

// Store discount lists on an array
let discountObjectArray;

// Grab default discounts
const orderNewPrintGetDefaultDiscounts = () => {
  $.ajax({
    type: "POST",
    url: "/discounts/order",
    success: data => {
      discountObjectArray = data;
      data.forEach(discountObject => {
        orderNewPrintAddDiscount(discountObject);
      });
    }
  });
};

/* --------------------------------------- ADD DISCOUNT ---------------------------------------- */

const orderNewPrintAddDiscount = discountObject => {
  const discountName = discountObject.name;

  const discountHTML =
    "<div class='order_new_print_discount_body'>" +
    "<div class='order_new_print_discount_text'>" +
    discountName +
    "</div>" +
    "</div>";

  document
    .querySelector("#order_new_print_discounts_body")
    .insertAdjacentHTML("beforeend", discountHTML);
};

/* ====================================== PRICING OPTION ======================================= */

const addOrderNewPrintPricingOptionForm = () => {
  // Create the Pricing Option Input Field
  const orderNewPrintPricingOptionFormHTML =
    "<div id='order_new_print_pricing_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_pricing_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_pricing_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Pricing" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_pricing_option_input_body' class='order_new_print_option_input_body'>" +
    "<select name='pricing' id='order_new_print_pricing_option_input_select' class='order_new_print_option_input_select'>" +
    "<option value='Basic'>Basic</option>" +
    "<option value='Priority'>Priority</option>" +
    "<option value='Urgent'>Urgent</option>" +
    "</select>" +
    "</div>" +
    "</div>";
  // Insert the Pricing Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintPricingOptionFormHTML);
};

/* ====================================== DELIVERY OPTION ====================================== */

const addOrderNewPrintDeliveryOptionForm = () => {
  // Create the Delivery Option Input Field
  const orderNewPrintDeliveryOptionFormHTML =
    "<div id='order_new_print_delivery_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_delivery_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_delivery_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Delivery" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_delivery_option_input_body' class='order_new_print_option_input_body'>" +
    "<select name='delivery' id='order_new_print_delivery_option_input' class='order_new_print_option_input_select'>" +
    "<option value='Pickup'>Pickup</option>" +
    "<option value='Tracking'>Tracking</option>" +
    "<option value='Courier'>Courier</option>" +
    "</select>" +
    "</div>" +
    "</div>";
  // Insert the Pricing Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintDeliveryOptionFormHTML);
};

/* ====================================== ADDITIONAL NOTE ====================================== */

const addOrderNewPrintAdditionalNoteOptionForm = () => {
  // Create the Additional Note Option Input Field
  const orderNewPrintAdditionalNoteOptionFormHTML =
    "<div id='order_new_print_additional_note_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_additional_note_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_additional_note_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Additional Note" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_additional_note_option_input_body' class='order_new_print_option_input_body'>" +
    "<textarea name='additionalNote' id='order_new_print_additional_note_option_input' class='order_new_print_option_input_textarea'></textarea>" +
    "</div>" +
    "</div>";
  // Insert the Additional Note Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintAdditionalNoteOptionFormHTML);
  // Autosize Textarea
  const textarea = $("#order_new_print_additional_note_option_input");
  textarea.on("change drop keydown cut paste", function() {
    textarea.height("auto");
    textarea.height(textarea.prop("scrollHeight"));
  });
};

/* ============================================================================================= */
