const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
      min: 2,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide a user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
