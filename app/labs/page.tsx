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
    name: "Programming for Problem Solving Lab",
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
      <header className="px-6 md:px-12 py-6 border-b border-black/5">
        <Link href="/" className="font-black tracking-[-0.04em] text-lg">
          QUIET MINDS
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#7770c9] mb-4">
          ECE · Laboratory
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.05em]">
          Labs
        </h1>

        <p className="mt-4 text-black/50">
          Choose a laboratory to explore its experiments and materials.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {labs.map((lab) => (
            <Link
              key={lab.code}
              href={lab.href}
              className={`group min-h-[180px] rounded-[1.5rem] ${lab.color} border border-black/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-semibold text-black/40">
                  {lab.code}
                </span>
                <span className="text-xl font-light group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>

              <div className="mt-16">
                <p className="text-base font-semibold">{lab.name}</p>
                <p className="text-xs text-black/40 mt-2">
                  Explore experiments
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}