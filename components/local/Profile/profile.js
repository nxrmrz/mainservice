/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  globalInit();
  profileInit();
};

const profileInit = () => {
  constructProfileNavigationTabMethodsObject();
  selectProfileNavigationTab(profileNavigationTabIdsArray[0]);
  addProfileNavigationTabsClickListener();
};

/* ===================================== ADD CLICK LISTENER ===================================== */

const profileNavigationTabIdsArray = ["dashboard", "orders", "settings"];
let profileNavigationTabMethodsObject;

const constructProfileNavigationTabMethodsObject = () => {
  profileNavigationTabMethodsObject = {
    dashboard: () => {
      profileDashboardInit();
    },
    orders: () => {
      profileOrdersInit();
    },
    settings: () => {
      profileSettingsInit();
    }
  };
};

const addProfileNavigationTabsClickListener = () => {
  profileNavigationTabIdsArray.forEach(tabId => {
    document
      .querySelector("#profile_" + tabId + "_tab")
      .addEventListener("click", () => {
        selectProfileNavigationTab(tabId);
      });
  });
};

/* ================================== SELECT AND DESELECT TABS ================================== */

let selectedProfileNavigationTabId;

const selectProfileNavigationTab = tabId => {
  if (selectedProfileNavigationTabId == tabId) {
    return;
  }

  deselectProfileNavigationTab();

  document
    .querySelector("#profile_" + tabId + "_tab")
    .classList.toggle("profile_navigation_tab_selected");

  document
    .querySelector("#profile_" + tabId + "_tab_text")
    .classList.toggle("profile_navigation_tab_text_selected");

  profileNavigationTabMethodsObject[tabId]();

  selectedProfileNavigationTabId = tabId;
};

const deselectProfileNavigationTab = () => {
  if (!selectedProfileNavigationTabId) {
    return;
  }

  document
    .querySelector("#profile_" + selectedProfileNavigationTabId + "_tab")
    .classList.toggle("profile_navigation_tab_selected");

  document
    .querySelector("#profile_" + selectedProfileNavigationTabId + "_tab_text")
    .classList.toggle("profile_navigation_tab_text_selected");
};

/* ============================================================================================== */
