import type { Metadata } from "next";
import AppProviders from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Scholarly",
    template: "Scholarly - %s",
  },
  description:
    "Analyze multiple Google Scholar profiles and track citations, publications, and trends over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
