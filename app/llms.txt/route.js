// app/llms.txt/route.js
// Markdown summary of the whole portfolio for LLMs and AI agents
// (https://llmstxt.org). Generated from lib/data.js so it never drifts.
import { EXPERIENCE, PROJECTS, SKILL_ICONS } from "../../lib/data";
import { RESUMES, ROUTES, SITE, SITE_URL } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const pages = Object.values(ROUTES)
    .map(r => `- [${r.label}](${SITE_URL}${r.path}): ${r.desc}`)
    .join("\n");

  const experience = EXPERIENCE
    .map(e => `- **${e.role}** — ${e.company} (${e.period}, ${e.type})\n${e.points.map(p => `  - ${p}`).join("\n")}`)
    .join("\n");

  const projects = PROJECTS
    .map(p => {
      const link = p.live && p.live !== "#" ? `[${p.title}](${p.live})` : p.title;
      return `- ${link} (${p.year}): ${p.desc} Tech: ${p.tags.join(", ")}.`;
    })
    .join("\n");

  const skills = [
    ["Development",    "dev"],
    ["DevOps & Cloud", "devops"],
  ]
    .map(([label, key]) => `- ${label}: ${SKILL_ICONS.filter(s => s.category === key).map(s => s.name).join(", ")}`)
    .join("\n");

  const resumes = RESUMES
    .map(r => `- [${r.label} resume (PDF)](${SITE_URL}${r.file}): ${r.desc}`)
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.jobTitle}. ${SITE.description}

## Pages

${pages}

## Contact

- Email: ${SITE.email}
- Phone: ${SITE.phone}
- [LinkedIn](${SITE.linkedin})
- [GitHub](${SITE.github})

## Experience

${experience}

## Projects

${projects}

## Skills

${skills}

## Resumes

${resumes}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
