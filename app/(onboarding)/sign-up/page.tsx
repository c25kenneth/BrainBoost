import GitHubSignInButton from "@/components/GithubSignInBtn";
import GoogleSignInButton from "@/components/GoogleSignInBtn";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    try {
      const { data, error } = await authClient.signUp.email({
          name: "John Doe", // required
          email: "john.doe@example.com", // required
          password: "password1234", // required
          image: "https://example.com/image.png",
          callbackURL: "https://example.com/callback",
      });
    } catch (e) {
      console.error(e); 
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-2xl lg:min-w-lg p-8 shadow gap-y-4 mx-4">
        <div>
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="text-lg text-gray-600">
            Enter your information to create an account
          </p>
        </div>

        <div>
          <form>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-md text-black font-medium">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="
                    rounded-lg border border-gray-300
                    px-3 py-2
                    text-md
                    focus:outline-none focus:ring-2 focus:ring-gray-600
                  focus:border-gray-700
                  "
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <label className="text-md text-black font-medium">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    rounded-lg border border-gray-300
                    px-3 py-2
                    text-md
                    focus:outline-none focus:ring-2 focus:ring-gray-600
                  focus:border-gray-700
                  "
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <label className="text-md text-black font-medium">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="
                    rounded-lg border border-gray-300
                    px-3 py-2
                    text-md
                    focus:outline-none focus:ring-2 focus:ring-gray-600
                  focus:border-gray-700 "
                />
              </div>

              <button
                className="
                  mt-3
                  rounded-lg
                  bg-indigo-500 px-4 py-3
                  text-md font-medium text-white
                  hover:bg-indigo-600
                  hover:cursor-pointer
                  transition
                "
                type="submit"
              >
                Create an Account
              </button>
            </div>
          </form>

        </div>
          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <GoogleSignInButton />
          <GitHubSignInButton />
      </div>
    </div>
  );
};

export default SignUp;
