/* ======================================= INITIALISATION ======================================= */

const addProfileDrawerVisitorContents = () => {
  document.querySelector("#profile_drawer").innerHTML - "";
  addProfileDrawerVisitorLoginContents();
  addProfileDrawerVisitorSignupContents();
};

/* =========================================== LOGIN ============================================ */

const addProfileDrawerVisitorLoginContents = () => {
  const profileDrawerVisitorLoginHTML =
    "<p id='profile_drawer_login' class='profile_drawer_link'>Login</p>";

  document
    .querySelector("#profile_drawer")
    .insertAdjacentHTML("beforeend", profileDrawerVisitorLoginHTML);

  document
    .querySelector("#profile_drawer_login")
    .addEventListener("click", () => {
      profileDrawerToggle();
      removeBackdrop("profile_drawer");
      addLoginModal();
    });
};

/* =========================================== SIGNUP =========================================== */

const addProfileDrawerVisitorSignupContents = () => {
  const profileDrawerVisitorSignupHTML =
    "<a href='/registration' id='profile_drawer_signup' class='profile_drawer_link'>Signup</a>";

  document
    .querySelector("#profile_drawer")
    .insertAdjacentHTML("beforeend", profileDrawerVisitorSignupHTML);
};

/* ============================================================================================== */
