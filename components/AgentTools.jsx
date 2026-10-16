"use client";
// components/AgentTools.jsx
//
// Registers WebMCP tools (https://developer.chrome.com/docs/ai/webmcp) so
// AI agents in the browser can query and navigate the portfolio directly
// instead of scraping the UI. No-op in browsers without navigator.modelContext.
import { useEffect } from "react";
import { EXPERIENCE, PROJECTS, SKILL_ICONS } from "../lib/data";
import { RESUMES, ROUTES, SITE } from "../lib/site";

const text = value => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
});

function buildTools(navigate) {
  return [
    {
      name:        "navigate_to_page",
      description: "Open a page of Nitish Kumar's portfolio.",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "string", enum: Object.keys(ROUTES), description: "Page to open." },
        },
        required: ["page"],
      },
      execute: async ({ page }) => {
        if (!ROUTES[page]) return text(`Unknown page "${page}".`);
        navigate(page);
        return text(`Opened ${ROUTES[page].label} (${ROUTES[page].path}).`);
      },
    },
    {
      name:        "get_contact_info",
      description: "Get Nitish Kumar's email, phone, LinkedIn and GitHub.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text({
        name: SITE.name, email: SITE.email, phone: SITE.phone,
        linkedin: SITE.linkedin, github: SITE.github,
      }),
    },
    {
      name:        "list_projects",
      description: "List portfolio projects with descriptions, tech stack and live links. Optionally filter by a technology.",
      inputSchema: {
        type: "object",
        properties: {
          technology: { type: "string", description: "Only return projects using this technology, e.g. \"Kubernetes\"." },
        },
      },
      annotations: { readOnlyHint: true },
      execute: async ({ technology } = {}) => {
        const q = technology?.toLowerCase();
        const list = PROJECTS
          .filter(p => !q || p.tags.some(tag => tag.toLowerCase().includes(q)))
          .map(({ title, desc, tags, live, year }) => ({ title, year, desc, tags, live: live === "#" ? null : live }));
        return text(list);
      },
    },
    {
      name:        "get_experience_and_skills",
      description: "Get Nitish Kumar's work experience and technical skills.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text({
        experience: EXPERIENCE,
        skills:     SKILL_ICONS.map(({ name, category }) => ({ name, category })),
      }),
    },
    {
      name:        "get_resume_links",
      description: "Get download links for Nitish Kumar's resumes (Backend and DevOps versions).",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text(
        RESUMES.map(r => ({ ...r, url: new URL(r.file, window.location.origin).href }))
      ),
    },
  ];
}

export default function AgentTools({ navigate }) {
  useEffect(() => {
    const mc = navigator.modelContext ?? document.modelContext;
    if (!mc?.registerTool) return;

    const controller = new AbortController();
    const handles = buildTools(navigate).map(tool => {
      try {
        return mc.registerTool(tool, { signal: controller.signal });
      } catch (err) {
        console.warn(`[WebMCP] could not register ${tool.name}`, err);
        return null;
      }
    });

    return () => {
      controller.abort();
      handles.forEach(h => { try { h?.unregister?.(); } catch {} });
    };
  }, [navigate]);

  return null;
}
