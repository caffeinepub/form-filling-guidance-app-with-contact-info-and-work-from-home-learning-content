# Specification

## Summary
**Goal:** Build a responsive guidance app with three sections—Guided Form Filling, Contact & Support, and Learn (make money online from home)—including a step-by-step form wizard, support requests, and backend-served learning content, all in English.

**Planned changes:**
- Add core navigation and dedicated routes/pages for Guided Form Filling, Contact & Support, and Learn.
- Implement a guided, step-by-step form-filling wizard with at least 3 form types, per-field tips/examples, basic validation, and a final review screen that clarifies users submit on the external site themselves.
- Build Contact & Support page with displayed support info plus a help request form (name, email, message) that validates input and persists requests via backend; add backend endpoint to list requests.
- Build Learn section with categories, lesson list, and lesson detail pages (title, length indicator, body) including prominent disclaimers about no guaranteed income and scam awareness; serve lessons/categories from backend endpoints.
- Implement Motoko backend models and endpoints to fetch form guidance templates, fetch lesson/categories, create help requests, and list help requests, persisted in stable state.
- Apply a coherent educational/support visual theme across the app (consistent colors/typography/spacing) avoiding blue/purple as primary colors.
- Add and use static generated brand assets (logo + hero illustration) from `frontend/public/assets/generated` in the header/nav and landing (or top of Learn page).

**User-visible outcome:** Users can navigate between the three sections, complete a guided form-filling flow with tips and a review screen, submit support requests that are saved, and browse learning lessons by category with disclaimers and scam-awareness guidance.
