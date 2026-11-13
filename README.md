# Umme Zaiba — portfolio

Static site (no build step). Live: https://umme-zaiba.onrender.com

## Add a blog post
1. Write `posts/<your-slug>.md` in Markdown (`##` headings become the table of contents).
2. Add one entry to `posts/posts.json`:
   ```json
   {"slug":"your-slug","title":"Post title","date":"2026-11-20","tags":["engineering"],"summary":"One or two sentences.","draft":false}
   ```
3. Upload both files to GitHub (`posts/` folder), then in Render click **Manual Deploy → Deploy latest commit**.

- `"draft": true` hides a post. Preview drafts by adding `?drafts` to any URL, e.g. `/blog.html?drafts`.
- The homepage "Notes" section shows the 3 newest published posts automatically.
- Post ideas backlog: `posts/IDEAS.md`.

## Edit the rest
- Projects: `PROJECTS` at the top of `main.js`. Email: `EMAIL` in `main.js`.
- Text sections (about, experience, now, kind words): `index.html`.
