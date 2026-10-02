"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Subject = {
  id: string;
  code: string;
  name: string;
  subject_type: string | null;
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState("");

  const [section, setSection] = useState<"class_notes" | "question_bank">(
    "class_notes"
  );

  const [materialType, setMaterialType] = useState("unit_pdf");
  const [unitNumber, setUnitNumber] = useState("1");
  const [examYear, setExamYear] = useState("");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserEmail(user.email ?? null);

    const { data: adminData } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminData) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setIsAdmin(true);

    const { data: subjectData, error: subjectError } = await supabase
      .from("subjects")
      .select("id, code, name, subject_type")
      .order("display_order", { ascending: true });

    if (subjectError) {
      setError(subjectError.message);
    } else {
      setSubjects(subjectData ?? []);

      const maths = subjectData?.find(
        (subject) => subject.code === "26MA101T"
      );

      if (maths) {
        setSubjectId(maths.id);
      }
    }

    setLoading(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(selectedFile);
    setMessage("");
    setError("");

    if (selectedFile && !title) {
      const fileNameWithoutExtension = selectedFile.name.replace(
        /\.[^/.]+$/,
        ""
      );

      setTitle(fileNameWithoutExtension);
    }
  }

  function handleSectionChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    const value = event.target.value as "class_notes" | "question_bank";

    setSection(value);
    setMessage("");
    setError("");

    if (value === "class_notes") {
      setMaterialType("unit_pdf");
      setUnitNumber("1");
      setExamYear("");
    } else {
      setMaterialType("pyq");
      setUnitNumber("");
      setExamYear("");
    }
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!subjectId) {
      setError("Please select a subject.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50 MB.");
      return;
    }

    if (section === "class_notes" && materialType === "unit_pdf") {
      if (!unitNumber) {
        setError("Please select a unit.");
        return;
      }
    }

    if (section === "question_bank" && materialType === "pyq") {
      if (!examYear) {
        setError("Please enter the exam year.");
        return;
      }
    }

    setUploading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const safeFileName = file.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

      const filePath = `${subjectId}/${crypto.randomUUID()}-${safeFileName}`;

      // Upload file to Storage
      const { error: uploadError } = await supabase.storage
        .from("materials")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Add file information to database
      const { error: databaseError } = await supabase
        .from("materials")
        .insert({
          subject_id: subjectId,
          title: title.trim(),
          section,
          material_type: materialType,
          unit_number:
            section === "class_notes" && unitNumber
              ? Number(unitNumber)
              : null,
          exam_year:
            section === "question_bank" && examYear
              ? Number(examYear)
              : null,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
        });

      if (databaseError) {
        // Remove uploaded file if database insert fails
        await supabase.storage
          .from("materials")
          .remove([filePath]);

        throw new Error(databaseError.message);
      }

      setMessage("Material uploaded successfully.");
      setTitle("");
      setFile(null);

      const fileInput = document.getElementById(
        "material-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong while uploading."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#FCFBF7",
          fontFamily: "Arial, sans-serif",
          color: "#555",
        }}
      >
        Checking access...
      </main>
    );
  }

  if (!userEmail) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#FCFBF7",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "28px" }}>Admin</h1>

          <p style={{ color: "#777" }}>
            Please sign in to access this page.
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#FCFBF7",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "28px" }}>Access denied</h1>

          <p style={{ color: "#777" }}>
            This account is not an administrator.
          </p>
        </div>
      </main>
    );
  }

  const materialOptions =
    section === "class_notes"
      ? [
          { value: "unit_pdf", label: "Unit PDF" },
          { value: "class_note", label: "Class Note" },
          { value: "short_note", label: "Short Note" },
          { value: "class_question", label: "Class Question" },
        ]
      : [
          { value: "pyq", label: "Previous Year Question" },
          { value: "pca", label: "PCA" },
          { value: "ca", label: "CA" },
          { value: "esa", label: "ESA" },
        ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FCFBF7",
        color: "#252525",
        fontFamily: "Arial, sans-serif",
        padding: "45px 6% 80px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "55px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#8877C5",
                letterSpacing: "0.14em",
              }}
            >
              ADMIN
            </p>

            <h1
              style={{
                margin: "8px 0 0",
                fontSize: "30px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Welcome back.
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "13px",
                color: "#888",
              }}
            >
              {userEmail}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            style={{
              border: "1px solid #E4E1DA",
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "9px 15px",
              fontSize: "12px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            Sign out
          </button>
        </div>

        {/* UPLOAD CARD */}
        <section
          style={{
            background: "#EAF4FF",
            borderRadius: "24px",
            padding: "30px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "11px",
              color: "#6D82A0",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Add material
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Upload something new.
          </h2>

          <p
            style={{
              margin: "9px 0 28px",
              color: "#718096",
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            Add notes, unit PDFs or questions to Quiet Minds.
          </p>

          <form onSubmit={handleUpload}>
            {/* SUBJECT */}
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              Subject
            </label>

            <select
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                border: "1px solid #DCE5EF",
                background: "#FFFFFF",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              <option value="">Select subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.code} — {subject.name}
                </option>
              ))}
            </select>

            {/* SECTION */}
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              Section
            </label>

            <select
              value={section}
              onChange={handleSectionChange}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                border: "1px solid #DCE5EF",
                background: "#FFFFFF",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              <option value="class_notes">Study Material</option>
              <option value="question_bank">Question Bank</option>
            </select>

            {/* MATERIAL TYPE */}
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              Material type
            </label>

            <select
              value={materialType}
              onChange={(event) => setMaterialType(event.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                border: "1px solid #DCE5EF",
                background: "#FFFFFF",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              {materialOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* UNIT */}
            {section === "class_notes" &&
              (materialType === "unit_pdf" ||
                materialType === "class_question") && (
                <>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "7px",
                    }}
                  >
                    Unit
                  </label>

                  <select
                    value={unitNumber}
                    onChange={(event) =>
                      setUnitNumber(event.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "12px",
                      border: "1px solid #DCE5EF",
                      background: "#FFFFFF",
                      fontSize: "13px",
                      marginBottom: "20px",
                    }}
                  >
                    <option value="1">Unit 1</option>
                    <option value="2">Unit 2</option>
                    <option value="3">Unit 3</option>
                    <option value="4">Unit 4</option>
                    <option value="5">Unit 5</option>
                    <option value="6">Unit 6</option>
                  </select>
                </>
              )}

            {/* EXAM YEAR */}
            {section === "question_bank" &&
              materialType === "pyq" && (
                <>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "7px",
                    }}
                  >
                    Exam year
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 2026"
                    value={examYear}
                    onChange={(event) =>
                      setExamYear(event.target.value)
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "13px",
                      borderRadius: "12px",
                      border: "1px solid #DCE5EF",
                      background: "#FFFFFF",
                      fontSize: "13px",
                      marginBottom: "20px",
                    }}
                  />
                </>
              )}

            {/* TITLE */}
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              Title
            </label>

            <input
              type="text"
              placeholder="Example: Unit 1 Notes"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                borderRadius: "12px",
                border: "1px solid #DCE5EF",
                background: "#FFFFFF",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            />

            {/* FILE */}
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              File
            </label>

            <input
              id="material-file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                borderRadius: "12px",
                border: "1px dashed #B8C9DC",
                background: "#FFFFFF",
                fontSize: "13px",
                marginBottom: "22px",
              }}
            />

            <p
              style={{
                fontSize: "11px",
                color: "#7A8795",
                margin: "-10px 0 20px",
              }}
            >
              PDF only for this first test · Maximum 50 MB
            </p>

            {/* MESSAGES */}
            {error && (
              <div
                style={{
                  background: "#FFF0F0",
                  color: "#B34B4B",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  marginBottom: "15px",
                }}
              >
                {error}
              </div>
            )}

            {message && (
              <div
                style={{
                  background: "#EEF9F2",
                  color: "#4B8562",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  marginBottom: "15px",
                }}
              >
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={uploading}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "13px",
                padding: "14px",
                background: uploading ? "#A9B7C7" : "#7D6BC4",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                cursor: uploading ? "default" : "pointer",
              }}
            >
              {uploading ? "Uploading..." : "Upload material"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}