/* ==================================== MODAL CLASS OBJECT ===================================== */

class ModalElementObject {
  constructor(id, header, footer) {
    this.id = id;
    this.header = header;
    this.footer = footer;
  }
}

class ModalCSSObject {
  constructor(
    mobileBodyHeight,
    mobileBodyWidth,
    desktopBodyHeight,
    desktopBodyWidth,
    footerHeight
  ) {
    this.mobileBodyHeight = mobileBodyHeight;
    this.mobileBodyWidth = mobileBodyWidth;
    this.desktopBodyHeight = desktopBodyHeight;
    this.desktopBodyWidth = desktopBodyWidth;
    this.footerHeight = footerHeight;
  }
}

// Temporary

class modalElementObject {
  constructor(id, header, footer) {
    this.id = id;
    this.header = header;
    this.footer = footer;
  }
}

class modalCSSObject {
  constructor(
    mobileBodyHeight,
    mobileBodyWidth,
    desktopBodyHeight,
    desktopBodyWidth,
    footerHeight
  ) {
    this.mobileBodyHeight = mobileBodyHeight;
    this.mobileBodyWidth = mobileBodyWidth;
    this.desktopBodyHeight = desktopBodyHeight;
    this.desktopBodyWidth = desktopBodyWidth;
    this.footerHeight = footerHeight;
  }
}

/* ========================================= ADD MODAL ========================================== */

const addModal = (elementObject, cssObject) => {
  /* ----------------------------------------- ELEMENT ------------------------------------------ */

  // MODAL HEADER
  const modalHeader =
    "<div id='" +
    elementObject.id +
    "_modal_header' class='modal_header'>" +
    "<p id='" +
    elementObject.id +
    "_modal_header_text' class='modal_header_text'>" +
    elementObject.header +
    "</p>" +
    "</div>";
  // MODAL BODY
  const modalBody =
    "<div id='" + elementObject.id + "_modal_body' class='modal_body'></div>";
  // MODAL FOOTER
  const modalFooter =
    "<div id='" +
    elementObject.id +
    "_modal_footer' class='modal_footer'>" +
    "<div id='" +
    elementObject.id +
    "_modal_footer_contents' class='modal_footer_contents'>" +
    elementObject.footer +
    "</div>" +
    "</div>";
  // MODAL
  const modalHTML =
    "<div id='" +
    elementObject.id +
    "_modal' class='modal'>" +
    modalHeader +
    modalBody +
    modalFooter +
    "</div>";
  // Insert to HTML
  document.querySelector("body").insertAdjacentHTML("beforeend", modalHTML);

  /* ------------------------------------------- CSS -------------------------------------------- */

  setTimeout(() => {
    openModalCSS(elementObject.id, cssObject);
  }, 0);

  /* ----------------------------------------- BACKDROP ----------------------------------------- */

  addBackdrop(elementObject.id, () => {
    removeModal(elementObject.id);
  });
};

/* ======================================== REMOVE MODAL ======================================== */

const removeModal = id => {
  closeModalCSS(id);

  setTimeout(() => {
    document
      .querySelector("body")
      .removeChild(document.querySelector("#" + id + "_modal"));
  }, 500);
};

/* ===================================== OPEN AND CLOSE CSS ===================================== */

const openModalCSS = (id, cssObject) => {
  // Screensize
  const screensize = window.matchMedia("(min-width: 600px)");

  modalScreensizeCSS(id, cssObject, screensize);

  screensize.addListener(() => {
    modalScreensizeCSS(id, cssObject, screensize);
  });
};

const closeModalCSS = id => {
  const modalElement = document.querySelector("#" + id + "_modal");
  const modalHeaderElement = document.querySelector("#" + id + "_modal_header");
  const modalHeaderTextElement = document.querySelector(
    "#" + id + "_modal_header_text"
  );
  const modalBodyElement = document.querySelector("#" + id + "_modal_body");
  const modalFooterElement = document.querySelector("#" + id + "_modal_footer");
  const modalFooterContentsElement = document.querySelector(
    "#" + id + "_modal_footer_contents"
  );

  modalElement.style.width = "0";
  modalElement.style.height = "0";
  modalElement.style.top = "50vh";
  modalElement.style.left = "50vw";

  // Modal Header CSS

  modalHeaderElement.style.height = "0";
  modalHeaderElement.style.width = "0";
  modalHeaderElement.style.top = "50vh";
  modalHeaderElement.style.left = "50vw";
  modalHeaderTextElement.style.opacity = "0";

  // Modal Body CSS

  modalBodyElement.style.opacity = "0";

  // Modal Footer CSS

  modalFooterElement.style.height = "0";
  modalFooterElement.style.width = "0";
  modalFooterElement.style.top = "50vh";
  modalFooterElement.style.left = "50vw";
  modalFooterContentsElement.style.opacity = "0";
};

