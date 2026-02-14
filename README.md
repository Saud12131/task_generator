# AI Task Generator – Mini Planning Tool

A web application that generates structured feature plans using Azure OpenAI.

Users can:
- Describe a feature idea
- Generate user stories, engineering tasks, and risks
- Edit and reorder tasks
- Export the result as Markdown
- View the last 5 generated plans
- Check system health via a status page

---

## 🚀 Live Demo

[Add your live link here]

---

## 🧠 Tech Stack

- **Next.js 16 (App Router)**
- **TypeScript**
- **MongoDB**
- **Azure OpenAI (gpt-35-turbo)**
- **dnd-kit** (for drag-and-drop reordering)

---

## ✨ Features Implemented

### 1. Plan Generation
- User fills a form with:
  - Goal
  - Target users
  - Platform type
  - Constraints
- Azure OpenAI generates:
  - User stories
  - Engineering tasks
  - Risks

### 2. Editing
- Inline editing of:
  - User stories
  - Tasks
  - Risks
- Changes are saved to MongoDB instantly.

### 3. Reordering Tasks
- Drag-and-drop reordering using dnd-kit.
- Order persists after refresh.

### 4. Export
- Copy as Markdown
- Download `.md` file

### 5. Recent Plans
- Home page shows the last 5 generated plans.
- Click to reopen any previous spec.

### 6. System Status Page
Accessible at `/status`.

Shows:
- Backend API health
- Database connectivity
- Azure OpenAI connection

---

## 🛠 How to Run Locally

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <project-folder>

2. Install dependencies
npm install

3. Create .env.local

Copy .env.example:

cp .env.example .env.local


Fill in:
MONGODB_URI=
MONGODB_DB=

AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_DEPLOYMENT=gpt-35-turbo
AZURE_OPENAI_API_VERSION=2024-04-01-preview


4. Run the app
npm run dev


Visit:

http://localhost:3000

📦 Environment Variables

See .env.example.

No API keys are stored in the repository.

🧩 Design Decisions

Tasks are stored as string[] for simplicity.

Reordering updates array order directly.

Grouping feature was intentionally not implemented to keep schema minimal.

Status page performs real connectivity checks instead of static responses.

⚠️ Not Implemented

Task grouping (skipped intentionally for schema simplicity)
