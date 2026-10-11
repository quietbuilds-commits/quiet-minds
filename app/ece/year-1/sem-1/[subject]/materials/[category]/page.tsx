
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const subjectCodes: Record<string, string> = {
  "linear-algebra-and-calculus": "26MA101T",
  "engineering-chemistry": "26CH101T",
  "communicative-english": "26EN101T",
  "programming-for-problem-solving": "26CS101T",
  "basics-of-engineering": "26EE101T",
};

const subjectNames: Record<string, string> = {
  "linear-algebra-and-calculus": "Linear Algebra & Calculus",
  "engineering-chemistry": "Engineering Chemistry",
  "communicative-english": "Communicative English",
  "programming-for-problem-solving": "Programming for Problem Solving",
  "basics-of-engineering": "Basics of Engineering",
};

const categories: Record<
  string,
  { title: string; description: string; materialType: string; color: string }
> = {
  "class-notes": {
    title: "Class Notes",
    description: "Notes collected from classes",
    materialType: "class_note",
    color: "#F0ECFF",
  },
  "short-notes": {
    title: "Short Notes / Mind Maps",
    description: "Quick revision and mind maps",
    materialType: "short_note",
    color: "#EAF8F1",
  },
  "class-questions": {
    title: "Class Questions",
    description: "Class and unit-end questions",
    materialType: "class_question",
    color: "#FFF1E7",
  },
};

export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ subject: string; category: string }>;
}) {
  const { subject, category } = await params;

  const subjectCode = subjectCodes[subject];
  const subjectName = subjectNames[subject];
  const selectedCategory = categories[category];

  if (!subjectCode || !subjectName || !selectedCategory) {
    return (
      <main className="min-h-screen bg-[#FCFBF7] px-6 py-12">
        <p>Page not found.</p>
        <Link href="/ece/year-1/sem-1" className="mt-4 inline-block underline">
          Back to subjects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] px-6 py-10 text-[#252525]">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/ece/year-1/sem-1/${subject}`}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back to {subjectName}
        </Link>

        <section className="mt-8">
          <div
            className="rounded-[28px] p-8 sm:p-10"
            style={{ backgroundColor: selectedCategory.color }}
          >
            <p className="text-sm text-gray-500">{subjectName}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {selectedCategory.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {selectedCategory.description}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((unit) => (
              <Link
                key={unit}
                href={`/ece/year-1/sem-1/${subject}/materials/${category}/${unit}`}
                className="group rounded-2xl border border-black/5 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-widest text-gray-400">
                      UNIT {String(unit).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold">
                      Unit {unit}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      View uploaded PDFs
                    </p>
                  </div>
                  <span className="text-xl text-gray-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
