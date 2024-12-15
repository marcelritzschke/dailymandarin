"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { createUser, fetchUserByMail } from "./db/actions";

export async function handleGithubLogin() {
  const session = await getServerSession(authOptions);

  if (session && session.user && session.user.email && session.user.name) {
    const hasUser = await fetchUserByMail(session.user.email).then((user) => {
      return user !== undefined;
    });
    if (!hasUser) {
      await createUser(session.user.email, session.user.name);
    } else {
      console.log("User already existing...");
    }
  }
}
