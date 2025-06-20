import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scholarly",
  description: "A platform for monitoring and analyzing academic research performance using Google Scholar data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
