import MainPage from "./content";
import { contentRouteMetadata } from "../site-metadata";

export const metadata = contentRouteMetadata("/main-page/");

export default function Page() {
  return <MainPage />;
}
