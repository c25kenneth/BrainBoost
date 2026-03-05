import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  sourceType: "pdf" | "slides" | "image" | "youtube";
  sourceUrl?: string;
  fileKey?: string;
  rawText: string;
  summary: {
    tldr: string;
    keyConcepts: string[];
    formulas: string[];
    examTopics: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sourceType: {
      type: String,
      enum: ["pdf", "slides", "image", "youtube"],
      required: true,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    fileKey: {
      type: String,
      trim: true,
    },
    rawText: {
      type: String,
      required: true,
    },
    summary: {
      tldr: { type: String, default: "" },
      keyConcepts: { type: [String], default: [] },
      formulas: { type: [String], default: [] },
      examTopics: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

const Note: Model<INote> =
  mongoose.models.Note ?? mongoose.model<INote>("Note", NoteSchema);

export default Note;
