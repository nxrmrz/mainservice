/* ======================================== ADDRESS AUTOCOMPLETE ======================================== */

let addressAutocomplete;
const addressComponentsObject = {
  street_number: "long_name",
  route: "long_name",
  sublocality_level_1: "long_name",
  locality: "long_name",
  postal_code: "long_name",
  country: "long_name"
};

const addressAutocompleteInit = (inputElement, fillInAddress) => {
  const options = {
    componentRestrictions: { country: "NZ" }
  };

  addressAutocomplete = new google.maps.places.Autocomplete(
    inputElement,
    options
  );

  addressAutocomplete.addListener("place_changed", fillInAddress);
};

/* ====================================================================================================== */
