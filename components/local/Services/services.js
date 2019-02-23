/* ======================================= INITIALISATION ======================================= */

window.onload = () => {
  globalInit();
  servicesPlaceAnOrder();
};

/* ======================================= PLACE AN ORDER ======================================= */

const servicesPlaceAnOrder = () => {
  document
    .querySelector("#services_place_an_order")
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
