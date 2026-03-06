import "@/styles/globals.css";
import type { ReactNode } from "react";
import WalletModal from "@/components/wallet/WalletModal";
import WalletProvider from "@/components/wallet/WalletProvider";

export const metadata = {
  title: "CryptoWallet",
  description: "Secure crypto wallet platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <WalletProvider>
          {children}
          <WalletModal />
        </WalletProvider>
      </body>
    </html>
  );
}
