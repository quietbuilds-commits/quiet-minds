"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const experiments = [
  "Algorithms and Flowcharts to C Conversion",
  "Familiarization with the Programming Environment",
  "Arithmetic Expressions and Type Conversion",
  "Operators, Precedence, and Associativity",
  "Decision-Making using Branching Statements",
  "Iterative Problems using Loops",
  "One-Dimensional Arrays and Linear Search",
  "Two-Dimensional Arrays and Bubble Sort",
  "String Operations with and without Library Functions",
  "Functions using Call by Value",
  "Recursive Functions",
  "Functions using Call by Reference",
  "Pointers and Dynamic Memory Allocation",
  "Structures, Unions, and Bit Fields",
  "Text and Binary File Operations",
  "File Processing Applications",
];

type LabMaterial = {
  id: string;
  material_type: "experiment_list" | "experiment_pdf" | "record_pdf";
  title: string;
  file_name: string;
  file_path: string;
};

export default function ComputerLabPage() {
  const [experimentList, setExperimentList] =
    useState<LabMaterial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperimentList() {
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

      const { data, error } = await supabase
        .from("lab_materials")
        .select("id, material_type, title, file_name, file_path")
        .eq("subject_id", subject.id)
        .eq("material_type", "experiment_list")
        .is("experiment_no", null)
        .maybeSingle();

      if (error) {
        console.error("Could not load experiment list:", error);
      }

      setExperimentList(data ?? null);
      setLoading(false);
    }

    loadExperimentList();
  }, []);

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

  return (
    <main className="min-h-screen bg-[#faf8f4] px-4 py-7 text-[#30343b] sm:px-6">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/labs"
          className="text-sm font-medium text-[#68758a] transition hover:text-[#30343b]"
        >
          ← Labs
        </Link>

        <section className="mt-5">
          <div className="inline-flex rounded-full bg-[#e8f1ff] px-3 py-1 text-xs font-semibold text-[#536b91]">
            Computer Lab
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Programming for Problem Solving Lab
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777b82]">
            Programming experiments and practical material.
          </p>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e6e1db] bg-white p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <h2 className="text-sm font-semibold">
                  Experiment List
                </h2>
              </div>

              <p className="mt-1 text-xs text-[#7a7f87]">
                Official list of all laboratory experiments
              </p>
            </div>

            {loading ? (
              <span className="shrink-0 text-xs text-[#999]">
                Checking...
              </span>
            ) : experimentList ? (
              <button
                type="button"
                onClick={() => openPdf(experimentList)}
                className="shrink-0 rounded-xl bg-[#eaf2ff] px-3 py-2.5 text-xs font-semibold text-[#526b94] transition hover:bg-[#dceaff]"
              >
                Open PDF
              </button>
            ) : (
              <span className="shrink-0 rounded-xl bg-[#f5f3f0] px-3 py-2.5 text-xs text-[#999]">
                Not uploaded
              </span>
            )}
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Experiments</h2>

            <span className="text-xs text-[#92959b]">
              {experiments.length} experiments
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {experiments.map((title, index) => {
              const number = index + 1;

              return (
                <Link
                  key={number}
                  href={`/labs/computer-lab/experiment-${number}`}
                  className="group rounded-2xl border border-[#e6e1db] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#d9d2ca]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ff] text-xs font-semibold text-[#61749a]">
                      {String(number).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-medium leading-5 text-[#34383e]">
                        {title}
                      </h3>

                      <p className="mt-2 text-xs font-medium text-[#8a8e95] group-hover:text-[#66758d]">
                        Open experiment →
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}