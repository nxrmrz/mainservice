/* =================================== ORDER OPTIONS DETAILS ==================================== */

let orderDetailsTotalPartPrice;
let orderDetailsOrderPricingPrice;
let orderDetailsPreDiscountTotal;
let orderDetailsTotalDiscount;
let orderDetailsPostDiscountTotal;
let orderDetailsDeliveryPrice;
let orderDetailsTotalOrderPrice;

const constructOrderDetailsOrderOptionsDetails = (order, orderStatusId) => {
  orderDetailsTotalPartPrice = 0;
  orderDetailsOrderPricingPrice = 0;
  orderDetailsPreDiscountTotal = 0;
  orderDetailsTotalDiscount = 0;
  orderDetailsPostDiscountTotal = 0;
  orderDetailsTotalOrderPrice = 0;

  const orderDetailsOrderOptionsHeaderHTML =
    "<div class='order_details_order_options_header'>Parts:</div>";
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderOptionsHeaderHTML);

  for (i = 0; i < order.parts.length; i++) {
    $.ajax({
      type: "POST",
      async: false,
      url: "/order/price",
      data: JSON.stringify({ fileId: order.parts[i].fileId }),
      contentType: "application/json",
      success: data => {
        let partPriceLabel;
        if (data == "pending") {
          partPriceLabel = "Pending";
        } else {
          const partPrice = Number(
            (Number(data) * Number(order.parts[i].orderQuantity)).toFixed(2)
          );

          orderDetailsTotalPartPrice = orderDetailsTotalPartPrice + partPrice;

          partPriceLabel = "$" + partPrice;
        }

        const orderDetailsPartDetailsHTML =
          "<div class='order_details_part_details_body'>" +
          "<div class='order_details_part_details_file_name_body'>" +
          "<div class='order_details_part_details_file_name_content'>" +
          order.parts[i].fileName +
          "</div>" +
          "</div>" +
          "<div class='order_details_part_details_quantity_body'>" +
          "<div class='order_details_part_details_quantity_header'>Quantity:</div>" +
          "<div class='order_details_part_details_quantity_content'>" +
          order.parts[i].producedQuantity +
          "/" +
          order.parts[i].orderQuantity +
          "</div>" +
          "</div>" +
          "<div class='order_details_part_details_price_body'>" +
          "<div class='order_details_part_details_price_header'>Price:</div>" +
          "<div class='order_details_part_details_price_content'>" +
          partPriceLabel +
          "</div>" +
          "</div>" +
          "</div>";

        document
          .querySelector("#" + orderStatusId + "_order_options_details_body")
          .insertAdjacentHTML("beforeend", orderDetailsPartDetailsHTML);
      }
    });
  }

  /* ------------------------------ UPDATE VARIABLES ------------------------------ */

  orderDetailsTotalOrderPrice = orderDetailsTotalPartPrice;

  /* -------------------------------- ADD PRICING --------------------------------- */

  orderDetailsOrderOptionsPricing(
    order,
    orderStatusId,
    orderDetailsTotalPartPrice
  );
};

/* ============================= PRICING OPTION PRICE ============================= */

