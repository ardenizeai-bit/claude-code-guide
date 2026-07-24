# QA & Testing

## 1. QA with Claude Code

Four things Claude does for QA per the guide: **test-case generation** (requirements → structured positive/negative/boundary/edge cases in seconds), **Playwright automation** (Page Object Models, specs, fixtures, flaky-test debugging), **API testing** (validation, auth, error scenarios, status-code coverage from an endpoint spec), and **edge-case discovery** (feature description → concurrency/state/boundary cases you'd normally miss).

**Suggested workflow:** describe the feature/paste the spec → Claude generates test cases or automation code → review, adjust, and run → feed failures back to Claude for fixes.

**Starter prompt shapes given:**
- Test cases from a spec: list field requirements and validation rules, ask for positive/negative/boundary/edge cases as a table with ID/Category/Steps/Expected/Priority.
- Playwright E2E: name the flows to cover, specify Page Object Model + TypeScript.
- API test suite: give the endpoint, required fields, and ask for valid/missing/invalid/boundary/injection/auth-expiry cases.
- Edge-case discovery: describe a constrained feature (e.g. file upload with a size/format limit) and ask what edge cases QA engineers typically miss.

The guide's advice: start with test-case generation first since it has the highest perceived ROI, often surfacing 20+ cases including ones normally caught only after a production bug.

---

## 2. Test Case Generation

**Pattern:** give Claude a clear requirements block, then ask for a categorized table.

Worked example — a login page (email/password validation, specific error strings, 5-attempt lockout) — produced roughly a dozen-plus rows spanning positive login, invalid-email/short-password/empty-field negatives, an exactly-8-character boundary case, SQL-injection and XSS edge cases in the input fields, a case-sensitivity check, a max-length email boundary, concurrent-session behavior, and lockout/post-lockout attempts.

**Further scenarios worked through the same way:** a checkout flow (cart quantity limits, single-coupon-per-order rule, payment fields), a search+filter feature (query length limits, SQL injection, special characters, pagination edges), a CRUD API (auth/role/duplicate/not-found status codes), and a file-upload feature (size/format boundaries, content-vs-extension mismatch, concurrent uploads, mid-upload network loss).

**Advanced patterns:**
- **From a Jira ticket:** paste the full ticket text and ask Claude to extract testable requirements plus edge cases not explicitly stated.
- **Negative-only generation:** explicitly ask for *only* invalid-input, unauthorized-access, race-condition, resource-exhaustion, and injection cases — no happy-path tests — when positive tests already exist.
- **Boundary Value Analysis (BVA) table:** ask for `min-1`/`min`/`min+1`/nominal/`max-1`/`max`/`max+1` rows given a field's valid range, to systematically catch off-by-one errors.

**Guidance:** always check generated cases against the actual spec (Claude may infer requirements that don't exist); feeding Claude an existing test suite and asking "what's missing?" tends to surface gaps faster than generating from scratch.

---

## 3. Playwright Automation

**Page Object Model:** describe the page, fields, and desired methods; Claude generates a typed POM class (e.g. a `LoginPage` with `goto()`, `login()`, `getError()` methods built on `getByLabel`/`getByRole`/`getByTestId` locators).

**Test specs:** reference the POM and describe scenarios; the resulting spec uses `test.beforeEach` for setup and asserts against the page object's methods (e.g. valid login redirects to `/dashboard`, invalid email/password show specific errors, empty-form validation messages appear).

**Auth fixtures:** a one-time `auth.setup.ts` logs in once, saves `storageState` to a JSON file, and a shared fixture reuses that stored session across the whole suite — avoiding a fresh login per test.

**Debugging flaky tests — three patterns:**
- **Timing issues:** an assertion reading a locator's `textContent()` immediately after an action, without waiting for navigation, is fixed by `waitForURL` plus `expect(locator).toContainText(...)` (which auto-retries).
- **Locator changes:** replacing a fragile CSS selector (`.submit-btn`) with a role-based locator (`getByRole('button', { name: 'Sign in' })`) that survives markup changes.
- **CI-only failures:** attributed to headless Linux running a different viewport/font-rendering/network profile than local dev; fixed by setting an explicit viewport and using a screenshot-comparison threshold tolerance.

**CI integration:** a minimal GitHub Actions job installs Node + Playwright browsers, runs `npx playwright test`, and uploads the HTML report as a build artifact.

**Guidance:** always prefer role-based locators (`getByRole`, `getByLabel`) over CSS selectors; never hardcode `waitForTimeout` — rely on Playwright's built-in auto-waiting assertions instead.

---

## 4. API Testing

**Generating a suite from an endpoint spec:** given a schema (required/optional fields, types, constraints), Claude produces a Playwright `request`-based spec covering: 201 on valid creation, 400 on missing fields, 400 on a too-short password, 409 on a duplicate email, and 400 on an injection attempt in a string field.

**Status-code coverage matrix:** asking Claude to map every CRUD endpoint against expected codes (200/201/400/401/403/404/409/500) surfaces gaps in error handling before a single test is written — e.g. confirming `DELETE` returns 401 with no token, 403 for the wrong role, and 404 for a missing ID.

**Validation/error categories Claude is described as generating exhaustively per field type:**
- *String fields:* empty/null/undefined, very long input, special/unicode/emoji characters, SQL-injection and XSS payloads.
- *Numeric fields:* zero, negative, `MAX_SAFE_INTEGER`, float-where-int-expected, wrong type.
- *Email fields:* missing/double `@`, unicode in the local part, common typos, very long addresses.

**Authentication test matrix:** four canonical scenarios — no token (401), expired token (401), malformed token (401), and valid token with the wrong role (403) — run parameterized across every CRUD endpoint.

**Contract testing:** paste an OpenAPI schema alongside an actual response and ask Claude to flag mismatches in field names, types, required-ness, or status codes.

**Guidance:** prioritize error-path tests over happy-path ones (they catch more real bugs); never put real API keys/tokens/credentials directly in a prompt — use placeholders and environment variables.

---

## 5. Edge Cases & Regression

**Edge-case discovery:** describing a feature (e.g. a date picker) and asking for categorized edge cases surfaces buckets like boundary values (Jan 1, Dec 31, Feb 28/29), invalid inputs (month 13, Feb 30), format ambiguity (MM/DD vs. DD/MM vs. ISO), timezone/DST transitions, leap-year rules (2024 vs. 2025 vs. 2100), and locale/i18n concerns (RTL layout, non-Gregorian calendars, separator characters).

**Boundary Value Analysis:** given a parameter's min/max/default (e.g. a `page_size` of 1–100, default 20), Claude produces a full BVA table including negative, decimal, and non-numeric "special value" rows alongside the standard boundary rows.

**Regression tests from bug reports:** pasting a bug description plus its fix summary (e.g. "double-click created duplicate orders, fixed with a debounce") produces a targeted Playwright test that reproduces the original failure condition and asserts it no longer occurs (only one order created, button disabled after first click) — the same pattern is shown for an API validation bug (negative/zero quantity now correctly returns 400, while a valid quantity still returns 201).

**State & concurrency edge cases** the guide walks through: simultaneous-edit race conditions (last-write-wins vs. conflict detection vs. field-level merge vs. surfaced conflicts), session expiry mid-multi-step-form (lost progress, mid-call 401, silent vs. failed token refresh, multi-tab token skew), browser back-button behavior after form submission (stale re-display, duplicate-submission risk, POST/Redirect/GET pattern), and offline/reconnect scenarios (queued-action sync, conflicting offline edits, duplicate submissions from a retry queue, stale service-worker cache, missed WebSocket events).

**Exploratory testing checklist (SFDPOT heuristic):** Structure, Function, Data, Platform, Operations, Time — applied to a shopping-cart example, each dimension gets its own list of concrete things to poke at (e.g. under Platform: Safari-vs-Chrome autofill, iOS input-zoom-on-focus, screen-reader announcements, slow-3G loading states).

**Guidance:** feeding Claude your historical bug list and asking what patterns it sees is presented as a way to surface edge cases in a *new* feature that a team's own past bugs would predict.
