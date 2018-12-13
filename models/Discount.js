const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

/* ================================== DISCOUNT SCHEMA ================================== */

const DiscountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  rate: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  minOrderValue: {
    type: String,
    required: true
  },
  maxOrderValue: {
    type: String,
    required: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  }
});

/* ====================================== EXPORT ======================================= */

module.exports = Discount = conn.model("discounts", DiscountSchema);

/* ===================================================================================== */