const orderDetailsOrderOptionsPricing = (
  order,
  orderStatusId,
  totalPartPrice
) => {
  let orderPricing;
  let orderPricingPrice;

  /* ----------------------------- SET VARIABLE VALUES ---------------------------- */

  if (order.pricing === "Basic") {
    orderPricing = "Basic";
    orderDetailsOrderPricingPrice = totalPartPrice * 0;
  } else if (order.pricing === "Priority") {
    orderPricing = "Priority";
    orderDetailsOrderPricingPrice = totalPartPrice * 0.25;
  } else if (order.pricing === "Urgent") {
    orderPricing = "Urgent";
    orderDetailsOrderPricingPrice = totalPartPrice * 0.5;
  }

  if (order.orderStatus === "Awaiting Quote") {
    orderPricingPrice = "Pending";
  } else {
    orderPricingPrice = "$" + orderDetailsOrderPricingPrice;
  }

  /* ------------------------------ CREATE THE HTML ------------------------------- */

  const orderDetailsOrderOptionsPricingHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_pricing_type_body'>" +
    "<div class='order_details_pricing_header'>Pricing:</div>" +
    "<div class='order_details_pricing_content'>" +
    orderPricing +
    "</div>" +
    "</div>" +
    "<div class='order_details_pricing_price_body'>" +
    "<div class='order_details_pricing_header'>Price:</div>" +
    "<div class='order_details_pricing_content'>" +
    orderPricingPrice +
    "</div>" +
    "</div>" +
    "</div>";

  /* ------------------------ INSERT THE HTML ONTO THE PAGE ----------------------- */

  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderOptionsPricingHTML);

  /* ------------------------------ UPDATE VARIABLES ------------------------------ */

  orderDetailsTotalOrderPrice =
    orderDetailsTotalOrderPrice + orderDetailsOrderPricingPrice;

  orderDetailsPreDiscountTotal = orderDetailsTotalOrderPrice;

  /* ----------------------------- PRE-DISCOUNT TOTAL ----------------------------- */

  let preDiscountTotal;
  let preDiscountTotalPartsPrice;
  let preDiscountPricingPrice;

  if (order.orderStatus === "Awaiting Quote") {
    preDiscountTotal = "Pending";
    preDiscountTotalPartsPrice = "Pending";
    preDiscountPricingPrice = "Pending";
  } else {
    preDiscountTotal = "$" + orderDetailsPreDiscountTotal;
    preDiscountTotalPartsPrice = "$" + totalPartPrice;
    preDiscountPricingPrice = "$" + orderDetailsOrderPricingPrice;
  }

  // Create the Pre-Discount Total HTML
  const orderDetailsOrderPreDiscountTotalHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_order_total_body'>" +
    "<div class='order_details_order_total_header'>Pre-Discount Calculation:</div>" +
    "<div class='order_details_order_total_content'>" +
    preDiscountTotalPartsPrice +
    " + " +
    preDiscountPricingPrice +
    "</div>" +
    "</div>" +
    "<div class='order_details_order_total_price_body'>" +
    "<div class='order_details_order_total_price_header'>Total:</div>" +
    "<div class='order_details_order_total_price_content'>" +
    preDiscountTotal +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert the Pre-Discount Total HTML
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderPreDiscountTotalHTML);

  /* ------------------------------ ADD DISCOUNT ---------------------------------- */

  orderDetailsOrderDiscount(order, orderStatusId, orderDetailsPreDiscountTotal);
};

/* ================================ ORDER DISCOUNT ================================ */

