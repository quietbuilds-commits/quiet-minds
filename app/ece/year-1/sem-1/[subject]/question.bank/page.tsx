
import Link from "next/link";
import { notFound } from "next/navigation";

const subjectNames: Record<string, string> = {
  "linear-algebra-and-calculus": "Linear Algebra & Calculus",
  "engineering-chemistry": "Engineering Chemistry",
  "communicative-english": "Communicative English",
  "programming-for-problem-solving": "Programming for Problem Solving",
  "basics-of-engineering": "Basics of Engineering",
};

const categories = [
  {
    number: "01",
    title: "PYQs",
    description: "Previous year question papers",
    color: "#FFF4D8",
    slug: "pyq",
  },
  {
    number: "02",
    title: "PCA",
    description: "Practice or class assessment papers",
    color: "#EAF4FF",
    slug: "pca",
  },
  {
    number: "03",
    title: "CA",
    description: "Continuous assessment papers",
    color: "#EAF8F1",
    slug: "ca",
  },
  {
    number: "04",
    title: "ESA",
    description: "End semester assessment papers",
    color: "#FCECF4",
    slug: "esa",
  },
];

export default async function QuestionBankPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const subjectName = subjectNames[subject];

  if (!subjectName) notFound();

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
          borderBottom: "1px solid #EAE7E0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/ece/year-1/sem-1/${subject}`}
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

        <span style={{ fontSize: "13px", color: "#777" }}>
          Sem 1 / Question Bank
        </span>
      </header>

      <section
        style={{
          padding: "65px 6% 35px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#8B78C8",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          QUESTION BANK
        </p>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.15,
            margin: "14px 0",
            letterSpacing: "-0.03em",
          }}
        >
          {subjectName}
        </h1>

        <p
          style={{
            color: "#777",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "560px",
          }}
        >
          Choose a question category to find the papers you need for revision
          and exam preparation.
        </p>
      </section>

      <section
        style={{
          padding: "20px 6% 80px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "16px",
          }}
        >
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/ece/year-1/sem-1/${subject}/question-bank/${item.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: item.color,
                  borderRadius: "20px",
                  padding: "25px",
                  minHeight: "155px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "25px",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
              >
                <span style={{ fontSize: "12px", color: "#777" }}>
                  {item.number}
                </span>

                <div>
                  <h2 style={{ fontSize: "20px", margin: "0 0 8px" }}>
                    {item.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.6,
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

        <Link
          href={`/ece/year-1/sem-1/${subject}`}
          style={{
            display: "inline-block",
            marginTop: "30px",
            color: "#7868B8",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Back to subject
        </Link>
      </section>

      <footer
        style={{
          padding: "35px 6%",
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
