import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostPage from "./content";
import { getAllPosts, getPost } from "../posts";
import { articleMetadata } from "../../site-metadata";

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

type Props = { params: Promise<{ post: string }> };

// A post is English only, so its head keeps its own title and summary in every
// language: the browser sync leaves post pages alone (`i18n-provider.tsx`).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).post);
  // The zero-post placeholder has no post; `Page` makes it the 404, which
  // keeps the shared metadata.
  if (!post) return {};
  return articleMetadata({
    path: `/blog/${post.name}/`,
    title: post.title,
    description: post.summary,
    publishedTime: post.date,
  });
}

export default async function Page({ params }: Props) {
  const post = getPost((await params).post);
  if (!post) notFound();
  return <PostPage post={post} />;
}
