"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Material = {
  id: string;
  title: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  created_at: string;
};

export default function Unit5Page() {
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

      if (subjectError || !subject) {
        throw new Error("Mathematics subject not found.");
      }

      const { data, error: materialsError } = await supabase
        .from("materials")
        .select(
          "id, title, file_name, file_path, file_type, created_at"
        )
        .eq("subject_id", subject.id)
        .eq("section", "class_notes")
        .eq("material_type", "unit_pdf")
        .eq("unit_number", 5)
        .order("created_at", { ascending: false });

      if (materialsError) {
        throw new Error(materialsError.message);
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

  async function openMaterial(material: Material) {
    const { data, error } = await supabase.storage
      .from("materials")
      .createSignedUrl(material.file_path, 60 * 10);

    if (error || !data?.signedUrl) {
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
        color: "#292929",
        fontFamily: "Arial, sans-serif",
        padding: "55px 6% 80px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "45px" }}>
          <a
            href="/ece/year-1/sem-1/linear-algebra-and-calculus/unit-pdfs"
            style={{
              textDecoration: "none",
              color: "#7FA889",
              fontSize: "12px",
            }}
          >
            ← Back to Unit PDFs
          </a>

          <p
            style={{
              margin: "28px 0 7px",
              fontSize: "11px",
              color: "#7FA889",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Mathematics
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Unit 5
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "#858585",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            Unit 5 study materials and resources
          </p>
        </div>

        <section
          style={{
            background: "#EDF7F0",
            borderRadius: "24px",
            padding: "28px",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#6F967A",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Unit 5 resources
            </p>

            <h2
              style={{
                margin: "7px 0 0",
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              Study material
            </h2>
          </div>

          {loading && (
            <p style={{ color: "#777", fontSize: "13px" }}>
              Loading materials...
            </p>
          )}

          {error && (
            <div
              style={{
                background: "#FFF0F0",
                color: "#B34B4B",
                padding: "13px 15px",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && materials.length === 0 && (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "22px",
                color: "#777",
                fontSize: "13px",
              }}
            >
              No Unit 5 materials uploaded yet.
            </div>
          )}

          {!loading && materials.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {materials.map((material) => (
                <button
                  key={material.id}
                  onClick={() => openMaterial(material)}
                  style={{
                    width: "100%",
                    border: "1px solid #DDEBE1",
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "17px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      {material.title}
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        color: "#999",
                      }}
                    >
                      {material.file_name}
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#6F967A",
                      marginLeft: "15px",
                    }}
                  >
                    Open →
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}