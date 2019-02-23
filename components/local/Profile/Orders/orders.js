/* ======================================= INITIALISATION ======================================= */

const profileOrdersInit = () => {
  document.querySelector("#profile_contents_body").innerHTML = "";
  selectedProfileOrdersTabId = undefined;
  profileOrdersStructure();
  profileOrdersTabs();
  profileOrdersPrintsInit();
  selectProfileOrdersTab("prints");
};

/* ========================================= STRUCTURE ========================================== */

const profileOrdersStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_orders_body'>" +
    "<div id='profile_orders_tabs_body' class='profile_tabs'></div>" +
    "<div id='profile_orders_contents'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#profile_contents_body").innerHTML = html;
};

/* ============================================ TABS ============================================ */

const profileOrdersTabs = () => {
  /* ----------------------------- CREATE THE OBJECT ARRAY FOR TABS ----------------------------- */
  // PRINTS
  const printsTab = new TabObject("prints", "Prints", profileOrdersPrintsInit);
  // MARKETPLACE
  const marketplaceTab = new TabObject(
    "marketplace",
    "Marketplace",
    profileOrdersMarketplaceInit
  );
  // TABS ARRAY
  const TabsArray = [printsTab, marketplaceTab];
  /* ---------------------------------------- TAB WIDTH ----------------------------------------- */
  // MOBILE
  let mobileWidth;
  if (TabsArray.length < 3) {
    mobileWidth = 100 / TabsArray.length;
  } else {
    mobileWidth = 100 / 3;
  }
  // DESKTOP
  let desktopWidth;
  if (TabsArray.length < 6) {
    desktopWidth = 100 / TabsArray.length;
  } else {
    desktopWidth = 100 / 6;
  }
  /* ----------------------------------- CREATE THE HTML TABS ----------------------------------- */
  for (let i = 0; i < TabsArray.length; i++) {
    // CREATE HTML
    const html =
      "<div id='profile_orders_" +
      TabsArray[i].id +
      "_tab_body' class='profile_tab_body'>" +
      "<div id='profile_orders_" +
      TabsArray[i].id +
      "_tab' class='profile_tab'>" +
      TabsArray[i].name +
      "</div>" +
      "</div>";
    // INSERT HTML
    document
      .querySelector("#profile_orders_tabs_body")
      .insertAdjacentHTML("beforeend", html);
    // ADD EVENT LISTENER
    document
      .querySelector("#profile_orders_" + TabsArray[i].id + "_tab_body")
      .addEventListener("click", () => {
        document.querySelector("#profile_orders_contents").innerHTML = "";
        TabsArray[i].method();
        selectProfileOrdersTab(TabsArray[i].id);
      });
    /* --------------------------------------- WIDTH CSS ---------------------------------------- */
    screensize = window.matchMedia("(min-width: 600px)");

    const resize = screensize => {
      if (screensize.matches) {
        document.querySelector(
          "#profile_orders_" + TabsArray[i].id + "_tab_body"
        ).style.width = desktopWidth + "%";
      } else {
        document.querySelector(
          "#profile_orders_" + TabsArray[i].id + "_tab_body"
        ).style.width = mobileWidth + "%";
      }
    };

    resize(screensize);
    screensize.addListener(resize);
  }
};

/* ================================= SELECT PROFILE ORDERS TAB ================================== */

/* -------------------------------- SELECTED PROFILE ORDERS TAB --------------------------------- */
let selectedProfileOrdersTabId;

const selectProfileOrdersTab = id => {
  /* -------------------------------------- PRE-VALIDATION -------------------------------------- */
  if (selectedProfileOrdersTabId) {
    deselectProfileOrdersTab(selectedProfileOrdersTabId);
  }
  /* -------------------------------------- UPDATE CLASSES -------------------------------------- */
  document
    .querySelector("#profile_orders_" + id + "_tab_body")
    .classList.toggle("profile_tab_body_selected");
  document
    .querySelector("#profile_orders_" + id + "_tab")
    .classList.toggle("profile_tab_selected");
  /* ----------------------------------- UPDATE SELECTED TAB ------------------------------------ */
  selectedProfileOrdersTabId = id;
};

/* =============================== DESELECT PROFILE SETTINGS TAB ================================ */

const deselectProfileOrdersTab = id => {
  /* -------------------------------------- UPDATE CLASSES -------------------------------------- */
  document
    .querySelector("#profile_orders_" + id + "_tab_body")
    .classList.toggle("profile_tab_body_selected");
  document
    .querySelector("#profile_orders_" + id + "_tab")
    .classList.toggle("profile_tab_selected");
};

/* ============================================================================================== */
