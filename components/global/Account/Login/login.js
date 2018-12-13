/* ======================================= INITIALISATION ======================================= */

const addLoginModal = () => {
  constructhLoginModalObjects();
  addModal(loginModalElementObject, loginModalCSSObject);
  constructLoginModal();
  loginModalFooterFunctions();
};

/* ====================================== MODAL PROPERTIES ====================================== */

// ELEMENTS
const loginModalId = "login";
const loginModalHeader = "Login";
const loginModalFooter =
  "<div class='modal_account_statement_body'>" +
  "<div id='modal_login_signup_statement_text_link' class='modal_account_statement_text modal_account_statement_text_link'>Signup</div>" +
  "<div class='modal_account_statement_text modal_account_statement_text_normal'>if you are new</div>" +
  "</div>";
let loginModalElementObject;
// CSS
const loginModalMobileHeight = 40;
const loginModalMobileWidth = 80;
const loginModalDesktopHeight = 30;
const loginModalDesktopWidth = 50;
const loginModalFooterHeight = 8;
let loginModalCSSObject;

const constructhLoginModalObjects = () => {
  loginModalElementObject = new modalElementObject(
    loginModalId,
    loginModalHeader,
    loginModalFooter
  );

  loginModalCSSObject = new modalCSSObject(
    loginModalMobileHeight,
    loginModalMobileWidth,
    loginModalDesktopHeight,
    loginModalDesktopWidth,
    loginModalFooterHeight
  );
};

/* ================================== ADD LOGIN MODAL CONTENTS ================================== */

const constructLoginModal = () => {
  // Create the Login Form HTML
  const loginModalHTML =
    "<div id='modal_login_form_body' class='modal_account_form_body'>" +
    "<form id='modal_login_form' class='modal_account_form' action='/users/login' method='POST' onsubmit=''>" +
    "<div class='modal_login_input_field modal_account_input_field'>" +
    "<div class='modal_login_input_field_header modal_account_input_field_header'>Email</div>" +
    "<div class='modal_login_input_body modal_account_input_body'>" +
    "<input type='email' name='email' id='modal_login_email_input' class='modal_login_input modal_account_input'>" +
    "</div>" +
    "</div>" +
    "<div class='modal_login_input_field modal_account_input_field'>" +
    "<div id='modal_login_password_input_field_header' class='modal_login_input_field_header modal_account_input_field_header'>Password</div>" +
    "<div id='modal_login_password_input_body' class='modal_login_input_body modal_account_input_body'>" +
    "<input type='password' name='password' id='modal_login_password_input' class='modal_login_input modal_account_input'>" +
    "</div>" +
    "</div>" +
    "<div class='form_submit_button_body'>" +
    "<button class='form_submit_button'>LOGIN</button>" +
    "</div>" +
    "</form>" +
    "</div>";

  document.querySelector("#login_modal_body").innerHTML = loginModalHTML;
};

/* ====================================== FOOTER FUNCTIONS ====================================== */

const loginModalFooterFunctions = () => {
  document
    .querySelector("#modal_login_signup_statement_text_link")
    .addEventListener("click", () => {
      removeBackdrop(loginModalId);
      removeModal(loginModalId);
      addSignupModal();
    });
};

/* ============================================================================================== */
