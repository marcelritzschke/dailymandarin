import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import { ThemeProvider } from "next-themes";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "Language Learning App",
  description: "A web app for learning vocabulary with flashcards",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en" data-bs-theme="system" suppressHydrationWarning>
      <body className="d-flex flex-column">
        <ClientProvider session={session}>
          <ThemeProvider attribute="data-bs-theme">
            <Navbar />
            <main className="mt-4 flex-grow-1 container mt-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </ClientProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
