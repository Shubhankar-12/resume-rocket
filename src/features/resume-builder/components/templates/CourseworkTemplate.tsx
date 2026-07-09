import { Phone, Mail } from "lucide-react";
import type { TemplateProps } from "../../types";
import {
  accentHex,
  dateRange,
  flatLanguages,
  orderedSectionKeys,
  SECTION_LABEL,
  skillGroupsResolved,
} from "./shared";
import { RichText } from "./RichText";
import { ProjectLinks } from "./ProjectLinks";
import { InlineLinks } from "./InlineLinks";

/**
 * Coursework — serif, centered header with a small-icon contact row and an
 * education-forward layout (GPA + relevant coursework). Single-column,
 * ATS-parseable (icon labels are decorative; the text stays present).
 * Pure presentational (server print page + client preview).
 */
export function CourseworkTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;

  const Heading = ({ children }: { children: string }) => (
    <h2 className="mb-2 border-b border-gray-300 pb-0.5 text-[14px] font-bold text-gray-700">
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-10 py-9 font-serif text-[13px] leading-relaxed text-gray-900">
      <header className="mb-5 text-center">
        <h1 className="text-[26px] font-bold tracking-tight text-gray-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && <p className="mt-0.5 text-[14px] text-gray-700">{basics.headline}</p>}
        {(basics.phone || basics.email) && (
          <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-gray-700">
            {basics.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="inline h-3 w-3" />
                {basics.phone}
              </span>
            )}
            {basics.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="inline h-3 w-3" />
                {basics.email}
              </span>
            )}
            {basics.location && <span>{basics.location}</span>}
          </p>
        )}
        {basics.links.some((l) => l.url) && (
          <p className="mt-1 text-[12px] text-gray-700">
            <InlineLinks links={basics.links} accent={accent} />
          </p>
        )}
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-4">
          <Heading>{SECTION_LABEL[key]}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && (
            <div className="space-y-0.5 text-gray-800">
              {skillGroupsResolved(resume).map((g, i) => (
                <div key={i}>
                  <span className="font-bold">{g.category ? `${g.category}: ` : ""}</span>
                  {g.skills.map((s) => s.name).join(", ")}
                </div>
              ))}
            </div>
          )}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.role}
                    {x.companyName ? `, ${x.companyName}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-700">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.location && <div className="text-[12px] italic text-gray-600">{x.location}</div>}
                {x.description ? (
                  <RichText html={x.description} className="mt-1 text-gray-800" />
                ) : (
                  x.bullets.length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-5">
                      {x.bullets.map((b, i) => (
                        <li key={i} className="text-gray-800">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            ))}

          {key === "education" &&
            resume.education.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.degree}
                    {x.subject ? `, ${x.subject}` : ""}
                    {x.gpa ? `, GPA: ${x.gpa}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-700">
                    {dateRange(x.startDate, x.endDate)}
                  </span>
                </div>
                {(x.schoolName || x.location) && (
                  <div className="text-[12px] text-gray-700">
                    {x.schoolName}
                    {x.schoolName && x.location ? ", " : ""}
                    {x.location}
                  </div>
                )}
                {x.coursework?.length > 0 && (
                  <div className="mt-1 text-[12px] text-gray-700">
                    <span className="font-bold">Relevant Coursework: </span>
                    {x.coursework.join(", ")}
                  </div>
                )}
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="font-bold text-gray-900">
                  {x.title}
                  {x.technologies.length > 0 && (
                    <span className="ml-1 font-normal text-gray-600">
                      | {x.technologies.join(", ")}
                    </span>
                  )}
                </div>
                {x.description && <RichText html={x.description} className="mt-1 text-gray-800" />}
                <ProjectLinks links={x.links} accent={accent} />
              </div>
            ))}

          {key === "certifications" &&
            resume.certifications.map((x) => (
              <div key={x.id} className="mb-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-700">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] text-gray-600">{x.issuer}</div>}
              </div>
            ))}

          {key === "awards" &&
            resume.awards.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-700">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] text-gray-600">{x.issuer}</div>}
                {x.description && <p className="mt-1 text-gray-800">{x.description}</p>}
              </div>
            ))}

          {key === "publications" &&
            resume.publications.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-700">{x.date}</span>}
                </div>
                {x.publisher && <div className="text-[12px] text-gray-600">{x.publisher}</div>}
                {x.description && <p className="mt-1 text-gray-800">{x.description}</p>}
                {x.url && (
                  <p className="mt-1 text-[12px]">
                    <InlineLinks links={[{ label: "", url: x.url }]} accent={accent} />
                  </p>
                )}
              </div>
            ))}

          {key === "volunteer" &&
            resume.volunteer.map((x) => (
              <div key={x.id} className="mb-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.role}
                    {x.organization ? `, ${x.organization}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-700">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.location && <div className="text-[12px] italic text-gray-600">{x.location}</div>}
                {x.description && <RichText html={x.description} className="mt-1 text-gray-800" />}
              </div>
            ))}

          {key === "activities" &&
            resume.activities.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-700">{x.date}</span>}
                </div>
                {x.organization && (
                  <div className="text-[12px] text-gray-600">{x.organization}</div>
                )}
                {x.description && <p className="mt-1 text-gray-800">{x.description}</p>}
              </div>
            ))}

          {key === "languages" && (
            <p className="text-gray-800">{flatLanguages(resume).join(", ")}</p>
          )}

          {key === "interests" && <p className="text-gray-800">{resume.interests.join(", ")}</p>}
        </section>
      ))}
    </div>
  );
}
