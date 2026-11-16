
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

function makeSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

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
    "unit-pdfs": {
        title: "Unit PDFs",
        description: "Official unit-wise study material",
        materialType: "unit_pdf",
        color: "#EAF2FF",
    },
};

export default async function MaterialsPage({
    params,
}: {
    params: Promise<{ subject: string; category: string }>;
}) {
    const { subject, category } = await params;

    const selectedCategory = categories[category];

    if (!selectedCategory) {
        notFound();
    }

    // Get Semester 3
    const { data: semesterData, error: semesterError } = await supabase
        .from("semesters")
        .select("id")
        .eq("academic_year", 2)
        .eq("semester_number", 4)
        .single();

    if (semesterError || !semesterData) {
        throw new Error("Unable to load semester.");
    }

    // Get theory subjects belonging to Semester 3
    const { data: subjects, error } = await supabase
        .from("subjects")
        .select("id, name, code, subject_type")
        .eq("semester_id", semesterData.id)
        .eq("subject_type", "theory");

    if (error || !subjects) {
        throw new Error("Unable to load subjects.");
    }

    const subjectData = subjects.find(
        (item) => makeSlug(item.name) === subject
    );

    if (!subjectData) {
        notFound();
    }

    const subjectName = subjectData.name;
    const basePath = `/ece/year-2/sem-4/${subject}`;

    return (
        <main className="min-h-screen bg-[#FCFBF7] px-6 py-10 text-[#252525]">
            <div className="mx-auto max-w-4xl">
                <Link
                    href={basePath}
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
                                href={`${basePath}/materials/${category}/${unit}`}
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
