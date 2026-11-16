
import { notFound } from "next/navigation";
import LabPage from "@/components/labs/LabPage";
import { supabase } from "@/lib/supabase";

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Props = {
  params: Promise<{ labSlug: string }>;
};

export default async function DynamicLabPage({ params }: Props) {
  const { labSlug } = await params;

  const { data: labs } = await supabase
    .from("subjects")
    .select("code, name")
    .eq("subject_type", "lab");

  const lab = labs?.find((item) => {
    if (!item.code) return false;

    const slug =
      item.code === "26CS101L"
        ? "computer-lab"
        : makeSlug(item.name);

    return slug === labSlug;
  });

  if (!lab?.code) {
    notFound();
  }

  return (
    <LabPage
      subjectCode={lab.code}
      labName={lab.name}
      labHref={`/labs/${labSlug}`}
    />
  );
}
