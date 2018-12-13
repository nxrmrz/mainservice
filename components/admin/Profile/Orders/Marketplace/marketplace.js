/* ======================== ADMIN PROFILE ORDER: MARKETPLACE COMPONENTS ========================= */

let adminProfileOrdersMarketplaceObject;

// Profile Orders Marketplace Object Properties
const adminProfileOrdersMarketplaceId = "marketplace";
const adminProfileOrdersMarketplaceName = "Marketplace";

// Contruct Profile Orders Marketplace Object
const contructAdminProfileOrdersMarketplaceObject = () => {
  adminProfileOrdersMarketplaceObject = new adminProfileOrdersComponentObject(
    adminProfileOrdersMarketplaceId,
    adminProfileOrdersMarketplaceName,
    adminProfileOrdersMarketplaceInit
  );
};

/* ======================================= INITIALISATION ======================================= */

const adminProfileOrdersMarketplaceInit = () => {
  console.log("Marketplace");
};

/* ============================================================================================== */
