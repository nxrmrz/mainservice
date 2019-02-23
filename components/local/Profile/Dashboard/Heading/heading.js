/* ======================================= INITIALISATION ======================================= */

const profileDashboardHeadingInit = () => {
  profileDashboardHeadingStructure();
  profileDashboardHeadingName();
};

/* ========================================= STRUCTURE ========================================== */

const profileDashboardHeadingStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html = "<div id='profile_dashboard_heading_text'></div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#profile_dashboard_heading_body").innerHTML = html;
};

/* ============================================ NAME ============================================ */

const profileDashboardHeadingName = () => {
  const element = document.querySelector("#profile_dashboard_heading_text");
  const elementArray = [element];

  loadLoader(elementArray).then(() => {
    getMyProfileDetails()
      .then(profile => {
        if (element) {
          element.innerHTML =
            profile.firstName + " " + profile.lastName + "'s Dashboard";
        }
      })
      .catch(error => console.log(error));
  });
};

/* ============================================================================================== */
