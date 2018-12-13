// Declare the New Order PETG Object Variable
let orderNewPrintPETGObject;

// Create the New Order PETG Object Property
const orderNewPrintPETGId = "petg";
const orderNewPrintPETGName = "PETG";
const orderNewPrintPETGMethod = partNumber => {
  constructOrderNewPrintPETGOptionsObject();
  addOrderNewPrintPartChooseOptionsPopulateQualityOption(
    partNumber,
    orderNewPrintPETGOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateStrengthOption(
    partNumber,
    orderNewPrintPETGOptionsObject
  );
  addOrderNewPrintPartChooseOptionsPopulateColorOption(
    partNumber,
    orderNewPrintPETGOptionsObject
  );
};

// Construct the New Order PETG Object
const constructOrderNewPrintPETGObject = () => {
  orderNewPrintPETGObject = new OrderNewPrintMaterialObject(
    orderNewPrintPETGId,
    orderNewPrintPETGName,
    orderNewPrintPETGMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let orderNewPrintPETGOptionsObject = "";

const constructOrderNewPrintPETGOptionsObject = () => {
  constructOrderNewPrintPETGOptionsQualityDefaultValuesObject();
  constructOrderNewPrintPETGOptionsStrengthDefaultValuesObject();
  constructOrderNewPrintPETGOptionsColorsObjectArray();

  orderNewPrintPETGOptionsObject = new OrderNewPrintMaterialOptionsObject(
    orderNewPrintPETGId,
    orderNewPrintPETGName,
    orderNewPrintPETGOptionsQualityDefaultValuesObjectArray,
    orderNewPrintPETGOptionsDefaultQualityValue,
    orderNewPrintPETGOptionsStrengthDefaultValuesObjectArray,
    orderNewPrintPETGOptionsDefaultStrengthValue,
    orderNewPrintPETGOptionsColorsObjectArray,
    orderNewPrintPETGOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let orderNewPrintPETGOptionsColorsObjectArray = [];
const orderNewPrintPETGOptionsDefaultColorValue = "No Preference";

const orderNewPrintPETGOptionsColorIdsArray = ["no_preference"];

const orderNewPrintPETGOptionsColorNamesArray = ["No Preference"];

const orderNewPrintPETGOptionsColorStylesArray = ["none"];

const constructOrderNewPrintPETGOptionsColorsObjectArray = () => {
  for (i = 0; i < orderNewPrintPETGOptionsColorIdsArray.length; i++) {
    const orderNewPrintPETGOptionsColorsObject = new OrderNewPrintMaterialOptionsColorObject(
      orderNewPrintPETGOptionsColorIdsArray[i],
      orderNewPrintPETGOptionsColorNamesArray[i],
      orderNewPrintPETGOptionsColorStylesArray[i]
    );

    orderNewPrintPETGOptionsColorsObjectArray[
      i
    ] = orderNewPrintPETGOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let orderNewPrintPETGOptionsQualityDefaultValuesObjectArray = [];
const orderNewPrintPETGOptionsDefaultQualityValue = "Normal";

const petgQualityOptionsIdArray = ["normal", "high", "very high"];
const petgQualityOptionsNameArray = ["Normal", "High", "Very High"];
const petgQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructOrderNewPrintPETGOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < petgQualityOptionsIdArray.length; i++) {
    const orderNewPrintPETGOptionsQualityDefaultValuesObject = new OrderNewPrintMaterialOptionsQualityDefaultValuesObject(
      petgQualityOptionsIdArray[i],
      petgQualityOptionsNameArray[i],
      petgQualityOptionsZResolutionArray[i]
    );

    orderNewPrintPETGOptionsQualityDefaultValuesObjectArray[
      i
    ] = orderNewPrintPETGOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let orderNewPrintPETGOptionsStrengthDefaultValuesObjectArray = [];
const orderNewPrintPETGOptionsDefaultStrengthValue = "Normal";

const petgStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const petgStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const petgStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const petgStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructOrderNewPrintPETGOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < petgStrengthOptionsIdArray.length; i++) {
    const orderNewPrintPETGOptionsStrengthDefaultValuesObject = new OrderNewPrintMaterialOptionsStrengthDefaultValuesObject(
      petgStrengthOptionsIdArray[i],
      petgStrengthOptionsNameArray[i],
      petgStrengthOptionsInfillArray[i],
      petgStrengthOptionsWallThicknessArray[i]
    );

    orderNewPrintPETGOptionsStrengthDefaultValuesObjectArray[
      i
    ] = orderNewPrintPETGOptionsStrengthDefaultValuesObject;
  }
};
