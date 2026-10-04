
import Link from "next/link";

const labs = [
  {
    code: "26CH101L",
    name: "Engineering Chemistry Lab",
    color: "bg-[#dff1e8]",
    href: "/labs/engineering-chemistry-lab",
  },
  {
    code: "26CS101L",
    name: "Computer Lab",
    color: "bg-[#fff0bd]",
    href: "/labs/computer-lab",
  },
  {
    code: "26ME101L",
    name: "Engineering Graphics Lab",
    color: "bg-[#e4defd]",
    href: "/labs/engineering-graphics-lab",
  },
  {
    code: "26EN101L",
    name: "Communicative English Lab",
    color: "bg-[#ffe2d5]",
    href: "/labs/communicative-english-lab",
  },
];

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#202020]">

      <header className="flex items-center justify-between px-5 md:px-10 py-4 border-b border-black/5">

        <Link
          href="/"
          className="font-black tracking-[-0.04em] text-base"
        >
          QUIET MINDS
        </Link>

        <nav className="flex items-center gap-2 text-[11px] text-black/45">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <span>/</span>

          <Link
            href="/ece/year-1/sem-1"
            className="hover:text-black transition"
          >
            Sem 1
          </Link>

          <span>/</span>

          <span className="text-black">
            Labs
          </span>
        </nav>

      </header>

      <section className="max-w-5xl mx-auto px-5 md:px-10 pt-9 pb-7">

        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7770c9] mb-2">
          Practical learning
        </p>

        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.05em]">
          Labs
        </h1>

        <p className="mt-2 text-sm text-black/50">
          Your practical material, in one place.
        </p>

      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-10 pb-12">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">
            Choose a lab
          </h2>

          <span className="text-[10px] text-black/35">
            04 labs
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

          {labs.map((lab) => (
            <Link
              key={lab.code}
              href={lab.href}
              className={
                "group relative min-h-[135px] rounded-[1.25rem] " +
                lab.color +
                " border border-black/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              }
            >

              <div className="flex items-start justify-between">

                <span className="text-[9px] font-semibold tracking-[0.05em] text-black/35">
                  {lab.code}
                </span>

                <span className="text-base font-light group-hover:translate-x-1 transition-transform">
                  →
                </span>

              </div>

              <div className="absolute bottom-4 left-4 right-4">

                <p className="text-[13px] font-semibold leading-4 tracking-[-0.01em]">
                  {lab.name}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </section>

      <footer className="border-t border-black/5 px-5 md:px-10 py-5 flex items-center justify-between text-[10px] text-black/35">

        <p>QUIET MINDS</p>

        <p>Study quietly. Build steadily.</p>

      </footer>

    </main>
  );
}

