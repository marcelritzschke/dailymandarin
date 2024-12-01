"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const ThemeChanger: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  // TODO: still flickering, check https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  let resolvedTheme: string;
  switch (theme) {
    case "light":
      resolvedTheme = "light";
      break;
    case "dark":
      resolvedTheme = "dark";
      break;
    default:
      resolvedTheme = "dark";
      break;
  }

  return (
    <div className="dropdown">
      <Link href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
        {resolvedTheme == "light" ? (
          <i className="bi bi-brightness-high"></i>
        ) : (
          <i className="bi bi-moon-stars-fill"></i>
        )}
      </Link>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a
            href=""
            className={`dropdown-item ${resolvedTheme == "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <i className="bi bi-brightness-high me-2"></i>
            <span className="me-3">Light</span>
            {resolvedTheme == "light" && <i className="bi bi-check2"></i>}
          </a>
        </li>
        <li>
          <a
            href=""
            className={`dropdown-item ${resolvedTheme == "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <i className="bi bi-moon-stars-fill me-2"></i>
            <span className="me-3">Dark</span>
            {resolvedTheme == "dark" && <i className="bi bi-check2"></i>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ThemeChanger;
