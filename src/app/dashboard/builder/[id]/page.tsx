import { ResumeBuilderEditor } from "@/features/resume-builder";

export default async function BuilderEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResumeBuilderEditor id={id} />;
}
