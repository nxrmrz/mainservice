/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  globalInit();

  document
    .querySelector("#new_partners_request_partnership_partnership_button")
    .addEventListener("click", () => {
      becomeAPartnerRequestPartnership();
    });

  document
    .querySelector("#apply_for_partnership_partnership_button")
    .addEventListener("click", () => {
      temporaryPartnershipButtonHandler();
    });

  document
    .querySelector("#returning_partners_request_partnership_partnership_button")
    .addEventListener("click", () => {
      becomeAPartnerRequestPartnership();
    });

  document
    .querySelector("#see_calculation_partnership_button")
    .addEventListener("click", () => {
      becomeAPartnerSampleCalculation();
    });
};

/* ==================================== REQUEST PARTNERSHIP ===================================== */

const becomeAPartnerRequestPartnership = () => {
  // CREATE THE MODAL
  becomeAPartnerRequestPartnershipModal();
  // LOADER
  const element = document.querySelector(`#request_partnership_modal_body`);
  const elements = [element];
  loadLoader(elements).then(() => {
    // SEND PARTNERSHIP REQUEST
    $.ajax({
      type: "POST",
      url: "/partnership/request",
      success: data => {
        const status = data.status;
        const content = data.content;
        let message;
        if (status == "success") {
          // IF REQUEST SUCCEEDED
          message =
            "Congratulation! You are now a partner of Delta 3D Printing.";
        } else if (status == "failed") {
          // IF REQUEST FAILED
          if (content == "Not Authenticated") {
            removeBackdrop("request_partnership");
            removeModal("request_partnership");
            return addLoginModal();
          } else if (content == "User is an Admin") {
            message = "You are an admin.";
          } else if (content == "User is a Partner") {
            message = "You are already a partner.";
          } else if (content == "Error when Fetching Orders") {
            message = "";
          } else if (content == "No Order Found") {
            message = "";
          } else if (content == "Error when Fetching Files") {
            message = "";
          } else if (content == "No File Found") {
            message = "";
          } else if (content == "Error Found when Fetching User") {
            message = "";
          } else if (content == "Error Found when Saving New Updates of User") {
            message = "";
          } else if (content == "Request Denied") {
            message =
              "You do not meet the qualification of a partner. If you have never been a partner before, follow Method Two of becoming a partner.";
          }
        }
        // INPUT THE MESSAGE BASED ON REQUEST OUTCOME
        becomeAPartnerRequestPartnershipMessage(message);
      }
    });
  });
};

/* ------------------------------------------- MODAL -------------------------------------------- */

const becomeAPartnerRequestPartnershipModal = () => {
  // ELEMENTS
  const modalId = "request_partnership";
  const modalHeader = "Request Partnership";
  const modalFooter = "";
  const modalElementObject = new ModalElementObject(
    modalId,
    modalHeader,
    modalFooter
  );
  // CSS
  const modalHeight = 50;
  const modalWidth = 80;
  const modalDesktopHeight = 50;
  const modalDesktopWidth = 50;
  const modalFooterHeight = 0;
  const modalCSSObject = new ModalCSSObject(
    modalHeight,
    modalWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );
  // ADD MODAL
  addModal(modalElementObject, modalCSSObject);
};

/* ------------------------------------------ MESSAGE ------------------------------------------- */

const becomeAPartnerRequestPartnershipMessage = message => {
  // CREATE HTML
  const html =
    `<div class="request_partnership_message_body">` +
    `<div class="request_partnership_message">${message}</div>` +
    `</div>`;
  // INSERT HTML
  document.querySelector(`#request_partnership_modal_body`).innerHTML = html;
};

/* ===================================== SAMPLE CALCULATION ===================================== */

const becomeAPartnerSampleCalculation = () => {
  becomeAPartnerSampleCalculationModal();
  becomeAPartnerSampleCalculationContents();
};

/* ------------------------------------------- MODAL -------------------------------------------- */

