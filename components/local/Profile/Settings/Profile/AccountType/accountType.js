/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfileAccountTypeInit = () => {
  profileSettingsProfileAccountTypeStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsProfileAccountTypeStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    `<div class="profile_settings_profile_heading_body">` +
    `<div class="profile_settings_profile_heading">Account Type</div>` +
    `</div>` +
    `<div id="profile_settings_profile_account_type_input_field" class='profile_settings_profile_input_field'>` +
    `<div class='profile_settings_profile_input_heading_body'>` +
    `<div class='profile_settings_profile_input_heading'>Account Type:</div>` +
    `</div>` +
    `<div class="profile_settings_profile_inputs">` +
    `<div id="profile_settings_profile_account_type"></div>` +
    `</div>` +
    `</div>`;
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    `#profile_settings_profile_account_type_contents`
  ).innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // ACCOUNT TYPE
  profileSettingsProfileAccountTypeSet();
};

/* ====================================== SET ACCOUNT TYPE ====================================== */

const profileSettingsProfileAccountTypeSet = () => {
  $.ajax({
    type: "POST",
    url: "/account-type",
    success: accountType => {
      const accountTypeName = capitaliseFirstLetter(accountType);
      const element = document.querySelector(
        "#profile_settings_profile_account_type"
      );
      if (element) {
        element.innerHTML = accountTypeName;
        if (accountType == `normal`) {
          profileSettingsProfileBecomeAPartnerButton();
        } else if (accountType == `partner`) {
        }
      }
    }
  });
};

/* ====================================== BECOME A PARTNER ====================================== */

const profileSettingsProfileBecomeAPartnerButton = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    `<div class="profile_settings_profile_button_body">` +
    `<div class="button_two_body">` +
    `<div id="profile_settings_profile_become_a_partner" class="button_two">` +
    `<div class="button_two_label">Become a Partner</div>` +
    `</div>` +
    `<div id="profile_settings_profile_become_a_partner_loader" class="button_two_loader"></div>` +
    `</div>` +
    `</div>`;
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document
    .querySelector(`#profile_settings_profile_account_type_contents`)
    .insertAdjacentHTML("beforeend", html);
  /* -------------------------------------- EVENT LISTENER -------------------------------------- */
  document
    .querySelector(`#profile_settings_profile_become_a_partner`)
    .addEventListener(`click`, () => {
      profileSettingsProfileBecomeAPartnerValidate();
    });
};

const profileSettingsProfileBecomeAPartnerValidate = () => {
  /* ----------------------------------------- ELEMENTS ----------------------------------------- */
  const element = document.querySelector(
    `#profile_settings_profile_become_a_partner_loader`
  );
  const elements = [element];
  /* ------------------------------------------ RESET ------------------------------------------- */
  element.classList.remove("button_one_success");
  /* ------------------------------------------ LOADER ------------------------------------------ */
  loadLoader(elements, "small")
    .then(() => {
      let defaultStartDate;
      let defaultEndDate;
      let defaultStartDates = [];
      let defaultEndDates = [];
      let months = [];
      let years = [];
      let i;
      defaultStartDate = moment()
        .subtract(6, "month")
        .startOf("month")._d;
      defaultStartDates.push(defaultStartDate);
      months.push(dateFormatter(defaultStartDate).month[0]);
      years.push(dateFormatter(defaultStartDate).year);
      for (let i = 5; i >= 0; i--) {
        defaultStartDate = moment()
          .subtract(i, "month")
          .startOf("month")._d;
        defaultStartDates.push(defaultStartDate);
        months.push(dateFormatter(defaultStartDate).month[0]);
        years.push(dateFormatter(defaultStartDate).year);
      }
      for (let i = 6; i >= 1; i--) {
        defaultEndDate = moment()
          .subtract(i, "month")
          .endOf("month")._d;
        defaultEndDates.push(defaultEndDate);
      }
      defaultEndDate = moment()._d;
      defaultEndDates.push(defaultEndDate);
      let promises = [];
      for (let i = 0; i < defaultStartDates.length; i++) {
        defaultStartDate = defaultStartDates[i];
        defaultEndDate = defaultEndDates[i];
        promises.push(
          cumulativeOrderValueByOrderStatusAndDateRange(
            "Order Completed",
            defaultStartDate,
            defaultEndDate
          )
        );
      }
      Promise.all(promises).then(monthlyOrdersObjects => {
        // GET CUMULATIVE VALUES
        // Current Month's Cumulative Order Value
        const currentMonthCumulativeOrderValue =
          monthlyOrdersObjects[6].cumulativeOrderValue;
        // Previous Month's Cumulative Order Value
        const previousMonthCumulativeOrderValue =
          monthlyOrdersObjects[5].cumulativeOrderValue;
        // Average Cumulative Order Value for the Most Recent 6 Months
        let totalMonthCumulativeOrderValue = 0;
        for (let i = 0; i < monthlyOrdersObjects.length - 1; i++) {
          totalMonthCumulativeOrderValue +=
            monthlyOrdersObjects[i].cumulativeOrderValue;
        }
        const averageMonthCumulativeOrderValue =
          totalMonthCumulativeOrderValue / 6;

        if (currentMonthCumulativeOrderValue >= 1000) {
          $.ajax({
            type: "POST",
            url: "/account-type/update/partner",
            success: data => {
              profileSettingsProfileAccountTypeStructure();
            }
          });
        } else if (previousMonthCumulativeOrderValue >= 1000) {
          $.ajax({
            type: "POST",
            url: "/account-type/update/partner",
            success: data => {
              profileSettingsProfileAccountTypeStructure();
            }
          });
        } else if (averageMonthCumulativeOrderValue >= 1000) {
          $.ajax({
            type: "POST",
            url: "/account-type/update/partner",
            success: data => {
              profileSettingsProfileAccountTypeStructure();
            }
          });
        } else {
          element.innerHTML = "failed to meet requirements";
        }
      });
    })
    .catch(error => {
      element.innerHTML = "error";
    });
};

/* ============================================================================================== */
