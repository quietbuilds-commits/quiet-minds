import Link from "next/link";

export default function EcePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#202020] overflow-hidden">

      {/* Decorative background shapes */}
      <div className="fixed top-24 right-[-100px] w-72 h-72 bg-[#dcd7ff] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="fixed bottom-20 left-[-100px] w-80 h-80 bg-[#d8f3e7] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="fixed top-[45%] right-[15%] w-40 h-40 bg-[#ffe2c9] rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-7 border-b border-black/5">
        <Link
          href="/"
          className="font-black tracking-[-0.04em] text-xl"
        >
          QUIET MINDS
        </Link>

        <nav className="flex items-center gap-6 text-sm text-black/55">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <span className="text-black/25">/</span>

          <span className="text-black">ECE</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-24">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#7770c9] mb-6">
              Your academic space
            </p>

            <h1 className="text-6xl md:text-8xl font-black tracking-[-0.08em] leading-[0.85]">
              ECE.
            </h1>

            <p className="mt-10 text-xl md:text-2xl font-medium tracking-[-0.03em] max-w-xl">
              Everything starts here.
            </p>

            <p className="mt-4 text-base md:text-lg text-black/55 max-w-md leading-7">
              Explore your first-year academic space, one step at a time.
            </p>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative bg-[#e7e2ff] rounded-[2.5rem] h-[330px] md:h-[390px] flex items-center justify-center overflow-hidden rotate-1 shadow-sm">

              <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-[#fff0b8]" />

              <div className="absolute bottom-8 right-8 w-28 h-28 rounded-full bg-[#c9eddf]" />

              {/* Notebook */}
              <div className="relative w-48 h-60 bg-white rounded-2xl shadow-xl -rotate-6 p-5">
                <div className="w-12 h-2 bg-[#aaa4e8] rounded-full mb-5" />

                <div className="space-y-3">
                  <div className="h-3 bg-black/10 rounded-full w-full" />
                  <div className="h-3 bg-black/10 rounded-full w-4/5" />
                  <div className="h-3 bg-black/10 rounded-full w-3/5" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 h-20 bg-[#d9f0e5] rounded-xl" />
              </div>

              {/* Second notebook */}
              <div className="absolute w-36 h-48 bg-[#ffdcca] rounded-2xl shadow-lg rotate-6 translate-x-20 translate-y-5 p-5">
                <div className="w-10 h-2 bg-[#e69d7d] rounded-full mb-5" />

                <div className="space-y-3">
                  <div className="h-3 bg-black/10 rounded-full" />
                  <div className="h-3 bg-black/10 rounded-full w-4/5" />
                  <div className="h-3 bg-black/10 rounded-full w-2/3" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Continue your path */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-28">

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-black/40 mb-3">
              Continue your path
            </p>

            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.04em]">
              Start with your year.
            </h2>
          </div>

          <span className="hidden md:block text-sm text-black/35">
            01 / 01
          </span>
        </div>

        {/* Year 1 card */}
        <Link href="/ece/year-1" className="block group">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#dff1ea] border border-black/5 p-8 md:p-12 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

            <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#fff0b8] rounded-full opacity-80" />

            <div className="absolute right-24 bottom-[-60px] w-40 h-40 bg-[#d7d0ff] rounded-full opacity-70" />

            <div className="relative flex items-center justify-between gap-8">

              <div>
                <p className="text-sm font-semibold text-black/45 mb-3">
                  YEAR
                </p>

                <h3 className="text-4xl md:text-6xl font-black tracking-[-0.07em]">
                  01
                </h3>

                <p className="mt-5 text-base text-black/55 max-w-md leading-6">
                  Your first-year subjects, notes and academic resources.
                </p>
              </div>

              <div className="text-4xl md:text-6xl font-light group-hover:translate-x-2 transition-transform">
                →
              </div>

            </div>

            <div className="relative flex flex-wrap gap-3 mt-10">

              <span className="px-4 py-2 rounded-full bg-white/70 text-sm">
                Study Material
              </span>

              <span className="px-4 py-2 rounded-full bg-white/70 text-sm">
                Question Bank
              </span>

              <span className="px-4 py-2 rounded-full bg-white/70 text-sm">
                Notes
              </span>

            </div>

          </div>
        </Link>
      </section>

      {/* Identity */}
      <section className="relative z-10 border-y border-black/5 bg-white">

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">

          <p className="text-xs font-bold tracking-[0.2em] uppercase text-black/35 mb-6">
            A little beyond classroom.
          </p>

          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.06em] max-w-3xl leading-tight">
            Learn at your pace.
            <br />
            Keep what matters.
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