const becomeAPartnerSampleCalculationModal = () => {
  // ELEMENTS
  const modalId = "sample_calculation";
  const modalHeader = "Sample Calculation";
  const modalFooter = "";
  const modalElementObject = new ModalElementObject(
    modalId,
    modalHeader,
    modalFooter
  );
  // CSS
  const modalHeight = 90;
  const modalWidth = 90;
  const modalDesktopHeight = 90;
  const modalDesktopWidth = 60;
  const modalFooterHeight = 0;
  const modalCSSObject = new ModalCSSObject(
    modalHeight,
    modalWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );
  // ADD MODAL
  addModal(modalElementObject, modalCSSObject);
};

/* ------------------------------------------ CONTENTS ------------------------------------------ */

const becomeAPartnerSampleCalculationContents = () => {
  let months = [];
  let years = [];
  for (let i = 0; i < 7; i++) {
    const date = dateFormatter(
      moment()
        .startOf("months")
        .subtract(i, "months")._d
    );
    months.push(date.month[0]);
    years.push(date.year);
  }
  // CREATE THE HTML
  const html =
    // Current Month's
    `<div class="become_a_partner_sample_calculation_body">` +
    `<div class="become_a_partner_sample_calculation_heading_body">` +
    `<div class="become_a_partner_sample_calculation_heading"><strong>CASE 1</strong>: Current Month's Cumulative Completed Order Value Exceeds $1,000.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_contents">` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[0]
    } ${years[0]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $1,200.00 (Current Month)</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[1]
    } ${years[1]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $300.00 (Previous Month)</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[2]
    } ${years[2]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $0.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[3]
    } ${years[3]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $100.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[4]
    } ${years[4]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $200.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[5]
    } ${years[5]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $120.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[6]
    } ${years[6]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $0.00</div>` +
    `</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_summary">` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">Current Month's</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $1,200.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">Previous Month's</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $300.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">6-Months Average</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $120.00</div>` +
    `</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_details">The user is eligible for partnership as the current month's cumulative order value exceeds $1,000.00</div>` +
    `</div>` +
    // Previous Month's
    `<div class="become_a_partner_sample_calculation_body">` +
    `<div class="become_a_partner_sample_calculation_heading_body">` +
    `<div class="become_a_partner_sample_calculation_heading"><strong>CASE 2</strong>: Previous Month's Cumulative Completed Order Value Exceeds $1,000.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_contents">` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[0]
    } ${years[0]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $500.00 (Current Month)</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[1]
    } ${years[1]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $1,500.00 (Previous Month)</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[2]
    } ${years[2]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $300.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[3]
    } ${years[3]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $400.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[4]
    } ${years[4]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $200.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[5]
    } ${years[5]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $320.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[6]
    } ${years[6]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $600.00</div>` +
    `</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_summary">` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">Current Month's</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $500.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">Previous Month's</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $1,500.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">6-Months Average</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $553.33</div>` +
    `</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_details">The user is eligible for partnership as the previous month's cumulative order value exceeds $1,000.00</div>` +
    `</div>` +
    // Average
    `<div class="become_a_partner_sample_calculation_body">` +
    `<div class="become_a_partner_sample_calculation_heading_body">` +
    `<div class="become_a_partner_sample_calculation_heading"><strong>CASE 3</strong>: 6-Months Average Cumulative Completed Order Value Exceeds $1,000.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_contents">` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[0]
    } ${years[0]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $100.00 (Current Month)</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[1]
    } ${years[1]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $0.00 (Previous Month)</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[2]
    } ${years[2]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $2,000.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[3]
    } ${years[3]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $0.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[4]
    } ${years[4]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $5,000.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[5]
    } ${years[5]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $2,000.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_content">` +
    `<div class="become_a_partner_sample_calculation_content_date">${
      months[6]
    } ${years[6]}</div>` +
    `<div class="become_a_partner_sample_calculation_content_value">-  $2,000.00</div>` +
    `</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_summary">` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">Current Month's</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $100.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">Previous Month's</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $0.00</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_result">` +
    `<div class="become_a_partner_sample_calculation_result_label">6-Months Average</div>` +
    `<div class="become_a_partner_sample_calculation_result_value">-  $1,833.33</div>` +
    `</div>` +
    `</div>` +
    `<div class="become_a_partner_sample_calculation_details">The user is eligible for partnership as the 6-months cumulative order value average exceeds $1,000.00</div>` +
    `</div>`;
  // INSERT THE HTML
  document.querySelector("#sample_calculation_modal_body").innerHTML = html;
};

