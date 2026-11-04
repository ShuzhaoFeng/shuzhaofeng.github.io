import { notFound } from "next/navigation";
import PostPage from "./content";
import { getAllPosts, getPost } from "../posts";

// Only the posts in `content/blog/` have pages; any other name is the 404.
export const dynamicParams = false;

// Static export rejects an empty `generateStaticParams`, so with no posts the
// route builds one page under a name no post file can have (post names are
// lowercase letters, digits and hyphens), and that page is the 404.
const noPostsName = "_none";

export function generateStaticParams(): { post: string }[] {
  // Loading every post here makes a broken post file fail the build.
  const posts = getAllPosts();
  if (posts.length === 0) return [{ post: noPostsName }];
  return posts.map((post) => ({ post: post.name }));
}

export default async function Page({ params }: { params: Promise<{ post: string }> }) {
  const post = getPost((await params).post);
  if (!post) notFound();
  return <PostPage post={post} />;
}
