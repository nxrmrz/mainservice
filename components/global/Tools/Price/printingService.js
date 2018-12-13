/* ========================================= PART PRICE ========================================= */

/* --------------------------------------- GET PART PRICE --------------------------------------- */

const getPartPrice = (orderNumber, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsByOrderNumber(orderNumber)
        .then(orderDetails => {
          resolve(partPriceCalculation(orderDetails));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.orderDetails;
      const partsPriceObject = partPriceCalculation(orderDetails);
      return { status, partsPriceObject };
    } else if (status == "failed") {
      const error = data.error;
      return { status, error };
    }
  }
};

/* ----------------------------------- PART PRICE CALCULATION ----------------------------------- */

const partPriceCalculation = orderDetails => {
  /* --------------------------------- DECLARE LOCAL VARIABLES ---------------------------------- */
  let partPriceObjectArray = [];
  let totalPrice = 0;
  let calculation = "";
  // Simplify parts variable
  const parts = orderDetails.parts;

  // Create the Part Price Object for each Part
  for (let i = 0; i < parts.length; i++) {
    // Get File Details of the Part
    const fileDetails = getFileDetails(parts[i].fileId);
    // Construct Part Price Object
    const partPriceObject = new PartPriceObject(
      parts[i].fileName,
      parts[i].orderQuantity,
      fileDetails.fileDetail.price
    );
    // Add the Part Price Object to the an Array
    partPriceObjectArray.push(partPriceObject);
    // Calculate the collective price of all the parts
    totalPrice = totalPrice + Number(partPriceObject.totalPrice);
    // Construct the calculation string to show how the total price is calculated
    if (i == 0) {
      calculation +=
        "$" +
        numberToTwoDecimalStringConverter(Number(partPriceObject.totalPrice));
    } else if (i == parts.length - 1) {
      calculation +=
        " + $" +
        numberToTwoDecimalStringConverter(Number(partPriceObject.totalPrice)) +
        " = " +
        numberToTwoDecimalStringConverter(Number(totalPrice));
    } else {
      calculation +=
        " + $" +
        numberToTwoDecimalStringConverter(Number(partPriceObject.totalPrice));
    }
  }
  // Construct the Parts Price Object
  const partsPriceObject = new PartsPriceObject(
    partPriceObjectArray,
    totalPrice,
    calculation
  );

  // Resolve the promise by returning the
  return partsPriceObject;
};

/* ------------------------------- PART PRICE OBJECT CONSTRUCTOR -------------------------------- */

class PartPriceObject {
  constructor(name, unitPrice, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = Number(unitPrice) * Number(quantity);
    this.calculation =
      quantity +
      " x $" +
      numberToTwoDecimalStringConverter(unitPrice) +
      " = $" +
      numberToTwoDecimalStringConverter(Number(unitPrice) * Number(quantity));
  }
}

/* ------------------------------- PARTS PRICE OBJECT CONSTRUCTOR ------------------------------- */

class PartsPriceObject {
  constructor(partPriceObjectArray, totalPrice, calculation) {
    this.partPriceObjectArray = partPriceObjectArray;
    this.totalPrice = totalPrice;
    this.calculation = calculation;
  }
}

/* ======================================= PRICING PRICE ======================================== */

/* ------------------------------------- GET PRICING PRICE -------------------------------------- */

const getPricingPrice = (orderNumber, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsByOrderNumber(orderNumber)
        .then(orderDetails => {
          resolve(pricingPriceCalculation(orderDetails));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.orderDetails;
      const pricingPriceObject = pricingPriceCalculation(orderDetails);
      return { status, pricingPriceObject };
    } else if (status == "failed") {
      const error = data.error;
      return { status, error };
    }
  }
};

/* --------------------------------- PRICING PRICE CALCULATION ---------------------------------- */

const pricingPriceCalculation = orderDetails => {
  /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
  partsPriceObject = partPriceCalculation(orderDetails);
  /* ---------------------------- DECLARE LOCAL VARIABLES ----------------------------- */
  let pricing;
  let pricingMultiplier;
  let pricingPrice;
  let calculation;
  /* ---------------------------- DEFINE VARIABLE: PRICING ---------------------------- */
  pricing = orderDetails.pricing;
  /* ---------------------- DEFINE VARIABLE: PRICING MULTIPLIER ----------------------- */
  if (orderDetails.pricing == "Basic") {
    pricingMultiplier = 0;
  } else if (orderDetails.pricing == "Priority") {
    pricingMultiplier = 0.25;
  } else if (orderDetails.pricing == "Urgent") {
    pricingMultiplier = 0.5;
  }
  /* ------------------------- DEFINE VARIABLE: PRICING PRICE ------------------------- */
  pricingPrice = Number(partsPriceObject.totalPrice) * pricingMultiplier;
  /* -------------------------- DEFINE VARIABLE: CALCULATION -------------------------- */
  calculation =
    "$" +
    numberToTwoDecimalStringConverter(Number(partsPriceObject.totalPrice)) +
    " x " +
    pricingMultiplier +
    " = $" +
    numberToTwoDecimalStringConverter(pricingPrice);
  /* --------------------- DEFINE VARIABLE: PRICING PRICE OBJECT ---------------------- */
  const pricingPriceObject = new PricingPriceObject(
    orderDetails.pricing,
    pricingPrice,
    calculation
  );

  return pricingPriceObject;
};

