
"use client";

import Link from "next/link";

const basePath = "/ece/year-1/sem-1/engineering-chemistry";

const studyMaterials = [
  {
    title: "Unit PDFs",
    description: "Official unit-wise chemistry material",
    href: `${basePath}/unit-pdfs`,
    color: "#EAF4FF",
  },
  {
    title: "Class Notes",
    description: "Notes from classroom learning",
    href: `${basePath}/materials/class-notes`,
    color: "#F0ECFF",
  },
  {
    title: "Short Notes / Mind Maps",
    description: "Quick revision material",
    href: `${basePath}/materials/short-notes`,
    color: "#EAF8F1",
  },
  {
    title: "Class Questions",
    description: "Questions discussed in class",
    href: `${basePath}/materials/class-questions`,
    color: "#FFF1E7",
  },
];

const questionBank = [
  {
    title: "PYQs",
    description: "Previous year question papers",
    href: `${basePath}/question-bank/pyq`,
    color: "#FFF4D8",
  },
  {
    title: "Current Exam Questions",
    description: "Browse PCA, CA and ESA questions",
    href: `${basePath}/question-bank`,
    color: "#FCECF4",
  },
];

const examTypes = [
  {
    title: "PCA",
    description: "Practice or class assessment papers",
    href: `${basePath}/question-bank/pca`,
    color: "#EAF4FF",
  },
  {
    title: "CA",
    description: "Continuous assessment papers",
    href: `${basePath}/question-bank/ca`,
    color: "#EAF8F1",
  },
  {
    title: "ESA",
    description: "End semester assessment papers",
    href: `${basePath}/question-bank/esa`,
    color: "#FCECF4",
  },
];

export default function EngineeringChemistryPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FCFBF7",
        color: "#202020",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
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
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#202020",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          QUIET MINDS
        </Link>

        <div style={{ fontSize: "13px", color: "#777" }}>
          Engineering Chemistry
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          padding: "65px 6% 45px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            fontSize: "11px",
            color: "#8877C5",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          26CH101T
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "38px",
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          Engineering Chemistry.
        </h1>

        <p style={{ marginTop: "12px", color: "#777", fontSize: "15px" }}>
          Study material, notes and question resources.
        </p>
      </section>

      {/* STUDY MATERIAL */}
      <section
        style={{
          padding: "10px 6% 50px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "22px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: "#999",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            STUDY MATERIAL
          </p>

          <h2 style={{ margin: "7px 0 0", fontSize: "22px", fontWeight: 600 }}>
            Learn & revise
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {studyMaterials.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              style={{ textDecoration: "none", color: "#202020" }}
            >
              <div
                style={{
                  background: item.color,
                  borderRadius: "20px",
                  padding: "25px",
                  minHeight: "125px",
                  transition: "transform 0.2s ease",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 9px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#777",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUESTION BANK */}
      <section
        style={{
          padding: "15px 6% 50px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "22px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: "#999",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            QUESTION BANK
          </p>

          <h2 style={{ margin: "7px 0 0", fontSize: "22px", fontWeight: 600 }}>
            Practice & prepare
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {questionBank.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              style={{ textDecoration: "none", color: "#202020" }}
            >
              <div
                style={{
                  background: item.color,
                  borderRadius: "20px",
                  padding: "25px",
                  minHeight: "125px",
                  cursor: "pointer",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 9px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#777",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CURRENT EXAM QUESTIONS */}
      <section
        style={{
          padding: "45px 6%",
          background: "#F3F0FF",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 10px",
              fontSize: "11px",
              color: "#8877C5",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            QUESTION BANK
          </p>

          <h2
            style={{
              fontSize: "23px",
              margin: "0 0 25px",
              fontWeight: 600,
            }}
          >
            Current Exam Questions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "12px",
            }}
          >
            {examTypes.map((exam) => (
              <Link
                key={exam.title}
                href={exam.href}
                style={{ textDecoration: "none", color: "#202020" }}
              >
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "20px",
                    minHeight: "100px",
                    border: "1px solid #E6E1F7",
                    cursor: "pointer",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: "17px",
                      fontWeight: 600,
                    }}
                  >
                    {exam.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#777",
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {exam.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 6%",
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
