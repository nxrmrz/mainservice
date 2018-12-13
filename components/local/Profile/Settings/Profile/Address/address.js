/* =========================================== INITIALISATION =========================================== */

const profileSettingsProfileAddressInit = () => {
  constructProfileSettingsProfileAddressHeader();
  constructProfileSettingsProfileAddressForm();
  addressAutocompleteInit(
    document.querySelector(
      "#profile_settings_edit_profile_search_address_input"
    ),
    fillInProfileAddress
  );
};

/* ================================= CONSTRUCT BASIC INFORMATION HEADER ================================= */

const constructProfileSettingsProfileAddressHeader = () => {
  // HTML
  const profileSettingsProfileAddressHeaderHTML =
    "<div class='profile_settings_edit_profile_header'>" +
    "Shipping Address" +
    "</div>";
  // Insert HTML
  document
    .querySelector("#profile_settings_profile_shipping_address_body")
    .insertAdjacentHTML("beforeend", profileSettingsProfileAddressHeaderHTML);
};

/* ================================== CONSTRUCT BASIC INFORMATION FORM ================================== */

const constructProfileSettingsProfileAddressForm = () => {
  // HTML
  const profileSettingsProfileAddressFormHTML =
    "<div class='profile_settings_edit_profile_form'>" +
    "<div id='profile_settings_edit_profile_search_address_input_field' class='profile_settings_edit_profile_input_field'>" +
    "<div id='profile_settings_edit_profile_search_address_input_body' class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_search_address_input' class='profile_settings_edit_profile_input' " +
    "onfocus=\"this.value=''\" placeholder='Enter your address'" +
    ">" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>Street Address</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_street_number_input' class='profile_settings_edit_profile_input'>" +
    "<input type='text' id='profile_settings_edit_profile_route_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_street_number_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "<div id='profile_settings_edit_profile_route_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>Suburb</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_sublocality_level_1_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_sublocality_level_1_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>City, Postcode</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_locality_input' class='profile_settings_edit_profile_input'>" +
    "<input type='text' id='profile_settings_edit_profile_postal_code_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_locality_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "<div id='profile_settings_edit_profile_postal_code_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>Country</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_country_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_country_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>";
  // Insert HTML
  document
    .querySelector("#profile_settings_profile_shipping_address_body")
    .insertAdjacentHTML("beforeend", profileSettingsProfileAddressFormHTML);
};

/* ======================================== ADDRESS AUTOCOMPLETE ======================================== */

const fillInProfileAddress = () => {
  const place = addressAutocomplete.getPlace();

  for (component in addressComponentsObject) {
    document.querySelector(
      "#profile_settings_edit_profile_" + component + "_input"
    ).value = "";
  }

  for (let i = 0; i < place.address_components.length; i++) {
    const addressType = place.address_components[i].types[0];
    if (addressComponentsObject[addressType]) {
      document.querySelector(
        "#profile_settings_edit_profile_" + addressType + "_input"
      ).value =
        place.address_components[i][addressComponentsObject[addressType]];
    }
  }
};

/* ====================================================================================================== */
