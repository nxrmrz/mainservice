/* ======================================= INITIALISATION ======================================= */

const profileOrdersInit = () => {
  document.querySelector("#profile_contents_body").innerHTML = "";
  addProfileOrdersBody();
  addProfileOrdersComponentsBody();
  contructProfileOrdersNavigation();
};

// Add Orders Body
const addProfileOrdersBody = () => {
  // Orders Body HTML
  const profileOrdersBodyHTML =
    "<div id='profile_orders_body' class='profile_component_body'></div>";
  // Insert HTML
  document
    .querySelector("#profile_contents_body")
    .insertAdjacentHTML("beforeend", profileOrdersBodyHTML);
};

// Add Orders Navigation Tab Body
const addProfileOrdersComponentsBody = () => {
  // Add Navigation Body
  const profileOrdersNavigationTabsBodyHTML =
    "<div id='profile_orders_navigation_tabs_body'></div>" +
    "<div id='profile_orders_components_body'></div>";
  // Insert HTML
  document
    .querySelector("#profile_orders_body")
    .insertAdjacentHTML("beforeend", profileOrdersNavigationTabsBodyHTML);
};

// Class Object for Profile Orders Components
class profileOrdersComponentObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

// Construct the Orders Component Objects Array
// Keep track of what tab is selected
let selectedProfileOrdersComponentId;

let profileOrdersComponentObjectsArray;

// Contruct the profile orders naviagtion
const contructProfileOrdersNavigation = () => {
  constructProfileOrdersComponentObjectsArray();
  constructProfileOrdersNavigationTabs(profileOrdersComponentObjectsArray);
  selectProfileOrdersNavigationTab(profileOrdersComponentObjectsArray[0]);
};

// Construct the profile orders component objects array
const constructProfileOrdersComponentObjectsArray = () => {
  // Assign Object Values
  contructProfileOrdersPrintsObject();
  contructProfileOrdersMarketplaceObject();
  // Assign Object Array Value
  profileOrdersComponentObjectsArray = [
    profileOrdersPrintsObject,
    profileOrdersMarketplaceObject
  ];
};

// Contruct the profile orders navigation tabs
const constructProfileOrdersNavigationTabs = objArr => {
  // Determine the width of each tabs
  const profileOrdersNavigationTabWidth = 100 / objArr.length + "%";
  objArr.forEach(obj => {
    // Create the profile navigation tab HTML
    const profileOrdersNavigationTabHTML =
      "<div id='" +
      obj.id +
      "_profile_orders_navigation_tab_body' class='profile_orders_navigation_tab_body' style='width:" +
      profileOrdersNavigationTabWidth +
      "'>" +
      "<div id='" +
      obj.id +
      "_profile_orders_navigation_tab_text' class='profile_orders_navigation_tab_text'>" +
      obj.name +
      "</div>" +
      "</div>";
    // Add the HTML to the navigation tabs body
    document
      .querySelector("#profile_orders_navigation_tabs_body")
      .insertAdjacentHTML("beforeend", profileOrdersNavigationTabHTML);
    // Add Event Listener for Tab Selection
    document
      .querySelector("#" + obj.id + "_profile_orders_navigation_tab_body")
      .addEventListener("click", () => {
        selectProfileOrdersNavigationTab(obj);
      });
  });
};

// Select Profile Orders Navigation Tab
const selectProfileOrdersNavigationTab = obj => {
  // First, deselect any selected tab
  deselectProfileOrdersNavigationTab();

  // Create a pointer
  const pointer = document.querySelector(
    "#" + obj.id + "_profile_orders_navigation_tab_body"
  );

  // Change CSS Stylings
  pointer.style.opacity = "1";
  pointer.style.backgroundColor = "rgb(245, 245, 245)";
  pointer.style.borderStyle = "none none solid none";
  document.querySelector(
    "#" + obj.id + "_profile_orders_navigation_tab_text"
  ).style.color = "rgb(170, 10, 10)";

  // Execute selected tab's method
  // Clear Page
  document.querySelector("#profile_orders_components_body").innerHTML = "";
  obj.method();

  // Update selected tab
  selectedProfileOrdersComponentId = obj.id;
};

// Deselect Profile Orders Navigation Tab
const deselectProfileOrdersNavigationTab = () => {
  if (!selectedProfileOrdersComponentId) {
    return;
  }

  const pointer = document.querySelector(
    "#" +
      selectedProfileOrdersComponentId +
      "_profile_orders_navigation_tab_body"
  );

  // Change CSS Stylings
  pointer.style.opacity = "0.3";
  pointer.style.backgroundColor = "rgb(170, 10, 10)";
  pointer.style.borderStyle = "none none none none";
  document.querySelector(
    "#" +
      selectedProfileOrdersComponentId +
      "_profile_orders_navigation_tab_text"
  ).style.color = "white";
};

/* ============================================================================================== */
