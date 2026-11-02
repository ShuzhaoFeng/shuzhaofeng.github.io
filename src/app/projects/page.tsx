import ProjectsPage from "./content";
import { contentRouteMetadata } from "../site-metadata";

export const metadata = contentRouteMetadata("/projects/");

export default function Page() {
  return <ProjectsPage />;
}