const orderDetailsOrderDiscount = (
  order,
  orderStatusId,
  totalPreDiscountOrderPrice
) => {
  /* ------------------------------- DISCOUNT HEADER ------------------------------ */

  // Create the Discount Header HTML
  const orderDetailsOrderDiscountHeaderHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_pricing_header_body'>" +
    "<div class='order_details_pricing_header_text'>Discount</div>" +
    "</div>" +
    "</div>";

  // Insert Discount Header
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderDiscountHeaderHTML);

  /* --------------------------------- DISCOUNTS ---------------------------------- */

  let totalDiscountRate = 0;
  let totalDiscountPrice = 0;

  for (i = 0; i < order.discounts.length; i++) {
    const minOrderValue = Number(order.discounts[i].minOrderValue);
    let discountCalculation = "";
    let discountPercentage = "";
    let discountPrice = "";

    if (minOrderValue != 0) {
      if (minOrderValue > totalPreDiscountOrderPrice) {
        continue;
      }

      discountCalculation =
        "(" +
        totalPreDiscountOrderPrice +
        " - " +
        minOrderValue +
        ") x " +
        order.discounts[i].rate;

      discountPercentage = Number(order.discounts[i].rate) * 100 + "%";

      discountPrice =
        (Number(totalPreDiscountOrderPrice) - minOrderValue) *
        Number(order.discounts[i].rate);
    } else {
      discountCalculation =
        totalPreDiscountOrderPrice + " x " + order.discounts[i].rate;

      discountPercentage = Number(order.discounts[i].rate) * 100 + "%";

      discountPrice =
        Number(totalPreDiscountOrderPrice) * Number(order.discounts[i].rate);
    }

    orderDetailsTotalDiscount = totalDiscountPrice + discountPrice;
    totalDiscountRate = totalDiscountRate + Number(order.discounts[i].rate);

    // Create the Discount HTML
    const orderDetailsOrderDiscountHTML =
      "<div class='order_details_part_details_body'>" +
      "<div class='order_details_pricing_discount_name_body'>" +
      "<div class='order_details_pricing_discount_header'>Discount:</div>" +
      "<div class='order_details_pricing_discount_content'>" +
      discountCalculation +
      "</div>" +
      "</div>" +
      "<div class='order_details_pricing_discount_percent_body'>" +
      "<div class='order_details_pricing_discount_header'>Percent:</div>" +
      "<div class='order_details_pricing_discount_content'>" +
      discountPercentage +
      "</div>" +
      "</div>" +
      "<div class='order_details_pricing_discount_value_body'>" +
      "<div class='order_details_pricing_discount_header'>Value:</div>" +
      "<div class='order_details_pricing_discount_content'>$" +
      discountPrice +
      "</div>" +
      "</div>" +
      "</div>";

    // Insert Discount
    document
      .querySelector("#" + orderStatusId + "_order_options_details_body")
      .insertAdjacentHTML("beforeend", orderDetailsOrderDiscountHTML);
  }

  // Check if any discount is provided
  if (totalDiscountRate) {
    if (order.orderStatus === "Awaiting Quote") {
      totalDiscountPrice = "Pending";
    } else {
      totalDiscountPrice = "$" + orderDetailsTotalDiscount;
    }
  } else {
    totalDiscountPrice = "$0";
  }

  /* ------------------------------- DISCOUNT TOTAL ------------------------------- */

  // Create the Discount Total HTML
  const orderDetailsOrderDiscountTotalHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_pricing_discount_name_body'>" +
    "<div class='order_details_pricing_discount_header'>Discount:</div>" +
    "<div class='order_details_pricing_discount_content'>Total</div>" +
    "</div>" +
    "<div class='order_details_pricing_discount_percent_body'>" +
    "<div class='order_details_pricing_discount_header'>Percent:</div>" +
    "<div class='order_details_pricing_discount_content'></div>" +
    "</div>" +
    "<div class='order_details_pricing_discount_value_body'>" +
    "<div class='order_details_pricing_discount_header'>Value:</div>" +
    "<div class='order_details_pricing_discount_content'>" +
    totalDiscountPrice +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert Discount Total
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderDiscountTotalHTML);

  /* ------------------------------ UPDATE VARIABLES ------------------------------ */

  // Total Order Price
  orderDetailsTotalOrderPrice =
    totalPreDiscountOrderPrice - orderDetailsTotalDiscount;
  // Total Post Discount Price
  orderDetailsPostDiscountTotal = orderDetailsTotalOrderPrice;

  /* ---------------------------- POST-DISCOUNT TOTAL ----------------------------- */

  let postDiscountTotal;
  let preDiscountTotal;
  let totalDiscount;

  if (order.orderStatus === "Awaiting Quote") {
    postDiscountTotal = "Pending";
    preDiscountTotal = "Pending";
    if (totalDiscountRate) {
      totalDiscount = "Pending";
    } else {
      totalDiscount = "$0";
    }
  } else {
    postDiscountTotal = "$" + orderDetailsPostDiscountTotal;
    preDiscountTotal = "$" + totalPreDiscountOrderPrice;
    totalDiscount = "$" + orderDetailsTotalDiscount;
  }

  // Create the Post-Discount Total HTML
  const orderDetailsOrderPostDiscountTotalHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_order_total_body'>" +
    "<div class='order_details_order_total_header'>Post-Discount Calculation:</div>" +
    "<div class='order_details_order_total_content'>" +
    preDiscountTotal +
    " - " +
    totalDiscount +
    "</div>" +
    "</div>" +
    "<div class='order_details_order_total_price_body'>" +
    "<div class='order_details_order_total_price_header'>Total:</div>" +
    "<div class='order_details_order_total_price_content'>" +
    postDiscountTotal +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert the Post-Discount Total HTML
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderPostDiscountTotalHTML);

  /* -------------------------------- ADD DELIVERY -------------------------------- */

  orderDetailsOrderDelivery(order, orderStatusId);
};

