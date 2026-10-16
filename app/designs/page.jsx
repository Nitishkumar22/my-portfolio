// app/designs/page.jsx
import { DesignsRoute } from "../../components/RoutePages";
import { preconnect } from "react-dom";
import { ROUTES } from "../../lib/site";

export const metadata = {
  title:       "Designs",
  description: ROUTES.designs.desc,
  alternates:  { canonical: ROUTES.designs.path },
  openGraph:   { url: ROUTES.designs.path, title: "Designs — Nitish Kumar", description: ROUTES.designs.desc },
};

export default function Page() {
  // Design images are served from the old portfolio's image optimizer.
  preconnect("https://portfolio-eight-swart-55.vercel.app");
  return <DesignsRoute />;
}
