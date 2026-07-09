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

const normalizeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);
const displayUrl = (url: string) =>
  url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "");

/**
 * Deedy — dense academic LaTeX ("Deedy/sb2nov") style. Serif, tight spacing,
 * small-caps section rules. Single-column, ATS-parseable. Pure presentational.
 */
export function DeedyTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const links = (basics.links ?? []).filter((l) => l.url && l.url.trim());
  const skillGroups = skillGroupsResolved(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2 className="mb-1.5 border-b border-gray-900 pb-0.5 text-[12px] font-bold uppercase tracking-[0.16em] text-gray-900">
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-9 py-7 font-serif text-[12px] leading-snug text-gray-900">
      <header className="mb-4">
        <h1 className="text-[24px] font-bold leading-none tracking-tight text-gray-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p className="mt-1 text-[12px] italic text-gray-700">{basics.headline}</p>
        )}
        <div className="mt-2 flex justify-between gap-6 text-[11px] text-gray-700">
          <div className="space-y-0.5">
            {links.map((l, i) => (
              <div key={i}>
                <span className="font-bold">
                  {l.label && l.label.trim() ? l.label.trim() : "Link"}:{" "}
                </span>
                <a
                  href={normalizeUrl(l.url.trim())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: accent }}
                >
                  {displayUrl(l.url)}
                </a>
              </div>
            ))}
          </div>
          <div className="space-y-0.5 text-right">
            {basics.email && (
              <div>
                <span className="font-bold">Email: </span>
                {basics.email}
              </div>
            )}
            {basics.phone && (
              <div>
                <span className="font-bold">Mobile: </span>
                {basics.phone}
              </div>
            )}
            {basics.location && (
              <div>
                <span className="font-bold">Location: </span>
                {basics.location}
              </div>
            )}
          </div>
        </div>
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-3">
          <Heading>{SECTION_LABEL[key]}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && (
            <div className="space-y-0.5">
              {skillGroups.map((g, i) => (
                <p key={i} className="text-gray-800">
                  <span className="font-bold">{g.category ? `${g.category}: ` : ""}</span>
                  {g.skills.map((s) => s.name).join(", ")}
                </p>
              ))}
            </div>
          )}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.role}</span>
                  {x.location && (
                    <span className="shrink-0 text-[11px] text-gray-700">{x.location}</span>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  {x.companyName && <span className="italic text-gray-700">{x.companyName}</span>}
                  <span className="shrink-0 text-[11px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
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
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.schoolName || x.degree}</span>
                  {x.location && (
                    <span className="shrink-0 text-[11px] text-gray-700">{x.location}</span>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="italic text-gray-700">
                    {x.degree}
                    {x.subject ? `, ${x.subject}` : ""}
                    {x.gpa ? ` (GPA: ${x.gpa})` : ""}
                  </span>
                  <span className="shrink-0 text-[11px] text-gray-600">
                    {dateRange(x.startDate, x.endDate)}
                  </span>
                </div>
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.technologies.length > 0 && (
                    <span className="shrink-0 text-[11px] italic text-gray-600">
                      {x.technologies.join(", ")}
                    </span>
                  )}
                </div>
                {x.description && (
                  <RichText html={x.description} className="mt-0.5 text-gray-800" />
                )}
                <ProjectLinks links={x.links} accent={accent} className="mt-0.5" />
              </div>
            ))}

          {key === "certifications" &&
            resume.certifications.map((x) => (
              <div key={x.id} className="mb-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[11px] text-gray-600">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[11px] italic text-gray-700">{x.issuer}</div>}
              </div>
            ))}

          {key === "awards" &&
            resume.awards.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.name}</span>
                  {x.date && <span className="shrink-0 text-[11px] text-gray-600">{x.date}</span>}
                </div>
                {x.issuer && <div className="text-[11px] italic text-gray-700">{x.issuer}</div>}
                {x.description && <p className="mt-0.5 text-gray-800">{x.description}</p>}
              </div>
            ))}

          {key === "publications" &&
            resume.publications.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[11px] text-gray-600">{x.date}</span>}
                </div>
                {x.publisher && (
                  <div className="text-[11px] italic text-gray-700">{x.publisher}</div>
                )}
                {x.description && <p className="mt-0.5 text-gray-800">{x.description}</p>}
                {x.url && (
                  <p className="mt-0.5 text-[11px]">
                    <InlineLinks links={[{ label: "", url: x.url }]} accent={accent} />
                  </p>
                )}
              </div>
            ))}

          {key === "volunteer" &&
            resume.volunteer.map((x) => (
              <div key={x.id} className="mb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.role}</span>
                  {x.location && (
                    <span className="shrink-0 text-[11px] text-gray-700">{x.location}</span>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  {x.organization && <span className="italic text-gray-700">{x.organization}</span>}
                  <span className="shrink-0 text-[11px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {x.description && (
                  <RichText html={x.description} className="mt-0.5 text-gray-800" />
                )}
              </div>
            ))}

          {key === "activities" &&
            resume.activities.map((x) => (
              <div key={x.id} className="mb-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.title}</span>
                  {x.date && <span className="shrink-0 text-[11px] text-gray-600">{x.date}</span>}
                </div>
                {x.organization && (
                  <div className="text-[11px] italic text-gray-700">{x.organization}</div>
                )}
                {x.description && <p className="mt-0.5 text-gray-800">{x.description}</p>}
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
