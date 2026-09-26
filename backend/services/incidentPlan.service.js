import { generateJson } from "./gemini.service.js";

export async function generateIncidentPlan(answers) {
  const schemaHint = `
{
  "title": "string",
  "safetyNotice": "string",
  "summary": "string",
  "checklist": [
    {
      "id": "string",
      "category": "Safety | Documentation | Follow-up",
      "task": "string",
      "priority": "urgent | important | helpful"
    }
  ],
  "disclaimer": "string"
}
`;

  const prompt = `
You create calm, general preparedness plans after transportation incidents.

Use the user's answers below:
${JSON.stringify(answers, null, 2)}

Rules:
- Prioritize immediate safety.
- If someone may be hurt or there is immediate danger, clearly tell the user to contact emergency services.
- Do not give legal, insurance-coverage, repair, medical, or fault determinations.
- Do not ask for or repeat personal details such as names, phone numbers, addresses, license plates, policy numbers, or account information.
- Give practical, easy-to-scan steps that a student can follow.
- Return 4 to 7 checklist items.
`;

  return generateJson(prompt, { schemaHint });
}