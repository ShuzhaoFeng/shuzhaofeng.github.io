import ResearchPage from "./content";
import { contentRouteMetadata } from "../site-metadata";

export const metadata = contentRouteMetadata("/research/");

export default function Page() {
  return <ResearchPage />;
}
