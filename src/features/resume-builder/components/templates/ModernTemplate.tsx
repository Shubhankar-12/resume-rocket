import type { TemplateProps } from "../../types";
import { accentHex, dateRange, orderedSectionKeys, SECTION_LABEL } from "./shared";

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
        {(contact.length > 0 || basics.links.length > 0) && (
          <p className="mt-2 text-[12px] text-gray-600">
            {contact.join("  ·  ")}
            {basics.links.length > 0 && contact.length > 0 ? "  ·  " : ""}
            {basics.links
              .map((l) => l.url)
              .filter(Boolean)
              .join("  ·  ")}
          </p>
        )}
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-6">
          <Heading>{SECTION_LABEL[key]}</Heading>

          {key === "summary" && <p className="text-gray-800">{resume.summary}</p>}

          {key === "skills" && <p className="text-gray-800">{resume.skills.join(", ")}</p>}

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
                {x.bullets.length > 0 && (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5">
                    {x.bullets.map((b, i) => (
                      <li key={i} className="text-gray-800">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          {key === "education" &&
            resume.education.map((x) => (
              <div key={x.id} className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-gray-900">
                  <span className="font-semibold">
                    {x.degree}
                    {x.subject ? `, ${x.subject}` : ""}
                  </span>
                  {x.schoolName ? ` — ${x.schoolName}` : ""}
                </span>
                <span className="shrink-0 text-[12px] text-gray-500">
                  {dateRange(x.startDate, x.endDate)}
                </span>
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-2.5">
                <span className="font-semibold text-gray-900">{x.title}</span>
                {x.description && <p className="text-gray-800">{x.description}</p>}
                {x.technologies.length > 0 && (
                  <p className="text-[12px] text-gray-500">{x.technologies.join(", ")}</p>
                )}
              </div>
            ))}

          {key === "certifications" &&
            resume.certifications.map((x) => (
              <div key={x.id} className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-gray-900">
                  <span className="font-semibold">{x.name}</span>
                  {x.issuer ? ` — ${x.issuer}` : ""}
                </span>
                {x.date && <span className="shrink-0 text-[12px] text-gray-500">{x.date}</span>}
              </div>
            ))}

          {key === "languages" && <p className="text-gray-800">{resume.languages.join(", ")}</p>}

          {key === "interests" && <p className="text-gray-800">{resume.interests.join(", ")}</p>}
        </section>
      ))}
    </div>
  );
}
