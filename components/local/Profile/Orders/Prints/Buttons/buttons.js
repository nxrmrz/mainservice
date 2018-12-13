const profileOrdersPrintsButtonsInit = () => {
  addProfileOrdersPrintsButtonBody();
  addProfileOrdersPrintsNewOrderButton();
};

/* ====================== Construct the Buttons Container ====================== */
const addProfileOrdersPrintsButtonBody = () => {
  const profileOrdersPrintsButtonBodyHTML =
    "<div id='profile_orders_prints_buttons_body'></div>";
  document
    .querySelector("#profile_orders_prints_body")
    .insertAdjacentHTML("beforeend", profileOrdersPrintsButtonBodyHTML);
};

/* ====================== Construct the Start a New Order ====================== */
const addProfileOrdersPrintsNewOrderButton = () => {
  const profileOrdersPrintsNewOrderButtonBodyHTML =
    "<div id='profile_orders_prints_new_order_button_body' class='profile_orders_prints_button_body'>" +
    "<div id='profile_orders_prints_new_order_button_image' class='profile_orders_prints_button_image'></div>" +
    "<div id='profile_orders_prints_new_order_button_text' class='profile_orders_prints_button_text'>Add New Order</div>" +
    "</div>";
  document
    .querySelector("#profile_orders_prints_buttons_body")
    .insertAdjacentHTML("beforeend", profileOrdersPrintsNewOrderButtonBodyHTML);

  document
    .querySelector("#profile_orders_prints_new_order_button_body")
    .addEventListener("click", () => {
      orderNewPrint();
    });
};
