// // app/api/user/route.ts
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";
// import clientPromise from "@/lib/mongdb";
// import User from "@/models/User";

// export async function POST() {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     clientPromise; // Ensure MongoDB connection is established

//     const clerkUser = await auth().getUser(userId);

//     let user = await User.findOne({ clerkUserId: userId });

//     if (!user) {
//       // Create new user
//       const userData = {
//         clerkUserId: userId,
//         username: clerkUser.username,
//       };

//       // Only add email if it's available
//       if (clerkUser.emailAddresses && clerkUser.emailAddresses.length > 0) {
//         userData.email = clerkUser.emailAddresses[0].emailAddress;
//       }

//       user = new User(userData);
//     } else {
//       // Update existing user
//       user.username = clerkUser.username;

//       // Update email only if it's available
//       if (clerkUser.emailAddresses && clerkUser.emailAddresses.length > 0) {
//         user.email = clerkUser.emailAddresses[0].emailAddress;
//       }
//     }

//     await user.save();

//     return NextResponse.json(
//       { message: "User synchronized successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error synchronizing user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
