/* ======================================= INITIALISATION ======================================= */

const profileOrdersPrintsOrdersSummaryInit = () => {
  profileOrdersPrintsOrdersSummaryStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileOrdersPrintsOrdersSummaryStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_orders_prints_orders_summary_filter_contents' class='profile_orders_prints_orders_summary_content'></div>" +
    "<div id='profile_orders_prints_orders_summary_search_contents' class='profile_orders_prints_orders_summary_content'></div>" +
    "<div id='profile_orders_prints_orders_summary_list_contents' class='profile_orders_prints_orders_summary_content'></div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_orders_prints_orders_summary_contents"
  ).innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // FILTER
  profileOrdersPrintsOrdersSummaryFilterInit();
  // LIST
  profileOrdersPrintsOrdersSummaryListInit();
  // PRE-SELECT FILTER
  profileOrdersPrintsOrdersSummaryFilterSelect("active");
};

/* ============================================================================================== */
