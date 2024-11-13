import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Language Learning App",
  description: "A web app for learning vocabulary with flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="container mt-4 flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
