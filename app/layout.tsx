import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/app/components/app-shell";

export const metadata: Metadata = {
  title: "Portal Games Hub",
  description:
    "Portal futuristik untuk mengumpulkan game edukatif, kreatif, dan komunitas pembuat game muda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
