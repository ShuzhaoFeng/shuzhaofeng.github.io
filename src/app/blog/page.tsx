import { notFound } from "next/navigation";
import BlogListPage from "./content";
import { getAllPosts } from "./posts";

export default function Page() {
  const posts = getAllPosts();
  // With no post the blog stays hidden, as empty sections do: `/blog/` is
  // exported as the site's 404 page.
  if (posts.length === 0) notFound();

  // Only what the list shows crosses to the client; each post's HTML stays
  // on its own page.
  return (
    <BlogListPage
      posts={posts.map(({ name, title, date, summary }) => ({ name, title, date, summary }))}
    />
  );
}
