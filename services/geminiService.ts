import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (topic: string, gradeLevel: string): Promise<string> => {
  try {
    const model = ai.models;
    const prompt = `Create a structured lesson plan for a ${gradeLevel} class on the topic: "${topic}". 
    Include learning objectives, a brief lecture outline, and one activity. Format in Markdown.`;

    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Failed to generate lesson plan.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const askTutor = async (question: string, context: string): Promise<string> => {
  try {
    const model = ai.models;
    const prompt = `You are a helpful and encouraging tutor. 
    Context: The student is learning about "${context}".
    Question: "${question}"
    Provide a clear, concise answer suitable for a student.`;

    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I couldn't understand the question.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The tutor is currently unavailable.";
  }
};