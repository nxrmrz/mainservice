/* =================================== GET LEVEL OBJECT ARRAY =================================== */

const getLevelObjectArray = promise => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/level/get-level-object-array",
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
      url: "/level/get-level-object-array",
      success: data => {
        retrievedData = data;
      }
    });
    return retrievedData;
  }
};

/* ============================================================================================== */
