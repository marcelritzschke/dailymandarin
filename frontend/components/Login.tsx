"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

const Login: React.FC = () => {
  const { data: session, status } = useSession();

  if (session && session.user && status === "authenticated") {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger className="border-0 d-flex justify-content-center rounded-circle">
            <Avatar.Root>
              {/* TODO: Add Fallback user icon */}
              <Avatar.Image
                className="d-flex justify-content-center rounded-circle"
                style={{ height: "1.25rem" }}
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? "username"}
                onClick={() => signOut()}
              />
              <Avatar.Fallback
                className="d-flex justify-content-center rounded-circle bg-secondary align-items-center fs-6"
                style={{ height: "1.25rem", width: "1.25rem" }}
              >
                {(session.user?.name ?? "O").substring(0, 1)}
              </Avatar.Fallback>
            </Avatar.Root>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom" className="tooltip-content p-1 rounded-1">
            <Tooltip.Arrow className="tooltip-arrow" />
            Logged in as {session.user?.name ?? "Github User"}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return (
    <Link href="#" onClick={() => signIn("github")}>
      <i className="bi bi-github"></i>
    </Link>
  );
};

export default Login;