/* ------------------------------ PRICING PRICE OBJECT CONSTRUCTOR ------------------------------ */

class PricingPriceObject {
  constructor(pricing, pricingPrice, calculation) {
    this.pricing = pricing;
    this.pricingPrice = pricingPrice;
    this.calculation = calculation;
  }
}

/* ======================================= DISCOUNT PRICE ======================================= */

/* ------------------------------------- GET DISCOUNT PRICE ------------------------------------- */

const getDiscountPrice = (orderNumber, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsByOrderNumber(orderNumber)
        .then(orderDetails => {
          resolve(discountPriceCalculation(orderDetails));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.orderDetails;
      const discountsPriceObject = discountPriceCalculation(orderDetails);
      return { status, discountsPriceObject };
    } else if (status == "failed") {
      const error = data.error;
      return { status, error };
    }
  }
};

/* --------------------------------- DISCOUNT PRICE CALCULATION --------------------------------- */

const discountPriceCalculation = orderDetails => {
  /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
  partsPriceObject = partPriceCalculation(orderDetails);
  /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
  pricingPriceObject = pricingPriceCalculation(orderDetails);
  /* -------------------------- DECLARE LOCAL VARIABLES --------------------------- */
  const totalPreDiscountPrice =
    Number(partsPriceObject.totalPrice) +
    Number(pricingPriceObject.pricingPrice);
  let discountPriceObjectArray = [];
  let totalDiscount = 0;
  let totalCalculation = "";
  /* ------------------------------ DEFINE VARIABLES ------------------------------ */
  for (let i = 0; i < orderDetails.discounts.length; i++) {
    /* ---------- DEFINE AND DECLARE VARIABLES FOR DISCOUNT PRICE OBJECT ---------- */
    const rate = Number(orderDetails.discounts[i].rate);
    const minOrderValue = Number(orderDetails.discounts[i].minOrderValue);
    const maxOrderValue = Number(orderDetails.discounts[i].maxOrderValue);
    let discountableValue = 0;
    let calculation = "";
    /* ----------- DEFINE VARIABLE: DISCOUNTABLE VALUE AND CALCULATION ------------ */
    if (maxOrderValue > 0 && minOrderValue < totalPreDiscountPrice) {
      if (minOrderValue > 0) {
        if (maxOrderValue < totalPreDiscountPrice) {
          discountableValue = maxOrderValue - minOrderValue;

          calculation =
            "($" +
            numberToTwoDecimalStringConverter(maxOrderValue) +
            " - $" +
            numberToTwoDecimalStringConverter(minOrderValue) +
            ")";
        } else if (maxOrderValue > totalPreDiscountPrice) {
          discountableValue = totalPreDiscountPrice - minOrderValue;

          calculation =
            "($" +
            numberToTwoDecimalStringConverter(totalPreDiscountPrice) +
            " - $" +
            numberToTwoDecimalStringConverter(minOrderValue) +
            ")";
        }
      }
    } else if (minOrderValue > 0 && minOrderValue < totalPreDiscountPrice) {
      discountableValue = totalPreDiscountPrice - minOrderValue;

      calculation =
        "($" +
        numberToTwoDecimalStringConverter(totalPreDiscountPrice) +
        " - $" +
        numberToTwoDecimalStringConverter(minOrderValue) +
        ")";
    } else if (minOrderValue == 0) {
      discountableValue = totalPreDiscountPrice;

      calculation =
        "$" + numberToTwoDecimalStringConverter(totalPreDiscountPrice);
    } else {
      discountableValue = 0;

      calculation = "$" + numberToTwoDecimalStringConverter(0);
    }
    /* ------------------------ DEFINE VARIABLE: DISCOUNT ------------------------- */
    const discount = Number(discountableValue) * rate;
    /* ------------------ UPDATE VARIABLE: DISCOUNT CALCULATION ------------------- */
    calculation =
      calculation +
      " x " +
      rate +
      " = $" +
      numberToTwoDecimalStringConverter(Number(discountableValue) * rate);
    /* --------------------- UPDATE VARIABLE: TOTAL DISCOUNT ---------------------- */
    totalDiscount = totalDiscount + discount;
    /* --------------- UPDATE VARIABLE: TOTAL DISCOUNT CALCULATION ---------------- */
    if (totalCalculation) {
      if (i == orderDetails.discounts.length - 1) {
        totalCalculation =
          totalCalculation +
          " + $" +
          numberToTwoDecimalStringConverter(Number(discountableValue) * rate) +
          " = $" +
          numberToTwoDecimalStringConverter(totalDiscount);
      } else {
        totalCalculation =
          totalCalculation +
          " + $" +
          numberToTwoDecimalStringConverter(Number(discountableValue) * rate);
      }
    } else {
      if (i == orderDetails.discounts.length - 1) {
        totalCalculation =
          "$" +
          numberToTwoDecimalStringConverter(Number(discountableValue) * rate) +
          " = $" +
          numberToTwoDecimalStringConverter(totalDiscount);
      } else {
        totalCalculation =
          "$" +
          numberToTwoDecimalStringConverter(Number(discountableValue) * rate);
      }
    }
    /* --------------- UPDATE VARIABLE: DISCOUNT PRICE OBJECT ARRAY --------------- */
    discountPriceObjectArray.push(
      new DiscountPriceObject(
        orderDetails.discounts[i].name,
        rate,
        minOrderValue,
        maxOrderValue,
        discount,
        calculation
      )
    );
  }
  /* ------------------ DEFINE VARIABLE: DISCOUNTS PRICE OBJECT ------------------- */
  const discountsPriceObject = new DiscountsPriceObject(
    discountPriceObjectArray,
    totalDiscount,
    totalCalculation
  );

  return discountsPriceObject;
};

