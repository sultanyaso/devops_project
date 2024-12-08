import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generatePrompt = (topic, template, tone) => {
  return `Generate a LinkedIn post about "${topic}" in a ${tone} tone.
The post should follow this template style: ${template}.
Include 3-4 key points or highlights.
Make it engaging and encourage interaction.
Keep it professional and authentic.
Maximum length: 300 words.
Humanize the content and make it relatable.
Donot include any sensitive or confidential information.
Donot add emojis`;
};

export const generatePostContent = async (topic, template, tone) => {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = generatePrompt(topic, template, tone);

    const result = await model.generateContent(prompt);
    const text = result.response?.text ?? "";

    if (!text) throw new Error("No response text received");
    return text;
  } catch (error) {
    console.error("Error generating post:", error.message || error);
    throw new Error("Failed to generate post content");
  }
};

export const generateHashtags = async (topic) => {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate 5 relevant professional hashtags for a LinkedIn post about "${topic}".
Make them specific and trending.
Format: Return only the hashtags, separated by spaces, without numbering or bullets.`;

    const result = await model.generateContent(prompt);
    const text = result.response?.text();

    if (!text) throw new Error("No response text received");

    // Ensure we're working with a string
    const hashtagString = String(text).trim();

    return hashtagString
      .split(/\s+/)
      .filter((tag) => tag.startsWith("#") && tag.length > 1);
  } catch (error) {
    console.error("Error generating hashtags:", error.message || error);
    throw new Error("Failed to generate hashtags");
  }
};
