# /commit — Conventional Commit Helper

Write a conventional commit message for all staged changes.

## Rules
- Subject line: `type(scope): description` — ≤72 chars, imperative mood
- Body: WHY the change was made, not WHAT (the diff shows WHAT)
- No trailing period on subject
- Blank line between subject and body
- Co-author line always last: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

## Types
| Type | When |
|---|---|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `style` | CSS/design changes, no logic change |
| `refactor` | Code restructure, no behavior change |
| `docs` | Documentation, CLAUDE.md, README |
| `chore` | Config, tooling, deps |
| `security` | Security hardening |
| `seo` | SEO, metadata, structured data |

## Scopes for this project
`hero`, `sections`, `form`, `api`, `csp`, `css`, `content`, `seo`, `a11y`, `perf`, `config`, `dx`

## Steps
1. Run `git diff --staged` to see changes
2. Identify the primary type and scope
3. Write subject (≤72 chars)
4. Write body focused on WHY (skip body if subject is self-explanatory)
5. Output the full commit command using HEREDOC format

## Example output
```bash
git commit -m "$(cat <<'EOF'
feat(hero): SUNHAUS-inspired motion hero with real photo

Ken Burns backdrop, mouse parallax on 3 depth layers, animated
counter stat cards, canvas dust. Replaces old Tesla bottom-bar layout.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```
