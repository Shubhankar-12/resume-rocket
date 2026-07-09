import type { TemplateProps } from "../../types";
import { accentHex, dateRange, orderedSectionKeys, SECTION_LABEL } from "./shared";
import { RichText } from "./RichText";

/**
 * Compact — dense, sans-serif, one-page-oriented. Single-column, ATS-parseable.
 * Pure presentational (renders on server print page + client preview).
 */
export function CompactTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const contact = [basics.email, basics.phone, basics.location].filter(Boolean);
  const contactLine = [...contact, ...basics.links.map((l) => l.url).filter(Boolean)];

  const Heading = ({ children }: { children: string }) => (
    <h2
      className="mb-1 border-b pb-0.5 text-[11px] font-bold uppercase tracking-[0.1em]"
      style={{ color: accent, borderColor: "#e5e7eb" }}
    >
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-8 py-6 font-sans text-[12px] leading-snug text-gray-900">
      {/* Header */}
      <header className="mb-2 text-center">
        <h1 className="text-[20px] font-bold tracking-tight text-gray-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p className="mt-0.5 text-[12px]" style={{ color: accent }}>
            {basics.headline}
          </p>
        )}
        {contactLine.length > 0 && (
          <p className="mt-0.5 text-[11px] text-gray-600">{contactLine.join(" · ")}</p>
        )}
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-2">
          <Heading>{SECTION_LABEL[key]}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && <p className="text-gray-800">{resume.skills.join(" • ")}</p>}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.role}
                    {x.companyName ? `, ${x.companyName}` : ""}
                  </span>
                  <span className="shrink-0 text-[11px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.location && <div className="text-[11px] italic text-gray-600">{x.location}</div>}
                {x.description ? (
                  <RichText html={x.description} className="mt-0.5 text-gray-800" />
                ) : (
                  x.bullets.length > 0 && (
                    <ul className="mt-0.5 list-disc space-y-0 pl-4">
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
              <div key={x.id} className="mb-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.degree}
                    {x.subject ? `, ${x.subject}` : ""}
                  </span>
                  <span className="shrink-0 text-[11px] text-gray-600">
                    {dateRange(x.startDate, x.endDate)}
                  </span>
                </div>
                {x.schoolName && (
                  <div className="text-[11px] text-gray-700">
                    {x.schoolName}
                    {x.location ? `, ${x.location}` : ""}
                  </div>
                )}
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-1">
                <span className="font-bold text-gray-900">{x.title}</span>
                {x.description && <RichText html={x.description} className="text-gray-800" />}
                {x.technologies.length > 0 && (
                  <p className="text-[11px] text-gray-600">{x.technologies.join(", ")}</p>
                )}
              </div>
            ))}

          {key === "certifications" &&
            resume.certifications.map((x) => (
              <div key={x.id} className="mb-0.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[11px] text-gray-600">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[11px] text-gray-600">{x.issuer}</div>}
              </div>
            ))}

          {key === "languages" && <p className="text-gray-800">{resume.languages.join(" • ")}</p>}

          {key === "interests" && <p className="text-gray-800">{resume.interests.join(" • ")}</p>}
        </section>
      ))}
    </div>
  );
}