/* ================================ ORDER DELIVERY ================================ */

const orderDetailsOrderDelivery = (order, orderStatusId) => {
  /* --------------------------------- VARIABLES ---------------------------------- */

  const delivery = order.delivery;
  let deliveryPrice;

  /* ----------------------------- SET DELIVERY PRICE ----------------------------- */

  if (delivery === "Pickup") {
    deliveryPrice = 0;
  } else if (delivery === "Tracking") {
    deliveryPrice = 7;
  } else if (delivery === "Courier") {
    deliveryPrice = 8.5;
  }

  /* ------------------------------ DELIVERY HEADER ------------------------------- */

  // Create the Delivery Header HTML
  const orderDetailsOrderDeliveryHeaderHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_pricing_header_body'>" +
    "<div class='order_details_pricing_header_text'>Delivery</div>" +
    "</div>" +
    "</div>";

  // Insert Delivery Header
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderDeliveryHeaderHTML);

  /* ---------------------------------- DELIVERY ---------------------------------- */

  // Create the Delivery HTML
  const orderDetailsOrderDeliveryHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_pricing_type_body'>" +
    "<div class='order_details_pricing_header'>Delivery:</div>" +
    "<div class='order_details_pricing_content'>" +
    delivery +
    "</div>" +
    "</div>" +
    "<div class='order_details_pricing_price_body'>" +
    "<div class='order_details_pricing_header'>Price:</div>" +
    "<div class='order_details_pricing_content'>$" +
    deliveryPrice +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert Delivery
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderDeliveryHTML);

  /* ------------------------------ UPDATE VARIABLES ------------------------------ */

  orderDetailsDeliveryPrice = deliveryPrice;
  orderDetailsTotalOrderPrice = orderDetailsTotalOrderPrice + deliveryPrice;

  /* -------------------------------- ORDER TOTAL --------------------------------- */

  let postDiscountTotal;
  let totalOrderPrice;

  if (order.orderStatus === "Awaiting Quote") {
    postDiscountTotal = "Pending";
    totalOrderPrice = "Pending";
  } else {
    postDiscountTotal = "$" + orderDetailsPostDiscountTotal;
    totalOrderPrice = "$" + (orderDetailsPostDiscountTotal + deliveryPrice);
  }

  // Create the Post-Discount Total HTML
  const orderDetailsOrderPostDiscountTotalHTML =
    "<div class='order_details_part_details_body'>" +
    "<div class='order_details_order_total_body'>" +
    "<div class='order_details_order_total_header'>Order Price:</div>" +
    "<div class='order_details_order_total_content'>" +
    postDiscountTotal +
    " + $" +
    deliveryPrice +
    "</div>" +
    "</div>" +
    "<div class='order_details_order_total_price_body'>" +
    "<div class='order_details_order_total_price_header'>Total:</div>" +
    "<div class='order_details_order_total_price_content'>" +
    totalOrderPrice +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert the Post-Discount Total HTML
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderPostDiscountTotalHTML);
};

/* ============================================================================================== */
