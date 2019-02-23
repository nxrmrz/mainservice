/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfileCompanyInit = () => {
  profileSettingsProfileCompanyStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsProfileCompanyStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_settings_profile_heading_body'>" +
    "<div class='profile_settings_profile_heading'>Organisation Information</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Comapny Name</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<input type='text' id='profile_settings_profile_company_name_input' class='profile_settings_profile_input_text' onfocus='profileSettingsProfileCompanyValidateCompanyName();' oninput='profileSettingsProfileCompanyValidateCompanyName();' />" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_company_name_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Brief Description</div>" +
    "</div>" +
    "<div class='profile_settings_profile_inputs'>" +
    "<textarea type='text' id='profile_settings_profile_brief_description_input' class='profile_settings_profile_input_textarea' onfocus='profileSettingsProfileCompanyValidateBriefDescription();' oninput='profileSettingsProfileCompanyValidateBriefDescription();'></textarea>" +
    "</div>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_brief_description_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "<div class='profile_settings_profile_input_field'>" +
    "<div class='profile_settings_profile_input_heading_body'>" +
    "<div class='profile_settings_profile_input_heading'>Get Featured on the Partners List</div>" +
    "</div>" +
    "<div id='profile_settings_profile_get_featured_inputs' class='profile_settings_profile_inputs'>" +
    "<select id='profile_settings_profile_get_featured_input' class='profile_settings_profile_input_select' onfocus='profileSettingsProfileCompanyValidateGetFeatured();' onchange='profileSettingsProfileCompanyValidateGetFeatured();'>" +
    "<option value='yes'>Yes</option>" +
    "<option value='no'>No</option>" +
    "</select>" +
    "<div id='profile_settings_profile_get_featured_error_body' class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_get_featured_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_settings_profile_company_contents"
  ).innerHTML = html;
};

/* ========================================= VALIDATION ========================================= */

/* ---------------------------------------- COMPANY NAME ---------------------------------------- */

let settingsProfileCompanyNameValidationTimeout;
let settingsProfileCompanyNameValid = false;

const profileSettingsProfileCompanyValidateCompanyName = () => {
  // RESET VARIABLES
  settingsProfileCompanyNameValid = false;
  clearTimeout(settingsProfileCompanyNameValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_company_name_error"
  );
  const elements = [element];
  // Input Values
  const companyName = document.querySelector(
    "#profile_settings_profile_company_name_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileCompanyNameValidationTimeout = setTimeout(() => {
      if (companyName) {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileCompanyNameValid = true;
      } else {
        element.innerHTML = "";
        settingsProfileCompanyNameValid = true;
      }
    }, 1000);
  });
};

/* ------------------------------------- BRIEF DESCRIPTION -------------------------------------- */

let settingsProfileBriefDescriptionValidationTimeout;
let settingsProfileBriefDescriptionValid = false;

const profileSettingsProfileCompanyValidateBriefDescription = () => {
  // RESET VARIABLES
  settingsProfileBriefDescriptionValid = false;
  clearTimeout(settingsProfileBriefDescriptionValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_brief_description_error"
  );
  const elements = [element];
  // Input Values
  const briefDescription = document.querySelector(
    "#profile_settings_profile_brief_description_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileBriefDescriptionValidationTimeout = setTimeout(() => {
      if (briefDescription) {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileBriefDescriptionValid = true;
      } else {
        element.innerHTML = "";
        settingsProfileBriefDescriptionValid = true;
      }
    }, 1000);
  });
};

/* ---------------------------------------- GET FEATURED ---------------------------------------- */

let settingsProfileGetFeaturedValidationTimeout;
let settingsProfileGetFeaturedValid = false;

