/* ========================================= INITIALISE ========================================= */

const orderDetailsInit = orderDetails => {
  orderDetailsStructure();
  orderDetailGlobalOptionsInit(orderDetails);
  orderDetailPartsInit(orderDetails);
  orderDetailPriceInit(orderDetails);
};

/* ========================================= STRUCTURE ========================================== */

const orderDetailsStructure = () => {
  /* ---------------------------------- DETAILS HTML STRUCTURE ---------------------------------- */
  const html =
    "<div id='order_detail_global_options_body' class='order_detail_body'></div>" +
    "<div id='order_detail_parts_body' class='order_detail_body'></div>" +
    "<div id='order_detail_prices_body' class='order_detail_body'></div>";
  /* ------------------------------ INSERT DETAILS HTML STRUCTURE ------------------------------- */
  document.querySelector("#order_details_body").innerHTML = html;
};

/* ============================================================================================== */
