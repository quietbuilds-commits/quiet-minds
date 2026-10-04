"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const experiments = [
  {
    no: 1,
    title: "Introduction to Quantitative Analysis - Demonstration (All COs)",
  },
  {
    no: 2,
    title: "Determination of Hardness of a groundwater sample. (CO1)",
  },
  {
    no: 3,
    title: "Estimation of Dissolved Oxygen by Winkler’s method. (CO1)",
  },
  {
    no: 4,
    title:
      "Determination of nitrite in water sample by spectrometric method. (CO1)",
  },
  {
    no: 5,
    title:
      "Preparation of ZnO nanomaterial by precipitation method. (CO2)",
  },
  {
    no: 6,
    title:
      "Preparation and characterization of Fe2O3 nanomaterial by sol-gel method. (CO2)",
  },
  {
    no: 7,
    title: "Preparation of a Bakelite polymer (CO3)",
  },
  {
    no: 8,
    title: "Preparation of Nylon 6, 6 - polymer (CO3)",
  },
  {
    no: 9,
    title:
      "Estimate percentage of Manganese in Pyrollusite ore sample (CO4)",
  },
  {
    no: 10,
    title:
      "Determination of percentage of Iron in given sample by colorimetric method (CO4)",
  },
  {
    no: 11,
    title: "Chemistry of Blue Printing (Cyanotype Process) (CO5)",
  },
  {
    no: 12,
    title: "Determination of Strength of an acid in Pb-Acid battery (CO5)",
  },
  {
    no: 13,
    title: "Electrodeposition of copper on a base metal (CO5)",
  },
  {
    no: 14,
    title: "Determination of Nitrogen/Sulphur in a coal sample (CO6)",
  },
  {
    no: 15,
    title: "Determination of acid number of lubricating oil (CO6)",
  },
  {
    no: 16,
    title:
      "Determination of Viscosity of lubricating oil by Redwood Viscometer 1&2 (CO6)",
  },
];

type LabMaterial = {
  id: string;
  material_type: "experiment_list" | "experiment_pdf" | "record_pdf";
  title: string;
  file_name: string;
  file_path: string;
};

export default function ChemistryExperimentPage() {
  const params = useParams();

  const experimentParam = String(params.experiment ?? "");

  const experimentNumber = Number(
    experimentParam.replace("experiment-", "")
  );

  const [experimentPdf, setExperimentPdf] =
    useState<LabMaterial | null>(null);

  const [recordPdf, setRecordPdf] =
    useState<LabMaterial | null>(null);

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

      const { data: subject, error: subjectError } =
        await supabase
          .from("subjects")
          .select("id")
          .eq("code", "26CH101L")
          .single();

      if (subjectError || !subject) {
        console.error(
          "Could not find Chemistry Lab:",
          subjectError
        );

        setLoading(false);
        return;
      }

      const { data: materials, error: materialsError } =
        await supabase
          .from("lab_materials")
          .select(
            "id, material_type, title, file_name, file_path"
          )
          .eq("subject_id", subject.id)
          .eq("experiment_no", experimentNumber);

      if (materialsError) {
        console.error(
          "Could not load lab materials:",
          materialsError
        );

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
      console.error(
        "Could not create PDF URL:",
        error
      );

      alert("Unable to open this PDF right now.");
      return;
    }

    window.open(
      data.signedUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (!experiment) {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-5 py-10 text-[#30343b]">
        <div className="mx-auto max-w-3xl">

          <Link
            href="/labs/engineering-chemistry-lab"
            className="text-sm text-[#64748b] hover:text-[#30343b]"
          >
            ← Back to Chemistry Lab
          </Link>

          <div className="mt-8 rounded-3xl border border-[#e8e2da] bg-white p-7 text-center">

            <h1 className="text-xl font-semibold">
              Experiment not found
            </h1>

            <p className="mt-2 text-sm text-[#777]">
              Please select an experiment from the Chemistry Lab page.
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
          href="/labs/engineering-chemistry-lab"
          className="text-sm font-medium text-[#68758a] transition hover:text-[#30343b]"
        >
          ← Chemistry Lab
        </Link>

        <section className="mt-5">

          <div className="inline-flex rounded-full bg-[#e8f1ff] px-3 py-1 text-xs font-semibold text-[#536b91]">
            Experiment No.{" "}
            {String(experiment.no).padStart(2, "0")}
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {experiment.title}
          </h1>

        </section>

        <section className="mt-7">

          <div className="grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-[#e6e1db] bg-white p-4">

              <div className="text-lg">
                📘
              </div>

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

              <div className="text-lg">
                📝
              </div>

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
              href={`/labs/engineering-chemistry-lab/experiment-${
                experiment.no - 1
              }`}
              className="rounded-xl border border-[#e3ded8] bg-white px-4 py-2.5 text-xs font-semibold text-[#68758a] transition hover:bg-[#f7f4f0]"
            >
              ← Previous
            </Link>
          ) : (
            <div />
          )}

          {experiment.no < experiments.length ? (
            <Link
              href={`/labs/engineering-chemistry-lab/experiment-${
                experiment.no + 1
              }`}
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