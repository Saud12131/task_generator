# AI Usage Notes

This project was developed using AI assistance, but all code was reviewed, debugged, and adapted manually to ensure correctness and understanding.



## Where AI Was Used

AI tools (ChatGPT) were used to help with:

- Designing the initial architecture (Next.js + MongoDB + Azure OpenAI)
- Writing first drafts of API routes
- Debugging Next.js App Router behavior (async params, route handlers)
- Designing prompt structure for generating user stories and tasks
- Generating drag-and-drop implementation approach
- Creating markdown export format
- Structuring the status health check endpoint

---

## What I Verified / Implemented Manually

I manually:
- Fixed incorrect API response shapes
- Handled Next.js 16 async route params issues
- Implemented proper error handling for failed AI responses
- Designed DB persistence logic
- Implemented reorder persistence logic
- Debugged Azure OpenAI request failures
- Added input validation to prevent crashes
- Ensured refresh-safe UI state
- Verified system status checks actually connect to services

---

## Prompt Engineering Adjustments

The model initially returned inconsistent structure.  
I refined prompts to ensure:

- Consistent sections
- Clean bullet-point outputs
- No markdown fences
- Predictable arrays for parsing

---

## AI Was Not Used For

- I did not paste unverified full files directly
- I tested every feature manually
- I understood and modified every AI-generated code section
- I debugged runtime issues myself

---

## Notes

The AI significantly accelerated development, but most time was spent debugging integration issues (Next.js routing, API responses, and Azure OpenAI behavior).
