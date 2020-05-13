const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
