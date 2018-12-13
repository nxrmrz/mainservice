const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

/* ============================= CREATE PRINT ORDER SCHEMA ============================= */

const UserProfileSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  firstName: {
    type: String
  },
  middleNames: {
    type: String
  },
  lastName: {
    type: String
  },
  shippingAddress: {
    streetNumber: {
      type: String
    },
    streetName: {
      type: String
    },
    suburb: {
      type: String
    },
    city: {
      type: String
    },
    postcode: {
      type: String
    },
    country: {
      type: String
    }
  }
});

/* ====================================== EXPORT ======================================= */

module.exports = UserProfile = conn.model("userProfiles", UserProfileSchema);

/* ===================================================================================== */
