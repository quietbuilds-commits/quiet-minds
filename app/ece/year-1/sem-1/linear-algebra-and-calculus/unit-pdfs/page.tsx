import Link from "next/link";

export default function UnitPDFsPage() {
  const units = [
    {
      number: "01",
      title: "Unit 1",
      description: "Matrices, rank and systems of equations",
      color: "#EAF4FF",
      href: "/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs/unit-1",
    },
    {
      number: "02",
      title: "Unit 2",
      description: "Eigenvalues, eigenvectors and transformations",
      color: "#F0ECFF",
      href: "/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs/unit-2",
    },
    {
      number: "03",
      title: "Unit 3",
      description: "Differential calculus and applications",
      color: "#EAF8F1",
      href: "/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs/unit-3",
    },
    {
      number: "04",
      title: "Unit 4",
      description: "Integral calculus and applications",
      color: "#FFF1E7",
      href: "/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs/unit-4",
    },
    {
      number: "05",
      title: "Unit 5",
      description: "Additional topics and revision",
      color: "#FFF4D8",
      href: "/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs/unit-5",
    },
    {
      number: "06",
      title: "Unit 6",
      description: "Unit 6 study materials and resources",
      color: "#FCECF4",
      href: "/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs/unit-6",
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
          borderBottom: "1px solid #EAE7E0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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

        <div
          style={{
            fontSize: "13px",
            color: "#777",
          }}
        >
          Linear Algebra & Calculus
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "65px 6% 45px",
        }}
      >
        <p
          style={{
            margin: "0 0 14px",
            fontSize: "12px",
            color: "#8877C5",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Study Material
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(32px, 5vw, 50px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Unit PDFs.
        </h1>

        <p
          style={{
            marginTop: "18px",
            maxWidth: "520px",
            color: "#777",
            fontSize: "16px",
            lineHeight: 1.6,
          }}
        >
          Choose a unit to find the material you need.
        </p>
      </section>

      {/* UNITS */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "10px 6% 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {units.map((unit) => (
            <Link
              key={unit.number}
              href={unit.href}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: unit.color,
                  borderRadius: "20px",
                  padding: "25px",
                  minHeight: "150px",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#777",
                    marginBottom: "40px",
                  }}
                >
                  {unit.number}
                </div>

                <h2
                  style={{
                    margin: "0 0 7px",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {unit.title}
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "#777",
                  }}
                >
                  {unit.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 6%",
          textAlign: "center",
          color: "#999",
          fontSize: "12px",
          borderTop: "1px solid #EAE7E0",
        }}
      >
        A little beyond classroom.
      </footer>
    </main>
  );
}