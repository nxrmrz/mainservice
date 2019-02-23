/* ======================================= INITIALISATION ======================================= */

const profileDrawerInit = () => {
  addProfileDrawerClickListener();
  addProfileDrawerContents();
};

/* =================================== PROFILE DRAWER TOGGLE ==================================== */

// Click Listener
const addProfileDrawerClickListener = () => {
  document
    .querySelector("#profile_drawer_toggle")
    .addEventListener("click", () => {
      profileDrawerToggle();
      addBackdrop("profile_drawer", profileDrawerToggle);
    });
};

// Toggle
const profileDrawerToggle = () => {
  document
    .querySelector("#profile_drawer")
    .classList.toggle("profile_drawer_open");
};

/* ================================== PROFILE DRAWER CONTENTS =================================== */

const addProfileDrawerContents = () => {
  loginStatus()
    .then(profile => {
      addProfileDrawerUserContents(profile);
    })
    .catch(err => {
      addProfileDrawerVisitorContents();
    });
};

/* ============================================================================================== */
