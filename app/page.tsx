
import Image from "next/image";
import Link from "next/link";

const recentUploads = [
  {
    title: "Recently added materials",
    description: "New notes and PDFs will appear here.",
    icon: "▤",
    color: "bg-[#EDE7FA]",
  },
  {
    title: "Your study resources",
    description: "Explore subjects to find your materials.",
    icon: "▣",
    color: "bg-[#E3F0E5]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FCF9F2] text-[#393448]">
      {/* HEADER */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="group">
          <span className="text-xl font-black tracking-tight sm:text-2xl">
            QUIET MINDS<span className="text-[#A58BCB]">.</span>
          </span>
          <span className="block text-[9px] tracking-[0.25em] text-[#998CA0]">
            A LITTLE SPACE TO LEARN
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* SEARCH - FUNCTIONALITY TO BE ADDED LATER */}
          <button
            type="button"
            aria-label="Search coming soon"
            title="Search coming soon"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#EAE3D9] bg-white transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>

          {/* MENU */}
          <details className="group relative">
            <summary
              aria-label="Open menu"
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full bg-[#EDE7F7] transition hover:bg-[#E3D9F1] [&::-webkit-details-marker]:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>

            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#EEE7DD] bg-white p-3 shadow-xl">
              <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-[#A093A6]">
                Quick links
              </p>

              <Link
                href="/admin"
                className="block rounded-xl px-3 py-3 text-sm transition hover:bg-[#F4EFFA]"
              >
                Admin Login
              </Link>

              {[
                "Guardian Angel Login",
                "The Protector Login",
                "Branch Admin Login",
                "Contact Admin",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#6F6877]"
                >
                  {item}
                  <span className="text-[10px] text-[#B2A6B6]">
                    Coming later
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-5 sm:px-8 sm:pt-10 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#EDE5F6] px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#D9C9EC] opacity-60" />
          <div className="pointer-events-none absolute -bottom-20 left-[38%] h-48 w-48 rounded-full bg-[#F8DCCB] opacity-70" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            {/* HERO TEXT */}
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-white/75 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#806A9A]">
                WELCOME TO QUIET MINDS
              </span>

              <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.12] tracking-tight text-[#443653] sm:text-5xl lg:text-6xl">
                A quieter way
                <br />
                to <span className="text-[#987DB8]">study.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#756783] sm:text-base">
                Your notes, your subjects at one place.
                <br />
                Take a breath. Find what you need. Keep learning.
              </p>

              <Link
                href="/ece"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#514263] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8F7BA4]/20 transition hover:-translate-y-1 hover:bg-[#665278]"
              >
                Explore your study space
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {/* YOUR NEW BOOK IMAGE */}
            <div className="relative mx-auto w-full max-w-[380px]">
              <Image
                src="/quiet-minds-book.png"
                alt="Open book illustration representing learning and discovery"
                width={712}
                height={711}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <span className="absolute bottom-5 right-8 hidden text-2xl text-[#A58BCB] sm:block">
            ✦
          </span>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A18FA7]">
            LET'S GET STARTED
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Find your space.
          </h2>
          <p className="mt-2 text-sm text-[#89818D]">
            Choose your branch and explore your learning resources.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/ece"
            className="group relative overflow-hidden rounded-[1.8rem] bg-[#DDEAF8] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-9"
          >
            <div className="absolute -right-7 -top-8 h-36 w-36 rounded-full bg-[#C8DCF2]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#577493]">
                  AVAILABLE NOW
                </span>
                <span className="text-2xl text-[#6686A9] transition group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <div className="mt-8">
                <p className="text-4xl font-black text-[#38536F]">ECE</p>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#617B96]">
                  Years, semesters, subjects and study materials.
                </p>
              </div>
            </div>
          </Link>

          <div className="relative overflow-hidden rounded-[1.8rem] bg-[#F9E6D8] p-7 sm:p-9">
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#F3D5C1]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#A0775C]">
                  MORE TO COME
                </span>
                <span className="text-2xl text-[#B38A6E]">✿</span>
              </div>

              <div className="mt-8">
                <p className="text-3xl font-black text-[#79563F]">
                  Other Branches
                </p>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#98765E]">
                  More learning spaces are on the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING EXAMS */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A18FA7]">
              KEEP AN EYE OUT
            </p>
            <h2 className="mt-2 text-2xl font-bold">Upcoming Exams</h2>
          </div>
          <span className="text-3xl">📅</span>
        </div>

        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#E5F0E4] p-6 sm:p-8">
          <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-[#D4E7D3]" />

          <div className="relative">
            <span className="text-2xl">🌱</span>
            <h3 className="mt-3 text-lg font-bold text-[#45634A]">
              Stay prepared, not stressed.
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#718873]">
              Exam schedules and important announcements will find a home here.
              Check back for updates.
            </p>
          </div>
        </div>
      </section>

      {/* RECENTLY UPLOADED */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A18FA7]">
              FRESH FROM THE LIBRARY
            </p>
            <h2 className="mt-2 text-2xl font-bold">Recently Uploaded</h2>
          </div>
          <span className="text-2xl">✦</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {recentUploads.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl ${item.color} p-5`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-xl text-[#78698B]">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-[#51475C]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#81778A]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[#A49AA6]">
          Latest uploads from all semesters will appear here.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 bg-[#F0EAF3] px-5 py-9 text-center">
        <p className="text-lg font-black tracking-tight text-[#554663]">
          QUIET MINDS.
        </p>

        <p className="mt-2 text-sm text-[#897D91]">
          A quieter way to study.
        </p>

        <div className="mx-auto mt-6 h-px max-w-xs bg-[#DDD2E3]" />

        <p className="mt-5 text-xs text-[#A095A5]">
          Made for curious minds. © {new Date().getFullYear()} QUIET MINDS
        </p>
      </footer>
    </main>
  );
}
