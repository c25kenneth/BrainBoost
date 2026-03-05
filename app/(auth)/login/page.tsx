"use client";

import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message ?? "Failed to Sign In");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Unexpected error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <Card className="w-full max-w-lg border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Login to Brainboost 🧠</CardTitle>
          <CardDescription className="text-md">
            Continue your educational journey
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Must be at least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>

            <p>
              New to Brainboost?{" "}
              <Link href={"/signup"} className="text-primary">
                Create an Account
              </Link>
            </p>

            <Button type="submit" className="w-full hover:cursor-pointer p-5">
              {loading ? "Signing In" : "Sign In"}
            </Button>

            <hr className="border-gray-300" />

            <div>
              <GoogleButton />
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Login;
