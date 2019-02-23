/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  globalInit();
};

/* ===================================== SIGNUP VALIDATION ====================================== */

const signupValidation = () => {
  if (
    !signupUsernameValid ||
    !signupEmailValid ||
    !signupPasswordValid ||
    !signupConfirmPasswordValid ||
    !signupFirstNameValid ||
    !signupLastNameValid ||
    !signupStreetAddressValid ||
    !signupSuburbValid ||
    !signupCityPostcodeValid ||
    !signupCountryValid
  ) {
    signupUsernameValidation();
    signupEmailValidation();
    signupPasswordValidation();
    signupConfirmPasswordValidation();
    signupFirstNameValidation();
    signupLastNameValidation();
    signupStreetAddressValidation();
    signupSuburbValidation();
    signupCityPostcodeValidation();
    signupCountryValidation();

    return false;
  }

  return true;
};

/* ------------------------------------ USERNAME VALIDATION ------------------------------------- */

let signupUsernameValidationTimeout;
let signupUsernameValid = false;

const signupUsernameValidation = () => {
  // RESET VARIABLES
  signupUsernameValid = false;
  clearTimeout(signupUsernameValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_signup_username_error");
  const elements = [element];
  // Input Values
  const username = document.querySelector("#registration_signup_username_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupUsernameValidationTimeout = setTimeout(() => {
      if (!username) {
        // Check if Username is Empty
        element.innerHTML = "username required";
      } else if (!validateUsername(username)) {
        // Check if Username is in the Right Format
        element.innerHTML = "invalid username";
      } else {
        // Check Database for Username Availability
        $.ajax({
          type: "POST",
          url: "/validate/username",
          contentType: "application/json",
          data: JSON.stringify({ username }),
          success: data => {
            if (data.content == "Valid") {
              // If Username is Already Taken
              element.innerHTML = "username is already taken";
            } else if (data.content == "404: No User Found") {
              // If it Passes Validation
              element.innerHTML = "valid";
              element.classList.add("registration_valid");
              signupUsernameValid = true;
            }
          }
        });
      }
    }, 1000);
  });
};

/* -------------------------------------- EMAIL VALIDATION -------------------------------------- */

let signupEmailValidationTimeout;
let signupEmailValid = false;

const signupEmailValidation = () => {
  // RESET VARIABLES
  signupEmailValid = false;
  clearTimeout(signupEmailValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_signup_email_error");
  const elements = [element];
  // Input Values
  const email = document.querySelector("#registration_signup_email_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupEmailValidationTimeout = setTimeout(() => {
      if (!email) {
        // Check if Email is Empty
        element.innerHTML = "email required";
      } else if (!validateEmail(email)) {
        // Check if Email is in the Right Format
        element.innerHTML = "invalid email";
      } else {
        // Check Database for Email Availability
        $.ajax({
          type: "POST",
          url: "/validate/email",
          contentType: "application/json",
          data: JSON.stringify({ email }),
          success: data => {
            if (data.content == "Valid") {
              // If Email is Already Taken
              element.innerHTML = "email is already taken";
            } else if (data.content == "404: No User Found") {
              // If it Passes Validation
              element.innerHTML = "valid";
              element.classList.add("registration_valid");
              signupEmailValid = true;
            }
          }
        });
      }
    }, 1000);
  });
};

/* ------------------------------------ PASSWORD VALIDATION ------------------------------------- */

let signupPasswordValidationTimeout;
let signupPasswordValid = false;

const signupPasswordValidation = () => {
  // RESET VARIABLES
  signupPasswordValid = false;
  clearTimeout(signupPasswordValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_signup_password_error");
  const elements = [element];
  // Input Values
  const password = document.querySelector("#registration_signup_password_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupPasswordValidationTimeout = setTimeout(() => {
      if (!password) {
        // Check if Password is Empty
        element.innerHTML = "password required";
      } else if (!validatePassword(password)) {
        // Check if Password Qualifies
        element.innerHTML = "invalid password:";
        // Check for First Letter Capital
        if (!valiateFirstStringCapital(password)) {
          element.insertAdjacentHTML(
            "beforeend",
            "<br>first letter must be capital"
          );
        }
        if (!validateDigit(password)) {
          element.insertAdjacentHTML(
            "beforeend",
            "<br>include at least 1 number"
          );
        }
        if (!validateMinimumEightStringLength(password)) {
          element.insertAdjacentHTML(
            "beforeend",
            "<br>must be at least 8 characters long"
          );
        }
        if (valiateSpecialCharacter(password)) {
          element.insertAdjacentHTML(
            "beforeend",
            "<br>must be comprised of letter(s) and number(s)"
          );
        }
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupPasswordValid = true;
      }
    }, 1000);
  });
};