/* ----------------------------- DISCOUNT PRICE OBJECT CONSTRUCTOR ------------------------------ */

class DiscountPriceObject {
  constructor(name, rate, minOrderValue, maxOrderValue, discount, calculation) {
    this.name = name;
    this.rate = rate;
    this.minOrderValue = minOrderValue;
    this.maxOrderValue = maxOrderValue;
    this.discount = discount;
    this.calculation = calculation;
  }
}

/* ----------------------------- DISCOUNTS PRICE OBJECT CONSTRUCTOR ----------------------------- */

class DiscountsPriceObject {
  constructor(discountPriceObjectArray, totalDiscount, calculation) {
    this.discountPriceObjectArray = discountPriceObjectArray;
    this.totalDiscount = totalDiscount;
    this.calculation = calculation;
  }
}

/* ======================================= DELIVERY PRICE ======================================= */

/* ------------------------------------- GET DELIVERY PRICE ------------------------------------- */

const getDeliveryPrice = (orderNumber, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsByOrderNumber(orderNumber)
        .then(orderDetails => {
          resolve(deliveryPriceCalculation(orderDetails));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.orderDetails;
      const deliveryPriceObject = deliveryPriceCalculation(orderDetails);
      return { status, deliveryPriceObject };
    } else if (status == "failed") {
      const error = data.error;
      return { status, error };
    }
  }
};

/* --------------------------------- DELIVERY PRICE CALCULATION --------------------------------- */

const deliveryPriceCalculation = orderDetails => {
  /* ------------------------------ DECLARE LOCAL VARIABLES ------------------------------- */
  let delivery;
  let details;
  let price;
  /* ----------------------------- DEFINE VARIABLES: DELIVERY ----------------------------- */
  delivery = orderDetails.delivery;
  /* ------------------------ DEFINE VARIABLES: DETAILS AND PRICE ------------------------- */
  if (delivery == "Pickup") {
    details =
      "Pickup is available 24/7. This means that customers can arrange a pickup time that suits them the most.";
    price = 0;
  } else if (delivery == "Tracking") {
    details =
      "Tracking takes up to 3 working days nationwide. You will be given a tracking number to track parcel.";
    price = 7;
  } else if (delivery == "Courier") {
    details =
      "Parcels shipped using the Courier service usually arrive the next working day between major towns and cities.";
    price = 8.5;
  }
  /* -------------------------- CREATE THE DELIVERY PRICE OBJECT -------------------------- */
  const deliveryPriceObject = new DeliveryPriceObject(delivery, details, price);

  return deliveryPriceObject;
};

/* ----------------------------- DELIVERY PRICE OBJECT CONSTRUCTOR ------------------------------ */

class DeliveryPriceObject {
  constructor(delivery, details, price) {
    this.delivery = delivery;
    this.details = details;
    this.price = price;
  }
}

