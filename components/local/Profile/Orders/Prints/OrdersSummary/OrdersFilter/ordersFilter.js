/* ======================================= INITIALISATION ======================================= */

const profileOrdersPrintsOrdersSummaryFilterInit = () => {
  profileOrdersPrintsOrdersSummaryFilterSelected = [];
  profileOrdersPrintsOrdersSummaryFilterStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileOrdersPrintsOrdersSummaryFilterStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_orders_prints_orders_summary_filter_tabs'>" +
    "<div id='profile_orders_prints_orders_summary_filter_active' class='profile_orders_prints_orders_summary_filter_tab'>Active</div>" +
    "<div id='profile_orders_prints_orders_summary_filter_delivering' class='profile_orders_prints_orders_summary_filter_tab'>Delivering</div>" +
    "<div id='profile_orders_prints_orders_summary_filter_completed' class='profile_orders_prints_orders_summary_filter_tab'>Completed</div>" +
    "<div id='profile_orders_prints_orders_summary_filter_archived' class='profile_orders_prints_orders_summary_filter_tab'>Archived</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_orders_prints_orders_summary_filter_contents"
  ).innerHTML = html;
  /* -------------------------------------- EVENT LISTENER -------------------------------------- */
  // ACTIVE
  document
    .querySelector("#profile_orders_prints_orders_summary_filter_active")
    .addEventListener("click", () => {
      profileOrdersPrintsOrdersSummaryFilterSelect("active");
    });
  // DELIVERY
  document
    .querySelector("#profile_orders_prints_orders_summary_filter_delivering")
    .addEventListener("click", () => {
      profileOrdersPrintsOrdersSummaryFilterSelect("delivering");
    });
  // COMPLETED
  document
    .querySelector("#profile_orders_prints_orders_summary_filter_completed")
    .addEventListener("click", () => {
      profileOrdersPrintsOrdersSummaryFilterSelect("completed");
    });
  // ARCHIVED
  document
    .querySelector("#profile_orders_prints_orders_summary_filter_archived")
    .addEventListener("click", () => {
      profileOrdersPrintsOrdersSummaryFilterSelect("archived");
    });
};

/* ======================================= SELECT FILTER ======================================== */

let profileOrdersPrintsOrdersSummaryFilterSelected = [];

const profileOrdersPrintsOrdersSummaryFilterSelect = filter => {
  /* ------------------------------- CHECK IF FILTER IS SELECTED -------------------------------- */
  if (profileOrdersPrintsOrdersSummaryFilterSelected.includes(filter)) {
    profileOrdersPrintsOrdersSummaryFilterDeselect(
      filter,
      profileOrdersPrintsOrdersSummaryFilterSelected
    );
    return;
  }
  /* ---------------------------------------- CHANGE CSS ---------------------------------------- */
  document
    .querySelector("#profile_orders_prints_orders_summary_filter_" + filter)
    .classList.add("profile_orders_prints_orders_summary_filter_tab_selected");
  /* ---------------------------------- UPDATE SELECTED FILTER ---------------------------------- */
  profileOrdersPrintsOrdersSummaryFilterSelected.push(filter);
  /* -------------------------------------- UPDATE ORDERS --------------------------------------- */
  profileOrdersPrintsOrdersSummaryFilterUpdateOrderList(
    profileOrdersPrintsOrdersSummaryFilterSelected
  );
};

/* ====================================== DESELECT FILTER ======================================= */

const profileOrdersPrintsOrdersSummaryFilterDeselect = (
  filter,
  selectedFilters
) => {
  /* ---------------------------------------- CHANGE CSS ---------------------------------------- */
  document
    .querySelector("#profile_orders_prints_orders_summary_filter_" + filter)
    .classList.remove(
      "profile_orders_prints_orders_summary_filter_tab_selected"
    );
  /* ---------------------------------- UPDATE SELECTED FILTER ---------------------------------- */
  const filtered = selectedFilters.filter(
    selectedFilter => filter != selectedFilter
  );
  profileOrdersPrintsOrdersSummaryFilterSelected = filtered;
  /* -------------------------------------- UPDATE ORDERS --------------------------------------- */
  profileOrdersPrintsOrdersSummaryFilterUpdateOrderList(
    profileOrdersPrintsOrdersSummaryFilterSelected
  );
};

/* ===================================== UPDATE ORDER LIST ====================================== */

const profileOrdersPrintsOrdersSummaryFilterUpdateOrderList = filters => {
  let newFilters = [];

  if (filters.indexOf("active") != -1) {
    activeFilters = [
      "Awaiting Quote",
      "Awaiting Payment",
      "Awaiting Payment Confirmation",
      "Printing Order"
    ];
    newFilters = [...newFilters, ...activeFilters];
  }

  if (filters.indexOf("delivering") != -1) {
    deliveringFilters = [
      "Ready for Pickup",
      "Order Picked Up",
      "Ready for Shipping",
      "Order Shipped"
    ];
    newFilters = [...newFilters, ...deliveringFilters];
  }

  if (filters.indexOf("completed") != -1) {
    completedFilters = ["Order Completed"];
    newFilters = [...newFilters, ...completedFilters];
  }

  if (filters.indexOf("archived") != -1) {
    archivedFilters = ["Request Refund"];
    newFilters = [...newFilters, ...archivedFilters];
  }

  /* -------------------------------------- ARRAY ELEMENT --------------------------------------- */
  const element = document.querySelector(
    "#profile_orders_prints_orders_summary_list_tables"
  );

  const elements = [element];

  loadLoader(elements).then(() => {
    profileOrdersPrintsOrdersSummaryListPopulate(newFilters);
  });
};

/* ============================================================================================== */
