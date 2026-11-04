import RootPage from "./root-page";
import { contentRouteMetadata } from "./site-metadata";
import { getAllPosts } from "./blog/posts";

export const metadata = contentRouteMetadata("/");

export default function Page() {
  // Read at build time: with no post a remembered Blog opens Home.
  return <RootPage hasPosts={getAllPosts().length > 0} />;
}
