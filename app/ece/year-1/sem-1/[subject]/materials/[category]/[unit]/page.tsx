
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
  { title: string; materialType: string; color: string }
> = {
  "class-notes": {
    title: "Class Notes",
    materialType: "class_note",
    color: "#F0ECFF",
  },
  "short-notes": {
    title: "Short Notes / Mind Maps",
    materialType: "short_note",
    color: "#EAF8F1",
  },
  "class-questions": {
    title: "Class Questions",
    materialType: "class_question",
    color: "#FFF1E7",
  },
};

type Material = {
  id: string | number;
  title: string | null;
  file_name: string | null;
  file_path: string | null;
  unit_number: number | null;
  material_type?: string;
  section?: string;
  created_at: string;
};

export default async function MaterialUnitPage({
  params,
}: {
  params: Promise<{
    subject: string;
    category: string;
    unit: string;
  }>;
}) {
  const { subject, category, unit } = await params;
  const unitNumber = Number(unit);

  const subjectCode = subjectCodes[subject];
  const subjectName = subjectNames[subject];
  const selectedCategory = categories[category];

  if (
    !subjectCode ||
    !subjectName ||
    !selectedCategory ||
    !Number.isInteger(unitNumber) ||
    unitNumber < 1 ||
    unitNumber > 6
  ) {
    return (
      <main className="min-h-screen bg-[#FCFBF7] px-6 py-12">
        <p>Page not found.</p>
        <Link href="/ece/year-1/sem-1" className="mt-4 inline-block underline">
          Back to subjects
        </Link>
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

  let materials: Material[] = [];
  let loadError = false;

  if (subjectError || !subjectData) {
    console.error("Subject lookup failed:", subjectError?.message);
    loadError = true;
  } else {
    const { data, error } = await supabase
      .from("materials")
      .select(
        "id, title, file_name, file_path, unit_number, material_type, section, created_at"
      )
      .eq("subject_id", subjectData.id)
      .eq("material_type", selectedCategory.materialType)
      .eq("unit_number", unitNumber)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Materials query failed:", error.message);
      loadError = true;
    } else {
      materials = (data ?? []) as Material[];
      console.log("Quiet Minds material lookup:", {
        subject,
        subjectCode,
        category,
        expectedMaterialType: selectedCategory.materialType,
        unitNumber,
        resultsFound: materials.length,
      });

      // If nothing matched, inspect recent materials for this subject
      // to help identify an admin-upload field mismatch.
      if (materials.length === 0) {
        const { data: recent, error: diagnosticError } = await supabase
          .from("materials")
          .select(
            "title, material_type, section, unit_number, subject_id, created_at"
          )
          .eq("subject_id", subjectData.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (diagnosticError) {
          console.error("Material diagnostic failed:", diagnosticError.message);
        } else {
          console.log("Recent materials for this subject:", recent);
        }
      }
    }
  }

  const materialsWithUrls = await Promise.all(
    materials.map(async (material) => {
      if (!material.file_path) {
        return { ...material, fileUrl: null as string | null };
      }

      const { data, error } = await supabase.storage
        .from("materials")
        .createSignedUrl(material.file_path, 60 * 10);

      if (error) {
        console.error("Signed URL failed:", error.message, material.file_path);
      }

      return {
        ...material,
        fileUrl: data?.signedUrl ?? null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-[#FCFBF7] px-6 py-10 text-[#252525]">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/ece/year-1/sem-1/${subject}/materials/${category}`}
          className="text-sm text-gray-500 transition hover:text-gray-800"
        >
          ← Back to {selectedCategory.title}
        </Link>

        <section className="mt-8">
          <div
            className="rounded-[28px] p-8 sm:p-10"
            style={{ backgroundColor: selectedCategory.color }}
          >
            <p className="text-sm text-gray-500">{subjectName}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Unit {unitNumber}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {selectedCategory.title} · All uploaded PDFs
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {loadError ? (
              <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">
                Couldn't load the materials. Check the terminal running
                npm run dev for the error details.
              </div>
            ) : materialsWithUrls.length > 0 ? (
              materialsWithUrls.map((material) => (
                <article
                  key={material.id}
                  className="rounded-2xl border border-black/5 bg-white p-6 transition hover:shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-medium">
                        {material.title || material.file_name || "Study PDF"}
                      </h2>
                      {material.file_name && (
                        <p className="mt-1 break-words text-sm text-gray-500">
                          {material.file_name}
                        </p>
                      )}
                    </div>

                    {material.fileUrl ? (
                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-full bg-[#252525] px-4 py-2 text-sm text-white transition hover:bg-[#444]"
                      >
                        Open PDF ↗
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">
                        File unavailable
                      </span>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-black/5 bg-white p-8">
                <p className="font-medium">
                  No PDFs uploaded for this unit yet.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  PDFs uploaded for this subject, category, and unit will
                  appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
