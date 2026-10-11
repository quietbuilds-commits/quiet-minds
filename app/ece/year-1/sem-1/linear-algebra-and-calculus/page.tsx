
import Link from "next/link";

export default function MathsPage() {
  const basePath =
    "/ece/year-1/sem-1/linear-algebra-and-calculus";

  const studyMaterial = [
    {
      number: "01",
      title: "Unit PDFs",
      description: "Complete unit-wise study material",
      color: "#EAF4FF",
      href: `${basePath}/unit-pdfs`,
    },
    {
      number: "02",
      title: "Class Notes",
      description: "Notes collected from classes",
      color: "#F0ECFF",
      href: `${basePath}/materials/class-notes`,
    },
    {
      number: "03",
      title: "Short Notes",
      description: "Quick revision & mind maps",
      color: "#EAF8F1",
      href: `${basePath}/materials/short-notes`,
    },
    {
      number: "04",
      title: "Class Questions",
      description: "Class & unit-end questions",
      color: "#FFF1E7",
      href: `${basePath}/materials/class-questions`,
    },
  ];

  const questionBank = [
    {
      number: "01",
      title: "PYQs",
      description: "Previous year question papers",
      color: "#FFF4D8",
      href: `${basePath}/question-bank/pyq`,
    },
    {
      number: "02",
      title: "Current Exam Questions",
      description: "PCA, CA and ESA assessment papers",
      color: "#FCECF4",
      href: `${basePath}/question-bank`,
    },
  ];

  const examTypes = [
    {
      name: "PCA",
      description: "Practice or class assessment papers",
      color: "#EAF4FF",
      href: `${basePath}/question-bank/pca`,
    },
    {
      name: "CA",
      description: "Continuous assessment papers",
      color: "#EAF8F1",
      href: `${basePath}/question-bank/ca`,
    },
    {
      name: "ESA",
      description: "End semester assessment papers",
      color: "#FCECF4",
      href: `${basePath}/question-bank/esa`,
    },
  ];

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
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          QUIET MINDS
        </div>

        <div style={{ fontSize: "13px", color: "#777" }}>
          Sem 1 / Maths
        </div>
      </header>

      {/* HERO */}
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
          26MA101T
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
          Linear Algebra
          <br />
          <span style={{ color: "#7D6BC4" }}>
            &amp; Calculus.
          </span>
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
          Everything you need for the subject, gathered in one
          quiet space.
        </p>
      </section>

      {/* STUDY MATERIAL */}
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
              href={item.href}
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
                  <h3
                    style={{
                      margin: "0 0 7px",
                      fontSize: "17px",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "#777",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUESTION BANK */}
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {questionBank.map((item) => (
            <Link
              key={item.number}
              href={item.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: item.color,
                  borderRadius: "20px",
                  padding: "25px",
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "12px", color: "#777" }}>
                  {item.number}
                </span>

                <div>
                  <h3
                    style={{
                      margin: "0 0 7px",
                      fontSize: "17px",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "#777",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CURRENT EXAM QUESTIONS */}
      <section
        style={{
          padding: "55px 6%",
          background: "#F3F0FF",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              color: "#8877C5",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Question Bank
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
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
            }}
          >
            {examTypes.map((exam) => (
              <Link
                key={exam.name}
                href={exam.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "20px",
                    border: "1px solid #E6E1F7",
                    cursor: "pointer",
                    minHeight: "105px",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: "17px",
                      fontWeight: 600,
                    }}
                  >
                    {exam.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      lineHeight: 1.5,
                      color: "#777",
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
