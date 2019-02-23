/* ======================================= INITIALISATION ======================================= */

const profileSettingsProfilePictureInit = () => {
  profileSettingsProfilePictureStructure();
};

/* ========================================= STRUCTURE ========================================== */

const profileSettingsProfilePictureStructure = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='profile_settings_profile_heading_body'>" +
    "<div class='profile_settings_profile_heading'>Profile Picture</div>" +
    "</div>" +
    "<div id='profile_settings_profile_picture_body'></div>" +
    "<form id='profile_settings_profile_upload_picture_form'>" +
    "<input type='file' name='uploadProfilePicture' id='profile_settings_profile_upload_picture_input' />" +
    "</form>" +
    "<div class='profile_settings_profile_error_body'>" +
    "<div id='profile_settings_profile_upload_picture_error' class='profile_settings_profile_error'></div>" +
    "</div>" +
    "<div class='button_one_body'>" +
    "<div id='profile_settings_profile_change_picture' class='button_one'>" +
    "<div class='button_one_label'>Change Picture</div>" +
    "</div>" +
    "<div id='profile_settings_profile_picture_uploading' class='button_one_loader'></div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(
    "#profile_settings_profile_picture_contents"
  ).innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // CHANGE PICTURE
  document
    .querySelector("#profile_settings_profile_change_picture")
    .addEventListener("click", () => {
      profileSettingsProfilePictureChange();
    });
};

/* ======================================= CHANGE PICTURE ======================================= */

const profileSettingsProfilePictureChange = () => {
  /* -------------------------------------- SET VARIABLES --------------------------------------- */
  // ERRORS
  const elementOne = document.querySelector(
    "#profile_settings_profile_upload_picture_error"
  );
  const elementTwo = document.querySelector(
    "#profile_settings_profile_picture_uploading"
  );
  const elementThree = document.querySelector(
    "#profile_settings_profile_picture_body"
  );
  const elementsOne = [elementOne, elementTwo];
  const elementsTwo = [elementThree];
  // INPUTS
  const input = document.querySelector(
    "#profile_settings_profile_upload_picture_input"
  ).files[0];
  /* ------------------------------------ RESET CLASS LISTS ------------------------------------- */
  elementOne.classList.remove("setting_profile_valid");
  elementTwo.classList.remove("button_one_success");
  /* -------------------------------------- CREATE LOADER --------------------------------------- */
  loadLoader(elementsOne, "small").then(() => {
    setTimeout(() => {
      /* -------------------------------------- VALIDATION -------------------------------------- */
      if (!input) {
        elementOne.innerHTML = "image required";
        elementTwo.innerHTML = "failed";
        return;
      }
      const extension = fileExtension(input.name);
      if (extension != "JPEG" && extension != "JPG") {
        elementOne.innerHTML = "file must be either jpeg or jpg";
        elementTwo.innerHTML = "failed";
        return;
      } else {
        // IF FILE IS VALID
        elementOne.classList.add("setting_profile_valid");
        elementOne.innerHTML = "valid";
        loadLoader(elementsTwo).then(() => {
          /* ------------------------------------- FORM DATA -------------------------------------- */
          const formElement = document.querySelector(
            "#profile_settings_profile_upload_picture_form"
          );
          const formData = new FormData(formElement);
          /* ------------------------------------ UPLOAD FILE ------------------------------------- */
          $.ajax({
            type: "POST",
            url: "/upload/profile-picture",
            processData: false,
            contentType: false,
            data: formData,
            success: data => {
              if (data.status == "success") {
                elementTwo.classList.add("button_one_success");
                elementTwo.innerHTML = "success";
                profileSettingsProfileDisplayProfilePicture(data.content);
              }
            }
          });
        });
      }
    }, 1000);
  });
};

/* ================================== DISPLAY PROFILE PICTURE =================================== */

const profileSettingsProfileDisplayProfilePicture = profile => {
  const id = profile.profilePicture.id;
  const html = `<img src='/profile-picture/${id}' alt='profile_picture' class='profile_settings_profile_picture'>`;
  document.querySelector(
    "#profile_settings_profile_picture_body"
  ).innerHTML = html;
};

/* ============================================================================================== */
