```markdown
# Generative-AI — Buddy Bot

Build A Buddy Bot Integrated with Generative AI.

A lightweight JavaScript + HTML project that provides a friendly "Buddy" chat experience backed by a generative AI model. Use it as a starting point to build conversational assistants, customer helpers, or playful chat companions.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [How it works](#how-it-works)
- [Demo / Preview](#demo--preview)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Run locally](#run-locally)
- [Usage](#usage)
  - [Web UI](#web-ui)
  - [API example (curl / fetch)](#api-example-curl--fetch)
- [Project structure](#project-structure)
- [Security & privacy notes](#security--privacy-notes)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- Chat UI (HTML + JavaScript) for interacting with the Buddy Bot.
- Backend (JavaScript/Node) connecting to a generative AI provider (OpenAI or other).
- Simple configurable personality settings for the Buddy.
- Easy to extend: plug in different models, add state, or persist conversations.

---

## Tech stack

- JavaScript (Node.js / Express or similar)
- HTML/CSS/vanilla JS for frontend
- Generative AI provider (e.g., OpenAI API, other LLM endpoints)
- Optional: database for conversation history (SQLite, MongoDB, etc.)

---

## How it works

1. The frontend sends user messages to a backend endpoint (for example `/api/chat`).
2. The backend forwards the conversation to a generative AI provider using your API key, potentially including a system prompt that sets the Buddy's personality.
3. The model's response is returned to the frontend and rendered in the chat UI.
4. Optionally, conversation history or analytics can be stored server-side.

---

## Demo / Preview

If this repo contains a live demo or a deployed environment, add the link here. Otherwise, run locally (instructions below) to try the Buddy Bot.

---

## Getting started

### Prerequisites

- Node.js 16+ (or your project's required version)
- npm or yarn
- Generative AI provider account and API key (for example, OpenAI)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Mayankk499/Generative-AI.git
cd Generative-AI
npm install
```

(If your project uses a different package manager or has a monorepo structure, adapt these commands.)

### Environment variables

Create a `.env` file in the project root with keys required by your backend. Example `.env` variables:

```env
# .env.example
PORT=3000
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
MODEL=gpt-4o-mini
BUDDY_NAME=Buddy
DEFAULT_PROMPT="You are Buddy, a friendly helpful assistant that keeps answers short and friendly."
```

Add `.env` to `.gitignore` to avoid committing secrets.

### Run locally

Start the development server:

```bash
npm run dev
# or
npm start
```

Open your browser at http://localhost:3000 (or the port in your .env).

---

## Usage

### Web UI

- Open the app in your browser.
- Type a message and press Enter / click Send.
- The Buddy Bot will reply using the configured generative model.

### API example (curl)

If your backend exposes a JSON chat endpoint (for example POST /api/chat), you can call it like this:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role":"system","content":"You are Buddy, a friendly assistant."},
      {"role":"user","content":"Hi Buddy, tell me a fun fact."}
    ]
  }'
```

JavaScript (fetch) example:

```js
const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'You are Buddy, a friendly assistant.' },
      { role: 'user', content: 'Hello!' }
    ]
  })
});
const data = await res.json();
console.log(data);
```

Adjust the payload to match your backend's expected API (some projects accept `prompt` instead of `messages`).

---

## Project structure (suggested)

This is a suggested layout if your project follows a typical Node + static frontend pattern:

- / (repo root)
  - package.json
  - server.js / index.js (backend entry)
  - public/
    - index.html
    - app.js
    - app.css
  - src/
    - api/
      - chat.js
    - utils/
  - .env.example
  - README.md

Update the structure here to match the actual repository layout.

---

## Security & privacy notes

- Never commit API keys or secrets to the repository.
- Validate and sanitize user input before sending to external APIs.
- Consider rate limiting and usage caps to avoid runaway costs.
- If you store conversation history, be transparent with users and comply with privacy regulations.

---

## Contributing

Contributions are welcome! Typical workflow:

1. Fork the repository
2. Create a branch for your feature/fix: git checkout -b feat/my-feature
3. Make changes, add tests if applicable
4. Open a pull request describing your changes

Add repository-specific contribution guidelines and a code of conduct if needed.

---

## License

Specify the license you want to use (e.g., MIT). Example:

This project is licensed under the MIT License — see the LICENSE file for details.

---

## Acknowledgements

- Inspired by open-source examples of chat UIs and LLM integrations.
- Thanks to creators and maintainers of the JS libraries and the generative AI providers used.

```
