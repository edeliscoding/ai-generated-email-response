import mongoose from "mongoose";

const emailResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  context: String,
  tone: String,
  response: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const emailResponse =
  mongoose.models.EmailResponse ||
  mongoose.model("EmailResponse", emailResponseSchema);

export default emailResponse;
