/* ========================================= INITIALISE ========================================= */

const orderDetailGlobalOptionsInit = orderDetails => {
  orderDetailGlobalOptionsStructure();
  orderDetailGlobalOptionDelivery(orderDetails.delivery);
  orderDetailGlobalOptionPricing(orderDetails.pricing);
  orderDetailGlobalOptionCustomersNote(orderDetails.ownerNote);
};

/* ========================================= STRUCTURE ========================================== */

const orderDetailGlobalOptionsStructure = () => {
  // GLOBAL OPTIONS HTML STRUCTURE
  const html =
    "<div id='order_detail_delivery_option_body' class='order_detail_global_option_body'></div>" +
    "<div id='order_detail_pricing_option_body' class='order_detail_global_option_body'></div>" +
    "<div id='order_detail_customers_note_body' class='order_detail_global_option_body'></div>";
  // INSERT GLOBAL OPTIONS HTML STRUCTURE
  document.querySelector("#order_detail_global_options_body").innerHTML = html;
};

/* ========================================== DELIVERY ========================================== */

const orderDetailGlobalOptionDelivery = delivery => {
  // GLOBAL OPTION: DELIVERY HTML
  const html =
    "<div class='order_detail_global_option_heading_body'>" +
    "<div class='order_detail_global_option_heading'>Delivery</div>" +
    "</div>" +
    "<div class='order_detail_global_option_content_body'>" +
    "<div class='order_detail_global_option_content'>" +
    delivery +
    "</div>" +
    "</div>";
  // INSERT GLOBAL OPTION: DELIVERY HTML
  document
    .querySelector("#order_detail_delivery_option_body")
    .insertAdjacentHTML("beforeend", html);
};

/* ========================================== PRICING =========================================== */

const orderDetailGlobalOptionPricing = pricing => {
  // GLOBAL OPTION: PRICING HTML
  const html =
    "<div class='order_detail_global_option_heading_body'>" +
    "<div class='order_detail_global_option_heading'>Pricing</div>" +
    "</div>" +
    "<div class='order_detail_global_option_content_body'>" +
    "<div class='order_detail_global_option_content'>" +
    pricing +
    "</div>" +
    "</div>";
  //  INSERT GLOBAL OPTION: PRICING HTML
  document
    .querySelector("#order_detail_pricing_option_body")
    .insertAdjacentHTML("beforeend", html);
};

/* ====================================== CUSTOMER'S NOTE ======================================= */

const orderDetailGlobalOptionCustomersNote = note => {
  // GLOBAL OPTION: CUSTOMER'S NOTE HTML
  const html =
    "<div class='order_detail_global_option_heading_body'>" +
    "<div class='order_detail_global_option_heading'>Note</div>" +
    "</div>" +
    "<div class='order_detail_global_option_content_body'>" +
    "<div class='order_detail_global_option_content'>" +
    note +
    "</div>" +
    "</div>";
  // INSERT GLOBAL OPTION: CUSTOMER'S NOTE HTML
  document
    .querySelector("#order_detail_customers_note_body")
    .insertAdjacentHTML("beforeend", html);
};

/* ============================================================================================== */
