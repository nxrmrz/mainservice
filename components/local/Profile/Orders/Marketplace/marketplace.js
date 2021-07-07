// Profile Orders Marketplace Object
let profileOrdersMarketplaceObject;

// Profile Orders Marketplace Object Properties
const profileOrdersMarketplaceId = "marketplace";
const profileOrdersMarketplaceName = "Marketplace";
const profileOrdersMarketplaceInit = () => {};

// Contruct Profile Orders Marketplace Object
const contructProfileOrdersMarketplaceObject = () => {
  profileOrdersMarketplaceObject = new profileOrdersComponentObject(
    profileOrdersMarketplaceId,
    profileOrdersMarketplaceName,
    profileOrdersMarketplaceMethod
  );
};
