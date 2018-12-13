// Declare the New Order Metal Object Variable
let orderNewPrintMetalObject;

// Create the New Order Metal Object Property
const orderNewPrintMetalId = "metal";
const orderNewPrintMetalName = "Metal";

// Construct the New Order Metal Object
const constructOrderNewPrintMetalObject = () => {
  // Construct the Metal Material Object Array

  const orderNewPrintMetalProcessObjectArray = [];

  // Construct the Metal Object Array
  orderNewPrintMetalObject = new OrderNewPrintMaterialGroupObject(
    orderNewPrintMetalId,
    orderNewPrintMetalName,
    orderNewPrintMetalProcessObjectArray
  );
};
