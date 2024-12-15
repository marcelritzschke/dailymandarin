"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

const SignInOut: React.FC = () => {
  const { data: session, status } = useSession();

  if (session && session.user && status === "authenticated") {
    return (
      <div className="dropdown">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger
              className="border-0 d-flex justify-content-center rounded-circle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <Avatar.Root>
                {/* TODO: Add Fallback user icon */}
                <Avatar.Image
                  className="d-flex justify-content-center rounded-circle"
                  style={{ height: "1.33rem" }}
                  src={session.user?.image ?? ""}
                  alt={session.user?.name ?? "username"}
                />
                <Avatar.Fallback
                  className="d-flex justify-content-center rounded-circle bg-secondary align-items-center fs-6"
                  style={{ height: "1.25rem", width: "1.25rem" }}
                >
                  {(session.user?.name ?? "O").substring(0, 1)}
                </Avatar.Fallback>
              </Avatar.Root>
            </Tooltip.Trigger>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    signOut({ callbackUrl: "/logout-callback" });
                  }}
                >
                  Log Out <i className="bi bi-box-arrow-right ms-1"></i>
                </a>
              </li>
            </ul>
            <Tooltip.Content side="bottom" className="tooltip-content p-1 rounded-1">
              <Tooltip.Arrow className="tooltip-arrow" />
              Logged in as {session.user?.name ?? "Github User"}
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    );
  } else {
    return (
      <button className="btn btn-primary" onClick={() => signIn("github", { callbackUrl: "/login-callback" })}>
        Sign In
      </button>
    );
  }
};

export default SignInOut;
