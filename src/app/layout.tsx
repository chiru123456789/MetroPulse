import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetroPulse | Transit Intelligence Platform",
  description: "Real-time simulated passenger flow and crowd density operator dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
