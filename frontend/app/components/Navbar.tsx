import Link from "next/link";
import Image from "next/image"

export default function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark-subtle border-bottom">
        <div className="container-fluid">
          {/* Icon on the left */}
          <Link href="/" className="navbar-brand">
            <Image src="/madarin.png" alt="App Icon" width="30" height="30" className="d-inline-block align-top" />
          </Link>
  
          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Navbar Links */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Vocabulary List
                </Link>
              </li>
            </ul>
            {/* Sign in button */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-outline-primary ms-2">Sign In</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
