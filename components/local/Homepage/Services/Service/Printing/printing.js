/* ========================== HOMEPAGE: SERVICES: 3D PRINTING SERVICE ========================== */

const homepage3DPrintingServiceInit = () => {
  homepageServicesPrintingGetAQuote();
};

/* ======================================== GET A QUOTE ======================================== */

const homepageServicesPrintingGetAQuote = () => {
  document
    .querySelector("#homepage_3d_printing_content_button")
    .addEventListener("click", () => {
      loginStatus()
        .then(() => {
          orderNewPrint();
        })
        .catch(() => {
          addLoginModal();
        });
    });
};

/* ============================================================================================= */