/* ======================================== ORDER PRICE ========================================= */

/* -------------------------------------- GET ORDER PRICE --------------------------------------- */

const getOrderPrice = (orderNumber, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsByOrderNumber(orderNumber)
        .then(orderDetails => {
          resolve(orderPriceCalculation(orderDetails));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.orderDetails;
      const orderPriceObject = orderPriceCalculation(orderDetails);
      return { status, orderPriceObject };
    } else if (status == "failed") {
      const error = data.error;
      return { status, error };
    }
  }
};

/* ---------------------------------- ORDER PRICE CALCULATION ----------------------------------- */

const orderPriceCalculation = orderDetails => {
  /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
  partsPriceObject = partPriceCalculation(orderDetails);
  /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
  pricingPriceObject = pricingPriceCalculation(orderDetails);
  /* ------------------------ GET THE DISCOUNTS PRICE DETAILS ------------------------- */
  discountsPriceObject = discountPriceCalculation(orderDetails);
  /* ----------------------- GET THE DELIVERY PRICE DETAILS ----------------------- */
  deliveryPriceObject = deliveryPriceCalculation(orderDetails);
  /* ------------------------ DECLARE LOCAL VARIABLES ------------------------- */
  let orderPrice;
  let calculation;
  /* --------------------- DEFINE VARIABLES: ORDER PRICE ---------------------- */
  orderPrice =
    partsPriceObject.totalPrice +
    pricingPriceObject.pricingPrice -
    discountsPriceObject.totalDiscount +
    deliveryPriceObject.price;
  /* --------------------- DEFINE VARIABLES: CALCULATION ---------------------- */
  calculation =
    "$" +
    numberToTwoDecimalStringConverter(partsPriceObject.totalPrice) +
    " + $" +
    numberToTwoDecimalStringConverter(pricingPriceObject.pricingPrice) +
    " - $" +
    numberToTwoDecimalStringConverter(discountsPriceObject.totalDiscount) +
    " + $" +
    numberToTwoDecimalStringConverter(deliveryPriceObject.price) +
    " = $" +
    numberToTwoDecimalStringConverter(orderPrice);
  /* ----------------------- CREATE ORDER PRICE OBJECT ------------------------ */
  const orderPriceObject = new OrderPriceObject(orderPrice, calculation);

  return orderPriceObject;
};

/* ------------------------------- ORDER PRICE OBJECT CONSTRUCTOR ------------------------------- */

class OrderPriceObject {
  constructor(orderPrice, calculation) {
    this.orderPrice = orderPrice;
    this.calculation = calculation;
  }
}

/* =================================== CUMULATIVE ORDER VALUE =================================== */

/* --------------------------- CUMULATIVE ORDER VALUE BY ORDER STATUS --------------------------- */

const cumulativeOrderValueByOrderStatus = orderStatus => {
  orderDetailsArray = getOrderDetailsArrayByOrderStatus(orderStatus, false)
    .orderDetailsArray;
  let filteredOrderDetailsArray = [];
  let cumulativeOrderValue = 0;

  for (let i = 0; i < orderDetailsArray.length; i++) {
    let orderPrice = 0;
    let date = "";
    if (orderStatus == "Awaiting Quote") {
      return;
    } else if (orderStatus == "Awaiting Payment") {
      date = orderDetailsArray[i].creationDate;
    } else if (orderStatus == "Awaiting Payment Confirmation") {
      date = orderDetailsArray[i].creationDate;
    } else if (orderStatus == "Printing Order") {
      date = orderDetailsArray[i].paymentConfirmationDate;
    } else if (orderStatus == "Ready for Pickup") {
      date = orderDetailsArray[i].paymentConfirmationDate;
    } else if (orderStatus == "Order Picked Up") {
      date = orderDetailsArray[i].orderDeliveryDate;
    } else if (orderStatus == "Ready for Shipping") {
      date = orderDetailsArray[i].paymentConfirmationDate;
    } else if (orderStatus == "Order Shipped") {
      date = orderDetailsArray[i].orderDeliveryDate;
    } else if (data.orderStatus == "Order Completed") {
      date = orderDetailsArray[i].orderCompletionDate;
    } else if (data.orderStatus == "Requesting Refund") {
      date = orderDetailsArray[i].creationDate;
    } else if (data.orderStatus == "Refund Approved") {
      date = orderDetailsArray[i].processDate;
    } else if (data.orderStatus == "Refund Declined") {
      date = orderDetailsArray[i].processDate;
    } else if (data.orderStatus == "Refund Processed") {
      date = orderDetailsArray[i].processDate;
    }

    const orderPriceObject = getOrderPrice(
      orderDetailsArray[i].orderNumber,
      false
    ).orderPriceObject;

    orderPrice = orderPriceObject.orderPrice;
    cumulativeOrderValue += orderPrice;

    filteredOrderDetailsArray.push(
      new CumulativeOrderValueOrderDetailsObject(
        orderDetailsArray[i].orderNumber,
        orderDetailsArray[i].orderStatus,
        date,
        orderPrice
      )
    );
  }

  const cumulativeOrderValueObject = new CumulativeOrderValueObject(
    filteredOrderDetailsArray,
    cumulativeOrderValue
  );

  return cumulativeOrderValueObject;
};

