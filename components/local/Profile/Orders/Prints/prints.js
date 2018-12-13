// Profile Orders Prints Object
let profileOrdersPrintsObject;

// Profile Orders Prints Object Properties
const profileOrdersPrintsId = "prints";
const profileOrdersPrintsName = "Prints";
const profileOrdersPrintsMethod = () => {
  addProfileOrdersPrintsBody();
  profileOrdersPrintsButtonsInit();
  profileOrdersPrintsOrdersSummaryInit();
};

// Contruct Profile Orders Prints Object
const contructProfileOrdersPrintsObject = () => {
  profileOrdersPrintsObject = new profileOrdersComponentObject(
    profileOrdersPrintsId,
    profileOrdersPrintsName,
    profileOrdersPrintsMethod
  );
};

/* ================= Construct the Profile Orders Prints Body ================== */
const addProfileOrdersPrintsBody = () => {
  const profileOrdersPrintsBodyHTML =
    "<div id='profile_orders_prints_body' class='profile_orders_component_body'></div>";
  document
    .querySelector("#profile_orders_components_body")
    .insertAdjacentHTML("beforeend", profileOrdersPrintsBodyHTML);
};
