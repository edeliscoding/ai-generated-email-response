import mongoose from "mongoose";
import emailResponse from "./EmailResponse.js";

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  emailResponses: [emailResponse],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const user = mongoose.models.User || mongoose.model("User", userSchema);
