const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

/* ============================= CREATE PRINT ORDER SCHEMA ============================= */

const PrintOrderSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  orderNumber: {
    type: Number
  },
  creationDate: {
    type: String
  },
  orderStatus: {
    type: String
  },
  lastUpdateDate: {
    type: String
  },
  paymentConfirmationDate: {
    type: String
  },
  orderDeliveryDate: {
    type: String
  },
  orderCompletionDate: {
    type: String
  },
  discounts: [
    {
      name: {
        type: String
      },
      code: {
        type: String
      },
      rate: {
        type: String
      },
      minOrderValue: {
        type: String
      },
      maxOrderValue: {
        type: String
      },
      startDate: {
        type: String
      },
      endDate: {
        type: String
      }
    }
  ],
  pickupBookingSchedule: {
    date: {
      type: String
    },
    month: {
      type: String
    },
    year: {
      type: String
    },
    hour: {
      type: String
    },
    minute: {
      type: String
    },
    period: {
      type: String
    }
  },
  parts: [
    {
      fileId: {
        type: String
      },
      fileName: {
        type: String
      },
      materialGroup: {
        type: String
      },
      process: {
        type: String
      },
      material: {
        type: String
      },
      orderQuantity: {
        type: Number
      },
      producedQuantity: {
        type: Number
      },
      quality: {
        type: String
      },
      strength: {
        type: String
      },
      color: {
        type: String
      }
    }
  ],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String
      },
      createdDate: {
        type: String
      }
    }
  ],
  requestRefundInformation: {
    reason: {
      type: String
    },
    bankDetails: {
      bankNumber: {
        type: String
      },
      branchNumber: {
        type: String
      },
      accountNumber: {
        type: String
      },
      suffixNumber: {
        type: String
      }
    },
    oldOrderStatus: {
      type: String
    },
    refundStatus: {
      type: String
    },
    processDate: {
      type: String
    },
    declineMessage: {
      type: String
    },
    refundCompletionDate: {
      type: String
    }
  },
  pricing: {
    type: String
  },
  delivery: {
    type: String
  },
  trackingNumber: {
    type: Array
  },
  ownerNote: {
    type: String
  },
  price: {
    type: Number
  },
  paymentStatus: {
    type: String
  },
  attachments: [
    {
      fileId: {
        type: String
      },
      fileName: {
        type: String
      }
    }
  ]
});

/* ================================== STATIC METHODS =================================== */

/* --------------------------------- CREATE NEW ORDER ---------------------------------- */

PrintOrderSchema.statics.createNewOrder = function(
  res,
  orderDetails,
  filter,
  method,
  object
) {
  return this.countDocuments({}, (error, count) => {
    if (error) {
      return res.send({
        status: "failed",
        content:
          "500: Error Found when Counting the Number of Historical Orders"
      });
    }

    // DECLARE AND DEFINE NEW ORDER VARIABLE
    let newPrintOrder = new PrintOrder();
    // Default/Does not require input
    newPrintOrder.orderNumber = count + 1; // The Order Number of the new order
    newPrintOrder.creationDate = new Date(); // Date of when the order is created
    newPrintOrder.lastUpdateDate = new Date(); // Update the date of last update
    // User input
    newPrintOrder.ownerId = orderDetails.ownerId; // The account ID of the owner
    newPrintOrder.orderStatus = orderDetails.orderStatus; // Set the new order's status
    newPrintOrder.parts = orderDetails.parts; // Set the parts associated with the order
    newPrintOrder.discounts = orderDetails.discounts; // Set the discounts associated with the order
    newPrintOrder.pricing = orderDetails.pricing; // Set the pricing option of the order
    newPrintOrder.delivery = orderDetails.delivery; // Set the method delivery of the order
    newPrintOrder.ownerNote = orderDetails.ownerNote; // If the customer left a note, add owner's note

    // SAVE NEW PRINT ORDER
    newPrintOrder.save((error, printOrder) => {
      // Check if error occured while saving new print order
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Saving New Print Order"
        });
      }

      if (filter) {
        const filteredPrintOrder = filter(printOrder);
        return res.send({
          status: "success",
          content: filteredPrintOrder
        });
      }

      if (method) {
        return method(printOrder, object);
      }

      // If successfully saved
      return res.send({
        status: "success",
        content: printOrder
      });
    });
  });
};

/* ----------------------------- GET ORDERS DETAILS (FIND) ----------------------------- */

PrintOrderSchema.statics.getOrderDetailsArray = function(
  res,
  query,
  filter,
  method,
  object
) {
  return this.find(query, (error, orderDetailsArray) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching Order Details"
      });
    }

    if (!orderDetailsArray) {
      return res.send({
        status: "failed",
        content: "404: No Order Details Found"
      });
    }

    if (filter) {
      let filteredOrderDetailsArray;
      for (let i = 0; i < orderDetailsArray.length; i++) {
        filteredOrderDetailsArray.push(filter(orderDetailsArray[i]));
      }
      return res.send({
        status: "success",
        content: filteredOrderDetailsArray
      });
    }

    if (method) {
      return method(orderDetailsArray, object);
    }

    return res.send({
      status: "success",
      content: orderDetailsArray
    });
  });
};

/* --------------------------- GET ORDER DETAILS (FIND ONE) ---------------------------- */

PrintOrderSchema.statics.getOrderDetails = function(
  res,
  query,
  filter,
  method,
  object
) {
  return this.findOne(query, (error, orderDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching Order Details"
      });
    }

    if (!orderDetails) {
      return res.send({
        status: "failed",
        content: "404: No Order Details Found"
      });
    }

    if (filter) {
      const filteredOrderDetails = filter(orderDetails);
      return res.send({
        status: "success",
        content: filteredOrderDetails
      });
    }

    if (method) {
      return method(orderDetails, object);
    }

    return res.send({
      status: "success",
      content: orderDetails
    });
  });
};

/* ------------------------------- UPDATE ORDER DETAILS -------------------------------- */

PrintOrderSchema.statics.updateOrderDetails = function(
  res,
  query,
  updateMethod,
  updateObject,
  filter,
  method,
  object
) {
  return this.findOne(query, (error, orderDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching Order Details"
      });
    }

    if (!orderDetails) {
      return res.send({
        status: "failed",
        content: "404: No Order Details Found"
      });
    }

    if (updateMethod) {
      return updateMethod(orderDetails, updateObject);
    }

    // Update order details
    for (let property in updateObject) {
      orderDetails[property] = updateObject[property];
    }

    orderDetails.save((error, updatedOrderDetails) => {
      // Check if error occured while saving new print order
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Saving New Updates of Order Details"
        });
      }

      if (filter) {
        const filteredUpdatedOrderDetails = filter(updatedOrderDetails);
        return res.send({
          status: "success",
          content: filteredUpdatedOrderDetails
        });
      }

      if (method) {
        return method(updatedOrderDetails, object);
      }

      // If successfully saved
      return res.send({
        status: "success",
        content: updatedOrderDetails
      });
    });
  });
};

/* ====================================== EXPORT ======================================= */

module.exports = PrintOrder = conn.model("printOrders", PrintOrderSchema);

/* ===================================================================================== */
