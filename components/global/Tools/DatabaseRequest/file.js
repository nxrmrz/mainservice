/* ================================== GET PART'S FILE DETAILS =================================== */

const getFileDetails = (fileId, promise) => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/file/get-file-details/file-id",
        contentType: "application/json",
        data: JSON.stringify({ fileId }),
        success: data => {
          if (data.status == "success") {
            resolve(data.content);
          } else if (data.status == "failed") {
            reject(data.content);
          } else {
            reject();
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
      url: "/file/get-file-details/file-id",
      contentType: "application/json",
      data: JSON.stringify({ fileId }),
      success: data => {
        retrievedData = data;
      }
    });

    return retrievedData;
  }
};

/* ========================== GET FILE DETAILS ARRAY BY FILE ID ARRAY =========================== */

const getFileDetailsArrayByFileIdArray = (fileIdArray, promise) => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/file/get-file-details/file-id-array",
        contentType: "application/json",
        data: JSON.stringify({ fileIdArray }),
        success: data => {
          if (data.status == "success") {
            resolve(data.content);
          } else if (data.status == "failed") {
            reject(data.content);
          } else {
            reject();
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
      url: "/file/get-file-details/file-id-array",
      contentType: "application/json",
      data: JSON.stringify({ fileIdArray }),
      success: data => {
        retrievedData = data;
      }
    });

    return retrievedData;
  }
};

/* ============================================================================================== */
