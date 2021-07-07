/* ======================================= INITIALISATION ======================================= */

const homepageServicesMarketplaceInit = () => {
  homepageServicesMarketplaceEventListener();
};

/* ======================================= EVENT LISTENER ======================================= */

const homepageServicesMarketplaceEventListener = () => {
  document
    .querySelector("#homepage_marketplace_content_button")
    .addEventListener("click", () => {
      homepageServicesMarketplaceModal();
    });
};

/* =========================================== MODAL ============================================ */

const homepageServicesMarketplaceModal = () => {
  // ELEMENTS
  const modalId = "marketplace";
  const modalHeader = "Marketplace";
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

  homepageServicesMarketplaceTemporaryMessage();
};

/* ===================================== TEMPORARY MESSAGE ====================================== */

const homepageServicesMarketplaceTemporaryMessage = () => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    "<div class='homepage_services_temporary_message_contents'>" +
    "<div class='homepage_services_temporary_message_body'>" +
    "<div class='homepage_services_temporary_message_heading'>TEMPORARY</div>" +
    "</div>" +
    "<div class='homepage_services_temporary_message_body'>" +
    "<div class='homepage_services_temporary_message'>Marketplace is currently being developed and is unavailable for use. For questions, feel free to contact us at founder.delta3dprinting@gmail.com</div>" +
    "</div>" +
    "</div>";
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector("#marketplace_modal_body").innerHTML = html;
};

/* ============================================================================================== */
