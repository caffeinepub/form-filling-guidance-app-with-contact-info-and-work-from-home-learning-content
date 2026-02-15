# Specification

## Summary
**Goal:** Go live with Version 2 as the current production release.

**Planned changes:**
- Update `frontend/public/app-version.txt` so the first line is exactly `Version 2`, while keeping the `Routes:` line consistent with the app’s core routes (`/`, `/learn`, `/guided-forms`, `/contact`).
- Update `frontend/DEPLOYMENT.md` to reflect `### Current Version: Version 2`.
- Run the existing post-deploy smoke check script against the production base URL and confirm core routes return HTTP 2xx/3xx.

**User-visible outcome:** The production release is identified as Version 2, deployment docs reflect Version 2, and core routes are verified reachable via the post-deploy smoke check.
