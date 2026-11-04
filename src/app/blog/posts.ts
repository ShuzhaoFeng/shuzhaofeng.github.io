// Blog posts: one Markdown file per post in `content/blog/`, read and
// converted to HTML at build time so the site stays a static export with no
// outside calls. This module reads the file system through `node:fs`, so
// import it only from server components; a client import fails the build.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import { parse as parseYaml } from "yaml";

export type Post = {
  /** The file name without `.md`; the post's address is `/blog/<name>/`. */
  name: string;
  title: string;
  /** `YYYY-MM-DD`. */
  date: string;
  summary: string;
  /** The converted Markdown body. */
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");
const postNamePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// The header is a `---` YAML block at the very top of the file. `\r?` keeps
// files checked out with Windows line endings readable.
const headerPattern = /^---\r?\n(?:([\s\S]*?)\r?\n)?---[ \t]*(?:\r?\n|$)/;
const headerFields = ["title", "date", "summary"] as const;

/** Every post, newest first; posts on the same date are ordered by name. */
export function getAllPosts(): Post[] {
  return readPostFiles()
    .map(loadPost)
    .sort(
      (a, b) =>
        (a.date < b.date ? 1 : a.date > b.date ? -1 : 0) ||
        (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
    );
}

/**
 * One post by name, or `undefined` when there is none. It loads every post,
 * so a broken file fails whichever page is built first; the posts are few and
 * converted only at build time.
 */
export function getPost(name: string): Post | undefined {
  return getAllPosts().find((post) => post.name === name);
}

function readPostFiles(): string[] {
  try {
    return readdirSync(postsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name);
  } catch (error) {
    // Git keeps no empty folder, so a clone with no posts has no folder at
    // all: treat that exactly like an empty folder.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

// Every file in the folder is published, so a broken file must fail the build
// rather than be skipped, which would hide the post.
function loadPost(fileName: string): Post {
  const fail = (problem: string): never => {
    throw new Error(`Blog post content/blog/${fileName}: ${problem}`);
  };

  const name = fileName.slice(0, -".md".length);
  if (!postNamePattern.test(name)) {
    fail(
      "the file name must be lowercase letters and digits in words joined by single hyphens, such as my-first-post.md",
    );
  }

  const source = readFileSync(path.join(postsDirectory, fileName), "utf8").replace(/^﻿/, "");
  const header = headerPattern.exec(source);
  if (!header) fail("the file must start with a --- header block holding title, date and summary");

  let fields: unknown;
  try {
    // YAML 1.2's default schema keeps `2026-11-03` a string, not a Date.
    fields = parseYaml(header![1] ?? "");
  } catch (error) {
    fail(`the header is not valid YAML (${(error as Error).message})`);
  }
  if (fields === null || typeof fields !== "object" || Array.isArray(fields)) {
    fail("the header must hold title, date and summary");
  }

  const values = {} as Record<(typeof headerFields)[number], string>;
  for (const field of headerFields) {
    const value = (fields as Record<string, unknown>)[field];
    if (typeof value !== "string" || value.trim() === "") {
      fail(`the header field "${field}" is missing, empty or not text`);
    }
    values[field] = (value as string).trim();
  }
  if (!isCalendarDate(values.date)) {
    fail(`the date "${values.date}" is not a real calendar date written YYYY-MM-DD`);
  }

  return {
    name,
    ...values,
    html: renderBody(source.slice(header![0].length), name),
  };
}

function isCalendarDate(date: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  // Date.UTC rolls 2026-02-30 over to March, so a changed field means the
  // date does not exist.
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function renderBody(markdown: string, name: string): string {
  const marked = new Marked({
    // A post's images are served from `public/blog/<name>/`, as papers' files
    // are from `public/research/<paper>/`, so a relative image path such as
    // `figure.png` resolves to `/blog/<name>/figure.png` with no copy step.
    walkTokens(token) {
      if (token.type === "image") token.href = resolveImagePath(token.href, name);
    },
    renderer: {
      // Plain, escaped code with no colouring. `tabindex` lets keyboard users
      // scroll a block that overflows sideways.
      code({ text }: Tokens.Code) {
        return `<pre tabindex="0"><code>${escapeHtml(text.replace(/\n$/, ""))}\n</code></pre>\n`;
      },
      // A paragraph holding only an image is a figure; the image's Markdown
      // title (`![Alt](figure.png "Caption")`) is its caption.
      paragraph({ tokens }: Tokens.Paragraph) {
        const content = tokens.filter((token) => !(token.type === "text" && token.raw.trim() === ""));
        if (content.length !== 1 || content[0].type !== "image") return false;
        const image = content[0] as Tokens.Image;
        const img = this.image({ ...image, title: null });
        const caption = image.title ? `<figcaption>${escapeHtml(image.title)}</figcaption>` : "";
        return `<figure>${img}${caption}</figure>\n`;
      },
    },
  });
  return marked.parse(markdown, { async: false });
}

function resolveImagePath(href: string, name: string): string {
  // Leave site-absolute paths, protocol-relative and full URLs, and fragments alone.
  if (/^([a-z][a-z\d+.-]*:|[/#])/i.test(href)) return href;
  const resolved = new URL(href, `https://site.invalid/blog/${name}/`);
  return resolved.pathname + resolved.search + resolved.hash;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
