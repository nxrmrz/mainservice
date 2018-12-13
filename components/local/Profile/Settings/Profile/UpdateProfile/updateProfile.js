/* =========================================== INITIALISATION =========================================== */

const profileSettingsProfileUpdateProfileInit = () => {
  constructProfileSettingsProfileSaveChangesButton();
};

/* =================================== CONSTRUCT SAVE CHANGES BUTTON ==================================== */

const constructProfileSettingsProfileSaveChangesButton = () => {
  // HTML
  const profileSettingsProfileSaveChangesButtonHTML =
    "<div id='profile_settings_profile_save_changes_button_body'>" +
    "<div id='profile_settings_profile_save_changes_button'>SAVE</div>" +
    "<div id='profile_settings_profile_save_changes_handler'>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#profile_settings_profile_button_body"
  ).innerHTML = profileSettingsProfileSaveChangesButtonHTML;

  document
    .querySelector("#profile_settings_profile_save_changes_button")
    .addEventListener("click", () => {
      profileSettingsProfileSaveChanges();
    });
};

const constructProfileSettingsProfileSaveChangesLoader = () => {
  // HTML
  const profileSettingsProfileSaveChangesLoaderHTML =
    "<div id='profile_settings_profile_save_changes_loader'></div>";

  document.querySelector(
    "#profile_settings_profile_save_changes_handler"
  ).innerHTML = profileSettingsProfileSaveChangesLoaderHTML;
};

const profileSettingsProfileSaveChanges = () => {
  constructProfileSettingsProfileSaveChangesLoader();
  collectProfileSettingsProfileInputValues();
  if (!validateProfileSettingsProfileInputValues()) {
    return;
  }
  profileSettingsProfileSaveChangesSubmit();
};

/* =========================================== COLLECT INPUT ============================================ */

let profileSettingsProfileInputValuesObject;

const collectProfileSettingsProfileInputValues = () => {
  profileSettingsProfileInputValuesObject = {
    firstName: document.querySelector(
      "#profile_settings_edit_profile_first_name_input"
    ).value,
    middleNames: document.querySelector(
      "#profile_settings_edit_profile_middle_names_input"
    ).value,
    lastName: document.querySelector(
      "#profile_settings_edit_profile_last_name_input"
    ).value,
    shippingAddress: {
      streetNumber: document.querySelector(
        "#profile_settings_edit_profile_street_number_input"
      ).value,
      streetName: document.querySelector(
        "#profile_settings_edit_profile_route_input"
      ).value,
      suburb: document.querySelector(
        "#profile_settings_edit_profile_sublocality_level_1_input"
      ).value,
      city: document.querySelector(
        "#profile_settings_edit_profile_locality_input"
      ).value,
      postcode: document.querySelector(
        "#profile_settings_edit_profile_postal_code_input"
      ).value,
      country: document.querySelector(
        "#profile_settings_edit_profile_country_input"
      ).value
    }
  };
};

/* =========================================== VALIDATE INPUT =========================================== */

let invalidCount;

const validateProfileSettingsProfileInputValues = () => {
  invalidCount = 0;
  validateProfileSettingsProfileFirstNameInput();
  validateProfileSettingsProfileMiddleNamesInput();
  validateProfileSettingsProfileLastNameInput();
  validateProfileSettingsProfileStreetNumberInput();
  validateProfileSettingsProfileStreetNameInput();
  validateProfileSettingsProfileSuburbInput();
  validateProfileSettingsProfileCityInput();
  validateProfileSettingsProfilePostcodeInput();
  validateProfileSettingsProfileCountryInput();

  if (invalidCount > 0) {
    document.querySelector(
      "#profile_settings_profile_save_changes_handler"
    ).innerHTML =
      "<div id='profile_settings_profile_save_changes_failed_message'>unsuccessful</div>";
    return false;
  } else {
    constructProfileSettingsProfileSaveChangesLoader();
    return true;
  }
};

const validateProfileSettingsProfileFirstNameInput = () => {
  const firstNameInput = profileSettingsProfileInputValuesObject.firstName;
  const firstNameInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_first_name_input_field_error_body"
  );

  if (!firstNameInput) {
    firstNameInputErrorElement.innerHTML = "requires your first name";
    invalidCount++;
  } else {
    firstNameInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfileMiddleNamesInput = () => {};

const validateProfileSettingsProfileLastNameInput = () => {
  const lastNameInput = profileSettingsProfileInputValuesObject.lastName;
  const lastNameInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_last_name_input_field_error_body"
  );

  if (!lastNameInput) {
    lastNameInputErrorElement.innerHTML = "requires your last name";
    invalidCount++;
  } else {
    lastNameInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfileStreetNumberInput = () => {
  const streetNumberInput =
    profileSettingsProfileInputValuesObject.shippingAddress.streetNumber;
  const streetNumberInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_street_number_input_field_error_body"
  );

  if (!streetNumberInput) {
    streetNumberInputErrorElement.innerHTML = "requires a street number";
    invalidCount++;
  } else {
    streetNumberInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfileStreetNameInput = () => {
  const streetNameInput =
    profileSettingsProfileInputValuesObject.shippingAddress.streetName;
  const streetNameInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_route_input_field_error_body"
  );

  if (!streetNameInput) {
    streetNameInputErrorElement.innerHTML = "requires a street name";
    invalidCount++;
  } else {
    streetNameInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfileSuburbInput = () => {
  const suburbInput =
    profileSettingsProfileInputValuesObject.shippingAddress.suburb;
  const suburbInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_sublocality_level_1_input_field_error_body"
  );

  if (!suburbInput) {
    suburbInputErrorElement.innerHTML = "requires a suburb";
    invalidCount++;
  } else {
    suburbInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfileCityInput = () => {
  const cityInput =
    profileSettingsProfileInputValuesObject.shippingAddress.city;
  const cityInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_locality_input_field_error_body"
  );

  if (!cityInput) {
    cityInputErrorElement.innerHTML = "requires a city";
    invalidCount++;
  } else {
    cityInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfilePostcodeInput = () => {
  const postcodeInput =
    profileSettingsProfileInputValuesObject.shippingAddress.postcode;
  const postcodeInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_postal_code_input_field_error_body"
  );

  if (!postcodeInput) {
    postcodeInputErrorElement.innerHTML = "requires a postcode";
    invalidCount++;
  } else {
    postcodeInputErrorElement.innerHTML = "";
  }
};

const validateProfileSettingsProfileCountryInput = () => {
  const countryInput =
    profileSettingsProfileInputValuesObject.shippingAddress.country;
  const countryInputErrorElement = document.querySelector(
    "#profile_settings_edit_profile_country_input_field_error_body"
  );

  if (!countryInput) {
    countryInputErrorElement.innerHTML = "requires a country";
    invalidCount++;
  } else {
    countryInputErrorElement.innerHTML = "";
  }
};

/* =========================================== SUBMIT CHANGES =========================================== */

const profileSettingsProfileSaveChangesSuccess = () => {
  document.querySelector(
    "#profile_settings_profile_save_changes_handler"
  ).innerHTML =
    "<div id='profile_settings_profile_save_changes_success_message'>saved</div>";
};

const profileSettingsProfileSaveChangesSubmit = () => {
  $.ajax({
    type: "POST",
    url: "/Profile/save-profile-details",
    data: JSON.stringify(profileSettingsProfileInputValuesObject),
    contentType: "application/json",
    success: data => {
      profileSettingsProfileSaveChangesSuccess();
    }
  });
};
