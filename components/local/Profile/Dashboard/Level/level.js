/* ======================================= INITIALISATION ======================================= */

const profileDashboardLevelInit = () => {
  profileDashboardLevelStructure();
  profileDashboardLevelContent();
};

/* ========================================= STRUCTURE ========================================== */

const profileDashboardLevelStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_dashboard_table'>" +
    "<div class='profile_dashboard_level_heading_body'>" +
    "<div id='profile_dashboard_account_level' class='profile_dashboard_level_heading_text'></div>" +
    "</div>" +
    "<div class='profile_dashboard_level_meter_body'>" +
    "<div class='profile_dashboard_meters_body'>" +
    "<div id='profile_dashboard_progression_meter_body' class='profile_dashboard_meter_body'>" +
    "<div id='profile_dashboard_progression_meter' class='profile_dashboard_meter'></div>" +
    "</div>" +
    "<div id='profile_dashboard_total_meter_body' class='profile_dashboard_meter_body'>" +
    "<div id='profile_dashboard_total_meter' class='profile_dashboard_meter'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_dashboard_total_meter_labels_body'>" +
    "<div id='profile_dashboard_minimum_order_value_label_body' class='profile_dashboard_total_meter_label_body'>" +
    "<div id='profile_dashboard_min_points' class='profile_dashboard_total_meter_label_text'></div>" +
    "</div>" +
    "<div id='profile_dashboard_maximum_order_value_label_body' class='profile_dashboard_total_meter_label_body'>" +
    "<div id='profile_dashboard_max_points' class='profile_dashboard_total_meter_label_text'></div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_dashboard_level_stats_body'>" +
    "<div class='profile_dashboard_level_stats_heading_body'>" +
    "<div class='profile_dashboard_level_stats_heading_text'>Total Points</div>" +
    "</div>" +
    "<div class='profile_dashboard_level_stats_content_body'>" +
    "<div id='profile_dashboard_total_points' class='profile_dashboard_level_stats_content_text'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_dashboard_level_stats_body'>" +
    "<div class='profile_dashboard_level_stats_heading_body'>" +
    "<div class='profile_dashboard_level_stats_heading_text'>Benefits</div>" +
    "</div>" +
    "<div class='profile_dashboard_button_body'>" +
    "<div id='profile_dashboard_view_benefits_button' class='profile_dashboard_button'>" +
    "<div class='profile_dashboard_button_text'>View Benefits</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#profile_dashboard_level_body").innerHTML = html;
};

/* ========================================== CONTENTS ========================================== */

const profileDashboardLevelContent = () => {
  /* ----------------------------------- ELEMENTS FOR LOADING ----------------------------------- */
  const elementOne = document.querySelector("#profile_dashboard_account_level");
  const elementTwo = document.querySelector("#profile_dashboard_total_points");
  const elementArray = [elementOne, elementTwo];
  /* ------------------------------------------ LOADER ------------------------------------------ */
  loadLoader(elementArray).then(() => {
    getMyProfileDetails().then(profile => {
      getOrderDetailsArrayByOrderStatus("Order Completed").then(orders => {
        let points;
        let numberOfCompletedOrders;
        if (profile.summary) {
          numberOfCompletedOrders = profile.summary.numberOfCompletedOrders;
        } else {
          numberOfCompletedOrders = 0;
        }
        if (numberOfCompletedOrders == orders.length) {
          points = profile.summary.points;
        } else {
          points = undefined;
        }

        /* ----------------------------------- USER LEVEL DETAILS ----------------------------------- */
        calculateLevel(true, points)
          .then(levelObject => {
            // DEFINE OTHER ELEMENTS
            const minPointsElement = document.querySelector(
              "#profile_dashboard_min_points"
            );
            const maxPointsElement = document.querySelector(
              "#profile_dashboard_max_points"
            );
            const progressionMeterElement = document.querySelector(
              "#profile_dashboard_progression_meter"
            );
            // POPULATE ELEMENTS CONTENT
            if (elementOne) {
              elementOne.innerHTML = "Account Level: " + levelObject.level;
            }
            if (elementTwo) {
              elementTwo.innerHTML = levelObject.points;
            }
            if (minPointsElement) {
              minPointsElement.innerHTML = levelObject.minPoints;
            }
            if (minPointsElement) {
              maxPointsElement.innerHTML = levelObject.maxPoints;
            }
            // PROGRESSION METER WIDTH STYLE
            const progressionMeterWidth =
              100 *
                ((levelObject.points - levelObject.minPoints) /
                  (levelObject.maxPoints - levelObject.minPoints)) +
              "%";
            if (progressionMeterElement) {
              progressionMeterElement.style.width = progressionMeterWidth;
            }
            // ADD EVENT LISTENER FOR VIEW BENEFITS BUTTON
            document
              .querySelector("#profile_dashboard_view_benefits_button")
              .addEventListener("click", () => {
                profileDashboardLevelViewBenefits(levelObject.benefits);
              });
          })
          .catch(error => console.log(error));
      });
    });
  });
};

/* ========================================== BENEFITS ========================================== */

const profileDashboardLevelViewBenefits = benefitArray => {
  profileDashboardLevelBenefitsModal();
  profileDashboardLevelBenefitsStructure();
  profileDashboardLevelBenefitsList(benefitArray);
};

/* ------------------------------------------- MODAL -------------------------------------------- */

const profileDashboardLevelBenefitsModal = () => {
  const modalId = "level_benefits";
  const modalHeader = "Benefits";
  const modalFooter = "";

  const elementObject = new modalElementObject(
    modalId,
    modalHeader,
    modalFooter
  );

  const modalMobileHeight = 50;
  const modalMobileWidth = 80;
  const modalDesktopHeight = 50;
  const modalDesktopWidth = 50;
  const modalFooterHeight = 0;

  const CSSObject = new modalCSSObject(
    modalMobileHeight,
    modalMobileWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );

  addModal(elementObject, CSSObject);
};

/* ----------------------------------------- STRUCTURE ------------------------------------------ */

const profileDashboardLevelBenefitsStructure = () => {
  // CREATE HTML
  html = "<div id='dashboard_level_benefits'></div>";
  // INSERT HTML
  document.querySelector("#level_benefits_modal_body").innerHTML = html;
};

/* ------------------------------------------ CONTENTS ------------------------------------------ */

const profileDashboardLevelBenefitsList = benefitArray => {
  benefitArray.forEach(benefit => {
    const html =
      "<div class='dashboard_level_benefit_body'>" +
      "<div class='dashboard_level_benefit'>" +
      benefit +
      "</div>" +
      "</div>";

    document
      .querySelector("#dashboard_level_benefits")
      .insertAdjacentHTML("beforeend", html);
  });
};

/* ============================================================================================== */
