/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ==================================== GLOBAL VARIABLES ==================================== */

let gfs;

/* ========================================= EXPORT ========================================= */

module.exports = (app, passport, upload, conn) => {
  /* =============================== SET MONGOOSE CONNECTION ================================ */

  conn.once("open", () => {
    /* ---------------------------- ACCESS TO FILES ON DATABASE ----------------------------- */

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  /* ==================================== DOWNLOAD FILE ===================================== */

  // @route   GET /file/download/:fileId
  // @desc    Download File
  // @access  Private
  app.get("/file/download/:fileId", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */

    const fileId = mongoose.Types.ObjectId(req.params.fileId);

    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */

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

    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */

    downloadFile(res, query);
  });

  /* ============================= GET FILE DETAILS BY FILE ID ============================== */

  // @route   POST /file/get-file-details/file-id
  // @desc    Get File Details by File ID
  // @access  Private
  app.post("/file/get-file-details/file-id", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */

    const fileId = mongoose.Types.ObjectId(req.body.fileId);

    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */

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

    /* ----------------- ACCESS DATABASE AND SEND FILE DETAILS TO FRONT-END ----------------- */

    // Set the details that will be sent to front-end
    const filter = file => {
      return {
        fileName: file.filename,
        fileDetail: file.metadata
      };
    };

    getFileDetails(res, query, filter);
  });
};

/* ======================================== FUNCTION ======================================== */

/* ------------------------------------- DOWNLOAD FILE -------------------------------------- */

const downloadFile = (res, query) => {
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

/* ------------------------------------ GET FILE DETAILS ------------------------------------ */

const getFileDetails = (res, query, filter) => {
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

    if (filter) {
      const filteredDetails = filter(file);
      return res.send(filteredDetails);
    }

    res.send(file);
  });
};

/* -------------------------------------- DELETE FILE --------------------------------------- */

/* ======================================= MIDDLEWARE ======================================= */

/* ------------------------------------- GENERAL ACCESS ------------------------------------- */

const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};

/* -------------------------------------- ADMIN ACCESS -------------------------------------- */

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ========================================================================================== */