/* -------------------------------- CONFIRM PASSWORD VALIDATION --------------------------------- */

let signupConfirmPasswordValidationTimeout;
let signupConfirmPasswordValid = false;

const signupConfirmPasswordValidation = () => {
  // RESET VARIABLES
  signupConfirmPasswordValid = false;
  clearTimeout(signupConfirmPasswordValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#registration_signup_confirm_password_error"
  );
  const elements = [element];
  // Input Values
  const password = document.querySelector("#registration_signup_password_input")
    .value;
  const confirmPassword = document.querySelector(
    "#registration_signup_confirm_password_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupConfirmPasswordValidationTimeout = setTimeout(() => {
      if (!signupPasswordValid) {
        // Check if Valid Password is Provided
        element.innerHTML = "valid password required";
      } else if (!confirmPassword) {
        // Check if Confirm Password is Empty
        element.innerHTML = "confirm password required";
      } else if (confirmPassword != password) {
        // Check if Passwords Match
        element.innerHTML = "passwords does not match";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupConfirmPasswordValid = true;
      }
    }, 1000);
  });
};

/* ----------------------------------------- FIRST NAME ----------------------------------------- */

let signupFirstNameValidationTimeout;
let signupFirstNameValid = false;

const signupFirstNameValidation = () => {
  // RESET VARIABLES
  signupFirstNameValid = false;
  clearTimeout(signupFirstNameValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#registration_signup_first_name_error"
  );
  const elements = [element];
  // Input Values
  const firstName = document.querySelector(
    "#registration_signup_first_name_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupFirstNameValidationTimeout = setTimeout(() => {
      if (!firstName) {
        // Check if First Name is Empty
        element.innerHTML = "first name required";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupFirstNameValid = true;
      }
    }, 1000);
  });
};

/* ----------------------------------------- LAST NAME ------------------------------------------ */

let signupLastNameValidationTimeout;
let signupLastNameValid = false;

const signupLastNameValidation = () => {
  // RESET VARIABLES
  signupLastNameValid = false;
  clearTimeout(signupLastNameValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#registration_signup_last_name_error"
  );
  const elements = [element];
  // Input Values
  const lastName = document.querySelector(
    "#registration_signup_last_name_input"
  ).value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupLastNameValidationTimeout = setTimeout(() => {
      if (!lastName) {
        // Check if Last Name is Empty
        element.innerHTML = "last name required";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupLastNameValid = true;
      }
    }, 1000);
  });
};

/* --------------------------------------- STREET ADDRESS --------------------------------------- */

let signupStreetAddressValidationTimeout;
let signupStreetAddressValid = false;

const signupStreetAddressValidation = () => {
  // RESET VARIABLES
  signupStreetAddressValid = false;
  clearTimeout(signupStreetAddressValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#registration_signup_street_address_error"
  );
  const elements = [element];
  // Input Values
  const streetNumber = document.querySelector(
    "#registration_signup_street_number_input"
  ).value;
  const route = document.querySelector("#registration_signup_route_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupStreetAddressValidationTimeout = setTimeout(() => {
      if (!streetNumber) {
        // Check if Street Number is Empty
        if (!route) {
          // Check if Street Number AND Route are Empty
          element.innerHTML = "street number and route required";
        } else {
          // If Only Street Number is Empty
          element.innerHTML = "street number required";
        }
      } else if (!route) {
        // Check if Route is Empty
        element.innerHTML = "route required";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupStreetAddressValid = true;
      }
    }, 1000);
  });
};

/* ------------------------------------------- SUBURB ------------------------------------------- */

let signupSuburbValidationTimeout;
let signupSuburbValid = false;

const signupSuburbValidation = () => {
  // RESET VARIABLES
  signupSuburbValid = false;
  clearTimeout(signupSuburbValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_signup_suburb_error");
  const elements = [element];
  // Input Values
  const suburb = document.querySelector("#registration_signup_suburb_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupSuburbValidationTimeout = setTimeout(() => {
      if (!suburb) {
        // Check if Suburb is Empty
        element.innerHTML = "suburb required";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupSuburbValid = true;
      }
    }, 1000);
  });
};

/* --------------------------------------- CITY POSTCODE ---------------------------------------- */

let signupCityPostcodeValidationTimeout;
let signupCityPostcodeValid = false;

