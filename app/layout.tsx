import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TokenHouse — Virtual Sports Lounge",
  description: "A fake-money sports prediction dashboard using virtual Tokens only."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
