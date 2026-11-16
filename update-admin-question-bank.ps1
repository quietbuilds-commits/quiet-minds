# Quiet Minds admin page updater
# Open PowerShell in the quiet-minds project root and run:
# powershell -ExecutionPolicy Bypass -File .\update-admin-question-bank.ps1
# A backup is created before any edit.

$ErrorActionPreference = "Stop"
$file = Join-Path (Get-Location) "app\admin\page.tsx"
if (-not (Test-Path $file)) {
  Write-Host "Open PowerShell in your quiet-minds project folder first." -ForegroundColor Red
  exit 1
}
$source = Get-Content -Raw -LiteralPath $file
$backup = "$file.backup-before-question-bank"
Copy-Item -LiteralPath $file -Destination $backup -Force

function Replace-Once([string]$text, [string]$old, [string]$new, [string]$label) {
  if (-not $text.Contains($old)) {
    throw "Could not find expected $label block. No changes were written. Backup: $backup"
  }
  return $text.Replace($old, $new)
}

$source = Replace-Once $source @'
  const [examYear, setExamYear] =
    useState("");
'@ @'
  const [examYear, setExamYear] =
    useState("");

  const [questionBankPeriod, setQuestionBankPeriod] =
    useState<"current" | "pyq">("current");

  const [currentExamType, setCurrentExamType] =
    useState<"ca" | "pca" | "all_combined">("ca");
'@ "examYear state"

$source = Replace-Once $source @'
              {materialType === "question_bank" && <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Exam Year (optional)
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
              </label>}
'@ @'
              {materialType === "question_bank" && (
                <div className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Question Bank Category
                    </span>
                    <select
                      value={questionBankPeriod}
                      onChange={(event) => {
                        setQuestionBankPeriod(event.target.value as "current" | "pyq");
                        setCurrentExamType("ca");
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base"
                    >
                      <option value="pyq">Previous Year Questions (PYQ)</option>
                      <option value="current">Current Exam Questions</option>
                    </select>
                  </label>

                  {questionBankPeriod === "current" && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">
                        Current Exam Type
                      </span>
                      <select
                        value={currentExamType}
                        onChange={(event) => setCurrentExamType(event.target.value as "ca" | "pca" | "all_combined")}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base"
                      >
                        <option value="ca">CA</option>
                        <option value="pca">PCA</option>
                        <option value="all_combined">All Papers Combined</option>
                      </select>
                    </label>
                  )}

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Exam Year (optional)
                    </span>
                    <input
                      value={examYear}
                      onChange={(event) => setExamYear(event.target.value)}
                      placeholder="e.g. 2026"
                      inputMode="numeric"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none"
                    />
                  </label>
                </div>
              )}
'@ "Question Bank upload fields"

$source = Replace-Once $source @'
      const finalSection =
        materialType === "unit_pdf"
          ? "unit_pdf"
          : materialType === "question_bank"
            ? "question_bank"
            : "class_notes";

      const finalMaterialType =
        materialType === "question_bank"
          ? "class_question"
          : materialType;
'@ @'
      const finalSection =
        materialType === "unit_pdf"
          ? "unit_pdf"
          : materialType === "question_bank"
            ? "question_bank"
            : "class_notes";

      const finalMaterialType =
        materialType !== "question_bank"
          ? materialType
          : questionBankPeriod === "pyq"
            ? "question_bank_pyq"
            : currentExamType === "ca"
              ? "question_bank_ca"
              : currentExamType === "pca"
                ? "question_bank_pca"
                : "question_bank_all_combined";
'@ "upload category mapping"

$source = Replace-Once $source @'
  function formatStudyCategory(type: string) {
    const labels: Record<string, string> = {
      unit_pdf: "Unit PDF", class_note: "Class Notes",
      short_note: "Short Notes / Mind Maps", class_question: "Class Questions",
    };
    return labels[type] || type.replaceAll("_", " ");
  }
'@ @'
  function formatStudyCategory(type: string) {
    const labels: Record<string, string> = {
      unit_pdf: "Unit PDF",
      class_note: "Class Notes",
      short_note: "Short Notes / Mind Maps",
      class_question: "Class Questions",
      question_bank: "Question Bank (Legacy)",
      question_bank_pyq: "Previous Year Questions (PYQ)",
      question_bank_ca: "Current Exam — CA",
      question_bank_pca: "Current Exam — PCA",
      question_bank_all_combined: "Current Exam — All Papers Combined",
    };
    return labels[type] || type.replaceAll("_", " ");
  }
'@ "category display labels"

$source = Replace-Once $source @'
              <select value={managerStudyCategory} onChange={(e) => setManagerStudyCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="all">All Categories</option>{studyMaterialTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select>
'@ @'
              <select value={managerStudyCategory} onChange={(e) => setManagerStudyCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <option value="all">All Categories</option>
                {studyMaterialTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                <option value="question_bank_pyq">Previous Year Questions (PYQ)</option>
                <option value="question_bank_ca">Current Exam — CA</option>
                <option value="question_bank_pca">Current Exam — PCA</option>
                <option value="question_bank_all_combined">Current Exam — All Papers Combined</option>
                <option value="class_question">Legacy Question Bank / Class Questions</option>
              </select>
'@ "manager category filter"

$source = Replace-Once $source '    setMaterialType(material.material_type);' @'
    setMaterialType(
      material.material_type.startsWith("question_bank_") ||
        material.material_type === "question_bank"
        ? "question_bank"
        : material.material_type
    );

    setQuestionBankPeriod(
      material.material_type === "question_bank_pyq" ? "pyq" : "current"
    );

    setCurrentExamType(
      material.material_type === "question_bank_pca"
        ? "pca"
        : material.material_type === "question_bank_all_combined"
          ? "all_combined"
          : "ca"
    );
'@ "replacement-mode category"

Set-Content -LiteralPath $file -Value $source -Encoding UTF8
Write-Host "Updated app/admin/page.tsx successfully." -ForegroundColor Green
Write-Host "Backup saved as: $backup"
Write-Host "Run npm run dev and test the admin panel."
