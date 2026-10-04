import Link from "next/link";

export default function SportsPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/ece/year-1/sem-1"
          className="text-xs text-black/45 hover:text-black/70"
        >
          ← Sem 1
        </Link>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/35">
            Activities
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#252525]">
            Sports / Yoga / NCC / NSS
          </h1>

          <p className="mt-2 text-sm text-black/50">
            Sports and student activity information.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-black/5 bg-[#eaf4ff] p-4">
            <p className="text-sm font-semibold">Sports</p>
            <p className="mt-1 text-xs text-black/45">
              Material coming soon.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#e9f7ee] p-4">
            <p className="text-sm font-semibold">Yoga</p>
            <p className="mt-1 text-xs text-black/45">
              Material coming soon.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#fff0bd] p-4">
            <p className="text-sm font-semibold">NCC</p>
            <p className="mt-1 text-xs text-black/45">
              Material coming soon.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#fde8ef] p-4">
            <p className="text-sm font-semibold">NSS</p>
            <p className="mt-1 text-xs text-black/45">
              Material coming soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}