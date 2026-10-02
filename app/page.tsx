import Link from "next/link";

function GraduationCap() {
  return (
    <svg
      width="24"
      height="24"
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

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function BuildingIllustration() {
  return (
    <svg
      viewBox="0 0 520 230"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* clouds */}
      <path
        d="M60 70C60 58 69 48 81 48C85 48 90 49 94 52C98 42 108 35 119 35C134 35 146 46 146 61"
        stroke="#5D98E7"
        strokeWidth="2"
      />

      <path
        d="M400 45C400 34 409 25 420 25C424 25 428 26 432 29C436 19 445 13 456 13C470 13 481 24 481 38"
        stroke="#5D98E7"
        strokeWidth="2"
      />

      {/* left building */}
      <path
        d="M50 178V113L178 80V178"
        stroke="#4388DD"
        strokeWidth="2"
      />

      {/* main building */}
      <path
        d="M178 178V64L306 31V178"
        stroke="#4388DD"
        strokeWidth="2"
      />

      {/* right building */}
      <path
        d="M306 178V79L440 59V178"
        stroke="#4388DD"
        strokeWidth="2"
      />

      {/* main entrance */}
      <path
        d="M215 178V111H273V178"
        stroke="#4388DD"
        strokeWidth="2"
      />

      <path
        d="M225 178V119H263V178"
        stroke="#4388DD"
        strokeWidth="1.5"
      />

      {/* windows */}
      {[
        [78, 126],
        [105, 119],
        [132, 112],
        [195, 82],
        [223, 75],
        [251, 68],
        [331, 91],
        [359, 87],
        [387, 83],
        [331, 116],
        [359, 112],
        [387, 108],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="14"
          height="17"
          stroke="#4388DD"
          strokeWidth="1.5"
        />
      ))}

      {/* trees */}
      <circle cx="34" cy="166" r="22" fill="#B5DEC9" />
      <circle cx="55" cy="151" r="28" fill="#B5DEC9" />
      <circle cx="79" cy="166" r="22" fill="#B5DEC9" />
      <path d="M56 168V193" stroke="#70A98B" strokeWidth="2" />

      <circle cx="438" cy="164" r="22" fill="#B5DEC9" />
      <circle cx="462" cy="148" r="29" fill="#B5DEC9" />
      <circle cx="488" cy="165" r="22" fill="#B5DEC9" />
      <path d="M463 168V193" stroke="#70A98B" strokeWidth="2" />

      {/* ground */}
      <path
        d="M25 195C140 188 280 191 490 195"
        stroke="#4388DD"
        strokeWidth="2"
      />

      <path
        d="M205 184H286"
        stroke="#4388DD"
        strokeWidth="2"
      />
    </svg>
  );
}

