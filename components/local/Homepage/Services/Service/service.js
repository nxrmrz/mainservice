/* ======================================= INITIALISATION ======================================= */

const homepageServiceInit = () => {
  selectHomepageServiceTab(homepageServiceTabIdsArray[0]);
  addHomepageServiceTabsClickListener();
  homepage3DPrintingServiceInit();
  homepageServicesModellingInit();
  homepageServicesMarketplaceInit();
};

/* ======================================= CLICK LISTENER ======================================= */

const homepageServiceTabIdsArray = [
  "3d_printing",
  "3d_modelling",
  "marketplace"
];

const addHomepageServiceTabsClickListener = () => {
  homepageServiceTabIdsArray.forEach(tabId => {
    document
      .querySelector("#homepage_" + tabId + "_tab")
      .addEventListener("click", () => {
        selectHomepageServiceTab(tabId);
      });
  });
};

/* ================================== SELECT AND DESELECT TABS ================================== */

let selectedHomepageServiceTabId;

const selectHomepageServiceTab = tabId => {
  if (selectedHomepageServiceTabId == tabId) {
    return;
  }

  deselectHomepageServiceTab();

  document
    .querySelector("#homepage_" + tabId + "_tab")
    .classList.toggle("homepage_service_tab_selected");

  document
    .querySelector("#homepage_" + tabId + "_tab_text")
    .classList.toggle("homepage_service_tab_text_selected");

  document
    .querySelector("#homepage_" + tabId + "_content")
    .classList.toggle("homepage_service_content_selected");

  selectedHomepageServiceTabId = tabId;
};

const deselectHomepageServiceTab = () => {
  if (!selectedHomepageServiceTabId) {
    return;
  }

  document
    .querySelector("#homepage_" + selectedHomepageServiceTabId + "_tab")
    .classList.toggle("homepage_service_tab_selected");

  document
    .querySelector("#homepage_" + selectedHomepageServiceTabId + "_tab_text")
    .classList.toggle("homepage_service_tab_text_selected");

  document
    .querySelector("#homepage_" + selectedHomepageServiceTabId + "_content")
    .classList.toggle("homepage_service_content_selected");
};
