/* ======================================= INITIALISATION ======================================= */

const adminProfileOrdersInit = () => {
  selectedAdminProfileOrdersNavigationTabId = undefined;
  constructAdminProfileOrdersBaseHTML();
  constructAdminProfileOrdersComponentObjectsArray();
  addAdminProfileOrdersNavigationTabs(adminProfileOrdersComponentObjectsArray);
};

/* ============================== ADMIN PROFILE: ORDERS BASE HTML =============================== */

const constructAdminProfileOrdersBaseHTML = () => {
  const adminProfileOrdersBaseHTML =
    "<div id='admin_profile_orders_body'>" +
    "<div id='admin_profile_orders_navigation_tabs_body'></div>" +
    "<div id='admin_profile_orders_contents_body'></div>" +
    "</div>";

  document.querySelector(
    "#admin_profile_contents_body"
  ).innerHTML = adminProfileOrdersBaseHTML;
};

/* =========================== ADMIN PROFILE: ORDERS NAVIGATION TABS ============================ */

/* --------------------------------- NAVIGATION TABS ATTRIBUTES --------------------------------- */

// Class object constructor
class adminProfileOrdersComponentObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

// Create the array of navigation tab attributes object
let adminProfileOrdersComponentObjectsArray = [];

const constructAdminProfileOrdersComponentObjectsArray = () => {
  contructAdminProfileOrdersPrintsObject();
  contructAdminProfileOrdersMarketplaceObject();

  adminProfileOrdersComponentObjectsArray = [
    adminProfileOrdersPrintsObject,
    adminProfileOrdersMarketplaceObject
  ];
};

// Add the navigation tabs
const addAdminProfileOrdersNavigationTabs = objArr => {
  objArr.forEach(obj => {
    // Create the HTML
    const adminProfileOrdersNavigationTabHTML =
      "<div id='admin_profile_orders_" +
      obj.id +
      "_navigation_tab' class='admin_profile_orders_navigation_tab'>" +
      "<div id='admin_profile_orders_" +
      obj.id +
      "_navigation_tab_text' class='admin_profile_orders_navigation_tab_text'>" +
      obj.name +
      "</div>" +
      "</div>";
    // Insert the HTML
    document
      .querySelector("#admin_profile_orders_navigation_tabs_body")
      .insertAdjacentHTML("beforeend", adminProfileOrdersNavigationTabHTML);
    // Add click listener
    document
      .querySelector("#admin_profile_orders_" + obj.id + "_navigation_tab")
      .addEventListener("click", () => {
        selectAdminProfileOrdersNavigationTab(obj);
      });
  });
};

/* ================================== SELECT AND DESELECT TABS ================================== */

let selectedAdminProfileOrdersNavigationTabId;

const selectAdminProfileOrdersNavigationTab = obj => {
  if (selectedAdminProfileOrdersNavigationTabId == obj.id) return;

  deselectAdminProfileOrdersNavigationTab();

  document
    .querySelector("#admin_profile_orders_" + obj.id + "_navigation_tab")
    .classList.toggle("admin_profile_orders_navigation_tab_selected");

  document
    .querySelector("#admin_profile_orders_" + obj.id + "_navigation_tab_text")
    .classList.toggle("admin_profile_orders_navigation_tab_text_selected");

  obj.method();

  selectedAdminProfileOrdersNavigationTabId = obj.id;
};

const deselectAdminProfileOrdersNavigationTab = () => {
  if (!selectedAdminProfileOrdersNavigationTabId) return;

  document
    .querySelector(
      "#admin_profile_orders_" +
        selectedAdminProfileOrdersNavigationTabId +
        "_navigation_tab"
    )
    .classList.toggle("admin_profile_orders_navigation_tab_selected");

  document
    .querySelector(
      "#admin_profile_orders_" +
        selectedAdminProfileOrdersNavigationTabId +
        "_navigation_tab_text"
    )
    .classList.toggle("admin_profile_orders_navigation_tab_text_selected");
};

/* ============================================================================================== */
