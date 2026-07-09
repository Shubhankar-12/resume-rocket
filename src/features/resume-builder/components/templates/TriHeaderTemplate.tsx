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
 * TriHeader — serif template with a three-column header (contact / name / links)
 * over a single-column body. ATS-parseable. Pure presentational.
 */
export function TriHeaderTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const contactLines = [basics.phone, basics.location, basics.email].filter(Boolean);
  const validLinks = (basics.links ?? []).filter((l) => l.url && l.url.trim());

  const Heading = ({ children }: { children: string }) => (
    <h2
      className="mb-2 border-b border-gray-300 pb-1 text-[12px] font-semibold uppercase tracking-widest"
      style={{ color: accent }}
    >
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-10 py-9 font-serif text-[13px] leading-relaxed text-gray-900">
      <header className="mb-5 flex items-start justify-between gap-4 border-b border-gray-300 pb-4">
        <div className="flex-1 text-left text-[12px] text-gray-600">
          {contactLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-[26px] font-bold tracking-tight text-gray-900">
            {basics.name || "Your Name"}
          </h1>
          {basics.headline && (
            <p className="mt-0.5 text-[13px]" style={{ color: accent }}>
              {basics.headline}
            </p>
          )}
        </div>

        <div className="flex-1 text-right text-[12px]">
          {validLinks.map((l, i) => (
            <div key={i}>
              <InlineLinks links={[l]} accent={accent} />
            </div>
          ))}
        </div>
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-4">
          <Heading>{SECTION_LABEL[key]}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && (
            <div className="space-y-0.5 text-gray-800">
              {skillGroupsResolved(resume).map((g, i) => (
                <p key={i}>
                  {g.category && <span className="font-bold">{g.category}: </span>}
                  {g.skills.map((s) => s.name).join(", ")}
                </p>
              ))}
            </div>
          )}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold uppercase text-gray-900">
                    {x.role}
                    {x.companyName ? `, ${x.companyName}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.location && (
                  <div className="text-right text-[12px] italic text-gray-600">{x.location}</div>
                )}
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
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.degree}
                    {x.subject ? `, ${x.subject}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate)}
                  </span>
                </div>
                {x.schoolName && (
                  <div className="text-[12px] text-gray-700">
                    {x.schoolName}
                    {x.location ? `, ${x.location}` : ""}
                  </div>
                )}
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="font-bold text-gray-900">{x.title}</div>
                {x.description && <RichText html={x.description} className="mt-1 text-gray-800" />}
                {x.technologies.length > 0 && (
                  <p className="mt-1 text-[12px] text-gray-600">{x.technologies.join(", ")}</p>
                )}
                <ProjectLinks links={x.links} accent={accent} />
              </div>
            ))}

          {key === "certifications" &&
            resume.certifications.map((x) => (
              <div key={x.id} className="mb-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] text-gray-600">{x.issuer}</div>}
              </div>
            ))}

          {key === "awards" &&
            resume.awards.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
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
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
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
                  <span className="shrink-0 text-[12px] text-gray-600">
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
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
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
