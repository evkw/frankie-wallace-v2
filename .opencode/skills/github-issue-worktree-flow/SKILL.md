---
name: github-issue-worktree-flow
description: GitHub issue worktree feature branch plan approval execute. Use ONLY when the user asks to implement a GitHub issue with a feature branch, propose a plan first, wait for approval, then do the work.
---

# GitHub Issue Worktree Flow

Use this workflow when the user wants a structured issue implementation process with worktrees and an approval gate.

## Inputs

- GitHub issue reference: issue number or full GitHub issue URL.

## Rules

- Do not edit files before explicit approval.
- Do not run destructive git commands.
- Prefer non-destructive reuse when branch/worktree already exists.
- Keep all issue worktrees under `.worktrees/` in the repo root.

## Workflow

1. Resolve issue context.
   - If `gh` is available, run:
     - `gh issue view <issue> --json number,title,body,labels,url`
   - If `gh` is unavailable or fails, ask the user to paste issue details.
   - Extract:
     - Issue number
     - Title
     - Summary of acceptance criteria

2. Derive naming.
   - Slugify title to lowercase kebab-case.
   - Branch name: `feat/issue-<number>-<slug>`
   - Worktree path: `.worktrees/issue-<number>`

3. Create or reuse git worktree and branch.
   - Ensure parent exists: `.worktrees/`
   - If worktree path already exists, reuse it and verify branch state.
   - If worktree does not exist:
     - Create branch if missing from default base branch.
     - Or attach existing branch if already created.
   - Example non-destructive command patterns:
     - `git worktree add .worktrees/issue-<number> -b feat/issue-<number>-<slug>`
     - `git worktree add .worktrees/issue-<number> feat/issue-<number>-<slug>`

4. Propose plan and pause.
   - Present a concise implementation plan tied to issue acceptance criteria.
   - Include expected files to change and verification commands.
   - Stop and wait for explicit user approval phrase such as `approve`.

5. Execute only after approval.
   - Perform edits within the worktree.
   - Run relevant verification commands.
   - Summarize what changed, what was verified, and any follow-up items.

## Approval Gate

Before approval:

- Allowed: read-only analysis, issue inspection, branch/worktree setup, and plan creation.
- Not allowed: file edits, commit creation, pushes, migrations, or any side-effectful implementation steps.

After user replies with explicit approval:

- Proceed with implementation and verification.

## Response Format Guidance

- First report issue details and chosen branch/worktree names.
- Then present the plan.
- Ask for explicit approval with a single clear prompt.
- After approval, execute and finish with a concise change and verification summary.
