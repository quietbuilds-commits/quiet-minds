import Link from "next/link";

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15L20 20" />
    </svg>
  );
}

function GraduationCap() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 17.5L24 8L43 17.5L24 27L5 17.5Z"
        fill="currentColor"
      />
      <path
        d="M12 22V31C18 35 30 35 36 31V22"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M43 18V29" stroke="currentColor" strokeWidth="2" />
      <circle cx="43" cy="31" r="2" fill="currentColor" />
    </svg>
  );
}

const subjects = [
  {
    number: "01",
    name: "Maths",
    description: "Linear Algebra and Calculus",
    href: "/ece/year-1/sem-1/linear-algebra-and-calculus",
    background: "#E8F1FF",
    circle: "#CFE0FF",
  },
  {
    number: "02",
    name: "Engg Chem",
    description: "Engineering Chemistry",
    href: "/ece/year-1/sem-1/engineering-chemistry",
    background: "#FFE9E3",
    circle: "#FFD0C3",
  },
  {
    number: "03",
    name: "Basics",
    description: "Basics of Engineering",
    href: "/ece/year-1/sem-1/basics-of-engineering",
    background: "#E8F5E9",
    circle: "#CDE8D0",
  },
  {
    number: "04",
    name: "C Programming",
    description: "Programming for Problem Solving",
    href: "/ece/year-1/sem-1/programming-for-problem-solving",
    background: "#F0E8FF",
    circle: "#DED0FA",
  },
  {
    number: "05",
    name: "English",
    description: "Communicative English",
    href: "/ece/year-1/sem-1/communicative-english",
    background: "#FFF4D9",
    circle: "#F8E5A9",
  },
  {
    number: "06",
    name: "Lab",
    description: "Laboratory Work",
    href: "/labs",
    background: "#E3F5F1",
    circle: "#C7E8E0",
  },
  {
    number: "07",
    name: "Sports, NCC",
    description: "Activities",
    href: "/sports",
    background: "#FFE7EF",
    circle: "#F6CCD9",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#E8F8F6] text-[#263B5C]">

      {/* HEADER */}
      <header className="border-b border-[#E8DED4] bg-[#FFFDF9]">
        <div className="mx-auto flex h-[64px] max-w-[1180px] items-center justify-between px-6">
          <Link
            href="/"
            className="text-[19px] font-bold tracking-[-0.7px] text-[#263F70]"
          >
            QUIET MINDS
          </Link>

          <nav className="hidden items-center gap-9 text-[14px] font-medium md:flex">
            <Link href="/" className="text-[#3159C9]">
              Home
            </Link>

            <Link
              href="/ece"
              className="text-[#42516B] transition hover:text-[#3159C9]"
            >
              Browse
            </Link>

            <Link
              href="/ece/year-1/sem-1"
              className="text-[#42516B] transition hover:text-[#3159C9]"
            >
              Syllabus
            </Link>

            <Link
              href="/news"
              className="text-[#42516B] transition hover:text-[#3159C9]"
            >
              News
            </Link>
          </nav>

          <Link
            href="/ece"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCD5CD] bg-white text-[#647A9A] transition hover:border-[#AFC0D9] hover:text-[#3159C9]"
          >
            <SearchIcon />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#EAF3FF] px-5 py-7 sm:px-7 sm:py-9">
        <div className="mx-auto grid max-w-[900px] grid-cols-[1.05fr_0.75fr] items-start gap-4">

          {/* TEXT BOX */}
          <div className="relative max-w-[480px] justify-self-start overflow-hidden rounded-[18px] border border-[#D2E2F8] bg-[#F7FBFF] px-4 py-3 shadow-[0_8px_24px_rgba(66,103,150,0.06)] sm:px-5 sm:py-4">
            <div className="absolute -bottom-12 -left-10 h-24 w-24 rounded-full bg-[#FFE2D3]" />

            <div className="relative">
              <span className="inline-flex rounded-full bg-[#E5F0FF] px-3 py-1.5 text-[11px] font-semibold text-[#4773B8]">
                Where ideas begin.
              </span>

              <h1 className="mt-3 text-[30px] font-extrabold leading-[1.02] tracking-[-1.3px] text-[#173D7A] sm:text-[40px]">
                Your notes.
                <br />
                Your subjects.
                <br />
                At one place.
              </h1>

              <div className="mt-4 h-[3px] w-[46px] rounded-full bg-[#5E87CC]" />

              <p className="mt-4 max-w-[460px] text-[14px] leading-5.5 text-[#5D7698]">
                A simple study space for students.
                <br />
                Find notes, question papers and study materials in one place.
              </p>

              <Link
                href="/ece"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#3159C9] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_7px_18px_rgba(49,89,201,0.2)] transition hover:-translate-y-0.5"
              >
                Explore ECE
                <span className="text-[16px]">→</span>
              </Link>
            </div>
          </div>

          {/* ECE BOX */}
          <Link
            href="/ece"
            className="group relative flex min-h-[250px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-[#E4D7B7] bg-[#FFF2D8] p-5 text-center shadow-[0_10px_30px_rgba(130,100,55,0.07)] transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(130,100,55,0.12)] sm:min-h-[280px]"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#F9D7C8]" />
            <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-[#D9EFD9]" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#E5D6FF] text-[#6753A4]">
              <GraduationCap />
            </div>

            <h2 className="relative mt-5 text-[25px] font-bold text-[#5B4A3B]">
              ECE
            </h2>

            <p className="relative mt-1 text-[12px] text-[#887565]">
              Choose year
            </p>

            <div className="relative mt-5 rounded-full bg-white/80 px-4 py-2 text-[12px] font-semibold text-[#80603F]">
              Explore →
            </div>
          </Link>
        </div>
      </section>

      {/* EXAM SECTION */}
      <section className="bg-[#FFF0E5] px-6 py-7">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-[20px] border border-[#F0CFB8] bg-[#FFF9F5] px-6 py-5">
            <p className="text-[12px] font-bold tracking-[2px] text-[#B5673D]">
              EXAM SECTION
            </p>

            <p className="mt-2 text-[13px] text-[#987661]">
              Your exam resources will appear here.
            </p>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="bg-[#E8F8F6] px-6 py-9">
        <div className="mx-auto max-w-[1000px]">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#7862A9]">
                ECE · YEAR 1 · SEM 1
              </p>

              <h2 className="mt-2 text-[30px] font-bold tracking-[-0.8px] text-[#3E4770]">
                Subjects
              </h2>
            </div>

            <div className="hidden rounded-full bg-[#E3D9FF] px-3 py-1.5 text-[11px] font-medium text-[#7663A4] sm:block">
              7 subjects
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.number}
                href={subject.href}
                style={{ backgroundColor: subject.background }}
                className="group flex min-h-[92px] items-center justify-between rounded-[20px] border border-white/80 px-5 py-4 shadow-[0_5px_16px_rgba(80,70,110,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(80,70,110,0.1)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    style={{ backgroundColor: subject.circle }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#596D8E]"
                  >
                    {subject.number}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-[20px] font-semibold tracking-[-0.4px] text-[#334D72]">
                      {subject.name}
                    </p>

                    <p className="mt-1 truncate text-[12px] text-[#71839D]">
                      {subject.description}
                    </p>
                  </div>
                </div>

                <span className="ml-3 shrink-0 text-[18px] text-[#6885AF] transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM LINKS */}
      <section className="bg-[#FFF9F3] px-6 py-7">
        <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-x-12 gap-y-3">
          <Link
            href="/ece"
            className="text-[13px] font-medium text-[#6C7890] transition hover:text-[#3159C9]"
          >
            Notes
          </Link>

          <Link
            href="/ece"
            className="text-[13px] font-medium text-[#6C7890] transition hover:text-[#3159C9]"
          >
            Papers
          </Link>

          <Link
            href="/ece/year-1/sem-1"
            className="text-[13px] font-medium text-[#6C7890] transition hover:text-[#3159C9]"
          >
            Syllabus
          </Link>

          <Link
            href="/ece"
            className="text-[13px] font-medium text-[#6C7890] transition hover:text-[#3159C9]"
          >
            Search
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="about"
        className="border-t border-[#E8DED4] bg-[#F4EDE5] px-6 py-6 text-center"
      >
        <p className="text-[11px] font-bold tracking-[2.5px] text-[#806D5D]">
          QUIET MINDS
        </p>

        <p className="mt-2 text-[11px] text-[#9A897A]">
          A quieter way to study.
        </p>
      </footer>
    </main>
  );
}