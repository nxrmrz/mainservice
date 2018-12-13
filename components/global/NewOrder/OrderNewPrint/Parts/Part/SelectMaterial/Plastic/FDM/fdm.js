// Declare the New Order FDM Object Variable
let orderNewPrintFDMObject;

// Create the New Order FDM Object Property
const orderNewPrintFDMId = "fdm";
const orderNewPrintFDMName = "FDM";

// Construct the New Order FDM Object
const constructOrderNewPrintFDMObject = () => {
  // Construct the FDM Material Object Array
  constructOrderNewPrintPLAObject();
  constructOrderNewPrintABSObject();
  constructOrderNewPrintPETGObject();
  constructOrderNewPrintFLEXObject();

  const orderNewPrintFDMMaterialObjectArray = [
    orderNewPrintPLAObject,
    orderNewPrintABSObject,
    orderNewPrintPETGObject,
    orderNewPrintFLEXObject
  ];

  // Construct the FDM Object Array
  orderNewPrintFDMObject = new OrderNewPrintProcessObject(
    orderNewPrintFDMId,
    orderNewPrintFDMName,
    orderNewPrintFDMMaterialObjectArray
  );
};
