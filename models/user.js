const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
