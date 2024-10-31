// import AuthPage from "@/app/email-response/components/AuthPage";

// export default function SignInPage() {
//   return <AuthPage />;
// }

// export default function SignUpPage() {
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
// import axios from "axios";

// export default function SignUp() {
//   const { signUp } = useClerk();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   console.log("username", username);
//   console.log("password", password);

//   const handleSignUp = async () => {
//     try {
//       const createdUser = await signUp.create({
//         username,
//         password,
//         // redirectUrl: "/sign-in",
//       });
//       if (createdUser.status === "complete") {
//         // Account was created successfully
//         router.push("/dashboard");
//         console.log("created user", createdUser);
//       }
//       // Call our API to register the user in MongoDB
//       await axios.post("/api/auth/register", { username });
//     } catch (error) {
//       setError("Sign-up failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center px-4 container mx-auto mt-10">
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
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// }
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const { signUp } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate inputs
      if (!formData.username || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      // Create user in Clerk
      const result = await signUp.create({
        username: formData.username,
        password: formData.password,
      });

      // Handle the sign-up result
      if (result.status === "complete") {
        // Create user in your MongoDB
        await axios.post("/api/auth/register", {
          username: formData.username,
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } else if (result.status === "missing_requirements") {
        throw new Error("Please complete all required fields");
      } else {
        throw new Error("Sign up failed. Please try again.");
      }
    } catch (err) {
      // Handle specific Clerk errors
      if (err.errors && err.errors[0]) {
        setError(err.errors[0].message);
      } else {
        setError(err.message || "An error occurred during sign up");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              disabled={isLoading}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
