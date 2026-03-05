"use client";

import { signOut } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        const result = await signOut();

        if (result.data) {
          router.push("/login");
        } else {
          alert("Something went wrong!");
        }
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
