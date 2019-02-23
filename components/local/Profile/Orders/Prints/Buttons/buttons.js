/* ======================================= INITIALISATION ======================================= */

const profileOrdersPrintsNewOrderInit = () => {
  profileOrdersPrintsNewOrderStructure();
};

/* ======================================= ADD NEW ORDER ======================================== */

const profileOrdersPrintsNewOrderStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_orders_prints_new_order_add_body'>" +
    "<div id='profile_orders_prints_new_order_add'>" +
    "<div id='profile_orders_prints_new_order_add_label'>Add New Order</div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_orders_prints_new_order_contents"
  ).innerHTML = html;
  /* ------------------------------------ ADD EVENT LISTENER ------------------------------------ */
  document
    .querySelector("#profile_orders_prints_new_order_add")
    .addEventListener("click", () => {
      orderNewPrint();
    });
};

/* ============================================================================================== */
