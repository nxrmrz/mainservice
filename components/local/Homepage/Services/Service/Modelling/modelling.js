/* ======================================= INITIALISATION ======================================= */

const homepageServicesModellingInit = () => {
  homepageServicesModellingEventListener();
};

/* ======================================= EVENT LISTENER ======================================= */

const homepageServicesModellingEventListener = () => {
  document
    .querySelector("#homepage_3d_modelling_content_button")
    .addEventListener("click", () => {
      homepageServicesModellingModal();
    });
};

/* =========================================== MODAL ============================================ */

const homepageServicesModellingModal = () => {
  // ELEMENTS
  const modalId = "modelling";
  const modalHeader = "3D Modelling";
  const modalFooter = "";
  const modalElementObject = new ModalElementObject(
    modalId,
    modalHeader,
    modalFooter
  );
  // CSS
  const modalHeight = 50;
  const modalWidth = 80;
  const modalDesktopHeight = 40;
  const modalDesktopWidth = 40;
  let modalFooterHeight;
  if (modalFooter) {
    modalFooterHeight = 14;
  } else {
    modalFooterHeight = 0;
  }
  const modalCSSObject = new ModalCSSObject(
    modalHeight,
    modalWidth,
    modalDesktopHeight,
    modalDesktopWidth,
    modalFooterHeight
  );

  addModal(modalElementObject, modalCSSObject);

  homepageServicesModellingTemporaryMessage();
};

/* ===================================== TEMPORARY MESSAGE ====================================== */

const homepageServicesModellingTemporaryMessage = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='homepage_services_temporary_message_contents'>" +
    "<div class='homepage_services_temporary_message_heading_body'>" +
    "<div class='homepage_services_temporary_message_heading'>TEMPORARY</div>" +
    "</div>" +
    "<div class='homepage_services_temporary_message_body'>" +
    "<div class='homepage_services_temporary_message'>We are currently developing the 3D Modelling Service. If you are seeking design consultation or want us to design a particular 3D model, contact us at founder.delta3dprinting@gmail.com</div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#modelling_modal_body").innerHTML = html;
};

/* ============================================================================================== */
