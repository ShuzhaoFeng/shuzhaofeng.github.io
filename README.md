# shuzhaofeng.github.io

Source of Shuzhao Feng's personal website: research, academic journey, projects, upcoming activities, and a blog.

Visit it at <https://shuzhaofeng.github.io>.

## Writing a post

Each post is one Markdown file, `content/blog/<post-name>.md`. The file name becomes the post's address, `/blog/<post-name>/`, so use lowercase letters and digits in words joined by single hyphens.

The file starts with a header of three fields; `date` is written `YYYY-MM-DD`:

```markdown
---
title: "My First Post"
date: 2026-11-03
summary: "One line shown under the title in the list and in link previews."
---
The post's body starts here.
```

A post's images go in `public/blog/<post-name>/` and are referenced by file name. An image in a paragraph of its own becomes a figure, and its quoted title is the caption:

```markdown
![Alt text](figure.png "Caption")
```

Every `.md` file in `content/blog/` is published, and one with a bad name or header fails the build; other files there are ignored.
