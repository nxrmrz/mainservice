/* ======================================= INITIALISATION ======================================= */

const profileOrdersPrintsInit = () => {
  profileOrdersPrintsStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileOrdersPrintsStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_orders_prints_contents' class='profile_orders_content'>" +
    "<div id='profile_orders_prints_new_order_contents' class='profile_orders_prints_content'></div>" +
    "<div id='profile_orders_prints_orders_summary_contents' class='profile_orders_prints_content'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#profile_orders_contents").innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // NEW ORDER
  profileOrdersPrintsNewOrderInit();
  // ORDER LIST
  profileOrdersPrintsOrdersSummaryInit();
};

/* ============================================================================================== */
