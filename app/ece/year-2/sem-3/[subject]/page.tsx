
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

const studyMaterial = [
  {
    number: "01",
    title: "Unit PDFs",
    description: "Complete unit-wise study material",
    color: "#EAF4FF",
    href: "materials/unit-pdfs",
  },
  {
    number: "02",
    title: "Class Notes",
    description: "Notes collected from classes",
    color: "#F0ECFF",
    href: "materials/class-notes",
  },
  {
    number: "03",
    title: "Short Notes / Mind Maps",
    description: "Quick revision and mind maps",
    color: "#EAF8F1",
    href: "materials/short-notes",
  },
  {
    number: "04",
    title: "Class Questions",
    description: "Class and unit-end questions",
    color: "#FFF1E7",
    href: "materials/class-questions",
  },
];

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;

  const { data: semesterData, error: semesterError } = await supabase
    .from("semesters")
    .select("id")
    .eq("academic_year", 2)
    .eq("semester_number", 3)
    .single();

  if (semesterError || !semesterData) {
    console.error("Semester lookup failed:", semesterError?.message);
    notFound();
  }

  const { data: subjects, error } = await supabase
    .from("subjects")
    .select("id, name, code, subject_type")
    .eq("semester_id", semesterData.id)
    .eq("subject_type", "theory");

  if (error) {
    console.error("Subject lookup failed:", error.message);
    throw new Error("Unable to load subject information.");
  }

  const subjectData = (subjects ?? []).find(
    (item) => makeSlug(item.name) === subject
  );

  if (!subjectData) {
    notFound();
  }

  const basePath = `/ece/year-2/sem-3/${subject}`;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FCFBF7",
        color: "#202020",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          padding: "24px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #EAE7E0",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "0.04em" }}>
          QUIET MINDS
        </div>

        <div style={{ fontSize: "13px", color: "#777" }}>
          Sem 3 / {subjectData.name}
        </div>
      </header>

      <section
        style={{
          padding: "70px 6% 55px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#8B78C8",
            letterSpacing: "0.12em",
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          {subjectData.code}
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 58px)",
            lineHeight: 1.08,
            margin: 0,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {subjectData.name}
        </h1>

        <p
          style={{
            marginTop: "20px",
            maxWidth: "560px",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#666",
          }}
        >
          Everything you need for the subject, gathered in one quiet space.
        </p>
      </section>

      <section
        style={{
          padding: "30px 6% 70px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <p
            style={{
              fontSize: "12px",
              color: "#999",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            01
          </p>

          <h2 style={{ fontSize: "25px", margin: 0, fontWeight: 600 }}>
            Study Material
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {studyMaterial.map((item) => (
            <Link
              key={item.number}
              href={`${basePath}/${item.href}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: item.color,
                  borderRadius: "20px",
                  padding: "24px",
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
              >
                <span style={{ fontSize: "12px", color: "#777" }}>
                  {item.number}
                </span>

                <div>
                  <h3 style={{ margin: "0 0 7px", fontSize: "17px", fontWeight: 600 }}>
                    {item.title}
                  </h3>

                  <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.5, color: "#777" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "20px 6% 55px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <p
            style={{
              fontSize: "12px",
              color: "#999",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            02
          </p>

          <h2 style={{ fontSize: "25px", margin: 0, fontWeight: 600 }}>
            Question Bank
          </h2>
        </div>

        <Link
          href={`${basePath}/question-bank`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#FFF4D8",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "145px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "12px", color: "#777" }}>05</span>

            <div>
              <h3 style={{ margin: "0 0 7px", fontSize: "19px" }}>
                Question Bank →
              </h3>

              <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>
                PYQs, PCA, CA and ESA assessment papers
              </p>
            </div>
          </div>
        </Link>
      </section>

      <footer
        style={{
          padding: "45px 6%",
          textAlign: "center",
          color: "#999",
          fontSize: "12px",
        }}
      >
        A little beyond classroom.
      </footer>
    </main>
  );
}
