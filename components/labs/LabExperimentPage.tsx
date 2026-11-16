
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type LabMaterial = {
  id: string;
  experiment_no: number | null;
  material_type: "experiment_list" | "experiment_pdf" | "record_pdf";
  title: string;
  file_name: string;
  file_path: string;
};

type LabExperimentPageProps = {
  subjectCode: string;
  labName: string;
  labHref: string;
};

export default function LabExperimentPage({
  subjectCode,
  labName,
  labHref,
}: LabExperimentPageProps) {
  const params = useParams();
  const experimentParam = String(params.experiment ?? "");
  const experimentNumber = Number(
    experimentParam.replace("experiment-", "")
  );

  const [experiments, setExperiments] = useState<LabMaterial[]>([]);
  const [experimentPdf, setExperimentPdf] =
    useState<LabMaterial | null>(null);
  const [recordPdf, setRecordPdf] =
    useState<LabMaterial | null>(null);
  const [loading, setLoading] = useState(true);

  const experiment = experiments.find(
    (item) => item.experiment_no === experimentNumber
  );

  useEffect(() => {
    async function loadMaterials() {
      setLoading(true);

      const { data: subject, error: subjectError } =
        await supabase
          .from("subjects")
          .select("id")
          .eq("code", subjectCode)
          .single();

      if (subjectError || !subject) {
        console.error("Could not find lab subject:", subjectError);
        setExperiments([]);
        setExperimentPdf(null);
        setRecordPdf(null);
        setLoading(false);
        return;
      }

      const { data: materials, error } = await supabase
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

      const rows = (materials ?? []) as LabMaterial[];

      const experimentRows = rows
        .filter(
          (item) =>
            item.material_type === "experiment_pdf" &&
            item.experiment_no !== null
        )
        .sort(
          (a, b) =>
            (a.experiment_no ?? 0) - (b.experiment_no ?? 0)
        );

      setExperiments(experimentRows);

      setExperimentPdf(
        experimentRows.find(
          (item) => item.experiment_no === experimentNumber
        ) ?? null
      );

      setRecordPdf(
        rows.find(
          (item) =>
            item.experiment_no === experimentNumber &&
            item.material_type === "record_pdf"
        ) ?? null
      );

      setLoading(false);
    }

    loadMaterials();
  }, [subjectCode, experimentNumber]);

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

  if (!loading && !experiment) {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-5 py-10 text-[#30343b]">
        <div className="mx-auto max-w-3xl">
          <Link href={labHref} className="text-sm text-[#64748b]">
            ← Back to {labName}
          </Link>

          <div className="mt-8 rounded-3xl border border-[#e8e2da] bg-white p-7 text-center">
            <h1 className="text-xl font-semibold">
              Experiment not found
            </h1>
            <p className="mt-2 text-sm text-[#777]">
              Please select an experiment from the lab page.
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
          href={labHref}
          className="text-sm font-medium text-[#68758a] transition hover:text-[#30343b]"
        >
          ← {labName}
        </Link>

        <section className="mt-5">
          <div className="inline-flex rounded-full bg-[#e8f1ff] px-3 py-1 text-xs font-semibold text-[#536b91]">
            Experiment No.{" "}
            {String(experimentNumber).padStart(2, "0")}
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {loading ? "Loading experiment..." : experiment?.title}
          </h1>
        </section>

        <section className="mt-7">
          <div className="grid grid-cols-2 gap-3">
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

        {experiment && (
          <>
            <section className="mt-5 rounded-2xl border border-[#e6e1db] bg-white p-5">
              <h2 className="text-sm font-semibold">
                Experiment {experimentNumber}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#666b73]">
                {experiment.title}
              </p>
            </section>

            <div className="mt-5 flex items-center justify-between gap-3">
              {experiments.some(
                (item) =>
                  item.experiment_no === experimentNumber - 1
              ) ? (
                <Link
                  href={`${labHref}/experiment-${experimentNumber - 1}`}
                  className="rounded-xl border border-[#e3ded8] bg-white px-4 py-2.5 text-xs font-semibold text-[#68758a] transition hover:bg-[#f7f4f0]"
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}

              {experiments.some(
                (item) =>
                  item.experiment_no === experimentNumber + 1
              ) ? (
                <Link
                  href={`${labHref}/experiment-${experimentNumber + 1}`}
                  className="rounded-xl bg-[#e8f1ff] px-4 py-2.5 text-xs font-semibold text-[#526b94] transition hover:bg-[#dceaff]"
                >
                  Next →
                </Link>
              ) : (
                <div />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
