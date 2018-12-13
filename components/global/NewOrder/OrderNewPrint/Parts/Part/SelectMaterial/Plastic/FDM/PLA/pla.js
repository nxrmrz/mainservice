// Declare the New Order PLA Object Variable
let orderNewPrintPLAObject;

// Create the New Order PLA Object Property
const orderNewPrintPLAId = "pla";
const orderNewPrintPLAName = "PLA";
const orderNewPrintPLAMethod = partNumber => {
  constructOrderNewPrintPLAOptionsObject();
  addOrderNewPrintPartChooseOptionsPopulateQualityOption(
    partNumber,
    orderNewPrintPLAOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateStrengthOption(
    partNumber,
    orderNewPrintPLAOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateColorOption(
    partNumber,
    orderNewPrintPLAOptionsObject
  );
};

// Construct the New Order PLA Object
const constructOrderNewPrintPLAObject = () => {
  orderNewPrintPLAObject = new OrderNewPrintMaterialObject(
    orderNewPrintPLAId,
    orderNewPrintPLAName,
    orderNewPrintPLAMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let orderNewPrintPLAOptionsObject = "";

const constructOrderNewPrintPLAOptionsObject = () => {
  constructOrderNewPrintPLAOptionsQualityDefaultValuesObject();
  constructOrderNewPrintPLAOptionsStrengthDefaultValuesObject();
  constructOrderNewPrintPLAOptionsColorsObjectArray();

  orderNewPrintPLAOptionsObject = new OrderNewPrintMaterialOptionsObject(
    orderNewPrintPLAId,
    orderNewPrintPLAName,
    orderNewPrintPLAOptionsQualityDefaultValuesObjectArray,
    orderNewPrintPLAOptionsDefaultQualityValue,
    orderNewPrintPLAOptionsStrengthDefaultValuesObjectArray,
    orderNewPrintPLAOptionsDefaultStrengthValue,
    orderNewPrintPLAOptionsColorsObjectArray,
    orderNewPrintPLAOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let orderNewPrintPLAOptionsColorsObjectArray = [];
const orderNewPrintPLAOptionsDefaultColorValue = "No Preference";

const orderNewPrintPLAOptionsColorIdsArray = [
  "no_preference",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const orderNewPrintPLAOptionsColorNamesArray = [
  "No Preference",
  "Black",
  "White",
  "Gray",
  "Red",
  "Blue"
];

const orderNewPrintPLAOptionsColorStylesArray = [
  "none",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const constructOrderNewPrintPLAOptionsColorsObjectArray = () => {
  for (i = 0; i < orderNewPrintPLAOptionsColorIdsArray.length; i++) {
    const orderNewPrintPLAOptionsColorsObject = new OrderNewPrintMaterialOptionsColorObject(
      orderNewPrintPLAOptionsColorIdsArray[i],
      orderNewPrintPLAOptionsColorNamesArray[i],
      orderNewPrintPLAOptionsColorStylesArray[i]
    );

    orderNewPrintPLAOptionsColorsObjectArray[
      i
    ] = orderNewPrintPLAOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let orderNewPrintPLAOptionsQualityDefaultValuesObjectArray = [];
const orderNewPrintPLAOptionsDefaultQualityValue = "Normal";

const plaQualityOptionsIdArray = ["normal", "high", "very high"];
const plaQualityOptionsNameArray = ["Normal", "High", "Very High"];
const plaQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructOrderNewPrintPLAOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < plaQualityOptionsIdArray.length; i++) {
    const orderNewPrintPLAOptionsQualityDefaultValuesObject = new OrderNewPrintMaterialOptionsQualityDefaultValuesObject(
      plaQualityOptionsIdArray[i],
      plaQualityOptionsNameArray[i],
      plaQualityOptionsZResolutionArray[i]
    );

    orderNewPrintPLAOptionsQualityDefaultValuesObjectArray[
      i
    ] = orderNewPrintPLAOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let orderNewPrintPLAOptionsStrengthDefaultValuesObjectArray = [];
const orderNewPrintPLAOptionsDefaultStrengthValue = "Normal";

const plaStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const plaStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const plaStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const plaStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructOrderNewPrintPLAOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < plaStrengthOptionsIdArray.length; i++) {
    const orderNewPrintPLAOptionsStrengthDefaultValuesObject = new OrderNewPrintMaterialOptionsStrengthDefaultValuesObject(
      plaStrengthOptionsIdArray[i],
      plaStrengthOptionsNameArray[i],
      plaStrengthOptionsInfillArray[i],
      plaStrengthOptionsWallThicknessArray[i]
    );

    orderNewPrintPLAOptionsStrengthDefaultValuesObjectArray[
      i
    ] = orderNewPrintPLAOptionsStrengthDefaultValuesObject;
  }
};
