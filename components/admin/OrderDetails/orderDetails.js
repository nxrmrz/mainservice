/* ======================================= INITIALISATION ======================================= */

const viewAdminProfileOrdersPrintsOrderDetails = orderNumber => {
  $.ajax({
    type: "POST",
    url: "/order/get-order-details-by-order-number",
    data: JSON.stringify({ orderNumber }),
    contentType: "application/json",
    success: data => {
      if (data.content.orderStatus == "Awaiting Quote") {
        adminAwaitingQuoteInit(data.content);
      } else if (data.content.orderStatus == "Awaiting Payment") {
        awaitingPaymentInit(data.content);
      } else if (data.content.orderStatus == "Awaiting Payment Confirmation") {
        adminAwaitingPaymentConfirmationInit(data.content);
      } else if (data.content.orderStatus == "Printing Order") {
        adminPrintingOrderInit(data.content);
      } else if (data.content.orderStatus == "Ready for Pickup") {
        readyForPickupInit(data.content);
      } else if (data.content.orderStatus == "Order Picked Up") {
        adminOrderPickedUpInit(data.content);
      } else if (data.content.orderStatus == "Ready for Shipping") {
        adminReadyForShippingInit(data.content);
      } else if (data.content.orderStatus == "Order Shipped") {
        orderShippedInit(data.content);
      } else if (data.content.orderStatus == "Order Completed") {
        adminOrderCompletedInit(data.content);
      } else if (data.content.orderStatus == "Requesting Refund") {
        adminRequestingRefundInit(data.content);
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
