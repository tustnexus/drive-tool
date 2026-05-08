# Semantic Drive Index

> Your Drive is not disorganised. It is unindexed.

This repository contains everything you need to build a personal metadata
layer over your Google Drive — a searchable, AI-readable contents page
for your intellectual life.

---

## What This Is

Most professionals have hundreds of documents representing years of thinking.
None of it compounds. Each new project starts from scratch because there is
no map of what already exists.

This project solves that with:
- a small script that reads your Drive and produces a JSON index
- two AI prompts that turn that index into a semantic knowledge map
- a companion guide for non-programmers

---

## Repository Contents

| File | Purpose |
|------|---------|
| `extract.js` | Script to generate a JSON metadata index from your Google Drive |
| `metadata-for-every-doc.txt` | The Substack post — vision and prompts |
| `metadata-for-every-doc-details.txt` | Companion guide — rclone setup, running the script, combining batches |
| `sample-json.txt` | Example output: raw summary JSON and AI-enriched JSON |
| `prompts/cluster-map.md` | AI prompt: groups your documents into thematic clusters |
| `prompts/enrich-metadata.md` | AI prompt: enriches each entry with summary, tags, themes, reuse score |

---

## Quick Start

**Prerequisites:** rclone configured for Google Drive, Bun or Node.js installed.

```bash
# 1. Clone the repo
git clone https://github.com/your-username/semantic-drive-index

# 2. Edit configuration at the top of extract.js
#    Set RCLONE_EXE, REMOTE_NAME, BATCH_SIZE, BATCH_NUM

# 3. Run
bun extract.js

# 4. Increment BATCH_NUM and repeat until all files are processed
```

Full setup instructions are in `metadata-for-every-doc-details.txt`.

---

## The Two Prompts

### Prompt 1: Cluster Map
Groups your documents into 4–8 named thematic clusters with cross-cutting
themes and reuse candidates. Feed it your combined JSON.
See `prompts/cluster-map.md`.

### Prompt 2: Enrich Metadata
Appends structured fields to every entry: one-line summary, category, tags,
entities, themes, reuse potential (1–5), content type.
See `prompts/enrich-metadata.md`.

---

## Sample Output

Raw entry (after running extract.js):
```json
{
  "fileName": "OpenSouceBizModels.txt",
  "remotePath": "Notes/OpenSouceBizModels.txt",
  "size": "0.69 KB",
  "snippet": "some basic Revenue Models for open source projects..."
}
```

Enriched entry (after Prompt 2):
```json
{
  "fileName": "OpenSouceBizModels.txt",
  "one_line_summary": "A concise overview of revenue models for open-source software companies.",
  "category": "Fintech",
  "tags": ["open source", "business models", "monetization", "dual licensing"],
  "themes": ["market structure", "value capture"],
  "reuse_potential": 5,
  "content_type": "analysis"
}
```

See `sample-json.txt` for additional examples.

---

## For Those Who Prefer to Read First

The companion guide (`metadata-for-every-doc-details.txt`) covers the full
workflow in plain language — no assumed programming background.

The Substack post (`metadata-for-every-doc.txt`) covers the why.
The code covers the how.

---

## Licence

MIT. Use it, adapt it, build on it.