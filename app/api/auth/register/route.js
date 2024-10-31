import { Clerk } from "@clerk/nextjs/server";
import connectMongo from "@/lib/mongdb";
import User from "@/app/email-response/models/User";

export default async function POST(req, res) {
  const { username } = req.body;
  const clerk = Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

  console.log("username", username);
  try {
    // Verify user
    const { userId } = req.auth;
    await connectMongo();

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Save user in MongoDB
    const user = new User({ clerkUserId: userId, userName: username });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
}
