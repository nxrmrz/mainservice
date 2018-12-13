/* ================================== GET PART'S FILE DETAILS =================================== */

const getFileDetails = fileId => {
  let fileDetails;

  $.ajax({
    type: "POST",
    async: false,
    url: "/file/get-file-details/file-id",
    contentType: "application/json",
    data: JSON.stringify({ fileId }),
    success: data => {
      fileDetails = data;
    }
  });

  return fileDetails;
};

/* ============================================================================================== */
