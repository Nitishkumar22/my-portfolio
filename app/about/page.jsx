// app/about/page.jsx
import { AboutRoute } from "../../components/RoutePages";
import { ROUTES } from "../../lib/site";

export const metadata = {
  title:       "About",
  description: ROUTES.about.desc,
  alternates:  { canonical: ROUTES.about.path },
  openGraph:   { url: ROUTES.about.path, title: "About — Nitish Kumar", description: ROUTES.about.desc },
};

export default function Page() {
  return <AboutRoute />;
}
