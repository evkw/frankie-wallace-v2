---
name: github-issue-sync-flow
description: GitHub issue current-branch implementation flow. Use ONLY when the user wants to read a GitHub issue, propose a plan, wait for approval, then implement directly on the current branch without worktrees or pull requests.
---

# GitHub Issue Sync Flow

Use this workflow when the user wants a lightweight issue implementation process on the branch they are already on.

## Inputs

- GitHub issue reference: issue number or full GitHub issue URL.

## Rules

- Do not edit files before explicit approval.
- Do not create or switch branches.
- Do not create pull requests.
- Do not run destructive git commands.
- Do not run `npm run build` as part of this flow.
- Before starting implementation work, stage all existing local changes with `git add -A` to create a clear pre-implementation checkpoint.
- Do not create a commit automatically unless the user explicitly asks.

## Workflow

1. Resolve issue context.
   - If `gh` is available, run:
     - `gh issue view <issue> --json number,title,body,labels,url`
   - If `gh` is unavailable or fails, ask the user to paste issue details.
   - Extract:
     - Issue number
     - Title
     - Summary of acceptance criteria

2. Confirm current branch context.
   - Determine and report the currently checked out branch.
   - State clearly that implementation will happen on this branch.
   - Do not create, switch, or manage worktrees.

3. Propose plan and pause.
   - Present a concise implementation plan tied to issue acceptance criteria.
   - Include expected files to change and lightweight verification commands.
   - Explicitly exclude `npm run build`.
   - Stop and wait for explicit user approval phrase such as `approve`.

4. Prepare checkpoint after approval.
   - Before making any issue implementation edits, run:
     - `git add -A`
   - Report staged status for transparency (for example with `git status --short`).
   - Explain this checkpoint is for easier undo/restore if needed.

5. Execute only after approval.
   - Implement the approved plan directly on the current branch.
   - Run relevant non-build verification commands where applicable.
   - Summarize what changed, what was verified, and any follow-up items.

## Approval Gate

Before approval:

- Allowed: read-only analysis, issue inspection, current-branch inspection, and plan creation.
- Not allowed: file edits, commit creation, pushes, migrations, or any side-effectful implementation steps.

After user replies with explicit approval:

- Proceed with implementation on the current branch.

## Response Format Guidance

- First report issue details and current branch.
- Then present the implementation plan.
- Ask for explicit approval with a single clear prompt.
- After approval, execute and finish with a concise change and verification summary.
