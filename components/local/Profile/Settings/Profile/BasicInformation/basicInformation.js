/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfileBasicInformationInit = () => {
  profileSettingsProfileBasicInformationStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsProfileBasicInformationStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_settings_profile_heading_body'>" +
    "<div class='profile_settings_profile_heading'>Basic Information</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>First Name</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_first_name_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileBasicInformationValidateFirstName();' oninput='profileSettingsProfileBasicInformationValidateFirstName();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_first_name_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Middle Name(s)</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_middle_names_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileBasicInformationValidateMiddleNames();' oninput='profileSettingsProfileBasicInformationValidateMiddleNames();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_middle_names_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Last Name</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_last_name_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileBasicInformationValidateLastName();' oninput='profileSettingsProfileBasicInformationValidateLastName();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_last_name_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_settings_profile_basic_information_contents"
  ).innerHTML = html;
};

/* ========================================= VALIDATION ========================================= */

/* ----------------------------------------- FIRST NAME ----------------------------------------- */

let settingsProfileFirstNameValidationTimeout;
let settingsProfileFirstNameValid = false;

const profileSettingsProfileBasicInformationValidateFirstName = () => {
  // RESET VARIABLES
  settingsProfileFirstNameValid = false;
  clearTimeout(settingsProfileFirstNameValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_first_name_error"
  );
  const elements = [element];
  // Input Values
  const firstName = document.querySelector(
    "#profile_settings_profile_first_name_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileFirstNameValidationTimeout = setTimeout(() => {
      if (!firstName) {
        // Check if no first name is provided
        element.innerHTML = "first name required";
        settingsProfileFirstNameValid = false;
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileFirstNameValid = true;
      }
    }, 1000);
  });
};

/* ---------------------------------------- MIDDLE NAMES ---------------------------------------- */

let settingsProfileMiddleNamesValidationTimeout;
let settingsProfileMiddleNamesValid = false;

const profileSettingsProfileBasicInformationValidateMiddleNames = () => {
  // RESET VARIABLES
  settingsProfileMiddleNamesValid = false;
  clearTimeout(settingsProfileMiddleNamesValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_middle_names_error"
  );
  const elements = [element];
  // Input Values
  const middleNames = document.querySelector(
    "#profile_settings_profile_middle_names_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileMiddleNamesValidationTimeout = setTimeout(() => {
      if (middleNames) {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileMiddleNamesValid = true;
      } else {
        element.innerHTML = "";
        settingsProfileMiddleNamesValid = true;
      }
    }, 1000);
  });
};

/* ----------------------------------------- LAST NAME ------------------------------------------ */

let settingsProfileLastNameValidationTimeout;
let settingsProfileLastNameValid = false;

const profileSettingsProfileBasicInformationValidateLastName = () => {
  // RESET VARIABLES
  settingsProfileLastNameValid = false;
  clearTimeout(settingsProfileLastNameValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_last_name_error"
  );
  const elements = [element];
  // Input Values
  const lastName = document.querySelector(
    "#profile_settings_profile_last_name_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileLastNameValidationTimeout = setTimeout(() => {
      if (!lastName) {
        // Check if no last name is provided
        element.innerHTML = "last name required";
        settingsProfileLastNameValid = false;
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileLastNameValid = true;
      }
    }, 1000);
  });
};

/* ======================================= COLLECT INPUT ======================================== */

const profileSettingsProfileBasicInformationCollectInputs = () => {
  /* -------------------------------------- PRE VALIDATION -------------------------------------- */
  if (
    !settingsProfileFirstNameValid ||
    !settingsProfileMiddleNamesValid ||
    !settingsProfileLastNameValid
  ) {
    return;
  }
  /* ----------------------------------------- COLLECT ------------------------------------------ */
  // FIRST NAME
  const firstName = document.querySelector(
    "#profile_settings_profile_first_name_input"
  ).value;
  // MIDDLE NAMES
  const middleNames = document.querySelector(
    "#profile_settings_profile_middle_names_input"
  ).value;
  // LAST NAME
  const lastName = document.querySelector(
    "#profile_settings_profile_last_name_input"
  ).value;
  /* ----------------------------------------- CONCLUDE ----------------------------------------- */
  return { firstName, middleNames, lastName };
};

/* ====================================== POPULATE INPUTS ======================================= */

const profileSettingsProfileBasicInformationPopulateInputs = profile => {
  /* ---------------------------------------- FIRST NAME ---------------------------------------- */
  document.querySelector("#profile_settings_profile_first_name_input").value =
    profile.firstName;
  profileSettingsProfileBasicInformationValidateFirstName();
  /* --------------------------------------- MIDDLE NAMES --------------------------------------- */
  let middleNames;
  if (profile.middleNames) {
    middleNames = profile.middleNames;
  } else {
    middleNames = "";
  }
  document.querySelector(
    "#profile_settings_profile_middle_names_input"
  ).value = middleNames;
  profileSettingsProfileBasicInformationValidateMiddleNames();
  /* ---------------------------------------- LATE NAME ----------------------------------------- */
  document.querySelector("#profile_settings_profile_last_name_input").value =
    profile.lastName;
  profileSettingsProfileBasicInformationValidateLastName();
};

/* ============================================================================================== */
