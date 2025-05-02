import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Languages,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { TailoredResumeData } from "@/components/Resumes/types";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ id: string }>;
};

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

export default async function PreviewResume({ params }: Props) {
  const paramsData = await params;

  const resumeData: TailoredResumeData | null = await getResume(paramsData.id);
  if (!resumeData) {
    console.log("Resume not found");
    return <div>Resume not found</div>;
  }
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-teal-600 p-8 text-white">
          <h1 className="text-3xl font-bold">{resumeData.name}</h1>
          <div className="mt-2 flex flex-wrap gap-4">
            {resumeData.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{resumeData.email}</span>
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{resumeData.phone}</span>
              </div>
            )}
            {resumeData.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{resumeData.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* <ScrollArea className="h-[calc(100vh-300px)] custom-scroll"> */}
        <div className="p-8">
          {/* Summary Section */}
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-bold">Professional Summary</h2>
            <p className="text-muted-foreground">{resumeData.summary}</p>
          </div>

          <Separator className="my-6" />

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-bold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Experience Section */}
          <div className="mb-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Briefcase className="h-5 w-5 text-teal-600" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3 className="font-bold">{exp.role}</h3>
                    <div className="text-sm text-muted-foreground">
                      {exp.startDate} -{" "}
                      {exp.isPresent ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div className="text-md font-medium text-teal-600">
                    {exp.companyName}
                  </div>
                  {exp.location && (
                    <div className="text-sm text-muted-foreground">
                      {exp.location}
                    </div>
                  )}

                  {exp.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {exp.description}
                    </p>
                  )}

                  {exp.tasks && exp.tasks.length > 0 && (
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                      {exp.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Education Section */}
          <div className="mb-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <GraduationCap className="h-5 w-5 text-teal-600" />
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3 className="font-bold">
                      {edu.degree}
                      {edu.subject ? `, ${edu.subject}` : ""}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  <div className="text-md font-medium text-teal-600">
                    {edu.schoolName}
                  </div>
                  {edu.location && (
                    <div className="text-sm text-muted-foreground">
                      {edu.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {resumeData.projects && resumeData.projects.length > 0 && (
            <>
              <Separator className="my-6" />

              {/* Projects Section */}
              <div className="mb-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Code className="h-5 w-5 text-teal-600" />
                  Projects
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                        <h3 className="font-bold">{project.title}</h3>
                        {project.startDate && (
                          <div className="text-sm text-muted-foreground">
                            {project.startDate}
                            {project.endDate ? ` - ${project.endDate}` : ""}
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm">{project.description}</p>

                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="mt-3">
                            <div className="text-sm font-medium">
                              Technologies:
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {project.technologies.map((tech, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                      {project.links &&
                        project.links.length > 0 &&
                        project.links.some((link) =>
                          Object.values(link).some((val) => val)
                        ) && (
                          <div className="mt-3">
                            <div className="text-sm font-medium">Links:</div>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {project.links.map((link, index) => {
                                const [key, value] =
                                  Object.entries(link).find(
                                    ([k, v]) => k !== "_id" && v
                                  ) || [];
                                return key && value ? (
                                  <a
                                    key={index}
                                    href={
                                      value.startsWith("http")
                                        ? value
                                        : `https://${value}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-teal-600 hover:underline"
                                  >
                                    {key}
                                  </a>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {resumeData.certifications &&
            resumeData.certifications.length > 0 && (
              <>
                <Separator className="my-6" />

                {/* Certifications Section */}
                <div className="mb-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                    <Award className="h-5 w-5 text-teal-600" />
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <h3 className="font-medium">{cert.name}</h3>
                          {cert.date && (
                            <div className="text-sm text-muted-foreground">
                              {cert.date}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Issuer: {cert.issuer || cert.name}
                        </div>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-sm text-teal-600 hover:underline"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

          {resumeData.languages && resumeData.languages.length > 0 && (
            <>
              <Separator className="my-6" />

              {/* Languages Section */}
              <div className="mb-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Languages className="h-5 w-5 text-teal-600" />
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.languages.map((language, index) => (
                    <Badge key={index} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {resumeData.intrests && resumeData.intrests.length > 0 && (
            <>
              <Separator className="my-6" />

              {/* Interests Section */}
              <div className="mb-6">
                <h2 className="mb-4 text-xl font-bold">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.intrests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
}
