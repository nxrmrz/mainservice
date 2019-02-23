/* ======================================= INITIALISATION ======================================= */

const awaitingQuoteInit = order => {
  orderProgressionAwaitingQuoteModal(order);
  orderProgressionAwaitingQuoteStructure();
};

/* =========================================== MODAL ============================================ */

const orderProgressionAwaitingQuoteModal = order => {
  const modalFooter =
    "<div class='order_details_footer_buttons_body'>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Order</div>" +
    "</div>" +
    "</div>";

  orderModal(modalFooter, order);
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const orderProgressionAwaitingQuoteStructure = () => {
  const html =
    "<div class='order_description_content_paragraph_body'>" +
    "<div class='order_description_content_paragraph'>Please wait while we analyse and generate a quote for your order.</div>" +
    "</div>";

  document
    .querySelector("#order_description_contents_body")
    .insertAdjacentHTML("beforeend", html);
};

/* ============================================================================================== */
