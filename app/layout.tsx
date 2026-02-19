import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zuvy",
  description: "Zuvy Mentor Dashboard — your platform for managing sessions and students.",
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