/* ------------------- CUMULATIVE ORDER VALUE BY ORDER STATUS AND DATE RANGE -------------------- */

const cumulativeOrderValueByOrderStatusAndDateRange = (
  orderStatus,
  startDate,
  endDate
) => {
  orderDetailsArray = getOrderDetailsArrayByOrderStatus(orderStatus, false)
    .orderDetailsArray;
  let filteredOrderDetailsArray = [];
  let cumulativeOrderValue = 0;

  for (let i = 0; i < orderDetailsArray.length; i++) {
    let orderPrice = 0;
    let date = "";
    if (orderStatus == "Awaiting Quote") {
      date = orderDetailsArray[i].creationDate;
    } else if (orderStatus == "Awaiting Payment") {
      date = orderDetailsArray[i].creationDate;
    } else if (orderStatus == "Awaiting Payment Confirmation") {
      date = orderDetailsArray[i].creationDate;
    } else if (orderStatus == "Printing Order") {
      date = orderDetailsArray[i].paymentConfirmationDate;
    } else if (orderStatus == "Ready for Pickup") {
      date = orderDetailsArray[i].paymentConfirmationDate;
    } else if (orderStatus == "Order Picked Up") {
      date = orderDetailsArray[i].orderDeliveryDate;
    } else if (orderStatus == "Ready for Shipping") {
      date = orderDetailsArray[i].paymentConfirmationDate;
    } else if (orderStatus == "Order Shipped") {
      date = orderDetailsArray[i].orderDeliveryDate;
    } else if (data.orderStatus == "Order Completed") {
      date = orderDetailsArray[i].orderCompletionDate;
    } else if (data.orderStatus == "Requesting Refund") {
      date = orderDetailsArray[i].creationDate;
    } else if (data.orderStatus == "Refund Approved") {
      date = orderDetailsArray[i].processDate;
    } else if (data.orderStatus == "Refund Declined") {
      date = orderDetailsArray[i].processDate;
    } else if (data.orderStatus == "Refund Processed") {
      date = orderDetailsArray[i].processDate;
    }

    if (isDateWithinRange(date, startDate, endDate)) {
      const orderPriceObject = getOrderPrice(
        orderDetailsArray[i].orderNumber,
        false
      ).orderPriceObject;

      orderPrice = orderPriceObject.orderPrice;
      cumulativeOrderValue += orderPrice;

      filteredOrderDetailsArray.push(
        new CumulativeOrderValueOrderDetailsObject(
          orderDetailsArray[i].orderNumber,
          orderDetailsArray[i].orderStatus,
          date,
          orderPrice
        )
      );
    }
  }

  const cumulativeOrderValueObject = new CumulativeOrderValueObject(
    filteredOrderDetailsArray,
    cumulativeOrderValue
  );

  return cumulativeOrderValueObject;
};

/* ------------------------ CUMULATIVE ORDER VALUE ORDER DETAILS OBJECT ------------------------- */

class CumulativeOrderValueOrderDetailsObject {
  constructor(orderNumber, orderStatus, date, orderPrice) {
    this.orderNumber = orderNumber;
    this.orderStatus = orderStatus;
    this.date = date;
    this.orderPrice = orderPrice;
  }
}

/* ------------------------------- CUMULATIVE ORDER VALUE OBJECT -------------------------------- */

class CumulativeOrderValueObject {
  constructor(orderDetailsArray, cumulativeOrderValue) {
    this.orderDetailsArray = orderDetailsArray;
    this.cumulativeOrderValue = cumulativeOrderValue;
  }
}

/* --------------------------- GET LAST MONTHS CUMULATIVE ORDER VALUE --------------------------- */

const getLastMonthCumulativeOrderValue = orderStatus => {
  dates = getLastMonthStartAndEndDates(false);

  return cumulativeOrderValueByOrderStatusAndDateRange(
    orderStatus,
    dates.startDate,
    dates.endDate
  );
};

/* ============================================================================================== */
