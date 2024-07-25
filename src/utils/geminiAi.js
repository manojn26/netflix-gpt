import { GoogleGenerativeAI } from "@google/generative-ai";

export const generativeAi = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_AI_API_KEY
);