/* ============================ TEMPORARY PARTNERSHIP BUTTON HANDLER ============================ */

const temporaryPartnershipButtonHandler = () => {
  contructTemporaryPartnershipButtonHandlerModal();
};

/* =========================================== MODAL ============================================ */

/* -------------------------------------- MODAL PROPERTIES -------------------------------------- */

// ELEMENTS
const temporaryPartnershipButtonHandlerModalId =
  "temporary_partnership_button_handler";
const temporaryPartnershipButtonHandlerModalHeader = "***Temporary***";
const temporaryPartnershipButtonHandlerModalFooter = "";
let temporaryPartnershipButtonHandlerModalElementObject;
// CSS
const temporaryPartnershipButtonHandlerModalMobileHeight = 70;
const temporaryPartnershipButtonHandlerModalMobileWidth = 70;
const temporaryPartnershipButtonHandlerModalDesktopHeight = 50;
const temporaryPartnershipButtonHandlerModalDesktopWidth = 50;
const temporaryPartnershipButtonHandlerModalFooterHeight = 0;
let temporaryPartnershipButtonHandlerModalCSSObject;

const contructTemporaryPartnershipButtonHandlerModalProperties = () => {
  temporaryPartnershipButtonHandlerModalElementObject = new modalElementObject(
    temporaryPartnershipButtonHandlerModalId,
    temporaryPartnershipButtonHandlerModalHeader,
    temporaryPartnershipButtonHandlerModalFooter
  );

  temporaryPartnershipButtonHandlerModalCSSObject = new modalCSSObject(
    temporaryPartnershipButtonHandlerModalMobileHeight,
    temporaryPartnershipButtonHandlerModalMobileWidth,
    temporaryPartnershipButtonHandlerModalDesktopHeight,
    temporaryPartnershipButtonHandlerModalDesktopWidth,
    temporaryPartnershipButtonHandlerModalFooterHeight
  );
};

const contructTemporaryPartnershipButtonHandlerModal = () => {
  contructTemporaryPartnershipButtonHandlerModalProperties();
  addModal(
    temporaryPartnershipButtonHandlerModalElementObject,
    temporaryPartnershipButtonHandlerModalCSSObject
  );
  addTemporaryPartnershipButtonHandlerModalContents();
};

/* ======================================= MODAL CONTENTS ======================================= */

const addTemporaryPartnershipButtonHandlerModalContents = () => {
  const temporaryPartnershipButtonHandlerModalContentsHTML =
    "<div id='temporary_partnership_button_handler_modal_contents_body'>" +
    "<div class='temporary_partnership_button_handler_modal_content_body'>" +
    "<div class='temporary_partnership_button_handler_modal_content_text'>" +
    "We are currently developing this section of the website, we apologise for any inconvenience." +
    "</div>" +
    "</div>" +
    "<div class='temporary_partnership_button_handler_modal_content_body'>" +
    "<div class='temporary_partnership_button_handler_modal_content_text'>" +
    "Temporarily, if you are interested with the Partnership Program (or if you have questions), send us an email at founder.delta3dprinting@gmail.com." +
    "</div>" +
    "</div>" +
    "<div class='temporary_partnership_button_handler_modal_content_body'>" +
    "<div class='temporary_partnership_button_handler_modal_content_text'>" +
    "In the email, feel free to include key details and information. We'll quickly get back to you as soon as we process your email." +
    "</div>" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#temporary_partnership_button_handler_modal_body"
  ).innerHTML = temporaryPartnershipButtonHandlerModalContentsHTML;
};

/* ============================================================================================== */
