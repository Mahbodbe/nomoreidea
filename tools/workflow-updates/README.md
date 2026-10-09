# Workflow updates (apply manually)

The access token used to prepare this change had no `workflow` scope, so GitHub refused
changes under `.github/workflows/`. Copy these two files over the ones in
`.github/workflows/` (via the GitHub web editor, or with a token that has `workflow` scope):

- `sync-projects.yml`  also runs `python tools/build.py` after the sync, and commits the rebuilt pages
- `quality.yml`        runs `tools/build.py` before the audit, drops the old temporary branch name
