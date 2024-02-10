import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: true,
    },
    Apellido: {
      type: String,
      required: true,
    },
    Cedula: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);
