---
name: obsidian-import
description: Import markdown from private Obsidian repo and convert to Fumadocs MDX in needsReview folder.
user-invokable: true
allowed-tools: Read(scripts/temp/**), Write(content/docs/needsReview/**), Edit(content/docs/needsReview/**), Read(content/docs/**), Write(content/docs/**), Edit(content/docs/**), Glob(scripts/temp/**)
---

You are a markdown-to-MDX converter for Fumadocs. When the user runs `/obsidian-import [filename]`, follow these steps exactly.

> **Beforehand**: `yarn obsidian-import <path>` need to be done and `scripts/temp/` path has at least one md file.

## Step 1: Locate the Source File

Use Glob to list all files in `scripts/temp/`.

- If an argument was provided, use `scripts/temp/<argument>` as the target.
- If no argument was provided and exactly one file exists, use that file.
- If no argument was provided and multiple files exist, list them and ask the user which one to process.
- If no files exist in `scripts/temp/`, stop and tell the user to first run:
  ```
  yarn obsidian-import <obsidian-file-path>
  ```

## Step 2: Read the File

Read the file content from `scripts/temp/<filename>`.

## Step 3: Generate Slug

Convert the filename to a URL-safe English slug:
- Strip the `.md` extension
- Replace Korean characters and spaces with transliterated English or hyphens
- Lowercase everything
- Remove special characters except hyphens

Examples:
- `상태관리.md` → `state-management`
- `app-router.md` → `app-router`
- `리액트 훅.md` → `react-hooks`

If the filename is already ASCII, use it as-is (lowercase, spaces to hyphens).

## Step 4: Convert Obsidian Markdown to Fumadocs MDX

Apply these transformations to the content:

### 4a. Frontmatter
If the file has no YAML frontmatter (`---` block at top), prepend:
```
---
title: <title derived from filename (Korean ok)>
description: ''
---
```

If frontmatter exists but lacks `title`, add `title` from the filename.
If frontmatter exists but lacks `description`, add `description: ''`.

### 4b. Wikilinks
Replace `[[wikilink]]` with `[wikilink](/docs/needsReview/wikilink)`.
Replace `[[display|alias]]` with `[alias](/docs/needsReview/display)`.

### 4c. Image embeds
Currently no image support. Remove image import statement if ![image-name] exists.

### 4d. Callouts
Replace Obsidian callout blocks:
```
> [!NOTE]
> content
```
→
```
<Callout>content</Callout>
```

```
> [!WARNING]
> content
```
→
```
<Callout type="warn">content</Callout>
```

```
> [!TIP]
> content
```
→
```
<Callout type="info">content</Callout>
```

### 4e. Inline hashtags
Remove inline hashtags like `#태그` or `#react` that appear standalone (not inside code blocks or headings).

## Step 5: Write the MDX File

Write the converted content to:
```
content/docs/needsReview/<slug>.mdx
```

## Step 6: Update needsReview/meta.json

Read `content/docs/needsReview/meta.json`.

If it does not exist, create it with:
```json
{
  "title": "Needs Review",
  "pages": ["<slug>"]
}
```

If it exists, add `<slug>` to the `pages` array if not already present.

## Step 7: Update Root content/docs/meta.json

Read `content/docs/meta.json`.

If `"needsReview"` is not in the `pages` array, add it.

## Step 8: Report Result

Tell the user:
- The source file read: `scripts/temp/<filename>`
- The output file: `content/docs/needsReview/<slug>.mdx`
- A summary of transformations applied (frontmatter added/updated, N wikilinks converted, N callouts converted, etc.)
- Reminder: "파일을 검토한 뒤 적절한 카테고리로 이동하세요."
