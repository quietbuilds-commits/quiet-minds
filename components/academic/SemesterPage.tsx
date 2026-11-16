
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const colors = [
  "bg-[#ffe2d5]",
  "bg-[#e4defd]",
  "bg-[#dff1e8]",
  "bg-[#fff0bd]",
  "bg-[#dcebf8]",
  "bg-[#f3dfef]",
  "bg-[#e9e5d8]",
];

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type SemesterPageProps = {
  year: number;
  semesterNumber: number;
};

export default async function SemesterPage({
  year,
  semesterNumber,
}: SemesterPageProps) {
  const { data: branch } = await supabase
    .from("branches")
    .select("id")
    .eq("code", "ECE")
    .single();

  let subjects: {
    id: string;
    code: string | null;
    name: string;
    subject_type: string;
    display_order: number | null;
  }[] = [];

  if (branch) {
    const { data: semester } = await supabase
      .from("semesters")
      .select("id")
      .eq("branch_id", branch.id)
      .eq("semester_number", semesterNumber)
      .eq("academic_year", year)
      .single();

    if (semester) {
      const { data } = await supabase
        .from("subjects")
        .select("id, code, name, subject_type, display_order")
        .eq("semester_id", semester.id)
        .order("display_order", { ascending: true });

      subjects = data ?? [];
    }
  }

  const theorySubjects = subjects.filter(
    (subject) => subject.subject_type === "theory"
  );

  const labSubjects = subjects.filter(
    (subject) => subject.subject_type === "lab"
  );

  const activitySubjects = subjects.filter(
    (subject) => subject.subject_type === "activity"
  );
  const otherSubjects = subjects.filter(
  (subject) => subject.subject_type === "other"
  );
const cards = [
  ...theorySubjects.map((subject) => ({
    id: subject.id,
    code: subject.code ?? "SUBJECT",
    name: subject.name,
    color: colors[(subject.display_order ?? 0) % colors.length],
    href: `/ece/year-${year}/sem-${semesterNumber}/${makeSlug(subject.name)}`,
  })),

  ...(labSubjects.length > 0
    ? [
        {
          id: "labs",
          code: "LABS",
          name: "Labs",
          color: "bg-[#f3dfef]",
          href:  `/ece/year-${year}/sem-${semesterNumber}/labs`,
        },
      ]
    : []),

  ...activitySubjects.map((subject) => ({
    id: subject.id,
    code: subject.code ?? "ACTIVITY",
    name: subject.name,
    color: "bg-[#e9e5d8]",
    href: "/sports",
  })),

  ...otherSubjects.map((subject) => ({
    id: subject.id,
    code: subject.code ?? "OTHER",
    name: subject.name,
    color: "bg-[#dcebf8]",
    href: `/ece/year-${year}/sem-${semesterNumber}/${makeSlug(subject.name)}`,
  })),
];


  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#202020] overflow-hidden">
      {/* Background */}
      <div className="fixed top-24 right-[-100px] w-64 h-64 bg-[#dcd7ff] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="fixed bottom-10 left-[-120px] w-72 h-72 bg-[#d8f3e7] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="fixed top-[50%] right-[10%] w-36 h-36 bg-[#ffe2c9] rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-black/5">
        <Link href="/" className="font-black tracking-[-0.04em] text-lg">
          QUIET MINDS
        </Link>

        <nav className="flex items-center gap-3 text-xs md:text-sm text-black/50">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span className="text-black/20">/</span>
          <Link href="/ece" className="hover:text-black transition">ECE</Link>
          <span className="text-black/20">/</span>
          <Link href={`/ece/year-${year}`} className="hover:text-black transition">
            Year {year}
          </Link>
          <span className="text-black/20">/</span>
          <span className="text-black">Sem {semesterNumber}</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#7770c9] mb-4">
            ECE · Year {year}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.05em] leading-tight">
            Semester {semesterNumber}
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
            {String(cards.length).padStart(2, "0")} subjects
          </span>
        </div>

        {cards.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((subject) => (
              <Link
                key={subject.id}
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
        ) : (
          <div className="rounded-[1.5rem] border border-black/5 bg-white/70 p-10 md:p-14 text-center">
            <p className="text-3xl mb-4">🌱</p>
            <h3 className="text-lg font-semibold">
              Subjects are coming soon.
            </h3>
            <p className="text-sm text-black/45 mt-3 max-w-md mx-auto leading-6">
              The subject list for this semester hasn't been added yet.
              Check back when the materials are ready.
            </p>
          </div>
        )}
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
