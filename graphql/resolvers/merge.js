const Event = require("../../models/event");
const User = require("../../models/user");
const { toDateString } = require("../../helpers/date");

const events = async (eventIds) => {
  try {
    events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const user = async (userId) => {
  try {
    const creator = await User.findById(userId);
    return {
      ...creator._doc,
      _id: creator._id,
      createdEvents: events.bind(this, creator._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event._id,
    creator: user.bind(this, event._doc.creator),
    date: toDateString(event._doc.date),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: toDateString(booking._doc.createdAt),
    updatedAt: toDateString(booking._doc.updatedAt),
  };
};

// exports.user = user;
// exports.singleEvent = singleEvent;
// exports.events = events;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
