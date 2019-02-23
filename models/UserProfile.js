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
  summary: {
    points: {
      type: String
    },
    numberOfCompletedOrders: {
      type: String
    }
  },
  profilePicture: {
    id: {
      type: String
    },
    name: {
      type: String
    }
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
    unit: {
      type: String
    },
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
  },
  organisation: {
    companyName: {
      type: String
    },
    briefDescription: {
      type: String
    },
    getFeatured: {
      type: String
    }
  }
});

/* ================================== STATIC METHODS =================================== */

/* -------------------------- GET PROFILE DETAILS (FIND ONE) --------------------------- */

UserProfileSchema.statics.getProfileDetails = function(
  res,
  query,
  filter,
  method,
  object
) {
  return this.findOne(query, (error, profileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching Profile Details"
      });
    }

    if (!profileDetails) {
      return res.send({
        status: "failed",
        content: "404: No Profile Found"
      });
    }

    if (filter) {
      const filteredProfileDetails = filter(profileDetails);
      return res.send({
        status: "success",
        content: filteredProfileDetails
      });
    }

    if (method) {
      return method(profileDetails, object);
    }

    return res.send({
      status: "success",
      content: profileDetails
    });
  });
};

/* ------------------------------ UPDATE PROFILE DETAILS ------------------------------- */

UserProfileSchema.statics.updateProfileDetails = function(
  res,
  query,
  updateMethod,
  updateObject,
  filter,
  method,
  object
) {
  return this.findOne(query, (error, profileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching Profile Details"
      });
    }

    if (!profileDetails) {
      return res.send({
        status: "failed",
        content: "404: No Profile Details Found"
      });
    }

    if (updateMethod) {
      return updateMethod(profileDetails, updateObject);
    }

    // Update order details
    for (let property in updateObject) {
      profileDetails[property] = updateObject[property];
    }

    profileDetails.save((error, updatedProfileDetails) => {
      // Check if error occured while saving new print order
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Saving New Updates of Profile Details"
        });
      }

      if (filter) {
        const filteredUpdatedProfileDetails = filter(updatedProfileDetails);
        return res.send({
          status: "success",
          content: filteredUpdatedProfileDetails
        });
      }

      if (method) {
        return method(updatedProfileDetails, object);
      }

      // If successfully saved
      return res.send({
        status: "success",
        content: updatedProfileDetails
      });
    });
  });
};

/* ====================================== EXPORT ======================================= */

module.exports = UserProfile = conn.model("userProfiles", UserProfileSchema);

/* ===================================================================================== */
