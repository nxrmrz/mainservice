/* ====================================== DISPLAY MESSAGE ======================================= */

/* --------------------------------- MESSAGE OBJECT CONSTRUCTOR --------------------------------- */

class MessageObject {
  constructor(elementId, message) {
    this.elementId = elementId;
    this.message = message;
  }
}

/* ------------------------------------------ FUNCTION ------------------------------------------ */

const displayMessage = objArr => {
  objArr.forEach(obj => {
    const elementId = obj.elementId;
    const message = obj.message;

    document.querySelector("#" + elementId).innerHTML = message;
  });
};

/* ============================================================================================== */
