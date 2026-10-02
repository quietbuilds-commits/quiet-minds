import Link from "next/link";

export default function YearOnePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#202020] overflow-hidden">

      {/* Decorative background shapes */}
      <div className="fixed top-28 right-[-100px] w-72 h-72 bg-[#dcd7ff] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="fixed bottom-10 left-[-120px] w-80 h-80 bg-[#d8f3e7] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="fixed top-[55%] right-[12%] w-44 h-44 bg-[#ffe2c9] rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-7 border-b border-black/5">

        <Link
          href="/"
          className="font-black tracking-[-0.04em] text-xl"
        >
          QUIET MINDS
        </Link>

        <nav className="flex items-center gap-4 text-sm text-black/55">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <span className="text-black/20">/</span>

          <Link href="/ece" className="hover:text-black transition">
            ECE
          </Link>

          <span className="text-black/20">/</span>

          <span className="text-black">
            Year 1
          </span>

        </nav>

      </header>


      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-20">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#7770c9] mb-5">
            ECE · First year
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.06em] leading-[0.9]">
            Year 1
          </h1>

          <p className="mt-8 text-xl md:text-2xl font-medium tracking-[-0.02em]">
            Your first step starts here.
          </p>

          <p className="mt-4 text-base md:text-lg text-black/55 max-w-xl leading-7">
            Find your semester, subjects and everything you need for the
            academic year.
          </p>

        </div>

      </section>


      {/* Semester section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-28">

        <div className="flex items-end justify-between mb-8">

          <div>

            <p className="text-xs font-bold tracking-[0.16em] uppercase text-black/40 mb-3">
              Continue your path
            </p>

            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.035em]">
              Choose your semester.
            </h2>

          </div>

          <span className="hidden md:block text-sm text-black/35">
            01 / 01
          </span>

        </div>


        {/* Semester 1 card */}
        <Link href="/ece/year-1/sem-1" className="block group">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#e7e2ff] border border-black/5 p-8 md:p-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

            {/* Decorative circles */}
            <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#fff0b8] rounded-full opacity-80" />

            <div className="absolute right-28 bottom-[-70px] w-40 h-40 bg-[#c9eddf] rounded-full opacity-80" />


            <div className="relative flex items-center justify-between gap-8">

              <div>

                <p className="text-sm font-semibold text-black/45 mb-3">
                  SEMESTER
                </p>

                <h3 className="text-4xl md:text-5xl font-black tracking-[-0.05em]">
                  01
                </h3>

                <p className="mt-5 text-base text-black/55 max-w-lg leading-6">
                  Explore your first-semester subjects, study material,
                  notes and question papers.
                </p>

              </div>


              <div className="text-4xl md:text-5xl font-light group-hover:translate-x-2 transition-transform">
                →
              </div>

            </div>


            {/* Category tags */}
            <div className="relative flex flex-wrap gap-3 mt-9">

              <span className="px-4 py-2 rounded-full bg-white/70 text-sm">
                Subjects
              </span>

              <span className="px-4 py-2 rounded-full bg-white/70 text-sm">
                Study Material
              </span>

              <span className="px-4 py-2 rounded-full bg-white/70 text-sm">
                Question Bank
              </span>

            </div>

          </div>

        </Link>

      </section>


      {/* Identity section */}
      <section className="relative z-10 border-y border-black/5 bg-white">

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-28">

          <p className="text-xs font-bold tracking-[0.18em] uppercase text-black/35 mb-6">
            A little beyond classroom.
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.045em] max-w-3xl leading-tight">
            One semester.
            <br />
            Plenty to discover.
          </h2>

        </div>

      </section>


      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between gap-4 text-sm text-black/40">

        <p>QUIET MINDS</p>

        <p>Study quietly. Build steadily.</p>

      </footer>

    </main>
  );
}