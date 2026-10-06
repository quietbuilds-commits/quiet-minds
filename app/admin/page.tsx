"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type UploadMode = "study" | "lab";

type Subject = {
  id: string;
  code: string;
  name: string;
  subject_type: string;
};

type LabMaterial = {
  id: string;
  subject_id: string;
  experiment_no: number | null;
  material_type: "experiment_list" | "experiment_pdf" | "record_pdf";
  title: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  subject?: {
    name: string;
    code: string;
  };
};

const studyMaterialTypes = [
  { value: "unit_pdf", label: "Unit PDF" },
  { value: "class_note", label: "Class Note" },
  { value: "short_note", label: "Short Note" },
  { value: "class_question", label: "Class Question" },
];

const experiments = Array.from({ length: 16 }, (_, index) => index + 1);

function formatLabMaterialType(
  type: LabMaterial["material_type"]
): string {
  if (type === "experiment_list") {
    return "Experiment List PDF";
  }

  if (type === "experiment_pdf") {
    return "Experiment PDF";
  }

  return "Record PDF";
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminPage() {
  // Authentication
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminVerified, setAdminVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [materials, setMaterials] = useState<LabMaterial[]>([]);

  const [loading, setLoading] = useState(true);
  const [materialsLoading, setMaterialsLoading] = useState(false);

  const [uploadMode, setUploadMode] =
    useState<UploadMode>("study");

  // Study material
  const [studySubjectId, setStudySubjectId] = useState("");
  const [section, setSection] =
    useState("unit_pdf");
  const [materialType, setMaterialType] =
    useState("unit_pdf");
  const [unitNumber, setUnitNumber] =
    useState("1");
  const [examYear, setExamYear] =
    useState("");

  // Lab material
  const [labSubjectId, setLabSubjectId] =
    useState("");
  const [labMaterialType, setLabMaterialType] =
    useState<LabMaterial["material_type"]>(
      "experiment_list"
    );
  const [experimentNumber, setExperimentNumber] =
    useState("1");

  // Common
  const [title, setTitle] = useState("");
  const [file, setFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");

  // Lab manager
  const [managerLabFilter, setManagerLabFilter] =
    useState("all");
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [replacingId, setReplacingId] =
    useState<string | null>(null);

  const studySubjects = useMemo(() => {
    return subjects.filter(
      (subject) =>
        subject.subject_type === "theory" ||
        subject.subject_type === "activity"
    );
  }, [subjects]);

  const labSubjects = useMemo(() => {
    return subjects.filter(
      (subject) =>
        subject.subject_type === "lab"
    );
  }, [subjects]);

  const filteredMaterials = useMemo(() => {
    if (managerLabFilter === "all") {
      return materials;
    }

    return materials.filter(
      (material) =>
        material.subject_id === managerLabFilter
    );
  }, [materials, managerLabFilter]);

  useEffect(() => {
    checkExistingSession();

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setAuthenticated(true);
          setUserEmail(session.user.email || "");

          await verifyAdmin(session.user.id);
        } else {
          setAuthenticated(false);
          setAdminVerified(false);
          setUserEmail("");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkExistingSession() {
    setAuthLoading(true);
    setError("");

    const {
      data: sessionData,
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      setError(sessionError.message);
      setAuthLoading(false);
      return;
    }

    if (!sessionData.session?.user) {
      setAuthenticated(false);
      setAdminVerified(false);
      setAuthLoading(false);
      return;
    }

    setAuthenticated(true);
    setUserEmail(
      sessionData.session.user.email || ""
    );

    await verifyAdmin(
      sessionData.session.user.id
    );

    setAuthLoading(false);
  }

  async function verifyAdmin(userId: string) {
    setError("");

    const {
      data: adminData,
      error: adminError,
    } = await supabase.rpc("is_admin");

    if (adminError) {
      console.error(
        "Admin check failed:",
        adminError
      );

      setAdminVerified(false);
      setError(
        `Admin check failed: ${adminError.message}`
      );
      return;
    }

    if (adminData !== true) {
      setAdminVerified(false);
      setError(
        "Your account is signed in, but it is not registered as an admin."
      );
      return;
    }

    setAdminVerified(true);

    await loadSubjects();
    await loadLabMaterials();
  }

  async function handleLogin() {
    setError("");
    setMessage("");

    if (!loginEmail.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!loginPassword) {
      setError("Please enter your password.");
      return;
    }

    setLoggingIn(true);

    try {
      const {
        data,
        error: loginError,
      } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (loginError) {
        throw new Error(
          loginError.message
        );
      }

      if (!data.user) {
        throw new Error(
          "Login succeeded, but no user was returned."
        );
      }

      setAuthenticated(true);
      setUserEmail(data.user.email || "");

      await verifyAdmin(data.user.id);

      setLoginPassword("");
    } catch (loginError) {
      setAuthenticated(false);
      setAdminVerified(false);

      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login failed."
      );
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setAuthenticated(false);
    setAdminVerified(false);
    setUserEmail("");
    setSubjects([]);
    setMaterials([]);
    setMessage("");
    setError("");
  }

  async function loadSubjects() {
    setLoading(true);

    const { data, error: subjectsError } =
      await supabase
        .from("subjects")
        .select(
          "id, code, name, subject_type"
        )
        .order("display_order", {
          ascending: true,
        });

    if (subjectsError) {
      setError(subjectsError.message);
      setLoading(false);
      return;
    }

    const loadedSubjects = data || [];

    setSubjects(loadedSubjects);

    const firstStudySubject =
      loadedSubjects.find(
        (subject) =>
          subject.subject_type ===
            "theory" ||
          subject.subject_type ===
            "activity"
      );

    const firstLab =
      loadedSubjects.find(
        (subject) =>
          subject.subject_type === "lab"
      );

    if (firstStudySubject) {
      setStudySubjectId(
        firstStudySubject.id
      );
    }

    if (firstLab) {
      setLabSubjectId(firstLab.id);
    }

    setLoading(false);
  }

  async function loadLabMaterials() {
    setMaterialsLoading(true);

    const { data, error: materialsError } =
      await supabase
        .from("lab_materials")
        .select(
          "id, subject_id, experiment_no, material_type, title, file_name, file_path, file_type, file_size, created_at, updated_at, subject:subjects!lab_materials_subject_id_fkey(name, code)"
        )
        .order("subject_id", {
          ascending: true,
        })
        .order("experiment_no", {
          ascending: true,
          nullsFirst: true,
        })
        .order("material_type", {
          ascending: true,
        });

    if (materialsError) {
      console.error(
        "Error loading lab materials:",
        materialsError
      );
    } else {
      setMaterials(
        (data || []) as unknown as LabMaterial[]
      );
    }

    setMaterialsLoading(false);
  }

  function resetMessages() {
    setMessage("");
    setError("");
  }

  async function checkAdminAccess() {
    const {
      data: sessionData,
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(
        `Session error: ${sessionError.message}`
      );
    }

    if (!sessionData.session?.user) {
      throw new Error(
        "Authentication session is missing. Please sign in again."
      );
    }

    const {
      data: userData,
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(
        `Authentication error: ${userError.message}`
      );
    }

    const {
      data: adminData,
      error: adminError,
    } = await supabase.rpc("is_admin");

    if (adminError) {
      throw new Error(
        `Admin check failed: ${adminError.message}`
      );
    }

    return {
      user: userData.user,
      isAdmin: adminData === true,
    };
  }

  async function uploadStudyMaterial() {
    if (!studySubjectId) {
      setError("Please select a subject.");
      return;
    }

    if (!file) {
      setError("Please select a PDF.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError(
        "File size must be 50 MB or less."
      );
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setUploading(true);
    resetMessages();

    try {
      const adminCheck =
        await checkAdminAccess();

      if (!adminCheck.user) {
        throw new Error(
          "You are not signed in."
        );
      }

      if (!adminCheck.isAdmin) {
        throw new Error(
          "Your account is signed in, but is_admin() returned false."
        );
      }

      const safeFileName = file.name
        .replace(
          /[^a-zA-Z0-9._-]/g,
          "_"
        )
        .replace(/_+/g, "_");

      const filePath =
        `study-materials/${studySubjectId}/${crypto.randomUUID()}-${safeFileName}`;

      const {
        error: storageError,
      } = await supabase.storage
        .from("materials")
        .upload(
          filePath,
          file,
          {
            contentType:
              "application/pdf",
            upsert: false,
          }
        );

      if (storageError) {
        throw new Error(
          storageError.message
        );
      }

      const finalSection =
        materialType === "unit_pdf"
          ? "unit_pdf"
          : section;

      const {
        error: dbError,
      } = await supabase
        .from("materials")
        .insert({
          subject_id:
            studySubjectId,
          title: title.trim(),
          section: finalSection,
          material_type:
            materialType,
          unit_number:
            materialType ===
            "unit_pdf"
              ? Number(unitNumber)
              : null,
          exam_year: examYear
            ? Number(examYear)
            : null,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by:
            adminCheck.user.id,
        });

      if (dbError) {
        await supabase.storage
          .from("materials")
          .remove([filePath]);

        throw new Error(
          dbError.message
        );
      }

      setMessage(
        "Study material uploaded successfully."
      );

      setTitle("");
      setFile(null);

      const fileInput =
        document.getElementById(
          "admin-file"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function uploadLabMaterial() {
    if (!labSubjectId) {
      setError("Please select a lab.");
      return;
    }

    if (!file) {
      setError("Please select a PDF.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError(
        "Only PDF files are allowed."
      );
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError(
        "File size must be 50 MB or less."
      );
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (
      labMaterialType !==
        "experiment_list" &&
      (!experimentNumber ||
        Number(experimentNumber) < 1 ||
        Number(experimentNumber) > 16)
    ) {
      setError(
        "Please select an experiment number."
      );
      return;
    }

    setUploading(true);
    resetMessages();

    try {
      const adminCheck =
        await checkAdminAccess();

      if (!adminCheck.user) {
        throw new Error(
          "You are not signed in."
        );
      }

      if (!adminCheck.isAdmin) {
        throw new Error(
          "Your account is signed in, but is_admin() returned false."
        );
      }

      const safeFileName = file.name
        .replace(
          /[^a-zA-Z0-9._-]/g,
          "_"
        )
        .replace(/_+/g, "_");

      const experimentFolder =
        labMaterialType ===
        "experiment_list"
          ? "experiment-list"
          : `experiment-${experimentNumber}`;

      const filePath =
        `labs/${labSubjectId}/${experimentFolder}/${crypto.randomUUID()}-${safeFileName}`;

      const {
        error: storageError,
      } = await supabase.storage
        .from("materials")
        .upload(
          filePath,
          file,
          {
            contentType:
              "application/pdf",
            upsert: false,
          }
        );

      if (storageError) {
        throw new Error(
          storageError.message
        );
      }

      const {
        error: dbError,
      } = await supabase
        .from("lab_materials")
        .insert({
          subject_id:
            labSubjectId,
          experiment_no:
            labMaterialType ===
            "experiment_list"
              ? null
              : Number(
                  experimentNumber
                ),
          material_type:
            labMaterialType,
          title: title.trim(),
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by:
            adminCheck.user.id,
        });

      if (dbError) {
        await supabase.storage
          .from("materials")
          .remove([filePath]);

        throw new Error(
          dbError.message
        );
      }

      setMessage(
        "Lab material uploaded successfully."
      );

      setTitle("");
      setFile(null);

      const fileInput =
        document.getElementById(
          "admin-file"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadLabMaterials();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleUpload() {
    resetMessages();

    if (replacingId) {
      const material =
        materials.find(
          (item) =>
            item.id === replacingId
        );

      if (!material) {
        setError(
          "The material selected for replacement could not be found."
        );
        setReplacingId(null);
        return;
      }

      await replaceLabMaterial(
        material
      );
      return;
    }

    if (uploadMode === "study") {
      await uploadStudyMaterial();
    } else {
      await uploadLabMaterial();
    }
  }

  async function deleteLabMaterial(
    material: LabMaterial
  ) {
    const confirmed = window.confirm(
      `Delete "${material.title}"?\n\nThis will remove the database record and the uploaded PDF.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(material.id);
    resetMessages();

    try {
      const adminCheck =
        await checkAdminAccess();

      if (!adminCheck.user) {
        throw new Error(
          "You are not signed in."
        );
      }

      if (!adminCheck.isAdmin) {
        throw new Error(
          "Your account is signed in, but is_admin() returned false."
        );
      }

      const {
        error: storageError,
      } = await supabase.storage
        .from("materials")
        .remove([
          material.file_path,
        ]);

      if (storageError) {
        throw new Error(
          `Could not delete the PDF from storage: ${storageError.message}`
        );
      }

      const {
        error: dbError,
      } = await supabase
        .from("lab_materials")
        .delete()
        .eq("id", material.id);

      if (dbError) {
        throw new Error(
          dbError.message
        );
      }

      setMessage(
        "Lab material deleted successfully."
      );

      await loadLabMaterials();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Delete failed."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function replaceLabMaterial(
    material: LabMaterial
  ) {
    if (!file) {
      setError(
        "Select a new PDF first."
      );
      return;
    }

    if (file.type !== "application/pdf") {
      setError(
        "Only PDF files are allowed."
      );
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError(
        "File size must be 50 MB or less."
      );
      return;
    }

    if (!title.trim()) {
      setError(
        "Please enter a title."
      );
      return;
    }

    setUploading(true);
    setReplacingId(material.id);
    resetMessages();

    let newFilePath = "";

    try {
      const adminCheck =
        await checkAdminAccess();

      if (!adminCheck.user) {
        throw new Error(
          "You are not signed in."
        );
      }

      if (!adminCheck.isAdmin) {
        throw new Error(
          "Your account is signed in, but is_admin() returned false."
        );
      }

      const safeFileName = file.name
        .replace(
          /[^a-zA-Z0-9._-]/g,
          "_"
        )
        .replace(/_+/g, "_");

      const experimentFolder =
        material.material_type ===
        "experiment_list"
          ? "experiment-list"
          : `experiment-${material.experiment_no}`;

      newFilePath =
        `labs/${material.subject_id}/${experimentFolder}/${crypto.randomUUID()}-${safeFileName}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("materials")
        .upload(
          newFilePath,
          file,
          {
            contentType:
              "application/pdf",
            upsert: false,
          }
        );

      if (uploadError) {
        throw new Error(
          uploadError.message
        );
      }

      const {
        error: updateError,
      } = await supabase
        .from("lab_materials")
        .update({
          title: title.trim(),
          file_name: file.name,
          file_path: newFilePath,
          file_type: file.type,
          file_size: file.size,
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          material.id
        );

      if (updateError) {
        await supabase.storage
          .from("materials")
          .remove([
            newFilePath,
          ]);

        throw new Error(
          updateError.message
        );
      }

      const {
        error: oldFileError,
      } = await supabase.storage
        .from("materials")
        .remove([
          material.file_path,
        ]);

      if (oldFileError) {
        console.warn(
          "New PDF is active, but old PDF could not be removed:",
          oldFileError.message
        );
      }

      setMessage(
        "Lab material replaced successfully."
      );

      setTitle("");
      setFile(null);
      setReplacingId(null);

      const fileInput =
        document.getElementById(
          "admin-file"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadLabMaterials();
    } catch (replaceError) {
      setError(
        replaceError instanceof Error
          ? replaceError.message
          : "Replacement failed."
      );
    } finally {
      setUploading(false);
      setReplacingId(null);
    }
  }

  function startReplace(
    material: LabMaterial
  ) {
    setUploadMode("lab");
    setLabSubjectId(
      material.subject_id
    );
    setLabMaterialType(
      material.material_type
    );

    if (material.experiment_no) {
      setExperimentNumber(
        String(
          material.experiment_no
        )
      );
    }

    setTitle(material.title);
    setFile(null);
    setReplacingId(material.id);

    setMessage(
      `Replacement mode: choose a new PDF for "${material.title}", then click Replace PDF below.`
    );

    setError("");

    const fileInput =
      document.getElementById(
        "admin-file"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  }

  function cancelReplace() {
    setReplacingId(null);
    setTitle("");
    setFile(null);
    resetMessages();

    const fileInput =
      document.getElementById(
        "admin-file"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-6 py-12">
        <div className="mx-auto max-w-md text-center text-slate-500">
          Checking admin session...
        </div>
      </main>
    );
  }

  if (!authenticated || !adminVerified) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-md">
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium tracking-wide text-slate-500">
              ADMIN
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
              Admin Sign In
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in with an authorized admin account.
            </p>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </span>

                <input
                  type="email"
                  value={loginEmail}
                  onChange={(event) =>
                    setLoginEmail(
                      event.target.value
                    )
                  }
                  placeholder="Admin email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-slate-400"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </span>

                <input
                  type="password"
                  value={loginPassword}
                  onChange={(event) =>
                    setLoginPassword(
                      event.target.value
                    )
                  }
                  placeholder="Password"
                  autoComplete="current-password"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-slate-400"
                />
              </label>

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleLogin}
                disabled={loggingIn}
                className="w-full rounded-xl bg-slate-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loggingIn
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-6 py-12">
        <div className="mx-auto max-w-5xl text-center text-slate-500">
          Loading admin panel...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium tracking-wide text-slate-500">
              ADMIN
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
              Materials Manager
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Upload, replace and manage study and laboratory PDFs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              {userEmail}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Sign Out
            </button>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              {replacingId
                ? "Replace Lab Material"
                : "Upload Material"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              PDF files only · Maximum 50 MB
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                if (replacingId) {
                  cancelReplace();
                }

                setUploadMode("study");
                resetMessages();
              }}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                uploadMode === "study"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Study Material
            </button>

            <button
              type="button"
              onClick={() => {
                setUploadMode("lab");
                resetMessages();
              }}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                uploadMode === "lab"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Lab Material
            </button>
          </div>

          {uploadMode === "study" ? (
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Subject
                </span>

                <select
                  value={studySubjectId}
                  onChange={(event) =>
                    setStudySubjectId(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:border-slate-400"
                >
                  {studySubjects.map(
                    (subject) => (
                      <option
                        key={subject.id}
                        value={subject.id}
                      >
                        {subject.name}
                      </option>
                    )
                  )}
                </select>
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Section
                  </span>

                  <select
                    value={section}
                    onChange={(event) =>
                      setSection(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base"
                  >
                    <option value="unit_pdf">
                      Unit PDF
                    </option>

                    <option value="class_notes">
                      Class Notes
                    </option>

                    <option value="question_bank">
                      Question Bank
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Material Type
                  </span>

                  <select
                    value={materialType}
                    onChange={(event) =>
                      setMaterialType(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base"
                  >
                    {studyMaterialTypes.map(
                      (type) => (
                        <option
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>

              {materialType ===
                "unit_pdf" && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Unit
                  </span>

                  <select
                    value={unitNumber}
                    onChange={(event) =>
                      setUnitNumber(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base"
                  >
                    {[1, 2, 3, 4, 5, 6].map(
                      (unit) => (
                        <option
                          key={unit}
                          value={unit}
                        >
                          Unit {unit}
                        </option>
                      )
                    )}
                  </select>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Exam Year
                </span>

                <input
                  value={examYear}
                  onChange={(event) =>
                    setExamYear(
                      event.target.value
                    )
                  }
                  placeholder="Optional"
                  inputMode="numeric"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Lab
                </span>

                <select
                  value={labSubjectId}
                  onChange={(event) =>
                    setLabSubjectId(
                      event.target.value
                    )
                  }
                  disabled={Boolean(
                    replacingId
                  )}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base disabled:bg-slate-100"
                >
                  {labSubjects.map(
                    (subject) => (
                      <option
                        key={subject.id}
                        value={subject.id}
                      >
                        {subject.name}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Material Type
                </span>

                <select
                  value={labMaterialType}
                  onChange={(event) =>
                    setLabMaterialType(
                      event.target
                        .value as LabMaterial["material_type"]
                    )
                  }
                  disabled={Boolean(
                    replacingId
                  )}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base disabled:bg-slate-100"
                >
                  <option value="experiment_list">
                    Experiment List PDF
                  </option>

                  <option value="experiment_pdf">
                    Experiment PDF
                  </option>

                  <option value="record_pdf">
                    Record PDF
                  </option>
                </select>
              </label>

              {labMaterialType !==
                "experiment_list" && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Experiment
                  </span>

                  <select
                    value={
                      experimentNumber
                    }
                    onChange={(event) =>
                      setExperimentNumber(
                        event.target.value
                      )
                    }
                    disabled={Boolean(
                      replacingId
                    )}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base disabled:bg-slate-100"
                  >
                    {experiments.map(
                      (experiment) => (
                        <option
                          key={experiment}
                          value={experiment}
                        >
                          Experiment{" "}
                          {String(
                            experiment
                          ).padStart(
                            2,
                            "0"
                          )}
                        </option>
                      )
                    )}
                  </select>
                </label>
              )}
            </div>
          )}

          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Title
              </span>

              <input
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                placeholder="Enter PDF title"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-slate-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                PDF File
              </span>

              <input
                id="admin-file"
                type="file"
                accept="application/pdf,.pdf"
                onChange={(event) =>
                  setFile(
                    event.target.files?.[0] ||
                      null
                  )
                }
                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
            </label>

            {file && (
              <p className="text-sm text-slate-500">
                Selected:{" "}
                <span className="font-medium">
                  {file.name}
                </span>
              </p>
            )}

            {message && (
              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 rounded-xl bg-slate-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading
                  ? replacingId
                    ? "Replacing..."
                    : "Uploading..."
                  : replacingId
                    ? "Replace PDF"
                    : "Upload PDF"}
              </button>

              {replacingId && (
                <button
                  type="button"
                  onClick={cancelReplace}
                  disabled={uploading}
                  className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Current Lab Materials
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Replace or remove uploaded laboratory PDFs.
              </p>
            </div>

            <select
              value={managerLabFilter}
              onChange={(event) =>
                setManagerLabFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <option value="all">
                All Labs
              </option>

              {labSubjects.map(
                (subject) => (
                  <option
                    key={subject.id}
                    value={subject.id}
                  >
                    {subject.name}
                  </option>
                )
              )}
            </select>
          </div>

          {materialsLoading ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Loading lab materials...
            </p>
          ) : filteredMaterials.length ===
            0 ? (
            <div className="rounded-2xl bg-slate-50 px-5 py-8 text-center">
              <p className="text-sm font-medium text-slate-700">
                No lab materials uploaded yet.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Upload an Experiment List,
                Experiment PDF, or Record PDF
                above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMaterials.map(
                (material) => (
                  <div
                    key={material.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {material.subject
                            ?.name ||
                            "Lab"}
                        </p>

                        <h3 className="mt-1 break-words font-semibold text-slate-800">
                          {material.title}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span className="rounded-full bg-slate-100 px-3 py-1">
                            {formatLabMaterialType(
                              material.material_type
                            )}
                          </span>

                          {material.experiment_no && (
                            <span className="rounded-full bg-slate-100 px-3 py-1">
                              Experiment{" "}
                              {String(
                                material.experiment_no
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          )}

                          <span className="rounded-full bg-slate-100 px-3 py-1">
                            {formatDate(
                              material.updated_at
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            startReplace(
                              material
                            )
                          }
                          disabled={
                            replacingId ===
                              material.id ||
                            deletingId ===
                              material.id ||
                            uploading
                          }
                          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Replace
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteLabMaterial(
                              material
                            )
                          }
                          disabled={
                            deletingId ===
                              material.id ||
                            replacingId ===
                              material.id ||
                            uploading
                          }
                          className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId ===
                          material.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}