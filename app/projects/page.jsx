// app/projects/page.jsx
import { ProjectsRoute } from "../../components/RoutePages";
import { ROUTES } from "../../lib/site";

export const metadata = {
  title:       "Projects",
  description: ROUTES.projects.desc,
  alternates:  { canonical: ROUTES.projects.path },
  openGraph:   { url: ROUTES.projects.path, title: "Projects — Nitish Kumar", description: ROUTES.projects.desc },
};

export default function Page() {
  return <ProjectsRoute />;
}
