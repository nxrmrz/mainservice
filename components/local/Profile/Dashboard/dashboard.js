/* ======================================= INITIALISATION ======================================= */

const profileDashboardInit = () => {
  profileDashboardStructure();
  profileDashboardHeadingInit();
  profileDashboardLevelInit();
  profileDashboardMonthlyOrdersInit();
};

/* ========================================= STRUCTURE ========================================== */

const profileDashboardStructure = () => {
  /* ------------------------------------- CREATE THE HTML -------------------------------------- */
  const html =
    "<div id='profile_dashboard_contents_body' class='profile_content_body'>" +
    "<div id='profile_dashboard_heading_body' class='profile_dashboard_content_body'></div>" +
    "<div id='profile_dashboard_announcement_body' class='profile_dashboard_content_body'></div>" +
    "<div id='profile_dashboard_level_body' class='profile_dashboard_content_body'></div>" +
    "<div id='profile_dashboard_monthly_orders_body' class='profile_dashboard_content_body'></div>" +
    "</div>";
  /* ------------------------------------- INSERT THE HTML -------------------------------------- */
  document.querySelector("#profile_contents_body").innerHTML = html;
};

/* ============================================================================================== */
