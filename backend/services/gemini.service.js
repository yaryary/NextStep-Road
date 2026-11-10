import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

let client = null;

function getClient() {
  if (!env.gemini.apiKey) {
    console.error(
      "GEMINI_API_KEY is missing. Set it in the backend .env file.",
    );
    throw ApiError.internal("Could not create a plan right now.");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: env.gemini.apiKey });
  }

  return client;
}

export async function generateJson(prompt, { schemaHint = "" } = {}) {
  const ai = getClient();

  const fullPrompt = `${prompt}
${schemaHint ? `Return ONLY valid minified JSON matching this shape:\n${schemaHint}` : ""} Do not include markdown code fences or any prose. Output JSON only.`;

  let text;
  try {
    const result = await ai.models.generateContent({
      model: env.gemini.model,
      contents: fullPrompt,
      config: { responseMimeType: "application/json", temperature: 0.3 },
    });
    text = result.text;
  } catch (err) {
    console.error("Gemini request failed:", err.message);
    throw ApiError.internal("Could not create a plan right now.");
  }

  // return parseJson(text);
  const parsedPlan = parseJson(text);

  return parsedPlan;
}

export async function generateText(prompt) {
  const ai = getClient();
  try {
    const result = await ai.models.generateContent({
      model: env.gemini.model,
      contents: prompt,
      config: { temperature: 0.3 },
    });
    return result.text?.trim() || "";
  } catch (err) {
    throw ApiError.internal(`AI request failed: ${err.message}`);
  }
}

function parseJson(raw) {
  if (!raw) throw ApiError.internal("AI returned an empty response");
  let cleaned = raw.trim();

  cleaned = cleaned
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();

  const firstBrace = cleaned.search(/[{[]/);
  const lastBrace = Math.max(
    cleaned.lastIndexOf("}"),
    cleaned.lastIndexOf("]"),
  );
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    throw ApiError.internal("AI returned malformed JSON. Please try again.");
  }
}
