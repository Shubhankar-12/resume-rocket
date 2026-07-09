import type { SectionKey, TemplateProps } from "../../types";
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
 * BusinessPro — polished non-technical / business style. Serif, centered header,
 * small-caps ruled headings in muted slate. Single-column, ATS-parseable.
 * Pure presentational (server print + client preview).
 */
export function BusinessProTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const contact = [basics.email, basics.phone, basics.location].filter(Boolean);

  const headingLabel = (key: SectionKey) =>
    key === "awards" ? "Achievements & Awards" : SECTION_LABEL[key];

  const Heading = ({ children }: { children: string }) => (
    <h2 className="mb-2.5 border-b border-slate-300 pb-1 text-[12px] font-bold uppercase tracking-wide text-slate-700">
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-11 py-10 font-serif text-[13px] leading-relaxed text-gray-900">
      <header className="mb-6 text-center">
        <h1 className="text-[30px] font-bold tracking-tight text-gray-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && <p className="mt-1 text-[14px] text-slate-600">{basics.headline}</p>}
        {(contact.length > 0 || basics.links.some((l) => l.url)) && (
          <p className="mt-2 text-[12px] text-gray-600">
            {contact.join("  |  ")}
            {contact.length > 0 && basics.links.some((l) => l.url) ? "  |  " : ""}
            <InlineLinks links={basics.links} accent={accent} />
          </p>
        )}
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-5">
          <Heading>{headingLabel(key)}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && (
            <div className="space-y-1 text-gray-800">
              {skillGroupsResolved(resume).map((g, i) => (
                <div key={i}>
                  <span className="font-semibold">{g.category ? g.category + ": " : ""}</span>
                  {g.skills.map((s) => s.name).join(", ")}
                </div>
              ))}
            </div>
          )}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.role}</span>
                  <span className="shrink-0 text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {(x.companyName || x.location) && (
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[12px] italic text-slate-700">{x.companyName}</span>
                    {x.location && (
                      <span className="shrink-0 text-[12px] italic text-slate-600">
                        {x.location}
                      </span>
                    )}
                  </div>
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
              <div key={x.id} className="mb-2">
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
                  <div className="text-[12px] italic text-slate-700">
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
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-gray-900">
                    <span className="font-bold">{x.name}</span>
                    {x.issuer ? ` | ${x.issuer}` : ""}
                  </span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                </div>
              </div>
            ))}

          {key === "awards" &&
            resume.awards.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] italic text-slate-700">{x.issuer}</div>}
                {x.description && <p className="mt-1 text-gray-800">{x.description}</p>}
              </div>
            ))}

          {key === "publications" &&
            resume.publications.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                </div>
                {x.publisher && (
                  <div className="text-[12px] italic text-slate-700">{x.publisher}</div>
                )}
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
              <div key={x.id} className="mb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.role}</span>
                  <span className="shrink-0 text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {(x.organization || x.location) && (
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[12px] italic text-slate-700">{x.organization}</span>
                    {x.location && (
                      <span className="shrink-0 text-[12px] italic text-slate-600">
                        {x.location}
                      </span>
                    )}
                  </div>
                )}
                {x.description && <RichText html={x.description} className="mt-1 text-gray-800" />}
              </div>
            ))}

          {key === "activities" &&
            resume.activities.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                </div>
                {x.organization && (
                  <div className="text-[12px] italic text-slate-700">{x.organization}</div>
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
