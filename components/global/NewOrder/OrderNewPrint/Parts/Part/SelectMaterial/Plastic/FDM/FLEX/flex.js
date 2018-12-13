// Declare the New Order FLEX Object Variable
let orderNewPrintFLEXObject;

// Create the New Order FLEX Object Property
const orderNewPrintFLEXId = "flex";
const orderNewPrintFLEXName = "FLEX";
const orderNewPrintFLEXMethod = partNumber => {
  constructOrderNewPrintFLEXOptionsObject();
  addOrderNewPrintPartChooseOptionsPopulateQualityOption(
    partNumber,
    orderNewPrintFLEXOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateStrengthOption(
    partNumber,
    orderNewPrintFLEXOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateColorOption(
    partNumber,
    orderNewPrintFLEXOptionsObject
  );
};

// Construct the New Order FLEX Object
const constructOrderNewPrintFLEXObject = () => {
  orderNewPrintFLEXObject = new OrderNewPrintMaterialObject(
    orderNewPrintFLEXId,
    orderNewPrintFLEXName,
    orderNewPrintFLEXMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let orderNewPrintFLEXOptionsObject = "";

const constructOrderNewPrintFLEXOptionsObject = () => {
  constructOrderNewPrintFLEXOptionsQualityDefaultValuesObject();
  constructOrderNewPrintFLEXOptionsStrengthDefaultValuesObject();
  constructOrderNewPrintFLEXOptionsColorsObjectArray();

  orderNewPrintFLEXOptionsObject = new OrderNewPrintMaterialOptionsObject(
    orderNewPrintFLEXId,
    orderNewPrintFLEXName,
    orderNewPrintFLEXOptionsQualityDefaultValuesObjectArray,
    orderNewPrintFLEXOptionsDefaultQualityValue,
    orderNewPrintFLEXOptionsStrengthDefaultValuesObjectArray,
    orderNewPrintFLEXOptionsDefaultStrengthValue,
    orderNewPrintFLEXOptionsColorsObjectArray,
    orderNewPrintFLEXOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let orderNewPrintFLEXOptionsColorsObjectArray = [];
const orderNewPrintFLEXOptionsDefaultColorValue = "No Preference";

const orderNewPrintFLEXOptionsColorIdsArray = ["no_preference"];

const orderNewPrintFLEXOptionsColorNamesArray = ["No Preference"];

const orderNewPrintFLEXOptionsColorStylesArray = ["none"];

const constructOrderNewPrintFLEXOptionsColorsObjectArray = () => {
  for (i = 0; i < orderNewPrintFLEXOptionsColorIdsArray.length; i++) {
    const orderNewPrintFLEXOptionsColorsObject = new OrderNewPrintMaterialOptionsColorObject(
      orderNewPrintFLEXOptionsColorIdsArray[i],
      orderNewPrintFLEXOptionsColorNamesArray[i],
      orderNewPrintFLEXOptionsColorStylesArray[i]
    );

    orderNewPrintFLEXOptionsColorsObjectArray[
      i
    ] = orderNewPrintFLEXOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let orderNewPrintFLEXOptionsQualityDefaultValuesObjectArray = [];
const orderNewPrintFLEXOptionsDefaultQualityValue = "Normal";

const flexQualityOptionsIdArray = ["normal", "high", "very high"];
const flexQualityOptionsNameArray = ["Normal", "High", "Very High"];
const flexQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructOrderNewPrintFLEXOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < flexQualityOptionsIdArray.length; i++) {
    const orderNewPrintFLEXOptionsQualityDefaultValuesObject = new OrderNewPrintMaterialOptionsQualityDefaultValuesObject(
      flexQualityOptionsIdArray[i],
      flexQualityOptionsNameArray[i],
      flexQualityOptionsZResolutionArray[i]
    );

    orderNewPrintFLEXOptionsQualityDefaultValuesObjectArray[
      i
    ] = orderNewPrintFLEXOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let orderNewPrintFLEXOptionsStrengthDefaultValuesObjectArray = [];
const orderNewPrintFLEXOptionsDefaultStrengthValue = "Normal";

const flexStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const flexStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const flexStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const flexStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructOrderNewPrintFLEXOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < flexStrengthOptionsIdArray.length; i++) {
    const orderNewPrintFLEXOptionsStrengthDefaultValuesObject = new OrderNewPrintMaterialOptionsStrengthDefaultValuesObject(
      flexStrengthOptionsIdArray[i],
      flexStrengthOptionsNameArray[i],
      flexStrengthOptionsInfillArray[i],
      flexStrengthOptionsWallThicknessArray[i]
    );

    orderNewPrintFLEXOptionsStrengthDefaultValuesObjectArray[
      i
    ] = orderNewPrintFLEXOptionsStrengthDefaultValuesObject;
  }
};
