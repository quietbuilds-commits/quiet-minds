const subjectNames: Record<string, string> = {
  "linear-algebra-and-calculus": "Linear Algebra & Calculus",
  "engineering-chemistry": "Engineering Chemistry",
  "communicative-english": "Communicative English",
  "programming-for-problem-solving": "Programming for Problem Solving",
  "basics-of-engineering": "Basics of Engineering",
};

const unitColors = [
  "#EAF4FF",
  "#F0ECFF",
  "#EAF8F1",
  "#FFF1E7",
  "#FFF4D8",
  "#FCECF4",
];

export default async function UnitPdfsPage({
  params,
}: {
  params: Promise<{
    subject: string;
  }>;
}) {
  const { subject } = await params;

  const subjectName = subjectNames[subject];

  if (!subjectName) {
    return (
      <main className="min-h-screen bg-[#FCFBF7] px-6 py-12 text-[#252525]">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-gray-500">Subject not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] px-6 py-10 text-[#252525]">
      <div className="mx-auto max-w-4xl">
        <a
          href={`/ece/year-1/sem-1/${subject}`}
          className="text-sm text-gray-500 transition hover:text-gray-800"
        >
          ← Back to Subject
        </a>

        <section className="mt-8">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            {subjectName}
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Unit PDFs
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Choose a unit to open its PDF.
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => {
            const unitNumber = index + 1;

            return (
              <a
                key={unitNumber}
                href={`/ece/year-1/sem-1/${subject}/unit-pdfs/unit-${unitNumber}`}
                className="rounded-[24px] p-6 transition hover:-translate-y-1 hover:shadow-sm"
                style={{
                  backgroundColor: unitColors[index],
                }}
              >
                <p className="text-sm text-gray-500">
                  {subjectName}
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Unit {unitNumber}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Open unit PDF →
                </p>
              </a>
            );
          })}
        </section>
      </div>
    </main>
  );
}