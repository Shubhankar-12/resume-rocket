import GraderReport from "@/components/Grader";
import { ReportType } from "@/components/Resumes/types";
import { cookies } from "next/headers";

interface GraderProps {
  params: Promise<{ id: string }>;
}

async function getResumeGrader(id: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/api/v1/resume/report?resume_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    if (!res.ok) return null;
    const response = await res.json();

    return response.body;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function page({ params }: GraderProps) {
  const { id } = await params;
  const reportData: ReportType | null = await getResumeGrader(id);
  if (!reportData) return null;
  return <GraderReport reportData={reportData} />;
}
