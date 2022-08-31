const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  getSingleNote,
  createNote,
  deleteNote,
  editNote,
} = require('../controllers/notesControllers');

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').patch(editNote).get(getSingleNote).delete(deleteNote);

module.exports = router;
