import { ResumeTemplate, normalizeDraft, type BuilderResume } from "@/features/resume-builder";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string }>;
};

async function getDraft(id: string): Promise<{ draft: BuilderResume | null; reason: string }> {
  const base = process.env.NEXT_PUBLIC_USER_API;
  if (!base) return { draft: null, reason: "NEXT_PUBLIC_USER_API is not set" };
  if (!process.env.API_TOKEN) return { draft: null, reason: "API_TOKEN is not set" };
  const url = `${base}/api/v1/resume-builder?resume_draft_id=${id}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("print-resume getDraft failed", res.status, body.slice(0, 300));
      return { draft: null, reason: `backend responded ${res.status}` };
    }
    const json = await res.json();
    const draft = (json.body as BuilderResume) ?? null;
    return { draft, reason: draft ? "" : "backend returned an empty body" };
  } catch (e) {
    return { draft: null, reason: `fetch error: ${e instanceof Error ? e.message : "unknown"}` };
  }
}

export default async function PrintResume({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const { draft, reason } = await getDraft(id);

  if (!draft) {
    return (
      <div className="p-10 text-center text-gray-600">
        Resume not found
        {reason && <div className="mt-2 text-xs text-gray-400">({reason})</div>}
      </div>
    );
  }

  const resume: BuilderResume = normalizeDraft(
    sp?.template ? { ...draft, template_id: sp.template as BuilderResume["template_id"] } : draft
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Suppress global app chrome (e.g. cookie consent) on the PDF/print surface. */}
      <style>{`[aria-label="Cookie consent"]{display:none !important}`}</style>
      <ResumeTemplate resume={resume} />
    </div>
  );
}
