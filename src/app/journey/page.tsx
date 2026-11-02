import JourneyPage from "./content";
import { contentRouteMetadata } from "../site-metadata";

export const metadata = contentRouteMetadata("/journey/");

export default function Page() {
  return <JourneyPage />;
}
