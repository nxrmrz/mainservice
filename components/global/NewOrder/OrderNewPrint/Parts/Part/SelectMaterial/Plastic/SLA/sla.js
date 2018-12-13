// Declare the New Order SLA Object Variable
let orderNewPrintSLAObject;

// Create the New Order SLA Object Property
const orderNewPrintSLAId = "sla";
const orderNewPrintSLAName = "SLA";

// Construct the New Order SLA Object
const constructOrderNewPrintSLAObject = () => {
  // Construct the SLA Material Object Array

  const orderNewPrintSLAMaterialObjectArray = [];

  // Construct the SLA Object Array
  orderNewPrintSLAObject = new OrderNewPrintProcessObject(
    orderNewPrintSLAId,
    orderNewPrintSLAName,
    orderNewPrintSLAMaterialObjectArray
  );
};
