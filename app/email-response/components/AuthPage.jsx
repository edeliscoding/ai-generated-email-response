"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isSignInLoaded || !isSignUpLoaded) return;

    try {
      if (isSignUp) {
        const signUpResult = await signUp.create({
          username,
          password,
        });

        if (signUpResult.status === "complete") {
          // Account was created successfully
          router.push("/dashboard");
        } else if (signUpResult.status === "needs_email_verification") {
          // Email verification is needed
          setError(
            "Please check your email to verify your account before signing in."
          );
        } else {
          // Handle other potential statuses
          setError("Sign up was not completed. Please try again.");
        }
      } else {
        const signInResult = await signIn.create({
          identifier: username,
          password,
        });

        if (signInResult.status === "complete") {
          router.push("/dashboard");
        } else {
          setError(
            "Sign in failed. Please check your credentials and try again."
          );
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred with Google Sign In. Please try again.");
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription>
          Enter your details to {isSignUp ? "create an account" : "sign in"}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full"
        >
          Sign in with Google
        </Button>
        <Button
          onClick={() => setIsSignUp(!isSignUp)}
          variant="link"
          className="w-full"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}
