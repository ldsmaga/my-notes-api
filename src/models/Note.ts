// src/models/note.ts
import mongoose, { Document, Schema } from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
  user: Schema.Types.ObjectId;
}

const noteSchema: Schema<INote> = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;
