const Note = require('../models/notesModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// get all notes: this function is responsible for get all the notes a particular user have created
const getAllNotes = async (req, res) => {
  const { userId } = req.user;
  const notes = await Note.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ notes });
};
// ****************************

// get single note: this function is responsible for geting a single note
const getSingleNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const note = await Note.findOne({ _id: id, createdBy: userId });
  if (!note) {
    throw new NotFoundError(`Can't find note with such id${id}`);
  }
  res.status(StatusCodes.OK).json({ note });
};
// ************************************
// create new note: this function is responsible for creating new notes
const createNote = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const note = await Note.create(req.body);
  res.status(StatusCodes.CREATED).json({ note });
};
// ***********************************
// edit note: this function is responsible for editing notes
const editNote = async (req, res) => {
  const { note } = req.body;
  const { id } = req.params;
  const { userId } = req.user;

  if (!note) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'You cant save an empty note' });
  }
  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedNote) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `please ensure your ${id} is correct` });
  }
  res.status(StatusCodes.OK).json({ updatedNote });
};
// **********************

// delete note: this function is responsible for delete notes on our server
const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const note = await Note.findOneAndDelete({ _id: id, createdBy: userId });

  if (!note) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'please ensure the id is correct' });
  }
  res.status(StatusCodes.OK).json({ note });
};
// *************************

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  editNote,
  deleteNote,
};
