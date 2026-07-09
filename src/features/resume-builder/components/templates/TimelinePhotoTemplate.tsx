import { User, Mail, Phone, MapPin, Globe } from "lucide-react";
import type { TemplateProps } from "../../types";
import {
  accentHex,
  dateRange,
  flatSkills,
  languagesResolved,
  languageLevelPct,
  LANGUAGE_LEVEL_LABEL,
} from "./shared";
import { RichText } from "./RichText";
import { InlineLinks } from "./InlineLinks";
import { ProficiencyBar } from "./parts/ProficiencyBar";

function TimelineNode({ accent }: { accent: string }) {
  return (
    <span
      className="absolute -left-[7px] top-1 h-3 w-3 rounded-full ring-2 ring-white"
      style={{ backgroundColor: accent }}
    />
  );
}

function TimelineSectionHeading({ children, accent }: { children: string; accent: string }) {
  return (
    <div className="relative mb-3">
      <TimelineNode accent={accent} />
      <h2 className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: accent }}>
        {children}
      </h2>
    </div>
  );
}

function TimelineRailHeading({ children, accent }: { children: string; accent: string }) {
  return (
    <h2
      className="mb-2 border-b pb-1 text-[12px] font-bold uppercase tracking-[0.12em]"
      style={{ color: accent, borderColor: accent }}
    >
      {children}
    </h2>
  );
}

/**
 * TimelinePhoto — designer two-column resume: circular photo, a vertical
 * icon-node timeline of experience/education/projects on the left, and a
 * contact / skills / languages rail on the right. Intentionally NOT ATS-safe.
 * Pure presentational (server print page + client preview).
 */
export function TimelinePhotoTemplate({ resume }: TemplateProps) {
  const accent = accentHex(resume.accent_color);
  const { basics } = resume;
  const skills = flatSkills(resume);
  const languages = languagesResolved(resume);

  return (
    <div className="mx-auto grid max-w-[800px] grid-cols-[1.7fr_1fr] gap-6 bg-white px-8 py-8 font-serif text-[13px] leading-relaxed text-gray-900">
      {/* LEFT / MAIN */}
      <main>
        <header className="mb-6 flex items-center gap-5">
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt=""
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-200">
              <User className="h-9 w-9 text-gray-400" />
            </div>
          )}
          <div>
            <h1 className="text-[27px] font-bold leading-tight tracking-tight text-gray-900">
              {basics.name || "Your Name"}
            </h1>
            {basics.headline && (
              <p className="mt-0.5 text-[14px] text-gray-600">{basics.headline}</p>
            )}
          </div>
        </header>

        <div className="ml-2 space-y-6 border-l-2 border-gray-300 pl-6">
          {resume.summary?.trim() && (
            <section>
              <TimelineSectionHeading accent={accent}>Profile</TimelineSectionHeading>
              <RichText html={resume.summary} className="text-gray-800" />
            </section>
          )}

          {resume.experience.length > 0 && (
            <section>
              <TimelineSectionHeading accent={accent}>Work Experience</TimelineSectionHeading>
              <div className="space-y-4">
                {resume.experience.map((x) => (
                  <div key={x.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-bold text-gray-900">{x.role}</span>
                      <span className="shrink-0 text-[12px] text-gray-600">
                        {dateRange(x.startDate, x.endDate, x.isPresent)}
                      </span>
                    </div>
                    {(x.companyName || x.location) && (
                      <div className="text-[12px] italic text-gray-600">
                        {x.companyName}
                        {x.companyName && x.location ? ", " : ""}
                        {x.location}
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
              </div>
            </section>
          )}

          {resume.education.length > 0 && (
            <section>
              <TimelineSectionHeading accent={accent}>Education</TimelineSectionHeading>
              <div className="space-y-3">
                {resume.education.map((x) => (
                  <div key={x.id}>
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
                    {x.gpa && <div className="text-[12px] text-gray-600">GPA: {x.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.projects.length > 0 && (
            <section>
              <TimelineSectionHeading accent={accent}>Missions</TimelineSectionHeading>
              <div className="space-y-3">
                {resume.projects.map((x) => (
                  <div key={x.id}>
                    <div className="font-bold text-gray-900">{x.title}</div>
                    {x.description && (
                      <RichText html={x.description} className="mt-1 text-gray-800" />
                    )}
                    {x.technologies.length > 0 && (
                      <p className="mt-1 text-[12px] text-gray-600">{x.technologies.join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* RIGHT / RAIL */}
      <aside className="space-y-6">
        <section>
          <TimelineRailHeading accent={accent}>Contact</TimelineRailHeading>
          <ul className="space-y-1.5 text-[12px] text-gray-800">
            {basics.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                <span className="break-all">{basics.email}</span>
              </li>
            )}
            {basics.phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                <span>{basics.phone}</span>
              </li>
            )}
            {basics.location && (
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                <span>{basics.location}</span>
              </li>
            )}
            {basics.links.some((l) => l.url) && (
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                <span className="break-all">
                  <InlineLinks links={basics.links} accent={accent} />
                </span>
              </li>
            )}
          </ul>
        </section>

        {skills.length > 0 && (
          <section>
            <TimelineRailHeading accent={accent}>Skills</TimelineRailHeading>
            <ul className="list-disc space-y-0.5 pl-4 text-[12px] text-gray-800">
              {skills.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <TimelineRailHeading accent={accent}>Languages</TimelineRailHeading>
            <ul className="space-y-2.5">
              {languages.map((l) => (
                <li key={l.id}>
                  <div className="mb-1 flex items-baseline justify-between gap-2 text-[12px]">
                    <span className="text-gray-800">{l.name}</span>
                    {l.level && (
                      <span className="shrink-0 text-[11px] text-gray-500">
                        {LANGUAGE_LEVEL_LABEL[l.level]}
                      </span>
                    )}
                  </div>
                  <ProficiencyBar pct={languageLevelPct(l.level)} color={accent} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}
