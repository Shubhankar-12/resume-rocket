import { User, Mail, Phone, MapPin, Globe } from "lucide-react";
import type { TemplateProps } from "../../types";
import {
  dateRange,
  skillGroupsResolved,
  skillLevelPct,
  languagesResolved,
  languageLevelPct,
} from "./shared";
import { RichText } from "./RichText";
import { InlineLinks } from "./InlineLinks";
import { ProficiencyBar } from "./parts/ProficiencyBar";

const NAVY = "#1e3a5f";
const GOLD = "#b8860b";

function ExecSideHeading({ children }: { children: string }) {
  return (
    <h2
      className="mb-2 border-b pb-1 text-[12px] font-bold uppercase tracking-[0.14em]"
      style={{ color: NAVY, borderColor: GOLD }}
    >
      {children}
    </h2>
  );
}

function ExecMainHeading({ children }: { children: string }) {
  return (
    <h2
      className="mb-3 border-b pb-1 text-[14px] font-bold uppercase tracking-[0.1em]"
      style={{ color: NAVY, borderColor: GOLD }}
    >
      {children}
    </h2>
  );
}

/**
 * ExecSidebar — executive two-column resume: gray avatar sidebar with skill and
 * language proficiency bars, navy headings underlined in gold. Fixed print
 * colors, intentionally NOT ATS-safe. Pure presentational.
 */
export function ExecSidebarTemplate({ resume }: TemplateProps) {
  const { basics } = resume;
  const skillGroups = skillGroupsResolved(resume);
  const allSkills = skillGroups.flatMap((g) => g.skills);
  const languages = languagesResolved(resume);

  return (
    <div className="mx-auto grid max-w-[800px] grid-cols-[0.8fr_1.7fr] bg-white font-serif text-[13px] leading-relaxed text-gray-900">
      {/* LEFT / SIDEBAR */}
      <aside className="bg-gray-100 px-5 py-6">
        <div className="mb-6 flex justify-center">
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt=""
              className="h-24 w-24 rounded-full object-cover ring-2"
              style={{ boxShadow: `0 0 0 2px ${GOLD}` }}
            />
          ) : (
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200"
              style={{ boxShadow: `0 0 0 2px ${GOLD}` }}
            >
              <User className="h-11 w-11 text-gray-400" />
            </div>
          )}
        </div>

        {resume.summary?.trim() && (
          <section className="mb-6">
            <ExecSideHeading>Profile</ExecSideHeading>
            <RichText html={resume.summary} className="text-[12px] text-gray-800" />
          </section>
        )}

        {allSkills.length > 0 && (
          <section className="mb-6">
            <ExecSideHeading>Skills</ExecSideHeading>
            <ul className="space-y-2.5">
              {allSkills.map((s, i) => (
                <li key={i}>
                  <div className="mb-1 text-[12px] text-gray-800">{s.name}</div>
                  <ProficiencyBar pct={skillLevelPct(s.level)} color={NAVY} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section className="mb-6">
            <ExecSideHeading>Languages</ExecSideHeading>
            <ul className="space-y-2.5">
              {languages.map((l) => (
                <li key={l.id}>
                  <div className="mb-1 text-[12px] text-gray-800">{l.name}</div>
                  <ProficiencyBar pct={languageLevelPct(l.level)} color={NAVY} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {resume.certifications.length > 0 && (
          <section className="mb-6">
            <ExecSideHeading>Certifications</ExecSideHeading>
            <ul className="space-y-2">
              {resume.certifications.map((c) => (
                <li key={c.id} className="text-[12px]">
                  <div className="font-bold text-gray-900">{c.name}</div>
                  {c.issuer && <div className="text-gray-600">{c.issuer}</div>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {resume.interests.length > 0 && (
          <section>
            <ExecSideHeading>Interests</ExecSideHeading>
            <p className="text-[12px] text-gray-800">{resume.interests.join(", ")}</p>
          </section>
        )}
      </aside>

      {/* RIGHT / MAIN */}
      <main className="px-6 py-6">
        <header className="mb-6">
          <h1
            className="text-[28px] font-bold leading-tight tracking-tight"
            style={{ color: NAVY }}
          >
            {basics.name || "Your Name"}
          </h1>
          {basics.headline && (
            <p className="mt-0.5 text-[14px] italic text-gray-600">{basics.headline}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-700">
            {basics.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" style={{ color: GOLD }} />
                {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" style={{ color: GOLD }} />
                {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" style={{ color: GOLD }} />
                {basics.location}
              </span>
            )}
            {basics.links.some((l) => l.url) && (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" style={{ color: GOLD }} />
                <InlineLinks links={basics.links} accent={NAVY} />
              </span>
            )}
          </div>
        </header>

        {resume.experience.length > 0 && (
          <section className="mb-6">
            <ExecMainHeading>Professional Experience</ExecMainHeading>
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
                    <div className="text-[12px] text-gray-700">
                      <span className="italic">{x.companyName}</span>
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
            <ExecMainHeading>Education</ExecMainHeading>
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
      </main>
    </div>
  );
}
