import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fuku-tabi.com"),
  verification: {
    google: "mHTs6-pwqt1tIt3sh8P0vwa9KPBg3AAsugcNW7Nv6wg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
