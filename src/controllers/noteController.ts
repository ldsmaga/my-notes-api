// src/controllers/noteController.ts
import { Request, Response } from "express";
import Note from "../models/Note";

export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllNotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
