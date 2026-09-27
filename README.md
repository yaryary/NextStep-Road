# NextStep Road

**Clear next steps for unexpected transportation issues.**

NextStep Road is a safety-first incident planner for students. It is designed to help someone slow down, organize what happened, and think through general next steps after a transportation problem. Rather than opening a chatbot and figuring out what to ask, the user follows a guided flow.

I built this as a solo project for ShellHacks 2026. My goal was to make a stressful moment feel a little more manageable without pretending an app can replace emergency help or professional advice.

## Why I built it

Transportation problems can be confusing, especially when you're away from family or handling one for the first time. You may need to think about your immediate safety, remember details, and decide who to contact, all while stressed.

NextStep Road brings those thoughts into one guided experience. It focuses on organizing information and offering general preparedness steps, not making decisions for the user.

## What I focused on

- **Safety first.** The app is meant to help users pause and consider immediate safety before focusing on paperwork or follow-up.
- **Guided questions instead of a chat window.** A structured flow gives the user a starting point when they may not know what to ask.
- **Useful AI, not AI for its own sake.** Gemini is part of the plan-generation backend; the goal is to turn structured answers into something easier to act on.
- **Clear limits.** The app offers general preparedness and organization help, not emergency response, insurance decisions, medical guidance, or legal advice.
- **A manageable solo-project scope.** I separated the React frontend from the Express backend so I could work on the user experience and plan-generation logic independently.

These choices reflect the challenges that interested me most at ShellHacks: making vehicle-related help more approachable for students, supporting people when transportation goes wrong, and using AI inside a practical workflow instead of making the whole product a chatbot.

## Tech Stack

| Area     | Technologies                            |
| -------- | --------------------------------------- |
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend  | Node.js, Express                        |
| AI       | Google Gemini API                       |


## Project structure

```text
NextStep-Road/
├── README.md
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── utils/
└── frontend/
    └── forms/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── src/
            ├── App.jsx
            ├── components/
            ├── data/
            ├── lib/
            ├── pages/
            │   ├── HomePage/
            │   ├── QuestionsPage/
            │   └── ResultsPage/
            └── services/
```

## Safety and privacy

NextStep Road is a general organization and preparedness tool. It does not replace emergency services, medical care, an insurer, a mechanic, legal help, or roadside assistance. If someone is injured or in immediate danger, getting appropriate help comes first.

Users should avoid entering sensitive personal information.

## Status

Currently in development for ShellHacks 2026.
