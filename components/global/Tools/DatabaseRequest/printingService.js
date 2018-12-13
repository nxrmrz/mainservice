/* ================================== GET ORDER DETAILS ARRAY =================================== */

const getOrderDetailsArray = promise => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/order/get-order-details-array",
        success: data => {
          if (data.status === "failed") {
            reject(data.error);
          } else if (data.status === "success") {
            resolve(data.orderDetails);
          }
        }
      });
    });
  } else {
    /* ------------------------------- RUN FUNCTION SYNCHRONOUSLY ------------------------------- */
    let retrievedData;
    $.ajax({
      type: "POST",
      async: false,
      url: "/order/get-order-details-array",
      success: data => {
        retrievedData = data;
      }
    });
    return retrievedData;
  }
};

/* ========================== GET ORDER DETAILS ARRAY BY ORDER STATUS =========================== */

const getOrderDetailsArrayByOrderStatus = (orderStatus, promise) => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/order/get-order-details-array-by-order-status",
        contentType: "application/json",
        data: JSON.stringify({ orderStatus }),
        success: data => {
          if (data.status === "failed") {
            reject(data.error);
          } else if (data.status === "success") {
            resolve(data.orderDetailsArray);
          }
        }
      });
    });
  } else {
    /* ------------------------------- RUN FUNCTION SYNCHRONOUSLY ------------------------------- */
    let retrievedData;

    $.ajax({
      type: "POST",
      async: false,
      url: "/order/get-order-details-array-by-order-status",
      contentType: "application/json",
      data: JSON.stringify({ orderStatus }),
      success: data => {
        retrievedData = data;
      }
    });

    return retrievedData;
  }
};

/* ============================= GET ORDER DETAILS BY ORDER NUMBER ============================== */

const getOrderDetailsByOrderNumber = (orderNumber, promise) => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/order/get-order-details-by-order-number",
        contentType: "application/json",
        data: JSON.stringify({ orderNumber }),
        success: data => {
          if (data.status === "failed") {
            reject(data.error);
          } else if (data.status === "success") {
            resolve(data.orderDetails);
          }
        }
      });
    });
  } else {
    /* ------------------------------- RUN FUNCTION SYNCHRONOUSLY ------------------------------- */
    let retrievedData;
    $.ajax({
      type: "POST",
      async: false,
      url: "/order/get-order-details-by-order-number",
      contentType: "application/json",
      data: JSON.stringify({ orderNumber }),
      success: data => {
        retrievedData = data;
      }
    });
    return retrievedData;
  }
};

/* ============================================================================================== */
