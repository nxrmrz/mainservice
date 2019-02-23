/* ========================================= MODULES ========================================== */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ========================================== MODELS ========================================== */

// Load PrintOrder Model
const PrintOrder = require("../models/PrintOrder");
// Load User Profile Model
const UserProfile = require("../models/UserProfile");

/* ========================================= IMPORTS ========================================== */

const FileModel = require("../models/File");

/* ========================================== EXPORT ========================================== */

module.exports = (app, passport, upload, conn) => {
  /* ================================= SET MONGODB CONNECTION ================================= */

  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  /* ================================ GET ORDER DETAILS ARRAY ================================= */

  // @route   POST /order/get-order-details-array
  // @desc    Get an array of order details
  // @access  Private
  app.post("/order/get-order-details-array", restrictedPages, (req, res) => {
    /* ------------------------- ASSIGNING AND SIMPLIFYING VARIABLES -------------------------- */
    const ownerId = req.user._id;
    /* --------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE ---------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = {};
    } else {
      // USER ACCESS
      query = { ownerId };
    }
    /* ------------------------ ACCESS DATABASE AND SEND TO FRONT-END ------------------------- */
    PrintOrder.getOrderDetailsArray(res, query);
  });

  /* ======================== GET ORDER DETAILS ARRAY BY ORDER STATUS ========================= */

  // @route   POST /order/get-order-details-array-by-order-status
  // @desc    Get an array of order details with the provided order status
  // @access  Private
  app.post(
    "/order/get-order-details-array-by-order-status",
    restrictedPages,
    (req, res) => {
      /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
      const orderStatus = req.body.orderStatus;
      const ownerId = req.user._id;
      /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
      let query;
      if (req.user.accountType == "admin") {
        // ADMIN ACCESS
        query = { orderStatus };
      } else {
        // USER ACCESS
        query = { orderStatus, ownerId };
      }
      /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
      PrintOrder.getOrderDetailsArray(res, query);
    }
  );

  /* =========================== GET ORDER DETAILS BY ORDER NUMBER ============================ */

  // @route   POST /order/get-order-details-by-order-number
  // @desc    Get an order details based on the provided order number
  // @access  Private
  app.post(
    "/order/get-order-details-by-order-number",
    restrictedPages,
    (req, res) => {
      /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
      const orderNumber = req.body.orderNumber;
      const ownerId = req.user._id;
      /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
      let query;
      if (req.user.accountType == "admin") {
        // ADMIN ACCESS
        query = { orderNumber };
      } else {
        // USER ACCESS
        query = { orderNumber, ownerId };
      }
      /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
      PrintOrder.getOrderDetails(res, query);
    }
  );

  /* ==================================== CHECK OWNERSHIP ===================================== */

  // @route   POST /order/check-ownership
  // @desc    Check if User is the Owner of the Order
  // @access  Private
  app.post("/order/check-ownership", restrictedPages, (req, res) => {
    /* ------------------------- ASSIGNING AND SIMPLIFYING VARIABLES -------------------------- */
    const orderNumber = req.body.orderNumber;
    const userId = req.user._id + "";
    /* --------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE ---------------------- */
    const query = { orderNumber };
    /* ------------------------------ SET DUMMY FILTER VARIABLE ------------------------------- */
    const filter = undefined;
    /* ---------------------- SET METHOD FOR VALIDATING ORDER OWNERSHIP ----------------------- */
    // Object
    const object = { userId };
    // Method
    const method = (orderDetails, object) => {
      const userId = object.userId;
      const ownerId = orderDetails.ownerId;

      if (ownerId === userId) {
        console.log("success");
        return res.send("true");
      } else {
        console.log("not owner");
        return res.send("failed");
      }
    };
    /* ------------------------ ACCESS DATABASE AND SEND TO FRONT-END ------------------------- */
    PrintOrder.getOrderDetails(res, query, filter, method, object);
  });

  /* ============================= 3D PRINT ORDERS RELATED ROUTES ============================= */

  // @route   GET /orders/:filename
  // @desc    Download the STL File
  // @access  Private
  app.get("/orders/:fileId", (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.fileId);
    gfs.files.findOne({ _id: id }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists"
        });
      }
      // File exists
      const readstream = gfs.createReadStream(file.filename);
      res.setHeader(
        "Content-disposition",
        "attachment; filename=" + file.filename
      );
      res.setHeader("Content-type", "application/octet-stream");
      readstream.pipe(res);
    });
  });

  // @route   POST /orderNewPrint/saveFile
  // @desc
  // @access  Private
  app.post(
    "/orderNewPrint/saveFile",
    upload.single("uploadModel"),
    restrictedPages,
    (req, res) => {
      // Create the New Order Properties Object
      const fileAdditionalInfo = {
        ownerId: req.user._id,
        fileType: "Order New Print",
        price: "pending",
        uploadDate: new Date(),
        lastUsed: new Date()
      };

      // Update the Metadata object with the New Order Properties
      gfs.files.findOneAndUpdate(
        { _id: req.file.id },
        { $set: { metadata: fileAdditionalInfo } },
        (err, doc) => {
          if (err) return console.log(err);
          res.send(doc.value._id);
        }
      );
    }
  );

  // @route   POST /orderNewPrint/createNewOrder
  // @desc
  // @access  Private
  app.post("/orderNewPrint/createNewOrder", restrictedPages, (req, res) => {
    console.log(req.body);

    const orderNewPrint = new PrintOrder();

    PrintOrder.countDocuments((err, count) => {
      if (err) return console.log(err);

      orderNewPrint.orderNumber = count + 1;

      // Set Variables
      orderNewPrint.ownerId = req.user._id;
      orderNewPrint.creationDate = new Date();
      orderNewPrint.orderStatus = "Awaiting Quote";
      orderNewPrint.lastUpdateDate = new Date();
      orderNewPrint.paymentConfirmationDate = "";
      orderNewPrint.orderDeliveryDate = "";
      orderNewPrint.pickupBookingSchedule = {};
      for (i = 0; i < req.body.partObjectArray.length; i++) {
        orderNewPrint.parts[i] = {
          fileId: req.body.partObjectArray[i].fileId,
          fileName: req.body.partObjectArray[i].fileName,
          materialGroup: req.body.partObjectArray[i].materialGroup,
          process: req.body.partObjectArray[i].process,
          material: req.body.partObjectArray[i].material,
          orderQuantity: req.body.partObjectArray[i].orderQuantity,
          producedQuantity: req.body.partObjectArray[i].producedQuantity,
          quality: req.body.partObjectArray[i].quality,
          strength: req.body.partObjectArray[i].strength,
          color: req.body.partObjectArray[i].color
        };
      }
      orderNewPrint.discounts = req.body.discountObjectArray;
      orderNewPrint.comments = [];
      orderNewPrint.pricing = req.body.pricing;
      orderNewPrint.delivery = req.body.delivery;
      orderNewPrint.ownerNote = req.body.additionalNote;
      orderNewPrint.attachments = [];

      orderNewPrint.save();

      res.send("Success");
    });
  });

  /* ================================== ORDER: ADD COMMENT ================================== */

  // @route   POST /order/comment
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/order/comment", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.order.orderNumber;
    const ownerId = req.body.order.ownerId;
    const userId = req.user._id;
    const comment = req.body.comment;
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { ownerId, orderNumber };
    /* --------------------------------- SET UPDATE METHOD ---------------------------------- */
    const updateMethod = (orderDetails, updateObject) => {
      const newComment = {
        userId: updateObject.userId,
        text: updateObject.comment,
        createdDate: new Date()
      };

      orderDetails.comments.push(newComment);
      orderDetails.lastUpdateDate = new Date();

      orderDetails.save().then(orderDetails => {
        return res.send({
          ownerId: orderDetails.ownerId,
          orderNumber: orderDetails.orderNumber
        });
      });
    };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = { userId, comment };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ==================================== ORDER COMMENTS ==================================== */

  // @route   POST /order/comments
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/order/comments", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    let commentDetailsObjects = [];
    /* ------------------------------------- SET QUERY -------------------------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* ------------------------------------- FIND ORDER ------------------------------------- */
    PrintOrder.findOne(query, (error, order) => {
      // CHECK IF ERROR FOUND WHEN FERCHING ORDER
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching Order"
        });
      }

      const comments = order.comments;

      // CHECK IF THE ORDER HAS NO COMMENT
      if (comments == 0 || !comments) {
        // Return an empty array of comment details
        return res.send({
          status: "success",
          content: commentDetailsObjects
        });
      }

      // IF THE ORDER HAS AT LEAST ONE COMMENT
      for (i = 0; i < comments.length; i++) {
        // Assigning and simplifying variables
        let firstname;
        let lastname;
        const date = order.comments[i].createdDate;
        const text = order.comments[i].text;
        let ownership;
        let availability;
        let id;
        const commentOwnerId = order.comments[i].userId;
        // FIND PROFILE
        UserProfile.findOne(
          {
            ownerId: commentOwnerId
          },
          (error, profile) => {
            // Check if error found when fetching profile
            if (error) {
              return res.send({
                status: "failed",
                content: "500: Error Found when Fetching Profile"
              });
            }
            // Check if no profile found
            if (!profile) {
              return res.send({
                status: "failed",
                content: "404: No Profile Found"
              });
            }

            // SET VARIABLE VALUES
            firstname = profile.firstName;
            lastname = profile.lastName;
            // Comment Ownership
            const userId = ownerId + "";
            const commentOwnerIdString = commentOwnerId + "";
            if (userId === commentOwnerIdString) {
              ownership = true;
            } else {
              ownership = false;
            }
            // Profile Picture
            if (profile.profilePicture) {
              availability = true;
              id = profile.profilePicture.id;
            } else {
              availability = false;
              id = "";
            }
            // CONSTRUCT COMMENT DETAILS
            const commentDetails = {
              user: {
                firstname,
                lastname
              },
              comment: {
                date,
                text,
                ownership
              },
              profilePicture: {
                availability,
                id
              }
            };
            // ADD COMMENT DETAILS TO THE COLLECTIVE ARRAY
            commentDetailsObjects.push(commentDetails);
            // CHECK IF ALL COMMENTS ARE PROCESSED
            if (commentDetailsObjects.length == comments.length) {
              return res.send({
                status: "success",
                content: commentDetailsObjects
              });
            }
          }
        );
      }
    });
  });

  /* ================================== BOOK A PICKUP TIME ================================== */

  // @route   POST /order/book-pickup
  // @desc    Book a Pickup Time
  // @access  Private
  app.post("/order/book-pickup", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    const pickupBookingSchedule = req.body.bookingFormInputs;
    const lastUpdateDate = new Date();
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query = { orderNumber, ownerId };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = { pickupBookingSchedule, lastUpdateDate };
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ================================= UPDATE ORDER STATUS ================================== */

  // @route   POST /order/update-order-status
  // @desc    Update Order Status
  // @access  Private
  app.post("/order/update-order-status", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderDetails = req.body.orderDetails;
    const orderNumber = orderDetails.orderNumber;
    const ownerId = req.user._id;
    const accountType = req.user.accountType;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = setUpdateOrderStatusUpdateObject(
      orderDetails,
      accountType
    );
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ======================================== REFUND ======================================== */

  // @route   POST /order/request-refund
  // @desc    Request Refund
  // @access  Private
  app.post("/order/request-refund", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    // Query
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    // Update
    const requestRefundInformation = req.body.refundRequestInformation;
    const orderStatus = "Requesting Refund";
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { orderNumber, ownerId };
    /* --------------------------------- SET UPDATE METHOD ---------------------------------- */
    const updateMethod = (orderDetails, updateObject) => {
      const oldOrderStatus = orderDetails.orderStatus;

      orderDetails.orderStatus = updateObject.orderStatus;
      orderDetails.requestRefundInformation =
        updateObject.requestRefundInformation;
      orderDetails.requestRefundInformation.oldOrderStatus = oldOrderStatus;
      orderDetails.lastUpdateDate = new Date();

      orderDetails.save((error, updateOrderDetails) => {
        // Check if error occured while saving new print order
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Saving New Updates of Order Details"
          });
        }

        const orderNumber = updateOrderDetails.orderNumber + "";

        res.send(orderNumber);
      });
    };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = { requestRefundInformation, orderStatus };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ==================================== CANCEL REFUND ===================================== */

  // @route   POST /order/cancel-refund
  // @desc    Cancel Refund
  // @access  Private
  app.post("/order/cancel-refund", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }

    PrintOrder.findOne(query, (error, orderDetails) => {
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

      /* -------------------------------- SET UPDATE OBJECT --------------------------------- */
      const updateObject = setCancelRefundRequestUpdateObject(orderDetails);
      /* ------------------------------- SET DUMMY VARIABLES -------------------------------- */
      const updateMethod = undefined;
      /* ---------------------- ACCESS DATABASE AND SEND TO FRONT-END ----------------------- */
      PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
    });
  });

  /* ==================================== PROCESS REFUND ==================================== */

  // @route   POST /order/process-refund
  // @desc    Request Refund
  // @access  Private
  app.post("/order/process-refund", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* --------------------------------- SET UPDATE METHOD ---------------------------------- */
    const updateMethod = (orderDetails, updateObject) => {
      orderDetails.orderStatus = updateObject.orderStatus;
      orderDetails.requestRefundInformation.refundCompletionDate =
        updateObject.refundCompletionDate;
      orderDetails.lastUpdateDate;

      orderDetails.save((error, updateOrderDetails) => {
        // Check if error occured while saving new print order
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Saving New Updates of Order Details"
          });
        }

        const orderNumber = updateOrderDetails.orderNumber + "";

        res.send(orderNumber);
      });
    };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = {
      orderStatus: "Refund Processed",
      refundCompletionDate: new Date(),
      lastUpdateDate: new Date()
    };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ================================ ADMIN: APPROVE REFUND ================================= */

  // @route   POST /admin/order/approve-refund
  // @desc    Approve Refund Request
  // @access  Admin
  app.post("/admin/order/approve-refund", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderDetails = req.body.order;
    const orderNumber = orderDetails.orderNumber;
    const orderStatus = "Refund Approved";
    const lastUpdateDate = new Date();
    // Request Refund Information
    let requestRefundInformation = orderDetails.requestRefundInformation;
    requestRefundInformation.refundStatus = "approved";
    requestRefundInformation.processDate = new Date();
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { orderNumber };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = {
      orderStatus,
      requestRefundInformation,
      lastUpdateDate
    };
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ================================ ADMIN: DELCINE REFUND ================================= */

  // @route   POST /admin/order/decline-refund
  // @desc    Decline Refund Request
  // @access  Admin
  app.post("/admin/order/decline-refund", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderDetails = req.body.order;
    const orderNumber = orderDetails.orderNumber;
    const orderStatus = "Refund Declined";
    const lastUpdateDate = new Date();
    // Request Refund Information
    let requestRefundInformation = orderDetails.requestRefundInformation;
    requestRefundInformation.refundStatus = "declined";
    requestRefundInformation.processDate = new Date();
    requestRefundInformation.declineMessage =
      req.body.declineInput.reasonForDecline;
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { orderNumber };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = {
      orderStatus,
      requestRefundInformation,
      lastUpdateDate
    };
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* =========================== UPDATE ORDER'S PRODUCED QUANTITY =========================== */

  // @route   POST /admin/part/update-produced-quantity
  // @desc    Update Produced Quantity
  // @access  Admin
  app.post(
    "/admin/part/update-produced-quantity",
    adminRestrictedPages,
    (req, res) => {
      console.log(req.body);
      /* ----------------------- ASSIGNING AND SIMPLIFYING VARIABLES ------------------------ */
      const producedQuantity = req.body.producedQuantity;
      const orderNumber = req.body.orderNumber;
      const partId = req.body.partId;
      /* ------------------------------------ SET QUERY ------------------------------------- */
      const query = { orderNumber };
      /* -------------------------------- SET UPDATE METHOD --------------------------------- */
      const updateMethod = (orderDetails, updateObject) => {
        const findPartIndex = element => {
          return element._id == updateObject.partId;
        };

        const partIndex = orderDetails.parts.findIndex(findPartIndex);

        orderDetails.parts[partIndex].producedQuantity =
          updateObject.producedQuantity;

        orderDetails.save((error, updatedOrderDetails) => {
          // Check if error occured while saving new print order
          if (error) {
            return res.send({
              status: "failed",
              content:
                "500: Error Found when Saving New Updates of Order Details"
            });
          }

          // If successfully saved
          return res.send({
            status: "success",
            content: updatedOrderDetails
          });
        });
      };
      /* -------------------------------- SET UPDATE OBJECT --------------------------------- */
      const updateObject = { producedQuantity, partId };
      /* ---------------------- ACCESS DATABASE AND SEND TO FRONT-END ----------------------- */
      PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
    }
  );

  /* ================================ UPDATE TRACKING NUMBER ================================ */

  // @route   POST /admin/order/update-tracking-number
  // @desc    Update Tracking Number
  // @access  Admin
  app.post(
    "/admin/order/update-tracking-number",
    adminRestrictedPages,
    (req, res) => {
      /* ----------------------- ASSIGNING AND SIMPLIFYING VARIABLES ------------------------ */
      const _id = mongoose.Types.ObjectId(req.body.orderId);
      const trackingNumber = req.body.trackingNumber;
      /* ------------------------------------ SET QUERY ------------------------------------- */
      const query = { _id };
      /* -------------------------------- SET UPDATE OBJECT --------------------------------- */
      const updateObject = { trackingNumber };
      /* ------------------------------- SET DUMMY VARIABLES -------------------------------- */
      const updateMethod = undefined;
      /* ---------------------- ACCESS DATABASE AND SEND TO FRONT-END ----------------------- */
      PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
    }
  );

  /* ==================================== SET PART PRICE ==================================== */

  // @route   POST /admin/part/set-price
  // @desc    Set Part's Price
  // @access  Admin
  app.post("/admin/part/set-price", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const _id = mongoose.Types.ObjectId(req.body.fileId);
    const price = req.body.partPrice;
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { _id };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const update = { $set: { "metadata.price": price } };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    FileModel.updateFileDetails(gfs, res, query, update);
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TO BE OPTIMISED ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /* =================================== PART'S FILE DETAILS ==================================== */

  // @route   POST /order/part/file-details
  // @desc    Fetch File Details
  // @access  Private
  app.post("/order/part/file-details", restrictedPages, (req, res) => {
    /* -------------------------- ASSIGNING AND SIMPLIFYING VARIABLES --------------------------- */
    const part = req.body;
    const fileId = mongoose.Types.ObjectId(part.fileId);
    /* ---------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE ----------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { _id: fileId };
    } else {
      // USER ACCESS
      query = {
        _id: fileId,
        "metadata.ownerId": req.user._id
      };
    }
    /* --------------------------- GET THE FILE DETAILS FROM DATABASE --------------------------- */
    gfs.files.findOne(query, (err, file) => {
      if (err) {
        console.log("Error Found when Fetching File Details");
        return res.send("failed");
      }

      if (!file) {
        console.log("No File Details Found");
        return res.send("failed");
      }

      return res.send(file);
    });
  });

  // @route   POST /order/price
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/order/price", restrictedPages, (req, res) => {
    /* -------------------------- ASSIGNING AND SIMPLIFYING VARIABLES --------------------------- */
    const _id = mongoose.Types.ObjectId(req.body.fileId);
    /* ---------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE ----------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { _id };
    } else {
      // USER ACCESS
      query = {
        _id,
        "metadata.ownerId": req.user._id
      };
    }
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    gfs.files.findOne(query, (error, file) => {
      if (error) {
        console.log("Error Found when Fetching File Details");
        return res.send("failed");
      }

      if (!file) {
        console.log("No File Details Found");
        return res.send("failed");
      }

      res.send(file.metadata.price);
    });
  });

  // @route   POST /admin/file-details
  // @desc    Get File Details
  // @access  Admin
  app.post("/admin/file-details", adminRestrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.fileId);

    gfs.files.findOne({ _id: id }, (err, file) => {
      if (err) throw err;

      if (!file) return res.send("No File Found");

      res.send(file);
    });
  });

  // @route   POST /order/owner-details
  // @desc    Fetch Order's Owner Details
  // @access  Private
  app.post("/order/owner-details", restrictedPages, (req, res) => {
    const order = req.body;
    const id = mongoose.Types.ObjectId(order.ownerId);

    if (req.user.accountType != "admin") {
      if (req.user._id != id) {
        console.log("Incorrect User");
        return res.send("failed");
      }
    }

    UserProfile.findOne({ ownerId: id }, (err, user) => {
      if (err) throw err;

      if (!user) {
        console.log("No User Found");
        res.send("failed");
        return;
      }

      res.send(user);
    });
  });
};

/* ========================================== FUNCTION ========================================== */

/* --------------------------- SET UPDATE ORDER STATUS UPDATE OBJECT ---------------------------- */

const setUpdateOrderStatusUpdateObject = (orderDetails, accountType) => {
  let updateObject;

  if (orderDetails.orderStatus == "Awaiting Quote" && accountType == "admin") {
    updateObject = {
      orderStatus: "Awaiting Payment",
      lastUpdateDate: new Date()
    };
  } else if (orderDetails.orderStatus == "Awaiting Payment") {
    updateObject = {
      orderStatus: "Awaiting Payment Confirmation",
      lastUpdateDate: new Date()
    };
  } else if (
    orderDetails.orderStatus == "Awaiting Payment Confirmation" &&
    accountType == "admin"
  ) {
    updateObject = {
      orderStatus: "Printing Order",
      paymentConfirmationDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (
    orderDetails.orderStatus == "Printing Order" &&
    accountType == "admin"
  ) {
    if (orderDetails.delivery == "Pickup") {
      updateObject = {
        orderStatus: "Ready for Pickup",
        lastUpdateDate: new Date()
      };
    } else {
      updateObject = {
        orderStatus: "Ready for Shipping",
        lastUpdateDate: new Date()
      };
    }
  } else if (orderDetails.orderStatus == "Ready for Pickup") {
    updateObject = {
      orderStatus: "Order Picked Up",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (orderDetails.orderStatus == "Order Picked Up") {
    updateObject = {
      orderStatus: "Order Completed",
      orderCompletionDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (
    orderDetails.orderStatus == "Ready for Shipping" &&
    accountType == "admin"
  ) {
    updateObject = {
      orderStatus: "Order Shipped",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (orderDetails.orderStatus == "Order Shipped") {
    updateObject = {
      orderStatus: "Order Completed",
      orderCompletionDate: new Date(),
      lastUpdateDate: new Date()
    };
  }

  return updateObject;
};

/* -------------------------- SET CANCEL REFUND REQUEST UPDATE OBJECT --------------------------- */

const setCancelRefundRequestUpdateObject = orderDetails => {
  let updateObject;

  const oldOrderStatus = orderDetails.requestRefundInformation.oldOrderStatus;

  if (oldOrderStatus == "Awaiting Payment Confirmation") {
    updateObject = {
      orderStatus: "Awaiting Payment Confirmation",
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Printing Order") {
    updateObject = {
      orderStatus: "Printing Order",
      paymentConfirmationDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Ready for Pickup") {
    updateObject = {
      orderStatus: "Ready for Pickup",
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Order Picked Up") {
    updateObject = {
      orderStatus: "Order Picked Up",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Ready for Shipping") {
    updateObject = {
      orderStatus: "Ready for Shipping",
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Order Shipped") {
    updateObject = {
      orderStatus: "Order Shipped",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  }

  return updateObject;
};

/* ========================================= MIDDLEWARE ========================================= */

// Route middleware to make sure a user is logged in
const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    loginStatus = true;
    return next();
  } else {
    loginStatus = false;
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ============================================================================================== */