const profileSettingsProfileCompanyValidateGetFeatured = () => {
  // RESET VARIABLES
  settingsProfileGetFeaturedValid = false;
  clearTimeout(settingsProfileGetFeaturedValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#profile_settings_profile_get_featured_error"
  );
  const elements = [element];
  // Input Values
  const companyName = document.querySelector(
    "#profile_settings_profile_company_name_input"
  ).value;
  const briefDescription = document.querySelector(
    "#profile_settings_profile_brief_description_input"
  ).value;
  const getFeatured = document.querySelector(
    "#profile_settings_profile_get_featured_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("setting_profile_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    settingsProfileGetFeaturedValidationTimeout = setTimeout(() => {
      if (getFeatured == "yes") {
        if (!companyName) {
          // Check if Company Name is not Provided
          element.innerHTML = "company name required";
        } else if (!briefDescription) {
          // Check if Brief Description is not Provided
          element.innerHTML = "brief description required";
        } else if (companyName && !settingsProfileCompanyNameValid) {
          // Check if Provided Company Name is not Valid
          element.innerHTML = "valid company name required";
        } else if (briefDescription && !settingsProfileBriefDescriptionValid) {
          // Check if Provided Brief Description is not Valid
          element.innerHTML = "valid brief description required";
        } else {
          // Check for Account Type
          $.ajax({
            type: "POST",
            url: "/account-type",
            success: data => {
              if (data != "partner") {
                // Check if Account Type is not Partner
                element.innerHTML = "account type must be 'partner'";
              } else {
                // If it Passes Validation
                element.innerHTML = "valid";
                element.classList.add("setting_profile_valid");
                settingsProfileGetFeaturedValid = true;
              }
            }
          });
        }
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("setting_profile_valid");
        settingsProfileGetFeaturedValid = true;
      }
    }, 1000);
  });
};

/* ======================================= COLLECT INPUT ======================================== */

const profileSettingsProfileCompanyCollectInputs = () => {
  /* -------------------------------------- PRE VALIDATION -------------------------------------- */
  if (
    !settingsProfileCompanyNameValid ||
    !settingsProfileBriefDescriptionValid ||
    !settingsProfileGetFeaturedValid
  ) {
    profileSettingsProfileCompanyValidateCompanyName();
    profileSettingsProfileCompanyValidateBriefDescription();
    profileSettingsProfileCompanyValidateGetFeatured();
    return;
  }
  /* ----------------------------------------- COLLECT ------------------------------------------ */
  // COMPANY NAME
  const companyName = document.querySelector(
    "#profile_settings_profile_company_name_input"
  ).value;
  // BRIEF DESCRIPTION
  const briefDescription = document.querySelector(
    "#profile_settings_profile_brief_description_input"
  ).value;
  // GET FEATURED
  const getFeatured = document.querySelector(
    "#profile_settings_profile_get_featured_input"
  ).value;
  /* ----------------------------------------- CONCLUDE ----------------------------------------- */
  return { companyName, briefDescription, getFeatured };
};

/* ====================================== POPULATE INPUTS ======================================= */

const profileSettingsProfileCompanyPopulateInputs = profile => {
  /* --------------------------------------- COMPANY NAME --------------------------------------- */
  let companyName;
  if (!profile.organisation) {
    companyName = "";
  } else if (profile.organisation.companyName) {
    companyName = profile.organisation.companyName;
  } else {
    companyName = "";
  }
  document.querySelector(
    "#profile_settings_profile_company_name_input"
  ).value = companyName;
  profileSettingsProfileCompanyValidateCompanyName();
  /* ------------------------------------ BRIEF DESCRIPTION ------------------------------------- */
  let briefDescription;
  if (!profile.organisation) {
    briefDescription = "";
  } else if (profile.organisation.briefDescription) {
    briefDescription = profile.organisation.briefDescription;
  } else {
    briefDescription = "";
  }
  document.querySelector(
    "#profile_settings_profile_brief_description_input"
  ).value = briefDescription;
  profileSettingsProfileCompanyValidateBriefDescription();
  /* --------------------------------------- GET FEATURED --------------------------------------- */
  let getFeatured;
  if (!profile.organisation) {
    getFeatured = "no";
  } else if (profile.organisation.getFeatured == "yes") {
    getFeatured = profile.organisation.getFeatured;
  } else {
    getFeatured = "no";
  }
  document.querySelector(
    "#profile_settings_profile_get_featured_input"
  ).value = getFeatured;
  profileSettingsProfileCompanyValidateGetFeatured();
};

/* ============================================================================================== */
