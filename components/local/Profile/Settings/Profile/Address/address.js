/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfileAddressInit = () => {
  profileSettingsProfileAddressStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsProfileAddressStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_settings_profile_heading_body'>" +
    "<div class='profile_settings_profile_heading'>Shipping Address</div>" +
    "</div>" +
    /* "<div id='profile_settings_profile_search_shipping_address'>" +
    "<input type='text' id='profile_settings_profile_search_shipping_address_input' class='profile_settings_profile_input_text'>" +
    "</div>" + */
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Unit</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_unit_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateUnit();' oninput='profileSettingsProfileAddressValidateUnit();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_unit_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Street Address</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_street_number_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateStreetAddress();' oninput='profileSettingsProfileAddressValidateStreetAddress();' />" +
    "<input type='text' id='profile_settings_profile_route_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateStreetAddress();' oninput='profileSettingsProfileAddressValidateStreetAddress();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_street_address_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Suburb</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_sublocality_level_1_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateSuburb();' oninput='profileSettingsProfileAddressValidateSuburb();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_sublocality_level_1_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>City, Postcode</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_locality_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateCityPostcode();' oninput='profileSettingsProfileAddressValidateCityPostcode();' />" +
    "<input type='text' id='profile_settings_profile_postal_code_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateCityPostcode();' oninput='profileSettingsProfileAddressValidateCityPostcode();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_city_postcode_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Country</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_country_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileAddressValidateCountry();' oninput='profileSettingsProfileAddressValidateCountry();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_country_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_settings_profile_shipping_address_contents"
  ).innerHTML = html;
  /* -------------------------- ADD ADDRESS AUTOCOMPLETE AND AUTOFILL --------------------------- */
  /* addressAutocompleteInit(
    document.querySelector(
      "#profile_settings_profile_search_shipping_address_input"
    ),
    fillInProfileAddress
  ); */
};

/* ========================================= VALIDATION ========================================= */

/* -------------------------------------------- UNIT -------------------------------------------- */

let settingsProfileUnitValidationTimeout;
let settingsProfileUnitValid = false;

const profileSettingsProfileAddressValidateUnit = () => {
  // RESET VARIABLES
  settingsProfileUnitValid = false;
  clearTimeout(settingsProfileUnitValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_unit_error"
  );
  const elements = [element];
  // Input Values
  const unit = document.querySelector("#profile_settings_profile_unit_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileUnitValidationTimeout = setTimeout(() => {
      if (unit) {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileUnitValid = true;
      } else {
        element.innerHTML = "";
        settingsProfileUnitValid = true;
      }
    }, 1000);
  });
};

/* --------------------------------------- STREET ADDRESS --------------------------------------- */

let settingsProfileStreetAddressValidationTimeout;
let settingsProfileStreetAddressValid = false;

const profileSettingsProfileAddressValidateStreetAddress = () => {
  // RESET VARIABLES
  settingsProfileStreetAddressValid = false;
  clearTimeout(settingsProfileStreetAddressValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_street_address_error"
  );
  const elements = [element];
  // Input Values
  const streetNumber = document.querySelector(
    "#profile_settings_profile_street_number_input"
  ).value;
  const streetName = document.querySelector(
    "#profile_settings_profile_route_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileStreetAddressValidationTimeout = setTimeout(() => {
      if (!streetNumber) {
        if (!streetName) {
          element.innerHTML = "street number and name required";
          settingsProfileStreetAddressValid = false;
        } else {
          element.innerHTML = "street number required";
          settingsProfileStreetAddressValid = false;
        }
      } else if (!streetName) {
        element.innerHTML = "street name required";
        settingsProfileStreetAddressValid = false;
      } else {
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileStreetAddressValid = true;
      }
    }, 1000);
  });
};

/* ------------------------------------------- SUBURB ------------------------------------------- */

let settingsProfileSuburbValidationTimeout;
let settingsProfileSuburbValid = false;

const profileSettingsProfileAddressValidateSuburb = () => {
  // RESET VARIABLES
  settingsProfileSuburbValid = false;
  clearTimeout(settingsProfileSuburbValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_sublocality_level_1_error"
  );
  const elements = [element];
  // Input Values
  const suburb = document.querySelector(
    "#profile_settings_profile_sublocality_level_1_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileSuburbValidationTimeout = setTimeout(() => {
      if (!suburb) {
        element.innerHTML = "suburb required";
        settingsProfileSuburbValid = false;
      } else {
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileSuburbValid = true;
      }
    }, 1000);
  });
};

/* --------------------------------------- CITY, POSTCODE --------------------------------------- */

let settingsProfileCityPostcodeValidationTimeout;
let settingsProfileCityPostcodeValid = false;

