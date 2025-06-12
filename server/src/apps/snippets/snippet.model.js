import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      required: true,
      enum: ["Plain", "Code", "Rich Text"],
    },
    language: {
      type: String,
      required: function () {
        return this.flavor === "Code";
      },
      trim: true,
    },
    exposure: {
      type: String,
      required: true,
      enum: ["public", "unlisted", "private"],
      default: "public",
    },
    password: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// Index for better query performance
SnippetSchema.index({ exposure: 1, createdAt: -1 });
SnippetSchema.index({ author: 1, createdAt: -1 });

const Snippet = mongoose.model("Snippet", SnippetSchema);
export default Snippet;
