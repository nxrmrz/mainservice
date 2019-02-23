/* ======================================= INITIALISATION ======================================= */

const orderCompletedInit = order => {
  orderModal(undefined, order);
  orderProgressionOrderCompletedStructure(order);
};

/* ========================================= STRUCTURE ========================================== */

const orderProgressionOrderCompletedStructure = order => {
  // CREATE HTML
  const html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'></div>" +
    "</div>";
  // INSERT HTML
  document.querySelector("#order_description_contents_body").innerHTML = html;
};

/* ============================================================================================== */
