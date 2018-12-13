/* ================================ INITIALISATION ================================ */

const profileOrdersPrintsOrdersSummaryInit = () => {
  addProfileOrdersPrintsOrdersSummaryBody();
  profileOrdersPrintsOrdersListInit();
};

/* =========================== ORDER SUMMARY MAIN BODY ============================ */

const addProfileOrdersPrintsOrdersSummaryBody = () => {
  const profileOrdersPrintsOrderSummaryBodyHTML =
    "<div id='profile_orders_prints_orders_summary_body'></div>";
  document
    .querySelector("#profile_orders_prints_body")
    .insertAdjacentHTML("beforeend", profileOrdersPrintsOrderSummaryBodyHTML);
};
