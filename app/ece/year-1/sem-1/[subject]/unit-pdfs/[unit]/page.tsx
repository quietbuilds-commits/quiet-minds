
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

const unitColors: Record<number, string> = {
  1: "#EAF4FF",
  2: "#F0ECFF",
  3: "#EAF8F1",
  4: "#FFF1E7",
  5: "#FFF4D8",
  6: "#FCECF4",
};

export default async function UnitPdfPage({
  params,
}: {
  params: Promise<{
    subject: string;
    unit: string;
  }>;
}) {
  const { subject, unit } = await params;

  const subjectCode = subjectCodes[subject];
  const subjectName = subjectNames[subject];
  const unitNumber = Number(unit.replace("unit-", ""));

  if (
    !subjectCode ||
    !subjectName ||
    !Number.isInteger(unitNumber) ||
    unitNumber < 1 ||
    unitNumber > 6
  ) {
    return (
      <main className="min-h-screen bg-[#FCFBF7] px-6 py-12 text-[#252525]">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-gray-500">
            Page not found.
          </p>
        </div>
      </main>
    );
  }

  const {
    data: subjectData,
    error: subjectError,
  } = await supabase
    .from("subjects")
    .select("id")
    .eq("code", subjectCode)
    .single();

  if (subjectError || !subjectData) {
    console.error(
      "Error loading subject:",
      subjectError?.message
    );

    return (
      <main className="min-h-screen bg-[#FCFBF7] px-6 py-12 text-[#252525]">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-gray-500">
            Subject information could not be found.
          </p>
        </div>
      </main>
    );
  }

  const { data: materials, error } = await supabase
    .from("materials")
    .select("*")
    .eq("subject_id", subjectData.id)
    .eq("material_type", "unit_pdf")
    .eq("unit_number", unitNumber)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "Error loading unit PDF:",
      error.message
    );
  }

  const material = materials?.[0] ?? null;

  let fileUrl: string | null = null;
  let fileUrlError = false;

  if (material?.file_path) {
    const { data: signedData, error: signedUrlError } =
      await supabase.storage
        .from("materials")
        .createSignedUrl(material.file_path, 60 * 10);

    if (signedUrlError) {
      console.error(
        "Error creating signed PDF URL:",
        signedUrlError.message
      );
      fileUrlError = true;
    }

    fileUrl = signedData?.signedUrl ?? null;
  }

  const background = unitColors[unitNumber];

  return (
    <main className="min-h-screen bg-[#FCFBF7] px-6 py-10 text-[#252525]">
      <div className="mx-auto max-w-4xl">
        <a
          href={`/ece/year-1/sem-1/${subject}/unit-pdfs`}
          className="text-sm text-gray-500 transition hover:text-gray-800"
        >
          ← Back to Unit PDFs
        </a>

        <section className="mt-8">
          <div
            className="rounded-[28px] p-8 sm:p-10"
            style={{ backgroundColor: background }}
          >
            <p className="text-sm font-medium tracking-wide text-gray-500">
              {subjectName}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Unit {unitNumber}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Unit PDF
            </p>
          </div>

          <div className="mt-8">
            {error ? (
              <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">
                Something went wrong while loading this material.
                Please check the server terminal for details.
              </div>
            ) : material && fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-black/5 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">
                      {material.title}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {material.file_name}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#252525] px-4 py-2 text-sm text-white">
                    Open PDF
                  </span>
                </div>
              </a>
            ) : fileUrlError ? (
              <div className="rounded-2xl border border-black/5 bg-white p-8">
                <p className="font-medium">
                  Unable to open this PDF.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  The material was found, but a PDF link could not be created.
                  Please check the storage permissions.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-black/5 bg-white p-8">
                <p className="font-medium">
                  No PDF uploaded yet.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  This unit will appear here once the material is uploaded.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
