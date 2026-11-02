import RootPage from "./root-page";
import { contentRouteMetadata } from "./site-metadata";

export const metadata = contentRouteMetadata("/");

export default function Page() {
  return <RootPage />;
}
