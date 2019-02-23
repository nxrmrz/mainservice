/* ================================ DECLARE FILE OBJECT ================================ */

let FileModel = {};

/* =================================== DOWNLOAD FILE =================================== */

FileModel.downloadFile = function(gfs, res, query) {
  gfs.files.findOne(query, (err, file) => {
    // CHECK IF ERROR WHILE QUERYING DATABASE

    if (err) {
      res.status(500).json({ error: "error was found while fetching file" });
    }

    // CHECK IF A FILE IS FOUND

    if (!file) {
      return res.status(404).json({
        error: "no file was found"
      });
    }

    // IF FILE EXIST, EXECUTE THE CODE BELOW

    // Stream data out of GridFS
    const readstream = gfs.createReadStream(file.filename);

    // Set header
    res.set({
      "content-disposition": "attachment; filename=" + file.filename,
      "content-type": "application/octet-stream"
    });

    // Send response to front-end
    readstream.pipe(res);
  });
};

/* =========================== GET FILE DETAILS ARRAY (FIND) =========================== */

FileModel.getFileDetailsArray = function(
  gfs,
  res,
  query,
  filter,
  method,
  object
) {
  return gfs.files.find(query).toArray((error, fileDetailsArray) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching File Details"
      });
    }

    if (!fileDetailsArray) {
      return res.send({
        status: "failed",
        content: "404: No File Details Found"
      });
    }

    if (filter) {
      let filteredFileDetailsArray;
      for (let i = 0; i < fileDetailsArray.length; i++) {
        filteredFileDetailsArray.push(filter(fileDetailsArray[i]));
      }
      return res.send({
        status: "success",
        content: filteredFileDetailsArray
      });
    }

    if (method) {
      return method(fileDetailsArray, object);
    }

    return res.send({
      status: "success",
      content: fileDetailsArray
    });
  });
};

/* ============================ GET FILE DETAILS (FIND ONE) ============================ */

FileModel.getFileDetails = function(gfs, res, query, filter, method, object) {
  return gfs.files.findOne(query, (error, fileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching File Details"
      });
    }

    if (!fileDetails) {
      return res.send({
        status: "failed",
        content: "404: No File Details Found"
      });
    }

    if (filter) {
      const filteredFileDetails = filter(fileDetails);
      return res.send({
        status: "success",
        content: filteredFileDetails
      });
    }

    if (method) {
      return method(fileDetails, object);
    }

    return res.send({
      status: "success",
      content: fileDetails
    });
  });
};

/* =============================== UPDATE FILE METADATA ================================ */

FileModel.updateFileDetails = function(
  gfs,
  res,
  query,
  update,
  filter,
  method,
  object
) {
  return gfs.files.findOneAndUpdate(query, update, (error, fileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching File Details"
      });
    }

    if (!fileDetails) {
      return res.send({
        status: "failed",
        content: "404: No File Details Found"
      });
    }

    if (filter) {
      const filteredFileDetails = filter(fileDetails);
      return res.send({
        status: "success",
        content: filteredFileDetails
      });
    }

    if (method) {
      return method(fileDetails, object);
    }

    return res.send({
      status: "success",
      content: fileDetails
    });
  });
};

/* ====================================== EXPORT ======================================= */

module.exports = FileModel;

/* ===================================================================================== */
