import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "CryptoWallet",
  description: "Secure crypto wallet platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
