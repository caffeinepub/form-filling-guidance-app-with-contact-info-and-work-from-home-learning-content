# Specification

## Summary
**Goal:** Replace the Learn page hero image with the newly uploaded logo graphic while keeping existing styling and responsiveness.

**Planned changes:**
- Add a new generated hero image asset (landscape/letterboxed) derived from the uploaded logo graphic and place it under `frontend/public/assets/generated`.
- Update only the specified Learn page hero `<img>` (at the provided XPath) to use the new asset instead of ` /assets/generated/hero-illustration.dim_1600x900.png`.
- Update the hero image `alt` text to clear English describing the logo graphic (without personal names).

**User-visible outcome:** The Learn page hero displays the uploaded logo graphic (in a landscape hero-friendly format) with proper responsive sizing and accessible alt text.
