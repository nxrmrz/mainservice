/* ========================================= PART PRICE ========================================= */

/* --------------------------------------- GET PART PRICE --------------------------------------- */

const getPartPrice = (orderNumber, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsByOrderNumber(orderNumber)
        .then(orderDetails => {
          resolve(partPriceCalculation(orderDetails, false));
          partPriceCalculation(orderDetails)
            .then(partsPriceObject => resolve(partsPriceObject))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.content;
      const partsPriceObject = partPriceCalculation(orderDetails, false);
      return { status, partsPriceObject };
    } else if (status == "failed") {
      const error = data.content;
      return { status, error };
    }
  }
};

/* ----------------------------------- PART PRICE CALCULATION ----------------------------------- */

const partPriceCalculation = (orderDetails, promise) => {
  const fileIdArray = orderDetails.parts.map(part => part.fileId);
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getFileDetailsArrayByFileIdArray(fileIdArray)
        .then(fileDetailsArray => {
          const partsPriceObject = constructPartsPriceObject(
            orderDetails,
            fileDetailsArray
          );

          resolve(partsPriceObject);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    fileDetailsArray = getFileDetailsArrayByFileIdArray(fileIdArray, false)
      .content;

    const partsPriceObject = constructPartsPriceObject(
      orderDetails,
      fileDetailsArray
    );

    return partsPriceObject;
  }
};

/* -------------------------------- CONSTRUCT PARTS PRICE OBJECT -------------------------------- */

const constructPartsPriceObject = (orderDetails, fileDetailsArray) => {
  /* ------------------------------- DECLARE LOCAL VARIABLES -------------------------------- */
  let partPriceObjectArray = [];
  let totalPrice = 0;
  let calculation = "";
  // Simplify parts variable
  const parts = orderDetails.parts;
  // Create the Part Price Object for each Part
  for (let i = 0; i < parts.length; i++) {
    // Get File Details of the Part
    const fileDetails = fileDetailsArray.filter(
      fileDetails => String(fileDetails._id) == String(parts[i].fileId)
    )[0];
    // Construct Part Price Object
    let partPriceObject;
    if (orderDetails.orderStatus != "Awaiting Quote") {
      partPriceObject = new PartPriceObject(
        parts[i].fileName,
        parts[i].orderQuantity,
        fileDetails.metadata.price
      );
    } else {
      partPriceObject = new PartPriceObject(
        parts[i].fileName,
        parts[i].orderQuantity,
        0
      );
    }
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
          pricingPriceCalculation(orderDetails)
            .then(pricingPriceObject => resolve(pricingPriceObject))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.content;
      const pricingPriceObject = pricingPriceCalculation(orderDetails, false);
      return { status, pricingPriceObject };
    } else if (status == "failed") {
      const error = data.content;
      return { status, error };
    }
  }
};

/* --------------------------------- PRICING PRICE CALCULATION ---------------------------------- */

const pricingPriceCalculation = (orderDetails, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
      partPriceCalculation(orderDetails)
        .then(partsPriceObject => {
          const pricingPriceObject = constructPricingPriceObject(
            orderDetails,
            partsPriceObject
          );

          resolve(pricingPriceObject);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
    partsPriceObject = partPriceCalculation(orderDetails, false);

    const pricingPriceObject = constructPricingPriceObject(
      orderDetails,
      partsPriceObject
    );

    return pricingPriceObject;
  }
};

/* ------------------------------- CONSTRUCT PRICING PRICE OBJECT ------------------------------- */

const constructPricingPriceObject = (orderDetails, partsPriceObject) => {
  /* ---------------------------- DECLARE LOCAL VARIABLES ----------------------------- */
  let pricing;
  let pricingMultiplier;
  let pricingPrice;
  let calculation;
  /* ---------------------------- DEFINE VARIABLE: PRICING ---------------------------- */
  pricing = orderDetails.pricing;
  /* ---------------------- DEFINE VARIABLE: PRICING MULTIPLIER ----------------------- */
  if (pricing == "Basic") {
    pricingMultiplier = 0;
  } else if (pricing == "Priority") {
    pricingMultiplier = 0.3;
  } else if (pricing == "Urgent") {
    pricingMultiplier = 0.6;
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
    pricing,
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
          discountPriceCalculation(orderDetails)
            .then(discountsPriceObject => resolve(discountsPriceObject))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.content;
      const discountsPriceObject = discountPriceCalculation(
        orderDetails,
        false
      );
      return { status, discountsPriceObject };
    } else if (status == "failed") {
      const error = data.content;
      return { status, error };
    }
  }
};

