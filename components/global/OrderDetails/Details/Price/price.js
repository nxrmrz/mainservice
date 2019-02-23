/* ========================================= INITIALISE ========================================= */

const orderDetailPriceInit = orderDetails => {
  orderDetailPriceStructure();
  orderDetailPartsPrice(orderDetails);
  orderDetailPricingPrice(orderDetails);
  orderDetailDiscountPrice(orderDetails);
  orderDetailDeliveryPrice(orderDetails);
  orderDetailOrderPrice(orderDetails);
};

/* ========================================= STRUCTURE ========================================== */

const orderDetailPriceStructure = () => {
  // PRICE HTML STRUCTURE
  const html =
    "<div class='order_detail_prices_table_body'>" +
    "<div class='order_detail_price_table_body'>" +
    "<div class='order_detail_price_heading_cell_body'>" +
    "<div class='order_detail_price_heading_cell_text'>Parts Price</div>" +
    "</div>" +
    "<div class='order_detail_price_content_cell_body'>" +
    "<div id='order_detail_parts_price_content_cell_text' class='order_detail_price_content_cell_text'></div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_price_table_body'>" +
    "<div class='order_detail_price_heading_cell_body'>" +
    "<div class='order_detail_price_heading_cell_text'>Pricing Fee</div>" +
    "</div>" +
    "<div class='order_detail_price_content_cell_body'>" +
    "<div id='order_detail_pricing_fee_content_cell_text' class='order_detail_price_content_cell_text'></div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_price_table_body'>" +
    "<div class='order_detail_price_heading_cell_body'>" +
    "<div class='order_detail_price_heading_cell_text'>Discount</div>" +
    "</div>" +
    "<div class='order_detail_price_content_cell_body'>" +
    "<div id='order_detail_discount_content_cell_text' class='order_detail_price_content_cell_text'></div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_price_table_body'>" +
    "<div class='order_detail_price_heading_cell_body'>" +
    "<div class='order_detail_price_heading_cell_text'>Delivery Fee</div>" +
    "</div>" +
    "<div class='order_detail_price_content_cell_body'>" +
    "<div id='order_detail_delivery_fee_content_cell_text' class='order_detail_price_content_cell_text'></div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_price_table_body'>" +
    "<div class='order_detail_price_heading_cell_body order_detail_order_price_heading_cell_body'>" +
    "<div class='order_detail_price_heading_cell_text order_detail_order_price_heading_cell_text'>Order Price</div>" +
    "</div>" +
    "<div class='order_detail_price_content_cell_body order_detail_order_price_content_cell_body'>" +
    "<div id='order_detail_order_price_content_cell_text' class='order_detail_price_content_cell_text'></div>" +
    "</div>" +
    "</div>" +
    "</div>";
  // INSERT PRICE HTML STRUCTURE
  document.querySelector("#order_detail_prices_body").innerHTML = html;
};

/* ======================================== PARTS PRICE ========================================= */

const orderDetailPartsPrice = orderDetails => {
  let html;

  if (orderDetails.orderStatus == "Awaiting Quote") {
    // HTML
    html = "Pending";
    // INSERT HTML
    document.querySelector(
      "#order_detail_parts_price_content_cell_text"
    ).innerHTML = html;
  } else {
    partPriceCalculation(orderDetails)
      .then(partsPriceObject => {
        // HTML
        html =
          "$" + numberToTwoDecimalStringConverter(partsPriceObject.totalPrice);
        // INSERT HTML
        document.querySelector(
          "#order_detail_parts_price_content_cell_text"
        ).innerHTML = html;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

/* ======================================= PRICING PRICE ======================================== */

const orderDetailPricingPrice = orderDetails => {
  let html;

  if (orderDetails.orderStatus == "Awaiting Quote") {
    // HTML
    html = "Pending";
    // INSERT HTML
    document.querySelector(
      "#order_detail_pricing_fee_content_cell_text"
    ).innerHTML = html;
  } else {
    pricingPriceCalculation(orderDetails)
      .then(pricingPriceObject => {
        // HTML
        html =
          "$" +
          numberToTwoDecimalStringConverter(pricingPriceObject.pricingPrice);
        // INSERT HTML
        document.querySelector(
          "#order_detail_pricing_fee_content_cell_text"
        ).innerHTML = html;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

/* ======================================= DISCOUNT PRICE ======================================= */

const orderDetailDiscountPrice = orderDetails => {
  let html;

  if (orderDetails.orderStatus == "Awaiting Quote") {
    // HTML
    html = "Pending";
    // INSERT HTML
    document.querySelector(
      "#order_detail_discount_content_cell_text"
    ).innerHTML = html;
  } else {
    discountPriceCalculation(orderDetails)
      .then(discountsPriceObject => {
        // HTML
        html =
          "-$" +
          numberToTwoDecimalStringConverter(discountsPriceObject.totalDiscount);
        // INSERT HTML
        document.querySelector(
          "#order_detail_discount_content_cell_text"
        ).innerHTML = html;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

/* ======================================= DELIVERY PRICE ======================================= */

const orderDetailDeliveryPrice = orderDetails => {
  const deliveryPriceObject = deliveryPriceCalculation(orderDetails);
  // HTML
  const html =
    "$" + numberToTwoDecimalStringConverter(deliveryPriceObject.price);
  // INSERT HTML
  document.querySelector(
    "#order_detail_delivery_fee_content_cell_text"
  ).innerHTML = html;
};

/* ======================================== ORDER PRICE ========================================= */

const orderDetailOrderPrice = orderDetails => {
  let html;

  if (orderDetails.orderStatus == "Awaiting Quote") {
    // HTML
    html = "Pending";
    // INSERT HTML
    document.querySelector(
      "#order_detail_order_price_content_cell_text"
    ).innerHTML = html;
  } else {
    orderPriceCalculation(orderDetails)
      .then(orderPriceObject => {
        // HTML
        html =
          "$" + numberToTwoDecimalStringConverter(orderPriceObject.orderPrice);
        // INSERT HTML
        document.querySelector(
          "#order_detail_order_price_content_cell_text"
        ).innerHTML = html;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

/* ============================================================================================== */
