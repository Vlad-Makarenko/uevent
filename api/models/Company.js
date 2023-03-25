const mongoose = require('mongoose');

module.exports.companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    founded: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    logoUrl: String,
    websiteUrl: String,
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    versionKey: false,
  },
);
