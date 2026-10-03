import Link from "next/link";

const studyMaterials = [
  {
    title: "Unit PDFs",
    description: "Unit-wise study material",
    href: "/ece/year-1/sem-1/communicative-english/unit-pdfs",
    color: "bg-[#eaf4ff]",
  },
  {
    title: "Class Notes",
    description: "Notes from classroom learning",
    href: "#",
    color: "bg-[#f0ecff]",
  },
  {
    title: "Short Notes / Mind Maps",
    description: "Quick revision material",
    href: "#",
    color: "bg-[#eaf8f1]",
  },
  {
    title: "Class Questions + Unit-End Questions",
    description: "Questions for practice and revision",
    href: "#",
    color: "bg-[#fff1e7]",
  },
];

const questionBank = [
  {
    title: "PYQ",
    description: "Previous year question papers",
    href: "#",
    color: "bg-[#fff4d8]",
  },
  {
    title: "Current Exam Questions",
    description: "PCA, CA and ESA questions",
    href: "#",
    color: "bg-[#fcecf4]",
  },
];

export default function CommunicativeEnglishPage() {
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

          <Link
            href="/ece/year-1/sem-1"
            className="hover:text-black transition"
          >
            Sem 1
          </Link>

          <span className="text-black/20">/</span>

          <span className="text-black">
            Communicative English
          </span>

        </nav>

      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16">

        <div className="max-w-2xl">

          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#7770c9] mb-4">
            26EN101T
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.05em] leading-tight">
            Communicative English.
          </h1>

          <p className="mt-5 text-lg md:text-xl font-medium tracking-[-0.02em]">
            Build confidence in language and communication.
          </p>

          <p className="mt-3 text-sm md:text-base text-black/50 max-w-lg leading-6">
            Explore study material, notes and question resources.
          </p>

        </div>

      </section>

      {/* Study Material */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-20">

        <div className="mb-7">

          <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-black/35 mb-2">
            Study Material
          </p>

          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
            Learn & revise
          </h2>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {studyMaterials.map((item) => (

            <Link
              key={item.title}
              href={item.href}
              className="group"
            >

              <div
                className={`min-h-[145px] rounded-[1.5rem] ${item.color} border border-black/5 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}
              >

                <div className="flex justify-between items-start gap-3">

                  <h3 className="text-base font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>

                  <span className="text-lg font-light group-hover:translate-x-1 transition-transform">
                    →
                  </span>

                </div>

                <p className="text-xs text-black/45 mt-3 leading-5">
                  {item.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Question Bank */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24">

        <div className="mb-7">

          <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-black/35 mb-2">
            Question Bank
          </p>

          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
            Practice & prepare
          </h2>

        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">

          {questionBank.map((item) => (

            <Link
              key={item.title}
              href={item.href}
              className="group"
            >

              <div
                className={`min-h-[145px] rounded-[1.5rem] ${item.color} border border-black/5 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}
              >

                <div className="flex justify-between items-start gap-3">

                  <h3 className="text-base font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>

                  <span className="text-lg font-light group-hover:translate-x-1 transition-transform">
                    →
                  </span>

                </div>

                <p className="text-xs text-black/45 mt-3 leading-5">
                  {item.description}
                </p>

              </div>

            </Link>

          ))}

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