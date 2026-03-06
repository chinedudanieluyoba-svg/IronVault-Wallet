import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/90 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-zinc-900">
          CryptoWallet
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-700">
          <Link href="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#security">Security</a>
        </nav>
      </div>
    </header>
  );
}
