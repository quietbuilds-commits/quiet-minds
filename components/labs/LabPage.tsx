
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type LabMaterial = {
  id: string;
  experiment_no: number | null;
  material_type: "experiment_list" | "experiment_pdf" | "record_pdf";
  title: string;
  file_name: string;
  file_path: string;
};

type LabPageProps = {
  subjectCode: string;
  labName: string;
  labHref: string;
  backHref?: string;
  backLabel?: string;
};

export default function LabPage({
  subjectCode,
  labName,
  labHref,
  backHref = "/labs",
  backLabel = "Labs",
}: LabPageProps) {
  const [experiments, setExperiments] = useState<LabMaterial[]>([]);
  const [experimentList, setExperimentList] =
    useState<LabMaterial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLabMaterials() {
      setLoading(true);

      const { data: subject, error: subjectError } =
        await supabase
          .from("subjects")
          .select("id")
          .eq("code", subjectCode)
          .single();

      if (subjectError || !subject) {
        console.error("Could not find lab subject:", subjectError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lab_materials")
        .select(
          "id, experiment_no, material_type, title, file_name, file_path"
        )
        .eq("subject_id", subject.id)
        .order("experiment_no", { ascending: true });

      if (error) {
        console.error("Could not load lab materials:", error);
        setLoading(false);
        return;
      }

      const rows = (data ?? []) as LabMaterial[];

      setExperiments(
        rows
          .filter(
            (item) =>
              item.material_type === "experiment_pdf" &&
              item.experiment_no !== null
          )
          .sort(
            (a, b) =>
              (a.experiment_no ?? 0) - (b.experiment_no ?? 0)
          )
      );

      setExperimentList(
        rows.find(
          (item) =>
            item.material_type === "experiment_list" &&
            item.experiment_no === null
        ) ?? null
      );

      setLoading(false);
    }

    loadLabMaterials();
  }, [subjectCode]);

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
          href={backHref}
          className="text-sm font-medium text-[#68758a] transition hover:text-[#30343b]"
        >
          ← {backLabel}
        </Link>

        <section className="mt-5">
          <div className="inline-flex rounded-full bg-[#e8f1ff] px-3 py-1 text-xs font-semibold text-[#536b91]">
            Lab
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {labName}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777b82]">
            Experiments, procedures, and practical material.
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
            <h2 className="text-sm font-semibold">
              Experiments
            </h2>

            <span className="text-xs text-[#92959b]">
              {loading ? "Loading..." : `${experiments.length} experiments`}
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-[#e6e1db] bg-white p-6 text-center text-sm text-[#999]">
              Loading experiments...
            </div>
          ) : experiments.length === 0 ? (
            <div className="rounded-2xl border border-[#e6e1db] bg-white p-6 text-center text-sm text-[#999]">
              No experiments have been uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {experiments.map((experiment) => (
                <Link
                  key={experiment.id}
                  href={`${labHref}/experiment-${experiment.experiment_no}`}
                  className="group rounded-2xl border border-[#e6e1db] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#d9d2ca]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ff] text-xs font-semibold text-[#61749a]">
                      {String(experiment.experiment_no).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-medium leading-5 text-[#34383e]">
                        {experiment.title}
                      </h3>

                      <p className="mt-2 text-xs font-medium text-[#8a8e95] group-hover:text-[#66758d]">
                        Open experiment →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
