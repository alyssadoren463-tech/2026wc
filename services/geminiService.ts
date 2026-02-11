
import { GoogleGenAI } from "@google/genai";
import { LiveUpdateResponse, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchLiveCricketData = async (query: string): Promise<LiveUpdateResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a detailed live score update for: ${query}. 
      PRIORITIZE data from https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026 and other official ICC sources.
      Include the current score, batsman stats, bowler stats, run rate, and the specific match situation (e.g., "India needs 40 runs in 15 balls"). 
      Format it in clean markdown with bold headers and bullet points.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'ICC Official Source',
        uri: chunk.web?.uri || '',
      }))
      .filter((s: GroundingSource) => s.uri !== '') || [];

    return {
      text: response.text || "No live updates found at the moment.",
      sources,
    };
  } catch (error) {
    console.error("Error fetching live data:", error);
    return {
      text: "Failed to fetch live updates. Please try again later.",
      sources: [],
    };
  }
};

export const getAIPrediction = async (matchInfo: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the latest data from the ICC Men's T20 World Cup 2026, provide a win prediction for: ${matchInfo}. 
      Mention a key player who could change the game. Be energetic and concise.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text || "Prediction unavailable.";
  } catch (error) {
    return "Could not generate prediction.";
  }
};
