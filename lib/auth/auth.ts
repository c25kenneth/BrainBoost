import { betterAuth } from "better-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true, 
    requireEmailVerification: false, 
  },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(), 
  });

  return result; 
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  }); 

  if (result.success) {
    redirect("/sign-in");
  }
}