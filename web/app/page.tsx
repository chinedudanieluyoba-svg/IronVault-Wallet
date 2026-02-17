import Header from "@/components/Header";
import { HealthCheck } from "@/components/HealthCheck";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="mb-8 flex justify-center">
          <HealthCheck />
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Secure Crypto Wallet
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
            A modern, audited ledger for crypto payments and on-ramp flows.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600">
            Built on NestJS with strict idempotency, reconciliation, and webhook
            security. Deploy the backend on Railway and the frontend on Vercel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              href="#features"
            >
              Explore Features
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
              href="#docs"
            >
              Read Docs
            </a>
          </div>
        </div>

        <section id="features" className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Ledger Integrity",
              description:
                "Balance reconciliation with audit trails and mismatch alerts.",
            },
            {
              title: "Webhook Safety",
              description:
                "IP allowlists, signature checks, and retry + DLQ handling.",
            },
            {
              title: "Operational Ready",
              description:
                "Health checks, rate limiting, and production hardening.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold text-zinc-900">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
