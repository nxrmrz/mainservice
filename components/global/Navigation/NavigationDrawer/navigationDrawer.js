/* ======================================= INITIALISATION ======================================= */

const navigationDrawerInit = () => {
  addNavigationDrawerClickListener();
};

/* ================================== NAVIGATION DRAWER TOGGLE ================================== */

// Click Listener
const addNavigationDrawerClickListener = () => {
  document
    .querySelector("#navigation_drawer_toggle")
    .addEventListener("click", () => {
      navigationDrawerToggle();
      addBackdrop("navigation_drawer", navigationDrawerToggle);
    });
};

// Toggle
const navigationDrawerToggle = () => {
  document
    .querySelector("#navigation_drawer")
    .classList.toggle("navigation_drawer_open");
};

/* ============================================================================================== */
