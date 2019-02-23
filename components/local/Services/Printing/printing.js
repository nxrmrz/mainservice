/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  servicesPrintingPlaceAnOrder();
};

/* ======================================= PLACE AN ORDER ======================================= */

const servicesPrintingPlaceAnOrder = () => {
  document
    .querySelector("#services_printing_place_an_order")
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

/* ============================================================================================== */
