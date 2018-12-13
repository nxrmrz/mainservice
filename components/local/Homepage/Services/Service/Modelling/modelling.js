/* ======================================= INITIALISATION ======================================= */

const homepage3DModellingServiceInit = () => {
  constructhHomepage3DModellingServiceModalObjects();
  homepage3DModellingServiceButtonClickListener();
};

/* =================================== BUTTON CLICK LISTENER ==================================== */

const homepage3DModellingServiceButtonClickListener = () => {
  document
    .querySelector("#homepage_3d_modelling_content_button")
    .addEventListener("click", () => {
      addModal(
        homepage3DModellingServiceModalElementObject,
        homepage3DModellingServiceModalCSSObject
      );
    });
};

/* ====================================== MODAL PROPERTIES ====================================== */

// ELEMENTS
const homepage3DModellingServiceModalId = "modelling";
const homepage3DModellingServiceModalHeader = "3D Modelling Service";
const homepage3DModellingServiceModalFooter = "";
let homepage3DModellingServiceModalElementObject;

// CSS
const homepage3DModellingServiceModalBodyHeight = 90;
const homepage3DModellingServiceModalBodyWidth = 90;
const homepage3DModellingServiceModalFooterHeight = 10;
let homepage3DModellingServiceModalCSSObject;

const constructhHomepage3DModellingServiceModalObjects = () => {
  homepage3DModellingServiceModalElementObject = new modalElementObject(
    homepage3DModellingServiceModalId,
    homepage3DModellingServiceModalHeader,
    homepage3DModellingServiceModalFooter
  );

  homepage3DModellingServiceModalCSSObject = new modalCSSObject(
    homepage3DModellingServiceModalBodyWidth,
    homepage3DModellingServiceModalBodyHeight,
    homepage3DModellingServiceModalFooterHeight
  );
};
