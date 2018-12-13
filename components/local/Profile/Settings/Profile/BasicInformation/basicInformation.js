/* =========================================== INITIALISATION =========================================== */

const profileSettingsProfileBasicInformationInit = () => {
  constructProfileSettingsProfileBasicInformationHeader();
  constructProfileSettingsProfileBasicInformationForm();
};

/* ================================= CONSTRUCT BASIC INFORMATION HEADER ================================= */

const constructProfileSettingsProfileBasicInformationHeader = () => {
  // HTML
  const profileSettingsProfileBasicInformationHeaderHTML =
    "<div class='profile_settings_edit_profile_header'>" +
    "Basic Information" +
    "</div>";
  // Insert HTML
  document
    .querySelector("#profile_settings_profile_basic_information_body")
    .insertAdjacentHTML(
      "beforeend",
      profileSettingsProfileBasicInformationHeaderHTML
    );
};

/* ================================== CONSTRUCT BASIC INFORMATION FORM ================================== */

const constructProfileSettingsProfileBasicInformationForm = () => {
  // HTML
  const profileSettingsProfileBasicInformationFormHTML =
    "<div class='profile_settings_edit_profile_form'>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>First Name</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_first_name_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_first_name_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>Middle Name(s)</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_middle_names_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_middle_names_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>" +
    "<div class='profile_settings_edit_profile_input_field'>" +
    "<div class='profile_settings_edit_profile_input_field_header'>Last Name</div>" +
    "<div class='profile_settings_edit_profile_input_body'>" +
    "<input type='text' id='profile_settings_edit_profile_last_name_input' class='profile_settings_edit_profile_input'>" +
    "</div>" +
    "<div id='profile_settings_edit_profile_last_name_input_field_error_body' class='profile_settings_edit_profile_input_field_error_body'></div>" +
    "</div>" +
    "</div>";
  // Insert HTML
  document
    .querySelector("#profile_settings_profile_basic_information_body")
    .insertAdjacentHTML(
      "beforeend",
      profileSettingsProfileBasicInformationFormHTML
    );
};

/* ====================================================================================================== */
