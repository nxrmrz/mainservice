/* ======================================= INITIALISATION ======================================= */

const profileSettingsInit = () => {
  document.querySelector("#profile_contents_body").innerHTML = "";
  selectedProfileSettingsTabId = undefined;
  profileSettingsStructure();
  profileSettingsTabs();
  profileSettingsProfileInit();
  selectProfileSettingsTab("profile");
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_settings_body'>" +
    "<div id='profile_settings_tabs_body' class='profile_tabs'></div>" +
    "<div id='profile_settings_contents'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#profile_contents_body").innerHTML = html;
};

/* ============================================ TABS ============================================ */

/* ------------------------------------- OBJECT CONSTRUCTOR ------------------------------------- */

class TabObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

const profileSettingsTabs = () => {
  /* ----------------------------- CREATE THE OBJECT ARRAY FOR TABS ----------------------------- */
  // PROFILE
  const profileTab = new TabObject(
    "profile",
    "Profile",
    profileSettingsProfileInit
  );
  // TABS ARRAY
  const TabsArray = [profileTab];
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
      "<div id='profile_settings_" +
      TabsArray[i].id +
      "_tab_body' class='profile_tab_body'>" +
      "<div id='profile_settings_" +
      TabsArray[i].id +
      "_tab' class='profile_tab'>" +
      TabsArray[i].name +
      "</div>" +
      "</div>";
    // INSERT HTML
    document
      .querySelector("#profile_settings_tabs_body")
      .insertAdjacentHTML("beforeend", html);
    // ADD EVENT LISTENER
    document
      .querySelector("#profile_settings_" + TabsArray[i].id + "_tab_body")
      .addEventListener("click", () => {
        document.querySelector("#profile_settings_components_body").innerHTML =
          "";
        TabsArray[i].method();
        selectProfileSettingsTab(TabsArray[i].id);
      });
    /* --------------------------------------- WIDTH CSS ---------------------------------------- */
    screensize = window.matchMedia("(min-width: 600px)");

    const resize = screensize => {
      if (screensize.matches) {
        document.querySelector(
          "#profile_settings_" + TabsArray[i].id + "_tab_body"
        ).style.width = desktopWidth + "%";
      } else {
        document.querySelector(
          "#profile_settings_" + TabsArray[i].id + "_tab_body"
        ).style.width = mobileWidth + "%";
      }
    };

    resize(screensize);
    screensize.addListener(resize);
  }
};

/* ================================ SELECT PROFILE SETTINGS TAB ================================= */

/* ------------------------------- SELECTED PROFILE SETTINGS TAB -------------------------------- */
let selectedProfileSettingsTabId;

const selectProfileSettingsTab = id => {
  /* -------------------------------------- PRE-VALIDATION -------------------------------------- */
  if (selectedProfileSettingsTabId) {
    deselectProfileSettingsTab(selectedProfileSettingsTabId);
  }
  /* -------------------------------------- UPDATE CLASSES -------------------------------------- */
  document
    .querySelector("#profile_settings_" + id + "_tab_body")
    .classList.toggle("profile_tab_body_selected");
  document
    .querySelector("#profile_settings_" + id + "_tab")
    .classList.toggle("profile_tab_selected");
  /* ----------------------------------- UPDATE SELECTED TAB ------------------------------------ */
  selectedProfileSettingsTabId = id;
};

/* =============================== DESELECT PROFILE SETTINGS TAB ================================ */

const deselectProfileSettingsTab = id => {
  /* -------------------------------------- UPDATE CLASSES -------------------------------------- */
  document
    .querySelector("#profile_settings_" + id + "_tab_body")
    .classList.toggle("profile_tab_body_selected");
  document
    .querySelector("#profile_settings_" + id + "_tab")
    .classList.toggle("profile_tab_selected");
};

/* ============================================================================================== */
