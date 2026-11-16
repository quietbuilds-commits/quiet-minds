
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const colors = [
  "bg-[#dff1e8]",
  "bg-[#fff0bd]",
  "bg-[#e4defd]",
  "bg-[#ffe2d5]",
  "bg-[#dcebf8]",
  "bg-[#f3dfef]",
];

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type SemesterLabsPageProps = {
  year: number;
  semesterNumber: number;
};

export default async function SemesterLabsPage({
  year,
  semesterNumber,
}: SemesterLabsPageProps) {
  const { data: branch } = await supabase
    .from("branches")
    .select("id")
    .eq("code", "ECE")
    .single();

  let labSubjects: {
    id: string;
    code: string | null;
    name: string;
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
        .select("id, code, name, display_order")
        .eq("semester_id", semester.id)
        .eq("subject_type", "lab")
        .order("display_order", { ascending: true });

      labSubjects = data ?? [];
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#202020] overflow-hidden">
      <div className="fixed top-24 right-[-100px] w-64 h-64 bg-[#dcd7ff] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="fixed bottom-10 left-[-120px] w-72 h-72 bg-[#d8f3e7] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-black/5">
        <Link href="/" className="font-black tracking-[-0.04em] text-lg">
          QUIET MINDS
        </Link>

        <nav className="flex items-center gap-3 text-xs md:text-sm text-black/50">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/ece" className="hover:text-black">ECE</Link>
          <span>/</span>
          <Link href={`/ece/year-${year}`} className="hover:text-black">
            Year {year}
          </Link>
          <span>/</span>
          <Link
            href={`/ece/year-${year}/sem-${semesterNumber}`}
            className="hover:text-black"
          >
            Sem {semesterNumber}
          </Link>
          <span>/</span>
          <span className="text-black">Labs</span>
        </nav>
      </header>

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#7770c9] mb-4">
          ECE · Year {year} · Semester {semesterNumber}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.05em]">
          Laboratory Subjects
        </h1>

        <p className="mt-5 text-lg font-medium">
          Practical learning, one experiment at a time.
        </p>

        <p className="mt-3 text-sm text-black/50 max-w-lg leading-6">
          Choose a laboratory to explore its experiments, manuals and records.
        </p>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-black/35 mb-2">
              Your laboratories
            </p>
            <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
              Choose a lab.
            </h2>
          </div>

          <span className="hidden md:block text-xs text-black/35">
            {String(labSubjects.length).padStart(2, "0")} labs
          </span>
        </div>

        {labSubjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {labSubjects.map((lab, index) => (
              <Link
                key={lab.id}
                href={
                      lab.code === "26CS101L"
                      ? "/labs/computer-lab"
                      : `/labs/${makeSlug(lab.name)}`
                }
                className={`group relative min-h-[180px] rounded-[1.5rem] ${
                  colors[index % colors.length]
                } border border-black/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold tracking-[0.06em] text-black/40">
                    {lab.code ?? "LAB"}
                  </span>
                  <span className="text-xl font-light group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-base font-semibold leading-5 max-w-[230px]">
                    {lab.name}
                  </p>
                  <p className="text-xs text-black/40 mt-2">
                    Explore experiments
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-black/5 bg-white/70 p-10 text-center">
            <p className="text-3xl mb-4">🌱</p>
            <h3 className="text-lg font-semibold">Labs coming soon.</h3>
            <p className="text-sm text-black/45 mt-3">
              Laboratory subjects for this semester haven't been added yet.
            </p>
          </div>
        )}
      </section>

      <footer className="relative z-10 border-t border-black/5 max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-black/40">
        <p>QUIET MINDS</p>
        <p>Study quietly. Build steadily.</p>
      </footer>
    </main>
  );
}
