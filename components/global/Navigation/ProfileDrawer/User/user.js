/* ======================================= INITIALISATION ======================================= */

const addProfileDrawerUserContents = () => {
  document.querySelector("#profile_drawer").innerHTML - "";
  addProfileDrawerUserProfileContents();
  addProfileDrawerUserLogoutContents();
};

/* ========================================== PROFILE =========================================== */

const addProfileDrawerUserProfileContents = () => {
  const profileDrawerUserProfileHTML =
    "<a href='/Profile' class='profile_drawer_link'>Profile</a>";

  document
    .querySelector("#profile_drawer")
    .insertAdjacentHTML("beforeend", profileDrawerUserProfileHTML);
};

/* =========================================== LOGOUT =========================================== */

const addProfileDrawerUserLogoutContents = () => {
  const profileDrawerUserLogoutHTML =
    "<a href='/users/logout' class='profile_drawer_link'>Logout</a>";

  document
    .querySelector("#profile_drawer")
    .insertAdjacentHTML("beforeend", profileDrawerUserLogoutHTML);
};

/* ============================================================================================== */
