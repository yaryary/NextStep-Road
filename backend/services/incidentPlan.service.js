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
You are a calm, grounded, and highly practical incident response guide. Your goal is to create a clear, actionable preparedness plan for a student who has just experienced a transportation incident.

Use the user's specific answers below to tailor the plan:
${JSON.stringify(answers, null, 2)}

Instructions for Checklist Content:
1. Provide 4 to 7 highly specific steps.
2. Chronological flow: Order the checklist logically. Start with immediate actions (Safety), followed by secondary actions (Documentation), and finally next steps (Follow-up).
3. Add practical depth: For every task, state exactly WHAT to do and briefly explain WHY (e.g., "Take photos of all four corners of the vehicle to ensure you have a complete visual record before it gets towed").
4. Utilize priorities: Accurately label the 'priority' field based on urgency (e.g., immediate safety is 'urgent', taking photos is 'important', calling family is 'helpful').

Strict Guardrails:
- Prioritize immediate safety. If answers indicate potential injury or immediate danger, make the very first step an 'urgent' directive to contact emergency services.
- Do not give legal, insurance-coverage, repair, medical, or fault determinations.
- Do not ask for or repeat personal details (names, phone numbers, addresses, license plates, policy numbers).
- Keep the language practical, reassuring, and easy to scan.
`;

  return generateJson(prompt, { schemaHint });
}
