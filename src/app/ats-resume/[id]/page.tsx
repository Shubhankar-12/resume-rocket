import { Card, CardContent } from "@/components/ui/card";

import { TailoredResumeData } from "@/components/Resumes/types";

export interface ATSResumePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getResume(id: string): Promise<TailoredResumeData | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_USER_API}/api/v1/tailored-resume?tailored_resume_id=${id}`;

    const resume = await fetch(url, {
      headers: {
        Authorization: `Bearer ` + process.env.NEXT_PUBLIC_API_TOKEN,
      },
    });

    if (!resume.ok) {
      console.log("Resume not found", resume.json);
      return null;
    }
    const response = await resume.json();
    return response.body;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function ATSResume({ params }: ATSResumePageProps) {
  const paramsData = await params;

  const resumeData: TailoredResumeData | null = await getResume(paramsData.id);
  if (!resumeData) {
    console.log("Resume not found");
    return <div>Resume not found</div>;
  }
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{resumeData.name}</h1>
            <div className="mt-2 flex justify-center gap-4">
              {resumeData.email && <span>{resumeData.email}</span>}
              {resumeData.phone && <span>{resumeData.phone}</span>}
              {resumeData.location && <span>{resumeData.location}</span>}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-bold">Summary</h2>
            <p>{resumeData.summary}</p>
          </div>

          <div>
            <h2 className="mb-2 font-bold">Skills</h2>
            <p>{resumeData.skills.join(", ")}</p>
          </div>

          <div>
            <h2 className="mb-2 font-bold">Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium">
                  {exp.role} at {exp.companyName}, {exp.startDate} -{" "}
                  {exp.isPresent ? "Present" : exp.endDate}
                </h3>
                <p className="mt-1">{exp.description}</p>
                <ul className="mt-2 list-disc pl-5">
                  {exp.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-2 font-bold">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p>
                  {edu.degree}
                  {edu.subject ? `, ${edu.subject}` : ""} - {edu.schoolName},{" "}
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>

          {resumeData.projects && resumeData.projects.length > 0 && (
            <div>
              <h2 className="mb-2 font-bold">Projects</h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="mt-1">{project.description}</p>
                  <p className="mt-1">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {resumeData.languages && resumeData.languages.length > 0 && (
            <div>
              <h2 className="mb-2 font-bold">Languages</h2>
              <p>{resumeData.languages.join(", ")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
