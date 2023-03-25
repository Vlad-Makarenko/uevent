const mongoose = require('mongoose');

module.exports.eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String, // TODO: add default banner
    },
    location: {
      type: String,
      required: true,
    },
    startEvent: {
      type: Date,
      require: true,
    },
    endEvent: {
      type: Date,
      require: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    isPerformed: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    maxAttendees: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
