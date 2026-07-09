import type { TemplateProps } from "../../types";
import {
  accentHex,
  dateRange,
  flatLanguages,
  flatSkills,
  orderedSectionKeys,
  SECTION_LABEL,
} from "./shared";
import { RichText } from "./RichText";
import { ProjectLinks } from "./ProjectLinks";
import { InlineLinks } from "./InlineLinks";

/**
 * Modern — sans-serif, left-aligned, airy. Single-column, ATS-parseable.
 * Pure presentational (renders on server print page + client preview).
 */
export function ModernTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const contact = [basics.email, basics.phone, basics.location].filter(Boolean);

  const Heading = ({ children }: { children: string }) => (
    <h2
      className="mb-2.5 border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500"
      style={{ borderColor: accent }}
    >
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-10 py-9 font-sans text-[13px] leading-relaxed text-gray-900">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-[30px] font-bold tracking-tight text-gray-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p className="mt-1 text-[15px] font-medium" style={{ color: accent }}>
            {basics.headline}
          </p>
        )}
        {(contact.length > 0 || basics.links.some((l) => l.url)) && (
          <p className="mt-2 text-[12px] text-gray-600">
            {contact.join("  ·  ")}
            {contact.length > 0 && basics.links.some((l) => l.url) ? "  ·  " : ""}
            <InlineLinks links={basics.links} accent={accent} />
          </p>
        )}
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-6">
          <Heading>{SECTION_LABEL[key]}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && <p className="text-gray-800">{flatSkills(resume).join(", ")}</p>}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900">
                    {x.role}
                    {x.companyName ? `, ${x.companyName}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-500">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.location && <div className="text-[12px] text-gray-500">{x.location}</div>}
                {x.description ? (
                  <RichText html={x.description} className="mt-1.5 text-gray-800" />
                ) : (
                  x.bullets.length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-5">
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
                  <span className="font-semibold text-gray-900">
                    {x.degree}
                    {x.subject ? `, ${x.subject}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-500">
                    {dateRange(x.startDate, x.endDate)}
                  </span>
                </div>
                {x.schoolName && (
                  <div className="text-[12px] text-gray-500">
                    {x.schoolName}
                    {x.location ? `, ${x.location}` : ""}
                  </div>
                )}
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="font-semibold text-gray-900">{x.title}</div>
                {x.description && <RichText html={x.description} className="mt-1 text-gray-800" />}
                {x.technologies.length > 0 && (
                  <p className="mt-1 text-[12px] text-gray-500">{x.technologies.join(", ")}</p>
                )}
                <ProjectLinks links={x.links} accent={accent} />
              </div>
            ))}

          {key === "certifications" &&
            resume.certifications.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-500">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] text-gray-500">{x.issuer}</div>}
              </div>
            ))}

          {key === "awards" &&
            resume.awards.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-500">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] text-gray-500">{x.issuer}</div>}
                {x.description && <p className="mt-1 text-gray-800">{x.description}</p>}
              </div>
            ))}

          {key === "publications" &&
            resume.publications.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-500">{x.date}</span>}
                </div>
                {x.publisher && <div className="text-[12px] text-gray-500">{x.publisher}</div>}
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
              <div key={x.id} className="mb-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900">
                    {x.role}
                    {x.organization ? `, ${x.organization}` : ""}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-500">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.location && <div className="text-[12px] text-gray-500">{x.location}</div>}
                {x.description && (
                  <RichText html={x.description} className="mt-1.5 text-gray-800" />
                )}
              </div>
            ))}

          {key === "activities" &&
            resume.activities.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-500">{x.date}</span>}
                </div>
                {x.organization && (
                  <div className="text-[12px] text-gray-500">{x.organization}</div>
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
