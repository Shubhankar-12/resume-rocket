import { ResumeTemplate, type BuilderResume } from "@/features/resume-builder";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string }>;
};

async function getDraft(id: string): Promise<BuilderResume | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_USER_API}/api/v1/resume-builder?resume_draft_id=${id}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.body as BuilderResume) ?? null;
  } catch {
    return null;
  }
}

export default async function PrintResume({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const draft = await getDraft(id);

  if (!draft) {
    return <div className="p-10 text-center text-gray-600">Resume not found</div>;
  }

  const resume: BuilderResume = sp?.template
    ? { ...draft, template_id: sp.template as BuilderResume["template_id"] }
    : draft;

  return (
    <div className="min-h-screen bg-white">
      {/* Suppress global app chrome (e.g. cookie consent) on the PDF/print surface. */}
      <style>{`[aria-label="Cookie consent"]{display:none !important}`}</style>
      <ResumeTemplate resume={resume} />
    </div>
  );
}
