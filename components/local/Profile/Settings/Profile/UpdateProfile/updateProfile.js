/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfileUpdateInit = () => {
  profileSettingsProfileUpdateStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsProfileUpdateStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='button_one_body'>" +
    "<div id='profile_settings_profile_save' class='button_one'>" +
    "<div class='button_one_label'>Save</div>" +
    "</div>" +
    "<div id='profile_settings_profile_saving' class='button_one_loader'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_settings_profile_update_contents"
  ).innerHTML = html;
  /* ------------------------------------ ADD EVENT LISTENER ------------------------------------ */
  document
    .querySelector("#profile_settings_profile_save")
    .addEventListener("click", () => {
      profileSettingsProfileUpdateSave();
    });
};

/* ======================================= UPDATE PROFILE ======================================= */

const profileSettingsProfileUpdateSave = () => {
  /* ----------------------------------------- LOADING ------------------------------------------ */
  const element = document.querySelector("#profile_settings_profile_saving");
  const elements = [element];
  loadLoader(elements, "small").then(() => {
    /* ---------------------------------- COLLECT AND VALIDATE ---------------------------------- */
    valid = true;
    // BASIC INFORMATION
    const basicInformation = profileSettingsProfileBasicInformationCollectInputs();
    if (!basicInformation) {
      valid = false;
    }
    // ADDRESS
    const shippingAddress = profileSettingsProfileAddressCollectInputs();
    if (!shippingAddress) {
      valid = false;
    }
    // ORGANISATION
    const organisation = profileSettingsProfileCompanyCollectInputs();
    if (!organisation) {
      valid = false;
    }
    /* ---------------------------------------- CONCLUDE ---------------------------------------- */
    if (valid) {
      const profile = {
        firstName: basicInformation.firstName,
        middleNames: basicInformation.middleNames,
        lastName: basicInformation.lastName,
        shippingAddress: {
          unit: shippingAddress.unit,
          streetNumber: shippingAddress.streetNumber,
          streetName: shippingAddress.streetName,
          suburb: shippingAddress.suburb,
          city: shippingAddress.city,
          postcode: shippingAddress.postcode,
          country: shippingAddress.country
        },
        organisation: {
          companyName: organisation.companyName,
          briefDescription: organisation.briefDescription,
          getFeatured: organisation.getFeatured
        }
      };

      $.ajax({
        type: "POST",
        url: "/profile/update",
        contentType: "application/json",
        data: JSON.stringify({ profile }),
        success: data => {
          document.querySelector("#profile_settings_profile_saving").innerHTML =
            "";
        }
      });
    } else {
      return;
    }
  });
};

/* ============================================================================================== */
