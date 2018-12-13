// Declare the New Order ABS Object Variable
let orderNewPrintABSObject;

// Create the New Order ABS Object Property
const orderNewPrintABSId = "abs";
const orderNewPrintABSName = "ABS";
const orderNewPrintABSMethod = partNumber => {
  constructOrderNewPrintABSOptionsObject();
  addOrderNewPrintPartChooseOptionsPopulateQualityOption(
    partNumber,
    orderNewPrintABSOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateStrengthOption(
    partNumber,
    orderNewPrintABSOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateColorOption(
    partNumber,
    orderNewPrintABSOptionsObject
  );
};

// Construct the New Order ABS Object
const constructOrderNewPrintABSObject = () => {
  orderNewPrintABSObject = new OrderNewPrintMaterialObject(
    orderNewPrintABSId,
    orderNewPrintABSName,
    orderNewPrintABSMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let orderNewPrintABSOptionsObject = "";

const constructOrderNewPrintABSOptionsObject = () => {
  constructOrderNewPrintABSOptionsQualityDefaultValuesObject();
  constructOrderNewPrintABSOptionsStrengthDefaultValuesObject();
  constructOrderNewPrintABSOptionsColorsObjectArray();

  orderNewPrintABSOptionsObject = new OrderNewPrintMaterialOptionsObject(
    orderNewPrintABSId,
    orderNewPrintABSName,
    orderNewPrintABSOptionsQualityDefaultValuesObjectArray,
    orderNewPrintABSOptionsDefaultQualityValue,
    orderNewPrintABSOptionsStrengthDefaultValuesObjectArray,
    orderNewPrintABSOptionsDefaultStrengthValue,
    orderNewPrintABSOptionsColorsObjectArray,
    orderNewPrintABSOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let orderNewPrintABSOptionsColorsObjectArray = [];
const orderNewPrintABSOptionsDefaultColorValue = "No Preference";

const orderNewPrintABSOptionsColorIdsArray = [
  "no_preference",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const orderNewPrintABSOptionsColorNamesArray = [
  "No Preference",
  "Black",
  "White",
  "Gray",
  "Red",
  "Blue"
];

const orderNewPrintABSOptionsColorStylesArray = [
  "none",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const constructOrderNewPrintABSOptionsColorsObjectArray = () => {
  for (i = 0; i < orderNewPrintABSOptionsColorIdsArray.length; i++) {
    const orderNewPrintABSOptionsColorsObject = new OrderNewPrintMaterialOptionsColorObject(
      orderNewPrintABSOptionsColorIdsArray[i],
      orderNewPrintABSOptionsColorNamesArray[i],
      orderNewPrintABSOptionsColorStylesArray[i]
    );

    orderNewPrintABSOptionsColorsObjectArray[
      i
    ] = orderNewPrintABSOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let orderNewPrintABSOptionsQualityDefaultValuesObjectArray = [];
const orderNewPrintABSOptionsDefaultQualityValue = "Normal";

const absQualityOptionsIdArray = ["normal", "high", "very high"];
const absQualityOptionsNameArray = ["Normal", "High", "Very High"];
const absQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructOrderNewPrintABSOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < absQualityOptionsIdArray.length; i++) {
    const orderNewPrintABSOptionsQualityDefaultValuesObject = new OrderNewPrintMaterialOptionsQualityDefaultValuesObject(
      absQualityOptionsIdArray[i],
      absQualityOptionsNameArray[i],
      absQualityOptionsZResolutionArray[i]
    );

    orderNewPrintABSOptionsQualityDefaultValuesObjectArray[
      i
    ] = orderNewPrintABSOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let orderNewPrintABSOptionsStrengthDefaultValuesObjectArray = [];
const orderNewPrintABSOptionsDefaultStrengthValue = "Normal";

const absStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const absStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const absStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const absStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructOrderNewPrintABSOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < absStrengthOptionsIdArray.length; i++) {
    const orderNewPrintABSOptionsStrengthDefaultValuesObject = new OrderNewPrintMaterialOptionsStrengthDefaultValuesObject(
      absStrengthOptionsIdArray[i],
      absStrengthOptionsNameArray[i],
      absStrengthOptionsInfillArray[i],
      absStrengthOptionsWallThicknessArray[i]
    );

    orderNewPrintABSOptionsStrengthDefaultValuesObjectArray[
      i
    ] = orderNewPrintABSOptionsStrengthDefaultValuesObject;
  }
};
