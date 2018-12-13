/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  globalInit();
  adminProfileInit();
};

const adminProfileInit = () => {
  constructAdminProfileNavigationTabMethodsObject();
  selectAdminProfileNavigationTab(adminProfileNavigationTabIdsArray[0]);
  addAdminProfileNavigationTabsClickListener();
};

/* ===================================== ADD CLICK LISTENER ===================================== */

const adminProfileNavigationTabIdsArray = ["dashboard", "orders", "settings"];
let adminProfileNavigationTabMethodsObject;

const constructAdminProfileNavigationTabMethodsObject = () => {
  adminProfileNavigationTabMethodsObject = {
    dashboard: () => {
      adminProfileDashboardInit();
    },
    orders: () => {
      adminProfileOrdersInit();
    },
    settings: () => {
      adminProfileSettingsInit();
    }
  };
};

const addAdminProfileNavigationTabsClickListener = () => {
  adminProfileNavigationTabIdsArray.forEach(tabId => {
    document
      .querySelector("#admin_profile_" + tabId + "_tab")
      .addEventListener("click", () => {
        selectAdminProfileNavigationTab(tabId);
      });
  });
};

/* ================================== SELECT AND DESELECT TABS ================================== */

let selectedAdminProfileNavigationTabId;

const selectAdminProfileNavigationTab = tabId => {
  if (selectedAdminProfileNavigationTabId == tabId) {
    return;
  }

  deselectAdminProfileNavigationTab();

  document
    .querySelector("#admin_profile_" + tabId + "_tab")
    .classList.toggle("admin_profile_navigation_tab_selected");

  document
    .querySelector("#admin_profile_" + tabId + "_tab_text")
    .classList.toggle("admin_profile_navigation_tab_text_selected");

  adminProfileNavigationTabMethodsObject[tabId]();

  selectedAdminProfileNavigationTabId = tabId;
};

const deselectAdminProfileNavigationTab = () => {
  if (!selectedAdminProfileNavigationTabId) {
    return;
  }

  document
    .querySelector(
      "#admin_profile_" + selectedAdminProfileNavigationTabId + "_tab"
    )
    .classList.toggle("admin_profile_navigation_tab_selected");

  document
    .querySelector(
      "#admin_profile_" + selectedAdminProfileNavigationTabId + "_tab_text"
    )
    .classList.toggle("admin_profile_navigation_tab_text_selected");
};

/* ============================================================================================== */
