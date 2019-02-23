/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfileInit = () => {
  constructProfileSettingsProfileStructure();
  profileSettingsProfilePopulateInputs();
};

/* ========================================= STRUCTURE ========================================== */

const constructProfileSettingsProfileStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div id='profile_settings_profile_contents' class='profile_settings_content'>" +
    "<div id='profile_settings_profile_account_type_contents' class='profile_settings_profile_content'></div>" +
    "<div id='profile_settings_profile_picture_contents' class='profile_settings_profile_content'></div>" +
    "<div id='profile_settings_profile_basic_information_contents' class='profile_settings_profile_content'></div>" +
    "<div id='profile_settings_profile_company_contents' class='profile_settings_profile_content'></div>" +
    "<div id='profile_settings_profile_shipping_address_contents' class='profile_settings_profile_content'></div>" +
    "<div id='profile_settings_profile_update_contents' class='profile_settings_profile_content'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#profile_settings_contents").innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // ACCOUNT TYPE
  profileSettingsProfileAccountTypeInit();
  // PICTURE
  profileSettingsProfilePictureInit();
  // BASIC INFORMATION
  profileSettingsProfileBasicInformationInit();
  // ADDRESS
  profileSettingsProfileAddressInit();
  // ORGANISATION
  profileSettingsProfileCompanyInit();
  // UPDATE
  profileSettingsProfileUpdateInit();
};

/* =================================== POPULATE INPUT FIELDS ==================================== */

const profileSettingsProfilePopulateInputs = () => {
  getMyProfileDetails()
    .then(profile => {
      profileSettingsProfileBasicInformationPopulateInputs(profile);
      profileSettingsProfileAddressPopulateInputs(profile);
      profileSettingsProfileCompanyPopulateInputs(profile);
      profileSettingsProfileDisplayProfilePicture(profile);
    })
    .catch(error => {
      console.log(error);
    });
};

/* ============================================================================================== */
