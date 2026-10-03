import Link from "next/link";

const subjects = [
  {
    code: "26EN101T",
    name: "Communicative English",
    color: "bg-[#ffe2d5]",
    href: "/ece/year-1/sem-1/communicative-english",
  },
  {
    code: "26MA101T",
    name: "Linear Algebra & Calculus",
    color: "bg-[#e4defd]",
    href: "/ece/year-1/sem-1/linear-algebra-and-calculus",
  },
  {
    code: "26CH101T",
    name: "Engineering Chemistry",
    color: "bg-[#dff1e8]",
    href: "/ece/year-1/sem-1/engineering-chemistry",
  },
  {
    code: "26CS101T",
    name: "Programming for Problem Solving",
    color: "bg-[#fff0bd]",
    href: "/ece/year-1/sem-1/programming-for-problem-solving",
  },
  {
    code: "26EE101T",
    name: "Basics of Engineering",
    color: "bg-[#dcebf8]",
    href:  "/ece/year-1/sem-1/basics-of-engineering",
  },
  {
    code: "LABS",
    name: "Labs",
    color: "bg-[#f3dfef]",
    href: "#",
  },
  {
    code: "26HS101V",
    name: "Sports / Yoga / NCC / NSS",
    color: "bg-[#e9e5d8]",
    href: "#",
  },
];

export default function SemesterOnePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#202020] overflow-hidden">

      {/* Soft background shapes */}
      <div className="fixed top-24 right-[-100px] w-64 h-64 bg-[#dcd7ff] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="fixed bottom-10 left-[-120px] w-72 h-72 bg-[#d8f3e7] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="fixed top-[50%] right-[10%] w-36 h-36 bg-[#ffe2c9] rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-black/5">

        <Link
          href="/"
          className="font-black tracking-[-0.04em] text-lg"
        >
          QUIET MINDS
        </Link>

        <nav className="flex items-center gap-3 text-xs md:text-sm text-black/50">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <span className="text-black/20">/</span>

          <Link href="/ece" className="hover:text-black transition">
            ECE
          </Link>

          <span className="text-black/20">/</span>

          <Link href="/ece/year-1" className="hover:text-black transition">
            Year 1
          </Link>

          <span className="text-black/20">/</span>

          <span className="text-black">
            Sem 1
          </span>

        </nav>

      </header>

      {/* Small Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16">

        <div className="max-w-2xl">

          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#7770c9] mb-4">
            ECE · Year 1
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.05em] leading-tight">
            Semester 1
          </h1>

          <p className="mt-5 text-lg md:text-xl font-medium tracking-[-0.02em]">
            Everything you need, in one place.
          </p>

          <p className="mt-3 text-sm md:text-base text-black/50 max-w-lg leading-6">
            Explore your subjects, study material, notes and question banks.
          </p>

        </div>

      </section>

      {/* Subjects */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24">

        <div className="flex items-end justify-between mb-7">

          <div>

            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-black/35 mb-2">
              Your subjects
            </p>

            <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
              Choose a subject.
            </h2>

          </div>

          <span className="hidden md:block text-xs text-black/35">
            07 subjects
          </span>

        </div>

        {/* Subject cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {subjects.map((subject) => (

            <Link
              key={subject.code}
              href={subject.href}
              className={`group relative min-h-[180px] rounded-[1.5rem] ${subject.color} border border-black/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >

              <div className="flex justify-between items-start">

                <span className="text-[11px] font-semibold tracking-[0.06em] text-black/40">
                  {subject.code}
                </span>

                <span className="text-xl font-light group-hover:translate-x-1 transition-transform">
                  →
                </span>

              </div>

              <div className="absolute bottom-6 left-6 right-6">

                <p className="text-base font-semibold tracking-[-0.015em] leading-5 max-w-[230px]">
                  {subject.name}
                </p>

                <p className="text-xs text-black/40 mt-2">
                  Explore materials
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Quick access */}
      <section className="relative z-10 border-y border-black/5 bg-white">

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">

          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-black/35 mb-5">
            Quick access
          </p>

          <div className="grid sm:grid-cols-3 gap-4">

            <div className="rounded-2xl bg-[#f1efff] p-6">

              <p className="text-base font-semibold">
                Study Material
              </p>

              <p className="text-xs text-black/45 mt-2 leading-5">
                Notes, unit PDFs and useful resources.
              </p>

            </div>

            <div className="rounded-2xl bg-[#eaf6ef] p-6">

              <p className="text-base font-semibold">
                Question Bank
              </p>

              <p className="text-xs text-black/45 mt-2 leading-5">
                Previous papers and examination questions.
              </p>

            </div>

            <div className="rounded-2xl bg-[#fff2dc] p-6">

              <p className="text-base font-semibold">
                Latest Updates
              </p>

              <p className="text-xs text-black/45 mt-2 leading-5">
                Recently added academic material.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Identity */}
      <section className="relative z-10">

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-black/35 mb-5">
            A little beyond classroom.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.04em] max-w-2xl leading-tight">
            Learn at your pace.
            <br />
            Keep what matters.
          </h2>

        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-black/5 max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-black/40">

        <p>QUIET MINDS</p>

        <p>Study quietly. Build steadily.</p>

      </footer>

    </main>
  );
}