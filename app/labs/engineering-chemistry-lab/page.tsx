"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const experiments = [
  {
    no: 1,
    title:
      "Introduction to Quantitative Analysis - Demonstration (All COs)",
  },
  {
    no: 2,
    title:
      "Determination of Hardness of a groundwater sample. (CO1)",
  },
  {
    no: 3,
    title:
      "Estimation of Dissolved Oxygen by Winkler’s method. (CO1)",
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
    title:
      "Preparation of a Bakelite polymer (CO3)",
  },
  {
    no: 8,
    title:
      "Preparation of Nylon 6, 6 - polymer (CO3)",
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
    title:
      "Chemistry of Blue Printing (Cyanotype Process) (CO5)",
  },
  {
    no: 12,
    title:
      "Determination of Strength of an acid in Pb-Acid battery (CO5)",
  },
  {
    no: 13,
    title:
      "Electrodeposition of copper on a base metal (CO5)",
  },
  {
    no: 14,
    title:
      "Determination of Nitrogen/Sulphur in a coal sample (CO6)",
  },
  {
    no: 15,
    title:
      "Determination of acid number of lubricating oil (CO6)",
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

export default function EngineeringChemistryLabPage() {
  const [experimentList, setExperimentList] =
    useState<LabMaterial | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperimentList() {
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

      const { data, error } = await supabase
        .from("lab_materials")
        .select(
          "id, material_type, title, file_name, file_path"
        )
        .eq("subject_id", subject.id)
        .eq("material_type", "experiment_list")
        .is("experiment_no", null)
        .maybeSingle();

      if (error) {
        console.error(
          "Could not load experiment list:",
          error
        );
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

  return (
    <main className="min-h-screen bg-[#faf8f4] px-4 py-7 text-[#30343b] sm:px-6">

      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          href="/labs"
          className="text-sm font-medium text-[#68758a] transition hover:text-[#30343b]"
        >
          ← Labs
        </Link>

        {/* Header */}
        <section className="mt-5">
          <div className="inline-flex rounded-full bg-[#e8f1ff] px-3 py-1 text-xs font-semibold text-[#536b91]">
            Chemistry Lab
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Engineering Chemistry Lab
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777b82]">
            Experiments, procedures, and practical material.
          </p>
        </section>

        {/* Experiment List */}
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

        {/* Experiments */}
        <section className="mt-5">

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Experiments
            </h2>

            <span className="text-xs text-[#92959b]">
              {experiments.length} experiments
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {experiments.map((experiment) => (
              <Link
                key={experiment.no}
                href={`/labs/engineering-chemistry-lab/experiment-${experiment.no}`}
                className="group rounded-2xl border border-[#e6e1db] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#d9d2ca]"
              >

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ff] text-xs font-semibold text-[#61749a]">
                    {String(experiment.no).padStart(2, "0")}
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

        </section>

      </div>
    </main>
  );
}