const profileSettingsProfileAddressValidateCityPostcode = () => {
  // RESET VARIABLES
  settingsProfileCityPostcodeValid = false;
  clearTimeout(settingsProfileCityPostcodeValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_city_postcode_error"
  );
  const elements = [element];
  // Input Values
  const city = document.querySelector(
    "#profile_settings_profile_locality_input"
  ).value;
  const postcode = document.querySelector(
    "#profile_settings_profile_postal_code_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileCityPostcodeValidationTimeout = setTimeout(() => {
      if (!city) {
        if (!postcode) {
          element.innerHTML = "city and postcode required";
          settingsProfileCityPostcodeValid = false;
        } else {
          element.innerHTML = "city required";
          settingsProfileCityPostcodeValid = false;
        }
      } else if (!postcode) {
        element.innerHTML = "postcode required";
        settingsProfileCityPostcodeValid = false;
      } else {
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileCityPostcodeValid = true;
      }
    }, 1000);
  });
};

/* ------------------------------------------ COUNTRY ------------------------------------------- */

let settingsProfileCountryValidationTimeout;
let settingsProfileCountryValid = false;

const profileSettingsProfileAddressValidateCountry = () => {
  // RESET VARIABLES
  settingsProfileCountryValid = false;
  clearTimeout(settingsProfileCountryValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_country_error"
  );
  const elements = [element];
  // Input Values
  const country = document.querySelector(
    "#profile_settings_profile_country_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileCountryValidationTimeout = setTimeout(() => {
      if (!country) {
        element.innerHTML = "country required";
        settingsProfileCountryValid = false;
      } else {
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileCountryValid = true;
      }
    }, 1000);
  });
};

/* ======================================= COLLECT INPUT ======================================== */

const profileSettingsProfileAddressCollectInputs = () => {
  /* -------------------------------------- PRE VALIDATION -------------------------------------- */
  if (
    !settingsProfileUnitValid ||
    !settingsProfileStreetAddressValid ||
    !settingsProfileSuburbValid ||
    !settingsProfileCityPostcodeValid ||
    !settingsProfileCountryValid
  ) {
    return;
  }
  /* ----------------------------------------- COLLECT ------------------------------------------ */
  // UNIT
  const unit = document.querySelector("#profile_settings_profile_unit_input")
    .value;
  // STREET NUMBER
  const streetNumber = document.querySelector(
    "#profile_settings_profile_street_number_input"
  ).value;
  // STREET NAME
  const streetName = document.querySelector(
    "#profile_settings_profile_route_input"
  ).value;
  // SUBURB
  const suburb = document.querySelector(
    "#profile_settings_profile_sublocality_level_1_input"
  ).value;
  // CITY
  const city = document.querySelector(
    "#profile_settings_profile_locality_input"
  ).value;
  // POSTCODE
  const postcode = document.querySelector(
    "#profile_settings_profile_postal_code_input"
  ).value;
  // COUNTRY
  const country = document.querySelector(
    "#profile_settings_profile_country_input"
  ).value;
  /* ----------------------------------------- CONCLUDE ----------------------------------------- */
  return { unit, streetNumber, streetName, suburb, city, postcode, country };
};

/* ====================================== POPULATE INPUTS ======================================= */

const profileSettingsProfileAddressPopulateInputs = profile => {
  /* ------------------------------------------- UNIT ------------------------------------------- */
  let unit;
  if (profile.shippingAddress.unit) {
    unit = profile.shippingAddress.unit;
  } else {
    unit = "";
  }
  document.querySelector("#profile_settings_profile_unit_input").value = unit;
  profileSettingsProfileAddressValidateUnit();
  /* -------------------------------------- STREET ADDRESS -------------------------------------- */
  // STREET NUMBER
  document.querySelector(
    "#profile_settings_profile_street_number_input"
  ).value = profile.shippingAddress.streetNumber;
  // STREET NAME
  document.querySelector("#profile_settings_profile_route_input").value =
    profile.shippingAddress.streetName;
  profileSettingsProfileAddressValidateStreetAddress();
  /* ------------------------------------------ SUBURB ------------------------------------------ */
  document.querySelector(
    "#profile_settings_profile_sublocality_level_1_input"
  ).value = profile.shippingAddress.suburb;
  profileSettingsProfileAddressValidateSuburb();
  /* -------------------------------------- CITY, POSTCODE -------------------------------------- */
  // CITY
  document.querySelector("#profile_settings_profile_locality_input").value =
    profile.shippingAddress.city;
  // POSTCODE
  document.querySelector("#profile_settings_profile_postal_code_input").value =
    profile.shippingAddress.postcode;
  profileSettingsProfileAddressValidateCityPostcode();
  /* ----------------------------------------- COUNTRY ------------------------------------------ */
  document.querySelector("#profile_settings_profile_country_input").value =
    profile.shippingAddress.country;
  profileSettingsProfileAddressValidateCountry();
};

/* ==================================== ADDRESS AUTOCOMPLETE ==================================== */

const fillInProfileAddress = () => {
  const place = addressAutocomplete.getPlace();

  for (component in addressComponentsObject) {
    document.querySelector(
      "#profile_settings_profile_" + component + "_input"
    ).value = "";
  }

  for (let i = 0; i < place.address_components.length; i++) {
    const addressType = place.address_components[i].types[0];
    if (addressComponentsObject[addressType]) {
      document.querySelector(
        "#profile_settings_profile_" + addressType + "_input"
      ).value =
        place.address_components[i][addressComponentsObject[addressType]];
    }
  }
};

/* ============================================================================================== */
