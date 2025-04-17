import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    bedNumber: {
      type: String,
      unique: true,
      required: true,
    }
  }
);

module.exports = mongoose.model("Bed", bedSchema);