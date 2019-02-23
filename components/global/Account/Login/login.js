/* ======================================= INITIALISATION ======================================= */

const addLoginModal = () => {
  loginModal();
  loginModalStructure();
};

/* ====================================== MODAL PROPERTIES ====================================== */

const loginModal = () => {
  // ELEMENTS

  const modalId = "login";
  const modalHeader = "Login";
  const modalFooter =
    "<div class='modal_account_statement_body'>" +
    "<a href='/registration' id='modal_login_signup_statement_text_link' class='modal_account_statement_text modal_account_statement_text_link'>Signup</a>" +
    "<div class='modal_account_statement_text modal_account_statement_text_normal'>if you are new</div>" +
    "</div>";

  const modalElementObject = new ModalElementObject(
    modalId,
    modalHeader,
    modalFooter
  );

  // CSS
  const modalMobileHeight = 45;
  const modalMobileWidth = 80;
  const modalDesktopHeight = 40;
  const modalDesktopWidth = 40;
  const modalFooterHeight = 8;

  const modalCSSObject = new ModalCSSObject(
    modalMobileHeight,
    modalMobileWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );

  addModal(modalElementObject, modalCSSObject);
};

/* ================================== ADD LOGIN MODAL CONTENTS ================================== */

const loginModalStructure = () => {
  // Create the Login Form HTML
  const loginModalHTML =
    "<div id='modal_login_form_body' class='modal_account_form_body'>" +
    "<form id='modal_login_form' class='modal_account_form' action='/users/login' method='POST'>" +
    "<div class='modal_login_input_field modal_account_input_field'>" +
    "<div class='modal_login_input_field_header modal_account_input_field_header'>Email</div>" +
    "<div class='modal_login_input_body modal_account_input_body'>" +
    "<input type='email' name='email' id='modal_login_email_input' class='modal_login_input modal_account_input' />" +
    "</div>" +
    "</div>" +
    "<div class='modal_login_input_field modal_account_input_field'>" +
    "<div id='modal_login_password_input_field_header' class='modal_login_input_field_header modal_account_input_field_header'>Password</div>" +
    "<div id='modal_login_password_input_body' class='modal_login_input_body modal_account_input_body'>" +
    "<input type='password' name='password' id='modal_login_password_input' class='modal_login_input modal_account_input' autocomplete='new-password' />" +
    "</div>" +
    "</div>" +
    "<div class='form_submit_button_body'>" +
    "<button class='form_submit_button'>LOGIN</button>" +
    "</div>" +
    "</form>" +
    "</div>";

  document.querySelector("#login_modal_body").innerHTML = loginModalHTML;
};

/* ============================================================================================== */
