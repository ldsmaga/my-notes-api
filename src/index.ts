import express from "express";
import connectDB from "./config/db";
import * as noteController from "./controllers/noteController";
import cors from "cors";

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.post("/notes", noteController.createNote);
app.get("/notes", noteController.getAllNotes);
app.get("/notes/:id", noteController.getNoteById);
app.put("/notes/:id", noteController.updateNote);
app.delete("/notes/:id", noteController.deleteNote);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