const signupCityPostcodeValidation = () => {
  // RESET VARIABLES
  signupCityPostcodeValid = false;
  clearTimeout(signupCityPostcodeValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector(
    "#registration_signup_city_postcode_error"
  );
  const elements = [element];
  // Input Values
  const city = document.querySelector("#registration_signup_city_input").value;
  const postcode = document.querySelector("#registration_signup_postcode_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupCityPostcodeValidationTimeout = setTimeout(() => {
      if (!city) {
        // Check if City is Empty
        if (!postcode) {
          // Check if City AND Route are Empty
          element.innerHTML = "city and postcode required";
        } else {
          // If Only City is Empty
          element.innerHTML = "city required";
        }
      } else if (!postcode) {
        // Check if Route is Empty
        element.innerHTML = "postcode required";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupCityPostcodeValid = true;
      }
    }, 1000);
  });
};

/* ------------------------------------------ COUNTRY ------------------------------------------- */

let signupCountryValidationTimeout;
let signupCountryValid = false;

const signupCountryValidation = () => {
  // RESET VARIABLES
  signupCountryValid = false;
  clearTimeout(signupCountryValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_signup_country_error");
  const elements = [element];
  // Input Values
  const country = document.querySelector("#registration_signup_country_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    signupCountryValidationTimeout = setTimeout(() => {
      if (!country) {
        // Check if Suburb is Empty
        element.innerHTML = "country required";
      } else {
        // If it Passes Validation
        element.innerHTML = "valid";
        element.classList.add("registration_valid");
        signupCountryValid = true;
      }
    }, 1000);
  });
};

/* ====================================== LOGIN VALIDATION ====================================== */

const loginValidation = () => {
  if (!loginEmailValid || !loginPasswordValid) {
    loginEmailValidation();
    loginPasswordValidation();
    return false;
  }

  return true;
};

/* -------------------------------------- EMAIL VALIDATION -------------------------------------- */

let loginEmailValidationTimeout;
let loginEmailValid = false;

const loginEmailValidation = () => {
  // RESET VARIABLES
  loginEmailValid = false;
  clearTimeout(loginEmailValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_login_email_error");
  const elements = [element];
  // Input Values
  const email = document.querySelector("#registration_login_email_input").value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    loginEmailValidationTimeout = setTimeout(() => {
      if (!email) {
        // Check if Email is Empty
        element.innerHTML = "email required";
      } else {
        // Check Database for Email Availability
        $.ajax({
          type: "POST",
          url: "/validate/email",
          contentType: "application/json",
          data: JSON.stringify({ email }),
          success: data => {
            if (data.content == "404: No User Found") {
              // If no User Found with that Email
              element.innerHTML = "invalid email";
            } else if (data.content == "Valid") {
              // If it Passes Validation
              element.innerHTML = "valid";
              element.classList.add("registration_valid");
              loginEmailValid = true;
              loginPasswordValidation();
            }
          }
        });
      }
    }, 1000);
  });
};

/* ------------------------------------ PASSWORD VALIDATION ------------------------------------- */

let loginPasswordValidationTimeout;
let loginPasswordValid = false;

const loginPasswordValidation = () => {
  // RESET VARIABLES
  loginPasswordValid = false;
  clearTimeout(loginPasswordValidationTimeout);
  // SET VARIABLES
  const element = document.querySelector("#registration_login_password_error");
  const elements = [element];
  // Input Values
  const email = document.querySelector("#registration_login_email_input").value;
  const password = document.querySelector("#registration_login_password_input")
    .value;
  // RESET CLASS LIST
  element.classList.remove("registration_valid");
  // CREATE LOADER
  loadLoader(elements, "small").then(() => {
    // VALIDATION
    loginPasswordValidationTimeout = setTimeout(() => {
      if (!loginEmailValid) {
        // Check if Valid Email is Provided
        element.innerHTML = "valid email required";
      } else if (!password) {
        // Check if Password is Empty
        element.innerHTML = "password required";
      } else {
        // Check Database for Password Validity
        $.ajax({
          type: "POST",
          url: "/validate/password",
          contentType: "application/json",
          data: JSON.stringify({ email, password }),
          success: data => {
            if (data.status == "failed") {
              // If Password is Incorrect
              element.innerHTML = "invalid password";
            } else if (data.status == "success") {
              // If it Passes Validation
              element.innerHTML = "valid password";
              element.classList.add("registration_valid");
              loginPasswordValid = true;
            }
          }
        });
      }
    }, 1000);
  });
};

/* ============================================================================================== */
