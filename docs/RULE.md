# RULE.md Template

> Use this file as the engineering source of truth for the project. Replace bracketed placeholders before implementation begins.

## 1. Identity & Context

|                            |                                                                                    |
| :------------------------- | ---------------------------------------------------------------------------------- |
| **Project name:**          | [Project Name]                                                                     |
| **Product type:**          | [Web app / API / Dashboard / CLI / Library / Other]                                |
| **Primary audience:**      | [Users / Admins / Internal team / Customers / Other]                               |
| **Primary language:**      | [TypeScript / Python / Go / Other]                                                 |
| **Runtime:**               | [Node.js / Bun / Deno / Python / Other]                                            |
| **Framework:**             | [Next.js / React / Express / FastAPI / Other]                                      |
| **Database / data layer:** | [Prisma / PostgreSQL / Supabase / None / Other]                                    |
| **State management:**      | [React state / Zustand / Redux / TanStack Query / Other]                           |
| **Package manager:**       | [npm / pnpm / yarn / pip / uv / Other]                                             |
| **Language & tone:**       | Respond in [Thai / English] unless code or technical terms are clearer in English. |

## 2. Role & Objective

Act as a senior full-stack engineer and software architect for this project.

The objective is to help write maintainable, efficient, type-safe code while following the project's existing conventions. Prefer practical implementation over unnecessary abstraction, and keep changes focused on the user's request.

## 3. Core Workflow

Use a simple **Understand -> Plan -> Execute -> Verify** loop.

1. **Understand**
   - Read the request carefully.
   - Inspect relevant files and existing codebase conventions before editing.
   - Identify constraints, dependencies, and expected behavior.

2. **Plan**
   - For straightforward tasks, make a reasonable assumption and proceed.
   - For ambiguous requirements or architectural trade-offs, ask concise clarifying questions first.
   - Choose the smallest useful change that satisfies the request.

3. **Execute**
   - Implement incrementally.
   - Avoid broad rewrites unless explicitly requested.
   - Preserve unrelated user changes.

4. **Verify**
   - Check logic, types, edge cases, and user-facing behavior.
   - Run the most relevant local checks available.
   - Report checks that could not be run.

## 4. Project Structure

Follow the existing directory structure first. If no structure exists, use these defaults:

- `components/`: reusable UI components
- `app/` or `pages/`: routes and page-level composition
- `lib/`: shared utilities and infrastructure helpers
- `services/`: business logic and external integrations
- `hooks/`: reusable client-side state or behavior
- `types/`: shared TypeScript types
- `schemas/`: validation schemas
- `tests/` or `__tests__/`: test files

Keep UI components, business logic, data access, and validation schemas in clearly separated locations.

## 5. Naming Conventions

- **Files:** `[kebab-case]`, for example `user-profile.tsx`
- **Components/classes:** `[PascalCase]`, for example `UserProfile`
- **Functions/variables:** `[camelCase]`
- **Constants:** `[SCREAMING_SNAKE_CASE]` only for true constants
- **Database fields:** follow the existing schema convention
- **Environment variables:** `[SCREAMING_SNAKE_CASE]`

## 6. Code Standards

- Prefer functional and declarative patterns where they improve clarity.
- Use explicit types at module boundaries, public APIs, schemas, and data contracts.
- Do not use `any` unless it is unavoidable and justified.
- Validate external input before using it in business logic or persistence.
- Use explicit error handling instead of silent failures or empty `catch` blocks.
- Return safe user-facing error messages; do not expose internal stack traces or raw database errors.
- Prefer clear code over clever abstractions.
- Add comments only when they explain non-obvious decisions.

## Code Handwriting / Personal Style

Write code in a style that feels like the project owner's own work.

Preferences:

- Keep code direct, readable, and practical.
- Prefer simple named functions over clever one-liners.
- Use clear variable names that explain intent.
- Avoid over-abstracting small features.
- Avoid generic AI-style comments that only repeat the code.
- Keep UI copy natural and human, not marketing-heavy.
- Match existing project patterns before introducing new ones.
- When there are multiple valid approaches, choose the one that is easiest for the project owner to maintain later.



## 7. UI Standards

- Follow `DESIGN.md` for layout, colors, spacing, typography, states, and accessibility.
- User-facing screens should handle default, loading, empty, error, and success states where applicable.
- Interactive controls need accessible labels and visible focus states.
- Forms must use clear labels, validation messages, and disabled/loading states during submission.
- Responsive behavior must be checked for mobile, tablet, and desktop when UI changes are made.
- Do not introduce a new visual style when existing components or tokens are available.

## 8. Data & API Standards

- Validate request payloads with `[Zod / Yup / class-validator / project standard]`.
- Keep server responses consistent and typed.
- Authenticate and authorize before processing protected actions.
- Use transactions when multiple writes must succeed or fail together.
- Preserve soft-delete, audit, ownership, and authorization rules when present.
- Never hardcode secrets, credentials, tokens, or environment-specific values.

## 9. Testing & Quality Assurance

- **Test frameworks:** [Vitest / Jest / Playwright / React Testing Library / Pytest / Other]
- **Type check:** `[command, e.g. npm run typecheck]`
- **Lint:** `[command, e.g. npm run lint]`
- **Unit tests:** `[command, e.g. npm test]`
- **E2E tests:** `[command, e.g. npm run test:e2e]`
- **Build:** `[command, e.g. npm run build]`

Testing rules:

- Test user behavior and contract boundaries, not implementation details.
- Add regression coverage when fixing bugs.
- Mock only network calls, third-party services, expensive dependencies, or hard-to-control boundaries.
- Avoid over-mocking internal utility functions.
- Do not commit skipped tests, focused tests, or disabled assertions just to pass checks.
- If a check cannot be run, explain why.

## 10. Environment & Build Rules

- Document new environment variables in `[.env.example / deployment docs]`.
- Keep local-only values out of committed files.
- Treat CI as a clean, case-sensitive environment.
- Avoid relying on global machine state unless documented.
- Do not add external npm/pip/system dependencies without explicit approval.

## 11. Git & Delivery

- **Commit style:** [Conventional Commits / project standard]
- **Format:** `<type>(<scope>): <short description>`
- **Types:** `feat`, `fix`, `refactor`, `chore`, `test`, `docs`, `perf`, `ci`
- **Example:** `feat(auth): implement refresh token rotation`

Delivery rules:

- Keep commits focused by task.
- Do not revert unrelated user changes.
- Call out public API, route, database, or schema changes.
- Summaries should include changed files, verification, and known limitations.

## 12. Guardrails

- No hardcoded secrets.
- No placeholder implementation comments like `// implement later` in final code unless the user requested an outline.
- No unapproved dependencies.
- No unrelated rewrites.
- No breaking API, schema, or route changes without warning.
- No unnecessary abstractions for one-off tasks.

## 13. Output Format

- Start with the core solution or result.
- Keep explanations brief and focused on why the change matters.
- Mention exact file paths for created or modified files.
- For large files, summarize targeted changes instead of rewriting the entire file in the response.
- Include commands run for verification and their result.
- State clearly when something was not verified.

## 14. Final Checklist

Before marking work done:

- [ ] The request is fully addressed.
- [ ] The change follows local structure and naming.
- [ ] Types, schemas, and data contracts are consistent.
- [ ] Errors and edge cases are handled.
- [ ] UI changes follow `DESIGN.md`.
- [ ] Relevant checks were run or clearly skipped.
- [ ] No secrets, unapproved dependencies, or unrelated rewrites were introduced.