/* ======================================= INITIALISATION ======================================= */

const viewAdminProfileOrdersPrintsOrderDetails = orderNumber => {
  $.ajax({
    type: "POST",
    url: "/admin/order",
    data: { orderNumber: orderNumber },
    success: data => {
      if (data.orderStatus == "Awaiting Quote") {
        adminAwaitingQuoteInit(data);
      } else if (data.orderStatus == "Awaiting Payment") {
        awaitingPaymentInit(data);
      } else if (data.orderStatus == "Awaiting Payment Confirmation") {
        adminAwaitingPaymentConfirmationInit(data);
      } else if (data.orderStatus == "Printing Order") {
        adminPrintingOrderInit(data);
      } else if (data.orderStatus == "Ready for Pickup") {
        readyForPickupInit(data);
      } else if (data.orderStatus == "Order Picked Up") {
        adminOrderPickedUpInit(data);
      } else if (data.orderStatus == "Ready for Shipping") {
        adminReadyForShippingInit(data);
      } else if (data.orderStatus == "Order Shipped") {
        orderShippedInit(data);
      } else if (data.orderStatus == "Order Completed") {
        adminOrderCompletedInit(data);
      } else if (data.orderStatus == "Requesting Refund") {
        adminRequestingRefundInit(data);
      } else {
        console.log("Couldn't Determine Order Status");
      }
    }
  });
};

const adminOrderDetailsModalHeader = "Admin Order Details";

/* ================================== PART FILE NAME FORMATTER ================================== */

const adminOrderDetailsPartFileNameFormatter = (
  fileName,
  numberOfCharacters
) => {
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

/* ============================================================================================== */
