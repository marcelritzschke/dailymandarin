import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-dark-subtle border-bottom">
      <div className="container">
        <Link href="/" className="navbar-brand">
          {/* <Image src="/madarin.png" alt="App Icon" width="30" height="30" className="d-inline-block align-top" /> */}
          <span style={{ color: "#A49371" }}>DailyMandarin</span>
        </Link>

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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item my-auto">
              <Link href="/" className="nav-link">
                Deck
              </Link>
            </li>
            <li className="nav-item my-auto">
              <Link href="/add-card/" className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item my-auto me-3">
              <Link href="/study/" className="nav-link">
                Study
              </Link>
            </li>
            <li className="nav-item my-auto me-2 ms-2">
              <Link href="#">
                <i className="bi bi-github"></i>
              </Link>
            </li>
            <li className="my-auto me-2 pt-1">
              <div className="vr"></div>
            </li>
            <li className="nav-item my-auto">
              <ThemeChanger />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