const subjects = [
  "Communicative English",
  "Linear Algebra & Calculus",
  "Engineering Chemistry",
  "Programming for Problem Solving",
  "Basics of Engineering",
  "Labs",
  "Sports / Yoga / NCC / NSS",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#17366b]">

      {/* ================= HEADER ================= */}

      <header className="border-b border-[#dce5f2] bg-white">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6">

          <Link href="/" className="text-[18px] font-bold tracking-[-0.5px]">
            QUIET MINDS
          </Link>

          <nav className="hidden items-center gap-8 text-[11px] font-medium md:flex">
            <Link href="/" className="text-[#3159c9]">
              Home
            </Link>

            <Link
              href="/ece"
              className="transition hover:text-[#3159c9]"
            >
              Browse
            </Link>

            <Link
              href="/ece/year-1/sem-1"
              className="transition hover:text-[#3159c9]"
            >
              Syllabus
            </Link>

            <Link
              href="#about"
              className="transition hover:text-[#3159c9]"
            >
              About
            </Link>
          </nav>

          <div className="hidden items-center gap-2 rounded-lg border border-[#dce5f2] px-3 py-2 text-[#7790b2] md:flex">
            <SearchIcon />
            <span className="text-[10px]">
              Search notes, subjects...
            </span>
          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="bg-[#eaf4ff]">

        <div className="mx-auto grid max-w-[1200px] items-center px-7 py-10 md:grid-cols-2 md:py-12">

          {/* LEFT */}

          <div>

            <p className="mb-2 text-[10px] font-medium tracking-wide text-[#356bd0]">
              Where ideas begin.
            </p>

            <h1 className="max-w-[440px] text-[39px] font-extrabold leading-[0.98] tracking-[-1.8px] text-[#173d7a] md:text-[46px]">
              Your notes.
              <br />
              Your subjects.
              <br />
              At one place.
            </h1>

            <div className="mt-5 h-[2px] w-[45px] bg-[#548de2]" />

            <p className="mt-4 max-w-[390px] text-[9px] leading-4 text-[#55769f]">
              A simple study space for ECE students.
              <br />
              Find notes, question papers and study materials in one place.
            </p>

            <Link
              href="/ece"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#3159c9] px-4 py-2.5 text-[8px] font-semibold text-white shadow-md transition hover:-translate-y-0.5"
            >
              Explore ECE
              <span>→</span>
            </Link>

          </div>


          {/* RIGHT */}

          <div className="relative mt-8 md:mt-0">

            <div className="absolute right-5 top-0 text-right text-[8px] italic leading-3 text-[#5789c9]">
              Learn quietly,
              <br />
              grow steadily.
            </div>

            <div className="pt-8">
              <BuildingIllustration />
            </div>

          </div>

        </div>

      </section>


      {/* ================= IDENTITY ================= */}

      <section className="bg-white px-6 py-6 text-center">

        <p className="text-[9px] italic text-[#5679a8]">
          A little beyond classroom.
        </p>

        <p className="mt-3 text-[7px] uppercase tracking-[2px] text-[#8aa0bd]">
          YOUR STUDY SPACE
        </p>

        <h2 className="mt-2 text-[14px] font-semibold text-[#173d7a]">
          Start from here
        </h2>

      </section>


      {/* ================= ECE ONLY ================= */}

      <section className="bg-white px-6 pb-6">

        <div className="mx-auto flex max-w-[1200px] justify-center">

          <Link
            href="/ece"
            className="group w-[170px] rounded-lg border border-[#cddcff] bg-[#edf3ff] px-5 py-5 text-center transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >

            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe7ff] text-[#3159c9]">
              <GraduationCap />
            </div>

            <h3 className="mt-3 text-[12px] font-bold text-[#173d7a]">
              ECE
            </h3>

            <p className="mt-1 text-[6px] text-[#7188a9]">
              Academic archive
            </p>

            <div className="mt-3 text-[7px] font-medium text-[#3159c9]">
              Explore →
            </div>

          </Link>

        </div>

      </section>


      {/* ================= SUBJECTS ================= */}

      <section className="border-y border-[#dce5f2] bg-[#f7faff] px-6 py-7">

        <div className="mx-auto max-w-[1000px]">

          <p className="text-[6px] uppercase tracking-[1.5px] text-[#557fd0]">
            ECE · YEAR 1 · SEM 1
          </p>

          <h2 className="mt-1 text-[17px] font-semibold text-[#173d7a]">
            Subjects
          </h2>


          <div className="mt-4 grid gap-2 md:grid-cols-2">

            {subjects.map((subject, index) => (

              <Link
                key={subject}
                href="/ece/year-1/sem-1"
                className="flex items-center justify-between rounded-md border border-[#d5e0f0] bg-white px-3 py-2.5 transition hover:border-[#9bb8eb] hover:bg-[#fbfdff]"
              >

                <div className="flex items-center gap-3">

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef4ff] text-[6px] font-medium text-[#5278c8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[8px] text-[#294d80]">
                    {subject}
                  </span>

                </div>

                <span className="text-[9px] text-[#6c91cf]">
                  →
                </span>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="bg-white px-6 py-7">

        <div className="mx-auto grid max-w-[1000px] grid-cols-2 md:grid-cols-5">

          <Feature
            icon="▤"
            title="Notes"
            text="Understand study notes and summaries."
          />

          <Feature
            icon="▣"
            title="Question Papers"
            text="Previous papers and exam questions."
          />

          <Feature
            icon="▢"
            title="Syllabus"
            text="Subject-wise syllabus and course details."
          />

          <Feature
            icon="⌕"
            title="Search"
            text="Find what you need quickly."
          />

          <Feature
            icon="♧"
            title="Subjects"
            text="All Semester 1 subjects in one place."
          />

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer
        id="about"
        className="bg-[#f5f8fc] px-6 py-5 text-center"
      >

        <p className="text-[7px] font-medium tracking-[2px] text-[#6683aa]">
          QUIET MINDS
        </p>

        <p className="mt-2 text-[6px] text-[#8295b2]">
          A quieter way to study.
        </p>

      </footer>

    </main>
  );
}


/* ================= FEATURE COMPONENT ================= */

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border-[#dbe4ef] px-5 py-3 text-center md:border-r last:border-r-0">

      <div className="text-[15px] text-[#4276d7]">
        {icon}
      </div>

      <h3 className="mt-2 text-[7px] font-semibold text-[#244a80]">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-[120px] text-[5px] leading-3 text-[#8193ad]">
        {text}
      </p>

    </div>
  );
}