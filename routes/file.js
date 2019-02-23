/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ======================================== IMPORTS ========================================= */

const FileModel = require("../models/File");
// Load User Profile Model
const Profile = require("../models/UserProfile");

/* ========================================= EXPORT ========================================= */

module.exports = (app, passport, upload, conn) => {
  /* ================================ SET MONGODB CONNECTION ================================ */

  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  /* =============================== DOWNLOAD FILE BY FILE ID =============================== */

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
    FileModel.downloadFile(gfs, res, query);
  });

  /* ======================= GET FILE DETAILS ARRAY BY FILE ID ARRAY ======================== */

  // @route   POST /file/get-file-details/file-id-array
  // @desc    Get File Details by File ID Array
  // @access  Private
  app.post(
    "/file/get-file-details/file-id-array",
    restrictedPages,
    (req, res) => {
      /* ----------------------- ASSIGNING AND SIMPLIFYING VARIABLES ------------------------ */
      const fileIdArray = req.body.fileIdArray.map(fileId =>
        mongoose.Types.ObjectId(fileId)
      );
      /* ------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE -------------------- */
      let query;
      if (req.user.accountType == "admin") {
        // ADMIN ACCESS
        query = {};
      } else {
        // USER ACCESS
        query = {
          "metadata.ownerId": req.user._id
        };
      }
      /* --------------------------------- SET DUMMY FILTER --------------------------------- */
      const filter = undefined;
      /* ------------------------------------ SET METHOD ------------------------------------ */
      const method = (fileDetailsArray, object) => {
        const fileIdArray = object.fileIdArray;
        let newFileDetailsArray = [];

        for (let i = 0; i < fileIdArray.length; i++) {
          const fileDetails = fileDetailsArray.filter(
            fileDetails => String(fileDetails._id) == String(fileIdArray[i])
          )[0];

          newFileDetailsArray.push(fileDetails);
        }

        return res.send({
          status: "success",
          content: newFileDetailsArray
        });
      };
      /* ------------------------------------ SET OBJECT ------------------------------------ */
      const object = { fileIdArray };
      /* ---------------- ACCESS DATABASE AND SEND FILE DETAILS TO FRONT-END ---------------- */
      FileModel.getFileDetailsArray(gfs, res, query, filter, method, object);
    }
  );

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
    /* ------------------------------------- SET FILTER ------------------------------------- */
    // Set the details that will be sent to front-end
    const filter = file => {
      return {
        fileName: file.filename,
        fileDetail: file.metadata
      };
    };
    /* ----------------- ACCESS DATABASE AND SEND FILE DETAILS TO FRONT-END ----------------- */
    FileModel.getFileDetails(gfs, res, query, filter);
  });

  /* =================================== PROFILE PICTURE ==================================== */

  // @route   POST /upload/profile-picture
  // @desc    Get File Details by File ID
  // @access  Private
  app.post(
    "/upload/profile-picture",
    upload.single("uploadProfilePicture"),
    restrictedPages,
    (req, res) => {
      const file = req.file;
      const user = req.user;
      const profilePicture = {
        id: file.id,
        name: file.filename
      };

      Profile.findOne({ ownerId: user._id }, (error, profile) => {
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Fetching Profile"
          });
        }

        if (!profile) {
          return res.send({
            status: "failed",
            content: "404: No Profile Found"
          });
        }

        if (profile.profilePicture) {
          fileId = mongoose.Types.ObjectId(profile.profilePicture.id);
          gfs.remove({ _id: fileId }, error => {
            if (error) {
              return res.send({
                status: "failed",
                content: "500: Error Found when Deleting Profile Picture"
              });
            }
            profile.profilePicture = profilePicture;

            profile.save((error, updatedProfile) => {
              // Check if error occured while saving new print order
              if (error) {
                return res.send({
                  status: "failed",
                  content: "500: Error Found when Saving New Updates of Profile"
                });
              }

              // If successfully saved
              return res.send({
                status: "success",
                content: updatedProfile
              });
            });
          });
        } else {
          profile.profilePicture = profilePicture;

          profile.save((error, updatedProfile) => {
            // Check if error occured while saving new print order
            if (error) {
              return res.send({
                status: "failed",
                content: "500: Error Found when Saving New Updates of Profile"
              });
            }

            // If successfully saved
            return res.send({
              status: "success",
              content: updatedProfile
            });
          });
        }
      });
    }
  );

  /* ================================= GET PROFILE PICTURE ================================== */

  // @route   GET /profile-picture/:id
  // @desc    Get Profile Picture
  // @access  Private
  app.get("/profile-picture/:id", restrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    gfs.files.findOne({ _id: id }, (error, file) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Retrieving Profile Picture"
        });
      }
      if (!file) {
        return res.send({
          status: "failed",
          content: "404: No Profile Picture"
        });
      }
      /* ------------------------------ READ OUTPUT TO BROWSER ------------------------------ */
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
};

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
