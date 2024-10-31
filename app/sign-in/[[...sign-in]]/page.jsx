// import AuthPage from "@/app/email-response/components/AuthPage";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// // export default function SignInPage() {
// //   return <AuthPage />;
// // }
// export default function SignInPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const syncUser = async () => {
//     try {
//       const response = await fetch("/api/user", { method: "POST" });
//       if (!response.ok) {
//         throw new Error("Failed to synchronize user");
//       }
//     } catch (error) {
//       console.error("Error synchronizing user:", error);
//       // You might want to show an error message to the user here
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!username || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       const signInResult = await signIn.create({
//         identifier: username,
//         password,
//       });

//       if (signInResult.status === "complete") {

//         router.push("/dashboard");
//       } else {
//         setError(
//           "Sign in failed. Please check your credentials and try again."
//         );
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <Card className="w-[350px] mx-auto mt-10">
//       <CardHeader>
//         <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
//         <CardDescription>Enter your details to sign in.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="username">Username</Label>
//             <Input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" className="w-full">
//             Sign In
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter className="flex flex-col space-y-4">
//         <Button
//           onClick={handleGoogleSignIn}
//           variant="outline"
//           className="w-full"
//         >
//           Sign in with Google
//         </Button>
//         {/* <Button
//           onClick={() => setIsSignUp(!isSignUp)}
//           variant="link"
//           className="w-full"
//         >
//           {isSignUp
//             ? "Already have an account? Sign In"
//             : "Don't have an account? Sign Up"}
//         </Button> */}
//       </CardFooter>
//     </Card>
//   );
// }
"use client";
// import { useClerk } from "@clerk/nextjs";
// import { useState } from "react";

// export default function SignIn() {
//   const { signIn } = useClerk();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignIn = async () => {
//     try {
//       await signIn.authenticateWithRedirect({
//         username,
//         password,
//         redirect: "/dashboard",
//       });
//     } catch (error) {
//       setError("Sign-in failed. Please try again.");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn.authenticateWithRedirect({
//         strategy: "oauth_google",
//       });
//     } catch (error) {
//       setError("Google sign-in failed.");
//     }
//   };

//   return (
//     <div>
//       <h1>Sign In</h1>
//       {error && <p>{error}</p>}
//       <input
//         type="text"
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignIn}>Sign In</button>
//       <button onClick={handleGoogleSignIn}>Sign In with Google</button>
//     </div>
//   );
// }
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const { signUp } = useClerk();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const createdUser = await signUp.create({
        username,
        password,
        redirectUrl: "/sign-in",
      });

      // Call our API to register the user in MongoDB
      await axios.post("/api/auth/register", { username });
    } catch (error) {
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="flex  items-center px-4 container mx-auto mt-10">
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
