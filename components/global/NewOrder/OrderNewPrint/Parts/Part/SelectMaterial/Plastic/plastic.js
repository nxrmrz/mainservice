// Declare the New Order Plastic Object Variable
let orderNewPrintPlasticObject;

// Create the New Order Plastic Object Property
const orderNewPrintPlasticId = "plastic";
const orderNewPrintPlasticName = "Plastic";

// Construct the New Order Plastic Object
const constructOrderNewPrintPlasticObject = () => {
  // Construct the Plastic Material Object Array
  constructOrderNewPrintFDMObject();
  constructOrderNewPrintSLAObject();

  const orderNewPrintPlasticProcessObjectArray = [
    orderNewPrintFDMObject,
    orderNewPrintSLAObject
  ];

  // Construct the Plastic Object Array
  orderNewPrintPlasticObject = new OrderNewPrintMaterialGroupObject(
    orderNewPrintPlasticId,
    orderNewPrintPlasticName,
    orderNewPrintPlasticProcessObjectArray
  );
};
