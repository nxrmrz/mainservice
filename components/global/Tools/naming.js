/* =========================== NUMBER TO TWO DECIMAL STRING CONVERTER =========================== */

const numberToTwoDecimalStringConverter = number => {
  number = Number(number);
  let numberOfDecimalPlaces;
  if (number % 1 == 0) {
    numberOfDecimalPlaces = 0;
  } else {
    numberOfDecimalPlaces = number.toString().split(".")[1].length;
  }

  let twoDecimalString;

  if (numberOfDecimalPlaces == 0) {
    twoDecimalString = number + ".00";
  } else if (numberOfDecimalPlaces == 1) {
    twoDecimalString = number + "0";
  } else if (numberOfDecimalPlaces == 2) {
    twoDecimalString = number.toString();
  } else if (numberOfDecimalPlaces > 2) {
    twoDecimalString = number.toFixed(2).toString();
  }

  return twoDecimalString;
};

/* ==================================== FILE NAME FORMATTER ==================================== */

const fileNameToNameFormatter = (fileName, numberOfCharacters) => {
  const fileExtensionPosition = fileName.indexOf(".");
  const extensionlessFileName = fileName.slice(0, fileExtensionPosition);
  const fileNameCharacterLength = extensionlessFileName.length;
  const numberOfAlphanumeric = numberOfCharacters - 3;
  let firstNameAlphanumericLength;
  let lastNameAlphanumericLength;
  let firstName;
  let lastName;
  let formattedFileName;

  if (numberOfAlphanumeric % 2 == 1) {
    firstNameAlphanumericLength = Math.floor(numberOfAlphanumeric / 2) + 1;
    lastNameAlphanumericLength = Math.floor(numberOfAlphanumeric / 2);
  } else {
    firstNameAlphanumericLength = numberOfAlphanumeric / 2;
    lastNameAlphanumericLength = numberOfAlphanumeric / 2;
  }

  if (fileNameCharacterLength > numberOfCharacters) {
    firstName = extensionlessFileName.slice(0, firstNameAlphanumericLength);
    lastName = extensionlessFileName.slice(
      fileNameCharacterLength - lastNameAlphanumericLength,
      fileNameCharacterLength
    );
    formattedFileName = firstName + "..." + lastName;
  } else {
    formattedFileName = extensionlessFileName;
  }

  return formattedFileName;
};

/* ===================================== GET FILE EXTENSION ===================================== */

const fileExtension = fileName => {
  const fileExtensionPosition = fileName.indexOf(".");
  const extension = fileName
    .slice(fileExtensionPosition + 1, fileName.length)
    .toUpperCase();

  return extension;
};

/* ============================================================================================== */

const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const capitaliseFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
