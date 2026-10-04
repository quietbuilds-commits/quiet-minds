"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const experiments = [
  { no: 1, title: "Algorithms and Flowcharts to C Conversion" },
  { no: 2, title: "Familiarization with the Programming Environment" },
  { no: 3, title: "Arithmetic Expressions and Type Conversion" },
  { no: 4, title: "Operators, Precedence, and Associativity" },
  { no: 5, title: "Decision-Making using Branching Statements" },
  { no: 6, title: "Iterative Problems using Loops" },
  { no: 7, title: "One-Dimensional Arrays and Linear Search" },
  { no: 8, title: "Two-Dimensional Arrays and Bubble Sort" },
  { no: 9, title: "String Operations with and without Library Functions" },
  { no: 10, title: "Functions using Call by Value" },
  { no: 11, title: "Recursive Functions" },
  { no: 12, title: "Functions using Call by Reference" },
  { no: 13, title: "Pointers and Dynamic Memory Allocation" },
  { no: 14, title: "Structures, Unions, and Bit Fields" },
  { no: 15, title: "Text and Binary File Operations" },
  { no: 16, title: "File Processing Applications" },
];

type LabMaterial = {
  id: string;
  material_type: "experiment_list" | "experiment_pdf" | "record_pdf";
  title: string;
  file_name: string;
  file_path: string;
};

export default function ComputerLabExperimentPage() {
  const params = useParams();

  // Your URLs are /experiment-1, /experiment-2, etc.
  const experimentParam = String(params.experiment ?? "");
  const experimentNumber = Number(
    experimentParam.replace("experiment-", "")
  );

  const [experimentPdf, setExperimentPdf] = useState<LabMaterial | null>(
    null
  );
  const [recordPdf, setRecordPdf] = useState<LabMaterial | null>(null);
  const [loading, setLoading] = useState(true);

  const experiment = experiments.find(
    (item) => item.no === experimentNumber
  );

  useEffect(() => {
    async function loadMaterials() {
      if (!experiment) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: subject, error: subjectError } = await supabase
        .from("subjects")
        .select("id")
        .eq("code", "26CS101L")
        .single();

      if (subjectError || !subject) {
        console.error("Could not find Computer Lab:", subjectError);
        setLoading(false);
        return;
      }

      const { data: materials, error: materialsError } = await supabase
        .from("lab_materials")
        .select(
          "id, material_type, title, file_name, file_path"
        )
        .eq("subject_id", subject.id)
        .eq("experiment_no", experimentNumber);

      if (materialsError) {
        console.error("Could not load lab materials:", materialsError);
        setLoading(false);
        return;
      }

      const experimentMaterial =
        materials?.find(
          (item) => item.material_type === "experiment_pdf"
        ) ?? null;

      const recordMaterial =
        materials?.find(
          (item) => item.material_type === "record_pdf"
        ) ?? null;

      setExperimentPdf(experimentMaterial);
      setRecordPdf(recordMaterial);
      setLoading(false);
    }

    loadMaterials();
  }, [experiment, experimentNumber]);

  async function openPdf(material: LabMaterial) {
    const { data, error } = await supabase.storage
      .from("materials")
      .createSignedUrl(material.file_path, 60 * 60);

    if (error || !data?.signedUrl) {
      console.error("Could not create PDF URL:", error);
      alert("Unable to open this PDF right now.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (!experiment) {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-5 py-10 text-[#30343b]">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/labs/computer-lab"
            className="text-sm text-[#64748b] hover:text-[#30343b]"
          >
            ← Back to Computer Lab
          </Link>

          <div className="mt-8 rounded-3xl border border-[#e8e2da] bg-white p-7 text-center">
            <h1 className="text-xl font-semibold">
              Experiment not found
            </h1>

            <p className="mt-2 text-sm text-[#777]">
              Please select an experiment from the Computer Lab page.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] px-4 py-7 text-[#30343b] sm:px-6">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/labs/computer-lab"
          className="text-sm font-medium text-[#68758a] transition hover:text-[#30343b]"
        >
          ← Computer Lab
        </Link>

        <section className="mt-5">
          <div className="inline-flex rounded-full bg-[#e8f1ff] px-3 py-1 text-xs font-semibold text-[#536b91]">
            Experiment No. {String(experiment.no).padStart(2, "0")}
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {experiment.title}
          </h1>
        </section>

        <section className="mt-7">
          <div className="grid grid-cols-2 gap-3">

            {/* Experiment PDF */}
            <div className="rounded-2xl border border-[#e6e1db] bg-white p-4">
              <div className="text-lg">📘</div>

              <h2 className="mt-2 text-sm font-semibold">
                Experiment PDF
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-[#7a7f87]">
                Procedure and experiment material
              </p>

              {loading ? (
                <div className="mt-4 text-xs text-[#999]">
                  Checking...
                </div>
              ) : experimentPdf ? (
                <button
                  type="button"
                  onClick={() => openPdf(experimentPdf)}
                  className="mt-4 w-full rounded-xl bg-[#eaf2ff] px-3 py-2.5 text-xs font-semibold text-[#526b94] transition hover:bg-[#dceaff]"
                >
                  Open PDF
                </button>
              ) : (
                <div className="mt-4 rounded-xl bg-[#f5f3f0] px-3 py-2.5 text-center text-xs text-[#999]">
                  Not uploaded
                </div>
              )}
            </div>

            {/* Record PDF */}
            <div className="rounded-2xl border border-[#e6e1db] bg-white p-4">
              <div className="text-lg">📝</div>

              <h2 className="mt-2 text-sm font-semibold">
                Record PDF
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-[#7a7f87]">
                Record-writing reference
              </p>

              {loading ? (
                <div className="mt-4 text-xs text-[#999]">
                  Checking...
                </div>
              ) : recordPdf ? (
                <button
                  type="button"
                  onClick={() => openPdf(recordPdf)}
                  className="mt-4 w-full rounded-xl bg-[#fff0e7] px-3 py-2.5 text-xs font-semibold text-[#a16d4d] transition hover:bg-[#ffe5d7]"
                >
                  Open PDF
                </button>
              ) : (
                <div className="mt-4 rounded-xl bg-[#f5f3f0] px-3 py-2.5 text-center text-xs text-[#999]">
                  Not uploaded
                </div>
              )}
            </div>

          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-[#e6e1db] bg-white p-5">
          <h2 className="text-sm font-semibold">
            Experiment {experiment.no}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#666b73]">
            {experiment.title}
          </p>
        </section>

        <div className="mt-5 flex items-center justify-between gap-3">

          {experiment.no > 1 ? (
            <Link
              href={`/labs/computer-lab/experiment-${experiment.no - 1}`}
              className="rounded-xl border border-[#e3ded8] bg-white px-4 py-2.5 text-xs font-semibold text-[#68758a] transition hover:bg-[#f7f4f0]"
            >
              ← Previous
            </Link>
          ) : (
            <div />
          )}

          {experiment.no < experiments.length ? (
            <Link
              href={`/labs/computer-lab/experiment-${experiment.no + 1}`}
              className="rounded-xl bg-[#e8f1ff] px-4 py-2.5 text-xs font-semibold text-[#526b94] transition hover:bg-[#dceaff]"
            >
              Next →
            </Link>
          ) : (
            <div />
          )}

        </div>

      </div>
    </main>
  );
}