import { ExtractedResume } from "./types";

export default function ResumePreview({ resume }: { resume: ExtractedResume }) {
  return (
    <div className="rounded-md border p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{resume?.name || "-"}</h1>
          <p className="text-sm text-muted-foreground">
            {resume?.email} • {resume?.phone}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
          <p className="text-sm">{resume?.summary || "No summary provided"}</p>
        </div>

        {resume?.experience && resume.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">
              Experience
            </h2>
            <div className="space-y-4">
              {resume.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.startDate} -{" "}
                      {exp.isPresent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exp.companyName}, {exp.location || "-"}
                  </p>
                  <p className="text-sm mt-1">{exp.description || "-"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume?.education && resume.education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <span className="text-sm text-muted-foreground">
                      {edu.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {edu.schoolName}, {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume?.skills &&
              resume.skills.length > 0 &&
              resume.skills.map((skill, index) => (
                <div
                  key={index}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800"
                >
                  {skill}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
