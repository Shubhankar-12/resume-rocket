import type { TemplateProps } from "../../types";
import { accentHex, dateRange } from "./shared";
import { RichText } from "./RichText";
import { ProjectLinks } from "./ProjectLinks";
import { InlineLinks } from "./InlineLinks";

function DarkHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-2 border-b border-gray-300 pb-0.5 text-[12px] font-bold uppercase tracking-wide text-gray-900">
      {children}
    </h2>
  );
}

/**
 * Dark Sidebar — a full-width dark header over a two-column body. Intentionally
 * NOT ATS-safe (two-column). Pure presentational (server print + client preview).
 */
export function DarkSidebarTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const contact = [basics.email, basics.phone, basics.location].filter(Boolean);
  const links = (basics.links ?? []).filter((l) => l.url && l.url.trim());

  return (
    <div className="mx-auto max-w-[800px] bg-white font-serif text-[13px] text-gray-900">
      <header className="bg-gray-900 px-10 py-6 text-center text-white">
        <h1 className="text-[26px] font-bold tracking-tight">{basics.name || "Your Name"}</h1>
        {contact.length > 0 && (
          <p className="mt-1.5 text-[12px] text-gray-300">{contact.join("  |  ")}</p>
        )}
      </header>

      <div className="grid grid-cols-[1fr_1.8fr] gap-6 px-10 py-6">
        {/* LEFT column */}
        <div className="space-y-5">
          {resume.summary?.trim() && (
            <section>
              <DarkHeading>About Me</DarkHeading>
              <RichText html={resume.summary} className="text-gray-800" />
            </section>
          )}

          {resume.education.length > 0 && (
            <section>
              <DarkHeading>Education</DarkHeading>
              {resume.education.map((x) => (
                <div key={x.id} className="mb-2">
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
                  {dateRange(x.startDate, x.endDate) && (
                    <div className="text-[12px] text-gray-600">
                      {dateRange(x.startDate, x.endDate)}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {links.length > 0 && (
            <section>
              <DarkHeading>Links</DarkHeading>
              <div className="space-y-1">
                {links.map((l, i) => (
                  <div key={i} className="text-[12px]">
                    <InlineLinks links={[l]} accent={accent} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.awards.length > 0 && (
            <section>
              <DarkHeading>Honors &amp; Awards</DarkHeading>
              {resume.awards.map((x) => (
                <div key={x.id} className="mb-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-gray-900">{x.name}</span>
                    {x.date && <span className="shrink-0 text-[12px] text-gray-600">{x.date}</span>}
                  </div>
                  {x.issuer && <div className="text-[12px] text-gray-600">{x.issuer}</div>}
                </div>
              ))}
            </section>
          )}

          {resume.interests.length > 0 && (
            <section>
              <DarkHeading>Interests</DarkHeading>
              <p className="text-gray-800">{resume.interests.join(", ")}</p>
            </section>
          )}
        </div>

        {/* RIGHT column */}
        <div className="space-y-5">
          {resume.experience.length > 0 && (
            <section>
              <DarkHeading>Experience</DarkHeading>
              {resume.experience.map((x) => (
                <div key={x.id} className="mb-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-bold text-gray-900">{x.role}</span>
                    <span className="shrink-0 text-[12px] text-gray-600">
                      {dateRange(x.startDate, x.endDate, x.isPresent)}
                    </span>
                  </div>
                  {(x.companyName || x.location) && (
                    <div className="text-[12px] italic text-gray-700">
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

          {resume.projects.length > 0 && (
            <section>
              <DarkHeading>Personal Projects</DarkHeading>
              {resume.projects.map((x) => (
                <div key={x.id} className="mb-3">
                  <div className="font-bold text-gray-900">{x.title}</div>
                  {x.description && (
                    <RichText html={x.description} className="mt-1 text-gray-800" />
                  )}
                  {x.technologies.length > 0 && (
                    <p className="mt-1 text-[12px] text-gray-600">{x.technologies.join(", ")}</p>
                  )}
                  <ProjectLinks links={x.links} accent={accent} />
                </div>
              ))}
            </section>
          )}

          {resume.volunteer.length > 0 && (
            <section>
              <DarkHeading>Volunteering</DarkHeading>
              {resume.volunteer.map((x) => (
                <div key={x.id} className="mb-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-bold text-gray-900">{x.role}</span>
                    <span className="shrink-0 text-[12px] text-gray-600">
                      {dateRange(x.startDate, x.endDate, x.isPresent)}
                    </span>
                  </div>
                  {x.organization && (
                    <div className="text-[12px] italic text-gray-700">{x.organization}</div>
                  )}
                  {x.description && (
                    <RichText html={x.description} className="mt-1 text-gray-800" />
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
