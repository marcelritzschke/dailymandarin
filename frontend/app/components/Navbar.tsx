import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-dark-subtle border-bottom">
      <div className="container">
        <Link href="/" className="navbar-brand">
          {/* <Image src="/madarin.png" alt="App Icon" width="30" height="30" className="d-inline-block align-top" /> */}
          DailyMandarin
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
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Deck
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/add-card/" className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/study/" className="nav-link">
                Study
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-primary">Sign In</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