/* --------------------------------- DISCOUNT PRICE CALCULATION --------------------------------- */

const discountPriceCalculation = (orderDetails, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
      partPriceCalculation(orderDetails)
        .then(partsPriceObject => {
          /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
          pricingPriceCalculation(orderDetails)
            .then(pricingPriceObject => {
              const discountsPriceObject = constructDiscountsPriceObject(
                orderDetails,
                partsPriceObject,
                pricingPriceObject
              );

              resolve(discountsPriceObject);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
    partsPriceObject = partPriceCalculation(orderDetails, false);
    /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
    pricingPriceObject = pricingPriceCalculation(orderDetails, false);

    const discountsPriceObject = constructDiscountsPriceObject(
      orderDetails,
      partsPriceObject,
      pricingPriceObject
    );

    return discountsPriceObject;
  }
};

/* ------------------------------ CONSTRUCT DISCOUNTS PRICE OBJECT ------------------------------ */

const constructDiscountsPriceObject = (
  orderDetails,
  partsPriceObject,
  pricingPriceObject
) => {
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
      const orderDetails = data.content;
      const deliveryPriceObject = deliveryPriceCalculation(orderDetails);
      return { status, deliveryPriceObject };
    } else if (status == "failed") {
      const error = data.content;
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
    price = 5.5;
  } else if (delivery == "Courier") {
    details =
      "Parcels shipped using the Courier service usually arrive the next working day between major towns and cities.";
    price = 7;
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
          orderPriceCalculation(orderDetails)
            .then(orderPriceObject => resolve(orderPriceObject))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  } else {
    const data = getOrderDetailsByOrderNumber(orderNumber, false);
    const status = data.status;
    if (status == "success") {
      const orderDetails = data.content;
      const orderPriceObject = orderPriceCalculation(orderDetails, false);
      return { status, orderPriceObject };
    } else if (status == "failed") {
      const error = data.content;
      return { status, error };
    }
  }
};

/* ---------------------------------- ORDER PRICE CALCULATION ----------------------------------- */

const orderPriceCalculation = (orderDetails, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
      partPriceCalculation(orderDetails)
        .then(partsPriceObject => {
          /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
          pricingPriceCalculation(orderDetails)
            .then(pricingPriceObject => {
              /* ------------------------ GET THE DISCOUNTS PRICE DETAILS ------------------------- */
              discountPriceCalculation(orderDetails)
                .then(discountsPriceObject => {
                  /* ----------------------- GET THE DELIVERY PRICE DETAILS ----------------------- */
                  deliveryPriceObject = deliveryPriceCalculation(orderDetails);

                  const orderPriceObject = constructOrderPriceObject(
                    partsPriceObject,
                    pricingPriceObject,
                    discountsPriceObject,
                    deliveryPriceObject
                  );

                  resolve(orderPriceObject);
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
    partsPriceObject = partPriceCalculation(orderDetails, false);
    /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
    pricingPriceObject = pricingPriceCalculation(orderDetails, false);
    /* ------------------------ GET THE DISCOUNTS PRICE DETAILS ------------------------- */
    discountsPriceObject = discountPriceCalculation(orderDetails, false);
    /* ----------------------- GET THE DELIVERY PRICE DETAILS ----------------------- */
    deliveryPriceObject = deliveryPriceCalculation(orderDetails);

    const orderPriceObject = constructOrderPriceObject(
      partsPriceObject,
      pricingPriceObject,
      discountsPriceObject,
      deliveryPriceObject
    );

    return orderPriceObject;
  }
};

/* -------------------------------- CONSTRUCT ORDER PRICE OBJECT -------------------------------- */
const constructOrderPriceObject = (
  partsPriceObject,
  pricingPriceObject,
  discountsPriceObject,
  deliveryPriceObject
) => {
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

const cumulativeOrderValueByOrderStatus = (orderStatus, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsArrayByOrderStatus(orderStatus)
        .then(orderArray => {
          let filteredOrderArray = [];
          let cumulativeOrderValue = 0;
          let promiseArray = [];

          for (let i = 0; i < orderArray.length; i++) {
            promiseArray.push(getOrderPrice(orderArray[i].orderNumber));
          }

          Promise.all(promiseArray)
            .then(orderPriceObjectArray => {
              for (let i = 0; i < orderPriceObjectArray.length; i++) {
                const orderPriceObject = orderPriceObjectArray[i];
                let orderPrice = 0;
                let date = "";
                if (orderStatus == "Awaiting Quote") {
                  return;
                } else if (orderStatus == "Awaiting Payment") {
                  date = orderArray[i].creationDate;
                } else if (orderStatus == "Awaiting Payment Confirmation") {
                  date = orderArray[i].creationDate;
                } else if (orderStatus == "Printing Order") {
                  date = orderArray[i].paymentConfirmationDate;
                } else if (orderStatus == "Ready for Pickup") {
                  date = orderArray[i].paymentConfirmationDate;
                } else if (orderStatus == "Order Picked Up") {
                  date = orderArray[i].orderDeliveryDate;
                } else if (orderStatus == "Ready for Shipping") {
                  date = orderArray[i].paymentConfirmationDate;
                } else if (orderStatus == "Order Shipped") {
                  date = orderArray[i].orderDeliveryDate;
                } else if (orderStatus == "Order Completed") {
                  date = orderArray[i].orderCompletionDate;
                } else if (orderStatus == "Requesting Refund") {
                  date = orderArray[i].creationDate;
                } else if (orderStatus == "Refund Approved") {
                  date = orderArray[i].processDate;
                } else if (orderStatus == "Refund Declined") {
                  date = orderArray[i].processDate;
                } else if (orderStatus == "Refund Processed") {
                  date = orderArray[i].processDate;
                }

                orderPrice = orderPriceObject.orderPrice;
                cumulativeOrderValue += orderPrice;

                filteredOrderArray.push(
                  new CumulativeOrderValueOrderDetailsObject(
                    orderArray[i].orderNumber,
                    orderArray[i].orderStatus,
                    date,
                    orderPrice
                  )
                );
              }

              const cumulativeOrderValueObject = new CumulativeOrderValueObject(
                filteredOrderArray,
                cumulativeOrderValue
              );

              resolve(cumulativeOrderValueObject);
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  } else {
    orderDetailsArray = getOrderDetailsArrayByOrderStatus(orderStatus, false)
      .content;
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
      } else if (orderStatus == "Order Completed") {
        date = orderDetailsArray[i].orderCompletionDate;
      } else if (orderStatus == "Requesting Refund") {
        date = orderDetailsArray[i].creationDate;
      } else if (orderStatus == "Refund Approved") {
        date = orderDetailsArray[i].processDate;
      } else if (orderStatus == "Refund Declined") {
        date = orderDetailsArray[i].processDate;
      } else if (orderStatus == "Refund Processed") {
        date = orderDetailsArray[i].processDate;
      }

      const orderPriceObject = getOrderPrice(orderDetailsArray[i].orderNumber);

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
  }
};

/* ------------------- CUMULATIVE ORDER VALUE BY ORDER STATUS AND DATE RANGE -------------------- */

const cumulativeOrderValueByOrderStatusAndDateRange = (
  orderStatus,
  startDate,
  endDate,
  promise
) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsArrayByOrderStatus(orderStatus)
        .then(orders => {
          let filteredOrders = [];
          let cumulativeOrderValue = 0;
          let promises = [];

          for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            promises.push(getOrderPrice(order.orderNumber));
          }

          Promise.all(promises)
            .then(orderPrices => {
              for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                /* ----------------------------- FILTERED ORDER CONTENTS ------------------------------ */
                const orderNumber = order.orderNumber;
                const orderStatus = order.orderStatus;
                let date;
                let orderPrice;
                if (orderStatus != "Awaiting Quote") {
                  orderPrice = orderPrices[i].orderPrice;
                } else {
                  orderPrice = 0;
                }

                if (orderStatus == "Awaiting Quote") {
                  date = order.creationDate;
                } else if (orderStatus == "Awaiting Payment") {
                  date = order.creationDate;
                } else if (orderStatus == "Awaiting Payment Confirmation") {
                  date = order.creationDate;
                } else if (orderStatus == "Printing Order") {
                  date = order.paymentConfirmationDate;
                } else if (orderStatus == "Ready for Pickup") {
                  date = order.paymentConfirmationDate;
                } else if (orderStatus == "Order Picked Up") {
                  date = order.orderDeliveryDate;
                } else if (orderStatus == "Ready for Shipping") {
                  date = order.paymentConfirmationDate;
                } else if (orderStatus == "Order Shipped") {
                  date = order.orderDeliveryDate;
                } else if (orderStatus == "Order Completed") {
                  date = order.orderCompletionDate;
                } else if (orderStatus == "Requesting Refund") {
                  date = order.creationDate;
                } else if (orderStatus == "Refund Approved") {
                  date = order.processDate;
                } else if (orderStatus == "Refund Declined") {
                  date = order.processDate;
                } else if (orderStatus == "Refund Processed") {
                  date = order.processDate;
                }

                if (isDateWithinRange(date, startDate, endDate)) {
                  const filteredOrder = {
                    orderNumber,
                    orderStatus,
                    date,
                    orderPrice
                  };
                  cumulativeOrderValue += orderPrice;
                  filteredOrders.push(filteredOrder);
                }
              }
              resolve(
                new CumulativeOrderValueObject(
                  filteredOrders,
                  cumulativeOrderValue
                )
              );
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  } else {
    orderDetailsArray = getOrderDetailsArrayByOrderStatus(orderStatus, false)
      .content;
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
      } else if (orderStatus == "Order Completed") {
        date = orderDetailsArray[i].orderCompletionDate;
      } else if (orderStatus == "Requesting Refund") {
        date = orderDetailsArray[i].creationDate;
      } else if (orderStatus == "Refund Approved") {
        date = orderDetailsArray[i].processDate;
      } else if (orderStatus == "Refund Declined") {
        date = orderDetailsArray[i].processDate;
      } else if (orderStatus == "Refund Processed") {
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
  }
};

/* ---------------------------- CUMULATIVE ORDER VALUE BY DATE RANGE ---------------------------- */

const cumulativeOrderValueByDateRange = (startDate, endDate, promise) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      getOrderDetailsArray().then(orders => {
        let filteredOrders = [];
        let cumulativeOrderValue = 0;
        let promises = [];

        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          promises.push(getOrderPrice(order.orderNumber));
        }

        Promise.all(promises)
          .then(orderPrices => {
            for (let i = 0; i < orders.length; i++) {
              const order = orders[i];
              /* ----------------------------- FILTERED ORDER CONTENTS ------------------------------ */
              const orderNumber = order.orderNumber;
              const orderStatus = order.orderStatus;
              let date;
              let orderPrice;
              if (orderStatus != "Awaiting Quote") {
                orderPrice = orderPrices[i].orderPrice;
              } else {
                orderPrice = 0;
              }

              if (orderStatus == "Awaiting Quote") {
                date = order.creationDate;
              } else if (orderStatus == "Awaiting Payment") {
                date = order.creationDate;
              } else if (orderStatus == "Awaiting Payment Confirmation") {
                date = order.creationDate;
              } else if (orderStatus == "Printing Order") {
                date = order.paymentConfirmationDate;
              } else if (orderStatus == "Ready for Pickup") {
                date = order.paymentConfirmationDate;
              } else if (orderStatus == "Order Picked Up") {
                date = order.orderDeliveryDate;
              } else if (orderStatus == "Ready for Shipping") {
                date = order.paymentConfirmationDate;
              } else if (orderStatus == "Order Shipped") {
                date = order.orderDeliveryDate;
              } else if (orderStatus == "Order Completed") {
                date = order.orderCompletionDate;
              } else if (orderStatus == "Requesting Refund") {
                date = order.creationDate;
              } else if (orderStatus == "Refund Approved") {
                date = order.processDate;
              } else if (orderStatus == "Refund Declined") {
                date = order.processDate;
              } else if (orderStatus == "Refund Processed") {
                date = order.processDate;
              }

              if (isDateWithinRange(date, startDate, endDate)) {
                const filteredOrder = {
                  orderNumber,
                  orderStatus,
                  date,
                  orderPrice
                };
                cumulativeOrderValue += orderPrice;
                filteredOrders.push(filteredOrder);
              }
            }
            resolve(filteredOrders);
          })
          .catch(error => reject(error));
      });
    });
  } else {
  }
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
