
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Syllabus = {
  id: string;
  year_number: number;
  semester_number: number;
  title: string;
  file_path: string;
};

export default function SyllabusPage() {
  const [syllabi, setSyllabi] = useState<Syllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSyllabi() {
      const { data, error } = await supabase
        .from("syllabi")
        .select("id, year_number, semester_number, title, file_path")
        .order("year_number")
        .order("semester_number");

      if (error) {
        setError("Unable to load syllabi. Please try again later.");
      } else {
        setSyllabi(data ?? []);
      }

      setLoading(false);
    }

    loadSyllabi();
  }, []);

  async function openPdf(filePath: string) {
    const { data, error } = await supabase.storage
      .from("syllabi")
      .createSignedUrl(filePath, 60);

    if (error || !data?.signedUrl) {
      setError("Could not open this PDF. Please try again.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#33415C]">
      <header className="border-b border-[#E8DED4] bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-bold tracking-[2px] text-[#334D72]"
          >
            QUIET MINDS
          </Link>

          <Link
            href="/"
            className="rounded-full border border-[#E8DED4] px-4 py-2 text-sm hover:bg-[#FFF9F3]"
          >
            ← Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[3px] text-[#8B7890]">
          Your academic roadmap
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          Syllabus library
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#718096] sm:text-base">
          Find your semester syllabus in one place, from your first year
          to your final year.
        </p>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-10 text-sm text-[#718096]">
            Loading syllabus library...
          </p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((year) => (
              <section
                key={year}
                className="rounded-3xl border border-[#E8DED4] bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-lg">
                    📚
                  </div>
                  <div>
                    <h2 className="font-semibold">Year {year}</h2>
                    <p className="text-xs text-[#8A96A8]">
                      Two semesters
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[1, 2].map((semester) => {
                    const item = syllabi.find(
                      (entry) =>
                        entry.year_number === year &&
                        entry.semester_number === semester
                    );

                    return (
                      <div
                        key={semester}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-[#FFF9F3] p-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium">
                            Semester {semester}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#8993A3]">
                            {item ? item.title : "Syllabus not uploaded yet"}
                          </p>
                        </div>

                        {item ? (
                          <button
                            type="button"
                            onClick={() => openPdf(item.file_path)}
                            className="shrink-0 rounded-full bg-[#3159C9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2748A5]"
                          >
                            Open PDF ↗
                          </button>
                        ) : (
                          <span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs text-[#8993A3]">
                            Coming soon
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-[#8993A3]">
          A quieter way to find your way through college.
        </p>
      </section>
    </main>
  );
}
