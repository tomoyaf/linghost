import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LingHost — AI Story Generator",
  description:
    "Generate AI-powered short stories with customizable atmosphere, style, and real-world inspiration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
