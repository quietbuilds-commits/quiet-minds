"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Material = {
  id: string;
  title: string;
  file_name: string;
  file_path: string;
  created_at: string;
};

export default function Unit2Page() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {
    setLoading(true);
    setError("");

    try {
      const { data: subject, error: subjectError } = await supabase
        .from("subjects")
        .select("id")
        .eq("code", "26MA101T")
        .single();

      if (subjectError) {
        throw new Error(subjectError.message);
      }

      const { data, error: materialError } = await supabase
        .from("materials")
        .select("id, title, file_name, file_path, created_at")
        .eq("subject_id", subject.id)
        .eq("section", "class_notes")
        .eq("material_type", "unit_pdf")
        .eq("unit_number", 2)
        .order("created_at", {
          ascending: false,
        });

      if (materialError) {
        throw new Error(materialError.message);
      }

      setMaterials(data ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function openMaterial(filePath: string) {
    const { data, error } = await supabase.storage
      .from("materials")
      .createSignedUrl(filePath, 60 * 10);

    if (error) {
      alert("Unable to open this file.");
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

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
          Unit 2 / Maths
        </div>
      </header>

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
          26MA101T
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          Unit 2.
        </h1>

        <p
          style={{
            marginTop: "12px",
            color: "#777",
            fontSize: "15px",
          }}
        >
          Eigenvalues, eigenvectors and transformations.
        </p>
      </section>

      <section
        style={{
          padding: "10px 6% 80px",
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
            PDF MATERIAL
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            Unit 2 resources
          </h2>
        </div>

        {loading && (
          <div
            style={{
              background: "#F0ECFF",
              borderRadius: "18px",
              padding: "25px",
              color: "#718096",
              fontSize: "13px",
            }}
          >
            Loading materials...
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#FFF0F0",
              borderRadius: "18px",
              padding: "25px",
              color: "#B34B4B",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && materials.length === 0 && (
          <div
            style={{
              background: "#F0ECFF",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "17px",
                fontWeight: 600,
              }}
            >
              No PDFs uploaded yet
            </h3>

            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px",
              }}
            >
              Your uploaded Unit 2 material will appear here.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          materials.map((material) => (
            <div
              key={material.id}
              style={{
                background: "#F0ECFF",
                borderRadius: "20px",
                padding: "22px",
                marginBottom: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "11px",
                    color: "#7A8795",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  PDF
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {material.title}
                </h3>

                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    color: "#7A8795",
                  }}
                >
                  {material.file_name}
                </p>
              </div>

              <button
                onClick={() => openMaterial(material.file_path)}
                style={{
                  border: "none",
                  background: "#7D6BC4",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "11px 17px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Open PDF
              </button>
            </div>
          ))}
      </section>

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