const modalScreensizeCSS = (id, cssObject, screensize) => {
  // Elements
  const modalElement = document.querySelector("#" + id + "_modal");
  const modalHeaderElement = document.querySelector("#" + id + "_modal_header");
  const modalHeaderTextElement = document.querySelector(
    "#" + id + "_modal_header_text"
  );
  const modalBodyElement = document.querySelector("#" + id + "_modal_body");
  const modalFooterElement = document.querySelector("#" + id + "_modal_footer");
  const modalFooterContentsElement = document.querySelector(
    "#" + id + "_modal_footer_contents"
  );

  if (screensize.matches) {
    const modalTop = (100 - cssObject.desktopBodyHeight) / 2;
    const modalLeft = (100 - cssObject.desktopBodyWidth) / 2;

    // Modal CSS

    modalElement.style.height = cssObject.desktopBodyHeight + "vh";
    modalElement.style.width = cssObject.desktopBodyWidth + "vw";
    modalElement.style.top = modalTop + "vh";
    modalElement.style.left = modalLeft + "vw";
    modalElement.style.paddingTop = "4vmin";
    modalElement.style.paddingBottom = cssObject.footerHeight / 2 + "vmin";

    // Modal Header CSS

    modalHeaderElement.style.height = "4vmin";
    modalHeaderElement.style.width = cssObject.desktopBodyWidth + "vw";
    modalHeaderElement.style.top = modalTop + "vh";
    modalHeaderElement.style.left = modalLeft + "vw";
    modalHeaderTextElement.style.opacity = "1";

    // Modal Body CSS

    modalBodyElement.style.opacity = "1";

    // Modal Footer CSS

    modalFooterElement.style.height = cssObject.footerHeight / 2 + "vmin";
    modalFooterElement.style.width = cssObject.desktopBodyWidth + "vw";
    modalFooterElement.style.top =
      "calc(" +
      (modalTop + cssObject.desktopBodyHeight) +
      "vh - " +
      cssObject.footerHeight / 2 +
      "vmin)";
    modalFooterElement.style.left = modalLeft + "vw";
    modalFooterContentsElement.style.opacity = "1";
  } else {
    const modalTop = (100 - cssObject.mobileBodyHeight) / 2;
    const modalLeft = (100 - cssObject.mobileBodyWidth) / 2;

    // Modal CSS

    modalElement.style.height = cssObject.mobileBodyHeight + "vh";
    modalElement.style.width = cssObject.mobileBodyWidth + "vw";
    modalElement.style.top = modalTop + "vh";
    modalElement.style.left = modalLeft + "vw";
    modalElement.style.paddingTop = "8vmin";
    modalElement.style.paddingBottom = cssObject.footerHeight + "vmin";

    // Modal Header CSS

    modalHeaderElement.style.height = "8vmin";
    modalHeaderElement.style.width = cssObject.mobileBodyWidth + "vw";
    modalHeaderElement.style.top = modalTop + "vh";
    modalHeaderElement.style.left = modalLeft + "vw";
    modalHeaderTextElement.style.opacity = "1";

    // Modal Body CSS

    modalBodyElement.style.opacity = "1";

    // Modal Footer CSS

    modalFooterElement.style.height = cssObject.footerHeight + "vmin";
    modalFooterElement.style.width = cssObject.mobileBodyWidth + "vw";
    modalFooterElement.style.top =
      "calc(" +
      (modalTop + cssObject.mobileBodyHeight) +
      "vh - " +
      cssObject.footerHeight +
      "vmin)";
    modalFooterElement.style.left = modalLeft + "vw";
    modalFooterContentsElement.style.opacity = "1";
  }
};
