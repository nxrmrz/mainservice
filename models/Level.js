const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

/* =================================== DEFINE SCHEMA =================================== */

const LevelSchema = new Schema({
  level: {
    type: String,
    required: true
  },
  minPoints: {
    type: String,
    required: true
  },
  maxPoints: {
    type: String,
    required: true
  },
  benefits: {
    type: [String],
    default: []
  }
});

/* ================================== STATIC METHODS =================================== */

/* ------------------------------- SAVE NEW LEVEL OBJECT ------------------------------- */

LevelSchema.statics.saveLevelObject = function(res, levelObject) {
  // Defining and Simplifying Variables
  const level = levelObject.level;
  const minPoints = levelObject.minPoints;
  const maxPoints = levelObject.maxPoints;
  const benefits = levelObject.benefits;
  // Validate Variables

  // Construct the New Level Object
  const newLevelObject = new Level({
    level,
    minPoints,
    maxPoints,
    benefits
  });
  // Save New Level Object
  newLevelObject.save((error, levelObject) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Saving New Level Object"
      });
    }

    return res.send({
      status: "success",
      content: levelObject
    });
  });
};

/* --------------------------- GET LEVEL OBJECT ARRAY (FIND) --------------------------- */

LevelSchema.statics.getLevelObjectArray = function(res, query, filter) {
  return this.find(query, (error, levelObjectArray) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching Level Object Array"
      });
    }

    if (!levelObjectArray.length) {
      return res.send({
        status: "failed",
        content: "404: No Level Object Found"
      });
    }

    if (filter) {
      let filteredLevelObjectArray;
      for (let i = 0; i < levelObjectArray.length; i++) {
        filteredLevelObjectArray.push(filter(levelObjectArray[i]));
      }
      return res.send({
        status: "success",
        content: filteredLevelObjectArray
      });
    }

    return res.send({
      status: "success",
      content: levelObjectArray
    });
  });
};

/* ====================================== EXPORT ======================================= */

module.exports = Level = conn.model("levels", LevelSchema);

/* ===================================================================================== */
