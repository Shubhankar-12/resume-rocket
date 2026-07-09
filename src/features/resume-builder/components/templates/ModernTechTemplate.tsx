import { MapPin, Mail, Phone, Linkedin, Github, Globe } from "lucide-react";
import type { BuilderLink, TemplateProps } from "../../types";
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

/** Pick a lucide icon for a header link based on its label/url. */
function linkIcon(link: BuilderLink) {
  const hay = `${link.label ?? ""} ${link.url ?? ""}`.toLowerCase();
  if (hay.includes("linkedin")) return Linkedin;
  if (hay.includes("github")) return Github;
  return Globe;
}

/**
 * ModernTech — sans-serif, accent-colored headings, centered contact header
 * with inline icons. Single-column, ATS-parseable. Pure presentational.
 */
export function ModernTechTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const links = (basics.links ?? []).filter((l) => l.url && l.url.trim());
  const skillGroups = skillGroupsResolved(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2
      className="mb-2 border-b border-gray-200 pb-1 text-[13px] font-bold uppercase tracking-[0.1em]"
      style={{ color: accent }}
    >
      {children}
    </h2>
  );

  return (
    <div className="mx-auto max-w-[800px] bg-white px-10 py-9 font-sans text-[13px] leading-relaxed text-gray-900">
      <header className="mb-5 text-center">
        <h1 className="text-[26px] font-bold uppercase tracking-[0.08em]" style={{ color: accent }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && <p className="mt-0.5 text-[14px] text-gray-700">{basics.headline}</p>}
        {(basics.email || basics.phone || basics.location) && (
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-gray-600">
            {basics.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" style={{ color: accent }} />
                {basics.location}
              </span>
            )}
            {basics.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3 w-3" style={{ color: accent }} />
                {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3 w-3" style={{ color: accent }} />
                {basics.phone}
              </span>
            )}
          </p>
        )}
        {links.length > 0 && (
          <p className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-gray-600">
            {links.map((l, i) => {
              const Icon = linkIcon(l);
              return (
                <span key={i} className="inline-flex items-center gap-1">
                  <Icon className="h-3 w-3" style={{ color: accent }} />
                  <InlineLinks links={[l]} accent={accent} />
                </span>
              );
            })}
          </p>
        )}
      </header>

      {orderedSectionKeys(resume).map((key) => (
        <section key={key} className="mb-4">
          <Heading>{key === "projects" ? "Key Projects" : SECTION_LABEL[key]}</Heading>

          {key === "summary" && <RichText html={resume.summary} className="text-gray-800" />}

          {key === "skills" && (
            <ul className="space-y-0.5">
              {skillGroups.map((g, i) => (
                <li key={i} className="text-gray-800">
                  <span style={{ color: accent }}>{"• "}</span>
                  <span className="font-semibold">{g.category ? `${g.category}: ` : ""}</span>
                  {g.skills.map((s) => s.name).join(", ")}
                </li>
              ))}
            </ul>
          )}

          {key === "experience" &&
            resume.experience.map((x) => (
              <div key={x.id} className="mb-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">{x.role}</span>
                  <span className="shrink-0 text-[12px] text-gray-600">
                    {dateRange(x.startDate, x.endDate, x.isPresent)}
                  </span>
                </div>
                {(x.companyName || x.location) && (
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[12px] italic text-gray-700">{x.companyName}</span>
                    {x.location && (
                      <span className="shrink-0 text-[12px] text-gray-600">{x.location}</span>
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
                {(x.schoolName || x.gpa) && (
                  <div className="text-[12px] text-gray-700">
                    {x.schoolName}
                    {x.location ? `, ${x.location}` : ""}
                    {x.gpa ? ` (GPA: ${x.gpa})` : ""}
                  </div>
                )}
              </div>
            ))}

          {key === "projects" &&
            resume.projects.map((x) => (
              <div key={x.id} className="mb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-gray-900">
                    {x.title}
                    {x.technologies.length > 0 && (
                      <span className="font-normal text-gray-500">
                        {` | ${x.technologies.join(", ")}`}
                      </span>
                    )}
                  </span>
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
