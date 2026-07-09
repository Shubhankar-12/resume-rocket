import type { TemplateProps } from "../../types";
import { accentHex, dateRange, skillGroupsResolved } from "./shared";
import { RichText } from "./RichText";
import { ProjectLinks } from "./ProjectLinks";
import { InlineLinks } from "./InlineLinks";

function BlueHeading({ children, accent }: { children: string; accent: string }) {
  return (
    <h2
      className="mb-2 border-b pb-0.5 text-[13px] font-bold uppercase tracking-wide"
      style={{ color: accent, borderColor: accent }}
    >
      {children}
    </h2>
  );
}

/**
 * Blue Sidebar — a left rail with accent-colored headings beside a wider main
 * column. Intentionally NOT ATS-safe (two-column). Pure presentational.
 */
export function BlueSidebarTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const links = (basics.links ?? []).filter((l) => l.url && l.url.trim());
  const skillGroups = skillGroupsResolved(resume);

  return (
    <div className="mx-auto grid max-w-[800px] grid-cols-[0.85fr_1.6fr] gap-6 bg-white px-8 py-8 font-sans text-[13px] text-gray-900">
      {/* LEFT rail */}
      <div className="space-y-5">
        <header>
          <h1 className="text-[24px] font-bold leading-tight" style={{ color: accent }}>
            {basics.name || "Your Name"}
          </h1>
          {basics.headline && <p className="mt-1 text-[13px] text-gray-600">{basics.headline}</p>}
        </header>

        {links.length > 0 && (
          <section>
            <BlueHeading accent={accent}>Links</BlueHeading>
            <div className="space-y-1">
              {links.map((l, i) => (
                <div key={i} className="text-[12px]">
                  <InlineLinks links={[l]} accent={accent} />
                </div>
              ))}
            </div>
          </section>
        )}

        {skillGroups.length > 0 && (
          <section>
            <BlueHeading accent={accent}>Skills</BlueHeading>
            <div className="space-y-2">
              {skillGroups.map((g, i) => (
                <div key={i}>
                  {g.category && (
                    <div className="text-[12px] font-bold" style={{ color: accent }}>
                      {g.category}
                    </div>
                  )}
                  <p className="text-gray-800">{g.skills.map((s) => s.name).join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.education.length > 0 && (
          <section>
            <BlueHeading accent={accent}>Education</BlueHeading>
            {resume.education.map((x) => (
              <div key={x.id} className="mb-2">
                {dateRange(x.startDate, x.endDate) && (
                  <div className="text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate)}
                  </div>
                )}
                <div className="font-bold text-gray-900">
                  {x.degree}
                  {x.subject ? `, ${x.subject}` : ""}
                </div>
                {x.schoolName && (
                  <div className="text-[12px] text-gray-700">
                    {x.schoolName}
                    {x.location ? `, ${x.location}` : ""}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* RIGHT main */}
      <div className="space-y-5">
        {resume.experience.length > 0 && (
          <section>
            <BlueHeading accent={accent}>Experience</BlueHeading>
            {resume.experience.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.role}</span>
                  <span className="shrink-0 text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {(x.companyName || x.location) && (
                  <div className="text-[12px] text-gray-700">
                    {[x.companyName, x.location].filter(Boolean).join(", ")}
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
          </section>
        )}

        {resume.awards.length > 0 && (
          <section>
            <BlueHeading accent={accent}>Achievements</BlueHeading>
            {resume.awards.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[12px] text-gray-600">{x.issuer}</div>}
                {x.description && <p className="mt-1 text-gray-800">{x.description}</p>}
              </div>
            ))}
          </section>
        )}

        {resume.projects.length > 0 && (
          <section>
            <BlueHeading accent={accent}>Side Projects</BlueHeading>
            {resume.projects.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="font-bold text-gray-900">{x.title}</div>
                {x.description && <RichText html={x.description} className="mt-1 text-gray-800" />}
                {x.technologies.length > 0 && (
                  <p className="mt-1 text-[12px] text-gray-600">{x.technologies.join(", ")}</p>
                )}
                <ProjectLinks links={x.links} accent={accent} />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
