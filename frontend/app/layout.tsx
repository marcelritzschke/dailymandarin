import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" data-bs-theme="dark" suppressHydrationWarning>
      <body className="d-flex flex-column">
        <ThemeProvider attribute="data-bs-theme">
          <Navbar />
          <main className="mt-4 flex-grow-1 container mt-4">{children}</main>
          <Footer />
        </ThemeProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
