import { db } from "../app.js";
import { nanoid } from "nanoid";
import Joi from "joi";

// validation schema
const schema = Joi.object().keys({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).required(),
});

// get all notes
export const getNotes = (req, res) => {
  const { notes } = db.data;
  return res.status(200).json(notes);
};

// get sngle note
export const getSingleNote = (req, res) => {
  const note = db.data.notes.find((p) => p.id === req.params.id);
  if (!note) {
    return res.status(400).json({ msg: "not found" });
  }
  return res.status(200).json(note);
};

// createt note
export const createNote = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({
      message: "Invalid request",
      data: req.body,
      error,
    });
  }

  const id = nanoid();
  db.data.notes.push({ ...req.body, id });
  await db.write();

  res.status(201).json({ ...req.body, id });
};

//update note
export const updateNote = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({
      message: "Invalid request",
      data: req.body,
      error,
    });
  }

  const note = db.data.notes.find((p) => p.id === req.params.id);
  if (!note) {
    return res.status(400).json({ msg: "not found" });
  }
  note.title = req.body.title;
  note.description = req.body.description;
  await db.write();

  res.status(200).json(note);
};

//delete note
export const deleteNote = async (req, res) => {
  const tempNotes = db.data.notes.filter((p) => p.id !== req.params.id);
  db.data.notes = tempNotes;
  await db.write();

  res.status(202).json({ msg: "deleted" });
};
