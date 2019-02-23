/* ======================================= INITIALISATION ======================================= */

const addProfileDrawerUserContents = profile => {
  document.querySelector("#profile_drawer").innerHTML = "";
  profileDrawerToggleIcon(profile);
  addProfileDrawerUserProfileContents();
  addProfileDrawerUserLogoutContents();
};

/* ========================================== PROFILE =========================================== */

const addProfileDrawerUserProfileContents = () => {
  const profileDrawerUserProfileHTML =
    "<a href='/profile' class='profile_drawer_link'>Profile</a>";

  document
    .querySelector("#profile_drawer")
    .insertAdjacentHTML("beforeend", profileDrawerUserProfileHTML);
};

/* ======================================== TOGGLE ICON ========================================= */

const profileDrawerToggleIcon = profile => {
  let html;
  if (profile.profilePicture) {
    html = `<img src="/profile-picture/${
      profile.profilePicture.id
    }" class="profile_drawer_picture_icon">`;
  } else {
    html = `<img src="/assets/profile_icon.png" id="profile_drawer_icon">`;
  }

  document.querySelector("#profile_drawer_toggle").innerHTML = html;
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
