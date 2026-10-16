"use client";
// components/RoutePages.jsx
// Client bridges so the server route files can export metadata while the
// page bodies still read the active theme from the site shell.
import { useSite } from "./SiteShell";
import { AboutPage }    from "../app-pages/AboutPage";
import { ProjectsPage } from "../app-pages/ProjectsPage";
import { DesignsPage }  from "../app-pages/DesignsPage";

export function AboutRoute()    { return <AboutPage    t={useSite().t} />; }
export function ProjectsRoute() { return <ProjectsPage t={useSite().t} />; }
export function DesignsRoute()  { return <DesignsPage  t={useSite().t} />; }
